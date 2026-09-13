// api/classify.js — Vercel Serverless Function (Node.js)
// Intelligent Requirement & Scope-Exclusion Analyzer

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

    const systemPrompt = `You are a senior software architect and technical scoping expert at Ezrah Innovations.
Analyze the user's project idea with extreme attention to INCLUSIONS vs EXCLUSIONS.

CRITICAL RULES FOR EXTRACTION:
1. DISTINGUISH REQUIREMENTS FROM EXCLUSIONS:
   - Explicit negative statements must NEVER be interpreted as included features!
   - Examples:
     * "Restaurant website with menu and cart, no online payment" -> menu: INCLUDED, cart: INCLUDED, payment gateway: EXCLUDED.
     * "Website with login, but no admin panel" -> login: INCLUDED, admin: EXCLUDED.
     * "No mobile app, web only" -> mobile app: EXCLUDED, web: INCLUDED.
     * "No AI features" -> AI: EXCLUDED.
   - Negative trigger phrases: "no", "not required", "without", "excluding", "don't need", "doesn't need", "not needed", "not included", "out of scope", "only", "just", "web only", "no payment", "no admin", "no login", "no app".

2. DO NOT ASSUME UNMENTIONED FEATURES:
   - "Simple restaurant website with menu and contact" -> DO NOT assume online ordering, cart, payment, login, admin panel, delivery tracking.
   - "Basic business website with 5 pages" -> DO NOT assume CMS, admin dashboard, authentication, or payment gateway.

3. PREVENT PRICE COMPRESSION:
   - Accurately estimate realistic developer hours without compressing everything into 50 hours:
     * Very simple portfolio / landing page: 15–30 hours.
     * Basic business website (5-8 pages): 35–60 hours.
     * Business website + Admin/CMS / Restaurant ordering (no payment): 60–100 hours.
     * Small to medium web application / MVP: 100–180 hours.
     * LMS / SaaS platform / Complex portal: 180–350+ hours.
     * Complex marketplace / Multi-vendor: 320–550+ hours.
   - DO NOT generate currency prices. Output technical effort units only.`;

    const responseSchema = {
      type: "OBJECT",
      properties: {
        project_title: {
          type: "STRING",
          description: "A professional tailored title reflecting the exact project scope."
        },
        archetype: {
          type: "STRING",
          enum: ["portfolio", "biz_website", "lms", "ecommerce", "web_app", "mobile_app", "saas_product", "ai_app"]
        },
        platform_scope: {
          type: "STRING",
          enum: ["website_only", "web_application", "mobile_app_only", "cross_platform_web_mobile"]
        },
        has_admin_panel: { type: "BOOLEAN" },
        user_roles_count: { type: "INTEGER" },
        estimated_dev_hours_min: { type: "INTEGER" },
        estimated_dev_hours_max: { type: "INTEGER" },
        monthly_infra_demand: {
          type: "STRING",
          enum: ["zero_infra", "light_gateway", "managed_cloud_app"]
        },
        included_features: {
          type: "ARRAY",
          items: { type: "STRING" },
          description: "List of explicitly requested features."
        },
        excluded_features: {
          type: "ARRAY",
          items: { type: "STRING" },
          description: "List of explicitly excluded or rejected features (e.g. 'No Online Payment', 'No Admin Panel')."
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
          description: "A 1-2 sentence technical summary explaining what is included and how exclusions were respected."
        }
      },
      required: [
        "project_title",
        "archetype",
        "platform_scope",
        "has_admin_panel",
        "user_roles_count",
        "estimated_dev_hours_min",
        "estimated_dev_hours_max",
        "monthly_infra_demand",
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
        contents: [{ parts: [{ text: `Scrutinize this user project description:\n"${prompt}"` }] }],
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
