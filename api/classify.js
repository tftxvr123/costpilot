// api/classify.js — Vercel Serverless Function (Node.js)
// Enforces: Explicit exclusion > explicit inclusion > inferred requirement

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
Analyze the user's project idea.

CRITICAL PRECEDENCE RULE:
Explicit exclusion > explicit inclusion > inferred requirement

1. EXCLUSIONS OVERRIDE ALL INFERENCES:
   - If a feature is explicitly excluded, it must NEVER appear in included_features or detected_features!
   - Negative phrases include: "no", "not required", "without", "excluding", "don't need", "doesn't need", "not needed", "not included", "out of scope", "only", "just", "web only", "no customer login", "no payment", "no admin", "no cart", "no checkout", "no mobile app".

2. DO NOT CONFUSE ADMIN WITH CUSTOMER AUTHENTICATION:
   - "Admin can manage products. No customer login" -> Admin management is INCLUDED. Customer login/authentication is strictly EXCLUDED! Do NOT add "User Authentication & Accounts" or "feat_auth" simply because admin manages items.

3. EXAMPLES OF NEGATIVE OVERRIDES:
   - "No customer login" -> Customer authentication / registration / accounts MUST be in excluded_features and NEVER in included_features.
   - "No shopping cart, no checkout, no online payment" -> Cart, checkout, and payment gateway MUST be in excluded_features.
   - "No mobile app, web only" -> Mobile app MUST be in excluded_features.

4. PRICE INTEGRITY:
   - Excluded features must contribute 0 developer hours.
   - DO NOT generate currency numbers. Output technical effort units only.`;

    const responseSchema = {
      type: "OBJECT",
      properties: {
        project_title: {
          type: "STRING",
          description: "Tailored title reflecting the exact project scope."
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
          description: "List of explicitly requested features. MUST NOT contain anything the user excluded!"
        },
        excluded_features: {
          type: "ARRAY",
          items: { type: "STRING" },
          description: "List of explicitly excluded features (e.g. 'Customer Login & Accounts', 'Shopping Cart & Checkout', 'Online Payment')."
        },
        detected_features: {
          type: "ARRAY",
          items: {
            type: "STRING",
            enum: ["feat_auth", "feat_social", "feat_search", "feat_payments", "feat_wa_sms", "feat_ai_bot", "feat_storage"]
          },
          description: "Feature keys. MUST NOT contain feat_auth if customer login is excluded. MUST NOT contain feat_payments if payment is excluded."
        },
        architectural_summary: {
          type: "STRING",
          description: "A 1-2 sentence technical summary explaining how scope exclusions were strictly enforced."
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
        contents: [{ parts: [{ text: `Analyze and extract requirements with strict exclusion overrides:\n"${prompt}"` }] }],
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
