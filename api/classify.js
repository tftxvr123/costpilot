// api/classify.js — Vercel Serverless Function (Node.js)
// Dynamic Effort-Hours Classification: Zero Price Hallucination

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

    const systemPrompt = `You are a senior software architect at Ezrah Innovations.
Analyze the user's project idea and evaluate the REALISTIC ENGINEERING EFFORT (in hours) needed to build it.
DO NOT generate prices, currency numbers, or hourly rates. Output ONLY technical effort units.

Rules for Effort Sizing:
1. "static_content": Simple 1-page or 3-page portfolios, photography showcases, brochure sites with NO database. Requires 8 to 20 hours of work. monthly_infra_demand must be "zero_infra".
2. "lightweight_interactive": Filterable galleries, simple contact forms, basic blogs with light CMS. Requires 20 to 45 hours. monthly_infra_demand: "zero_infra" or "light_gateway".
3. "full_database_platform": LMS, SaaS, E-Commerce, portals with student/user login, payments, databases. Requires 45 to 100+ hours. monthly_infra_demand: "managed_cloud_app".

Feature Rule:
- ONLY include "feat_payments" if they explicitly mention paying money, fees, pricing, checkout, or selling. If they do not ask to collect money, DO NOT include "feat_payments".`;

    const responseSchema = {
      type: "OBJECT",
      properties: {
        project_title: {
          type: "STRING",
          description: "A tailored, professional title for their exact project (e.g. 'Photography Portfolio Showcase', 'Coaching Centre LMS')."
        },
        archetype: {
          type: "STRING",
          enum: ["portfolio", "biz_website", "lms", "ecommerce", "web_app", "mobile_app", "saas_product", "ai_app"]
        },
        architecture_type: {
          type: "STRING",
          enum: ["static_content", "lightweight_interactive", "full_database_platform"]
        },
        estimated_dev_hours_min: {
          type: "INTEGER",
          description: "Minimum realistic developer hours required (e.g. 8 for simple portfolio, 55 for LMS)."
        },
        estimated_dev_hours_max: {
          type: "INTEGER",
          description: "Maximum realistic developer hours required (e.g. 14 for simple portfolio, 85 for LMS)."
        },
        monthly_infra_demand: {
          type: "STRING",
          enum: ["zero_infra", "light_gateway", "managed_cloud_app"]
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
          description: "A 1-sentence technical explanation of the effort sizing and architecture class."
        }
      },
      required: [
        "project_title",
        "archetype",
        "architecture_type",
        "estimated_dev_hours_min",
        "estimated_dev_hours_max",
        "monthly_infra_demand",
        "detected_features",
        "architectural_summary"
      ]
    };

    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const geminiRes = await fetch(geminiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `User Project Description: "${prompt}"` }] }],
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
