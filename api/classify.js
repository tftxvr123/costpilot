// api/classify.js — Vercel Serverless Function (Node.js)
// Dynamic Requirement Sizing: Hours derived strictly from requirement scale

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { prompt } = req.body || {};
    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 5) {
      return res.status(400).json({ error: "Please provide a valid project description." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: "GEMINI_API_KEY is not configured in Vercel Environment Variables." 
      });
    }

    const systemPrompt = `You are a principal software architect at Ezrah Innovations.
Analyze the user's project request and estimate the REALISTIC DEVELOPER EFFORT (in hours) based on the ACTUAL SIZE of the requirement.

CRITICAL RULES:
1. SIZE-BASED EFFORT SIZING (Do NOT overprice simple requirements!):
   - Simple 1-page to 5-page static portfolio, creator showcase, simple bio: 8 to 16 hours.
   - Basic business website (5-6 pages with contact form & WhatsApp button): 18 to 30 hours.
   - Informational restaurant website (menu showcase, contact, hours): 20 to 35 hours.
   - Service booking / Appointment form: 35 to 65 hours.
   - Restaurant with online ordering & cart (no payment): 55 to 85 hours.
   - Clinic booking portal / Document manager: 70 to 120 hours.
   - Full LMS / SaaS platform with user roles & dashboards: 120 to 220 hours.

2. STRICT EXCLUSION PRECEDENCE (Exclusion > Inclusion > Inference):
   - If user says "no login", "no customer login" -> EXCLUDE user authentication completely (0 hours).
   - If user says "no payment", "no online payment" -> EXCLUDE payment gateway completely (0 hours).
   - If user says "no admin", "no admin panel" -> EXCLUDE admin dashboard completely (0 hours).
   - If user says "no mobile app", "web only" -> EXCLUDE mobile app completely (0 hours).
   - An excluded feature must NEVER appear in included_features.

3. WHATSAPP BUTTON vs API:
   - "WhatsApp button" or "contact via WhatsApp" is just a link button (+0 API hours).
   - Only include WhatsApp API if user explicitly asks for "WhatsApp Business API", "automated notifications", or "OTP".

4. OUTPUT ONLY TECHNICAL EFFORT UNITS:
   - Output hoursMin and hoursMax. Do NOT output currency prices.`;

    const responseSchema = {
      type: "OBJECT",
      properties: {
        project_title: {
          type: "STRING",
          description: "Accurate title matching the actual requirement (e.g. 'Personal Creator Portfolio', 'Informational Restaurant Website')."
        },
        archetype: {
          type: "STRING",
          enum: ["portfolio", "biz_website", "lms", "ecommerce", "web_app", "mobile_app", "saas_product", "ai_app"]
        },
        estimated_dev_hours_min: {
          type: "INTEGER",
          description: "Minimum realistic developer hours (e.g. 10 for simple portfolio, 22 for business site)."
        },
        estimated_dev_hours_max: {
          type: "INTEGER",
          description: "Maximum realistic developer hours (e.g. 16 for simple portfolio, 32 for business site)."
        },
        included_features: {
          type: "ARRAY",
          items: { type: "STRING" },
          description: "List of explicitly requested features only."
        },
        excluded_features: {
          type: "ARRAY",
          items: { type: "STRING" },
          description: "List of explicitly excluded features."
        },
        detected_features: {
          type: "ARRAY",
          items: {
            type: "STRING",
            enum: ["feat_auth", "feat_social", "feat_search", "feat_payments", "feat_wa_sms", "feat_ai_bot", "feat_storage"]
          }
        },
        architectural_summary: {
          type: "STRING",
          description: "1-sentence summary of the estimated developer effort and architecture."
        }
      },
      required: [
        "project_title",
        "archetype",
        "estimated_dev_hours_min",
        "estimated_dev_hours_max",
        "included_features",
        "excluded_features",
        "detected_features",
        "architectural_summary"
      ]
    };

    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const geminiRes = await fetch(geminiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Size the developer effort for:\n"${prompt}"` }] }],
        generationConfig: {
          response_mime_type: "application/json",
          response_schema: responseSchema,
          temperature: 0.1
        },
        systemInstruction: { parts: [{ text: systemPrompt }] }
      })
    });

    if (!geminiRes.ok) {
      const errDetails = await geminiRes.text();
      return res.status(geminiRes.status).json({ error: "Gemini API error", details: errDetails });
    }

    const geminiData = await geminiRes.json();
    const rawJsonText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsedClassification = JSON.parse(rawJsonText);

    return res.status(200).json(parsedClassification);

  } catch (error) {
    return res.status(500).json({ error: "Internal classification failure", message: error.message });
  }
};
