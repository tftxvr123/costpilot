// api/classify.js — Vercel Serverless Function (Node.js)
// Domain-Aware Semantic Extraction & Strict Exclusion Precedence

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
Classify the user's software project strictly based on their DOMAIN and ACTUAL VERBS/NOUNS.

CRITICAL RULES:
1. DOMAIN IDENTIFICATION FIRST:
   - Identify the primary domain before picking features:
     * Restaurant Ordering -> "Restaurant Ordering & Menu Web Platform" (Menu, Cart, Order Placement, Admin Order Management)
     * Informational Restaurant -> "Informational Restaurant Website" (Menu Showcase, Hours, Location, Contact)
     * Clinic Appointment Booking -> "Clinic Appointment Booking Platform" (Doctor Profiles, Time Slots, Appointment Booking)
     * Service Booking -> "Service Booking Platform" (Service Catalog, Booking Form, Admin Management)
     * Document Management -> "Document Management Web Application" (PDF Upload, Organization, Search, Download)
     * Online Learning -> "Online Learning Platform" (Course Browsing, Video Lectures, PDF Notes)
     * E-Commerce Catalog -> "E-Commerce Product Catalog Platform" (Product Browsing, Search, Wishlist)
   - Do NOT classify a project as AI, Mobile App, or E-Commerce unless explicitly supported.

2. NEVER INFER UNRELATED FEATURES:
   - Clinic/Doctor booking does NOT imply AI.
   - Document management does NOT imply AI.
   - Learning platform does NOT imply AI.
   - A simple WhatsApp button is NOT an SMS/API Gateway.
   - Service booking does NOT imply a Mobile App.
   - An admin order-management requirement is NOT admin product management.

3. STRICT EXCLUSION PRECEDENCE:
   Explicit exclusion > explicit inclusion > inferred requirement
   - If user says "no online payment" -> EXCLUDE online payment gateway completely.
   - If user says "no customer login" -> EXCLUDE customer accounts/login completely.
   - If user says "no admin panel" -> EXCLUDE admin panel completely.
   - If user says "no mobile app" -> EXCLUDE mobile app completely.
   - Never put an excluded feature in included_features!

4. PRICING INTEGRITY:
   - Output realistic developer hours. Excluded items must add 0 hours.
   - Output technical effort units only. Do NOT generate currency numbers.`;

    const responseSchema = {
      type: "OBJECT",
      properties: {
        project_title: {
          type: "STRING",
          description: "Accurate title matching the dominant workflow (e.g. 'Restaurant Ordering & Menu Web Platform', 'Clinic Appointment Booking Platform')."
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
          description: "Specific functional requirements derived from the domain (e.g. 'Restaurant Menu & Food Categories', 'Available Time Slots'). No generic mismatches!"
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
          description: "1-2 sentences explaining the technical architecture and how exclusions were respected."
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
        contents: [{ parts: [{ text: `Classify domain and requirements:\n"${prompt}"` }] }],
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
