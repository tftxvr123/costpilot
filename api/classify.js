// api/classify.js — Vercel Serverless Function (Node.js)
// Zero price hallucination: Classifies features & scale, returns structured JSON.

module.exports = async (req, res) => {
  // CORS Headers
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

    // Read hidden secret from Vercel Environment Variables
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: "GEMINI_API_KEY is not configured in Vercel Environment Variables." 
      });
    }

    // System instructions: strictly classify without generating currency or numbers
    const systemPrompt = `You are a senior software architect at Ezrah Innovations in Bangalore.
Analyze the user's project idea and classify it strictly into the requested JSON schema.
DO NOT generate prices, currency numbers, or hourly rates. Your job is ONLY semantic classification.
Evaluate the true scale:
- If they mention a small studio, single coaching branch, tuition class, or personal hobby, classify project_scale as "micro_local".
- If they mention a typical startup or business MVP, classify as "standard_mvp".
- If they mention multi-branch, high volume, or thousands of users, classify as "enterprise_scale".`;

    const responseSchema = {
      type: "OBJECT",
      properties: {
        archetype: {
          type: "STRING",
          enum: ["lms", "ecommerce", "web_app", "mobile_app", "saas_product", "portfolio", "biz_website", "ai_app"]
        },
        project_scale: {
          type: "STRING",
          enum: ["micro_local", "standard_mvp", "growth_scale", "enterprise_scale"]
        },
        video_strategy: {
          type: "STRING",
          enum: ["none", "zero_egress_embedded", "dedicated_stream"]
        },
        storage_requirement: {
          type: "STRING",
          enum: ["standard_assets", "document_pdf_repo", "high_volume_media"]
        },
        uiux_tier: {
          type: "STRING",
          enum: ["template", "custom", "premium"]
        },
        form_scale: {
          type: "STRING",
          enum: ["none", "1-3", "4-8", "9-15", "15+"]
        },
        detected_features: {
          type: "ARRAY",
          items: {
            type: "STRING",
            enum: ["feat_auth", "feat_social", "feat_search", "feat_payments", "feat_wa_sms", "feat_ai_bot", "feat_storage"]
          }
        },
        dynamic_scope: {
          type: "ARRAY",
          items: { type: "STRING" }
        },
        architectural_summary: {
          type: "STRING",
          description: "A 1-2 sentence technical summary explaining how you architected this to be cost-effective for their exact scale."
        }
      },
      required: [
        "archetype",
        "project_scale",
        "video_strategy",
        "storage_requirement",
        "uiux_tier",
        "form_scale",
        "detected_features",
        "architectural_summary"
      ]
    };

    // Call Google Gemini 1.5 Flash (Free Tier)
    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const geminiRes = await fetch(geminiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Project Idea to Classify: "${prompt}"` }] }],
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
      return res.status(geminiRes.status).json({ 
        error: "Google Gemini API error", 
        details: errDetails 
      });
    }

    const geminiData = await geminiRes.json();
    const rawJsonText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsedClassification = JSON.parse(rawJsonText);

    return res.status(200).json(parsedClassification);

  } catch (error) {
    return res.status(500).json({ 
      error: "Internal classification failure", 
      message: error.message 
    });
  }
};
