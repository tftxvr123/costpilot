// api/classify.js — Vercel Serverless Function (Node.js)
// Domain-Driven Semantic Requirement Extraction & Strict Exclusion Enforcement

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
Classify the user's project strictly based on their ACTUAL WORKFLOW, DOMAIN, and NOUNS/VERBS.

RULE 1: DOMAIN CLASSIFICATION RULES
- Home, About, Services, Gallery, Contact, portfolio -> "Business Website" or "Personal Creator Portfolio"
- Menu, food images, hours, contact without ordering -> "Informational Restaurant Website"
- Menu, cart, order placement, order history -> "Restaurant Ordering & Menu Web Platform"
- Doctor profiles, patient registration, time slots, appointments -> "Clinic Appointment Booking Platform"
- Services, booking requests, booking status -> "Service Booking Platform"
- PDFs, files, folders, upload, search, download -> "Document Management Web Application"
- Courses, video lectures, PDF resources, course management -> "Online Learning Platform"
- Workspaces, projects, tasks, task assignments -> "SaaS Task Management Platform"
- AI-generated summaries, AI responses, LLM processing -> "AI Web Application"
- Products, wishlist, catalog without cart/checkout/payment -> "E-Commerce Product Catalog Platform"
- Products, cart, checkout, order placement -> "E-Commerce Ordering Platform"
- Multiple service providers, listings, bookings, marketplace administration -> "Service Marketplace Platform"

STRICT CLASSIFICATION PROHIBITIONS:
- NEVER classify a web app as a mobile app unless user explicitly requests Android, iOS or a native mobile app.
- NEVER classify a project as AI unless AI/LLM functionality is explicitly requested.
- NEVER classify a project as document management unless document/file repository management is explicitly requested (do NOT trigger on learning sites with PDF notes!).
- NEVER classify a project as a business website when it clearly contains a transactional workflow (booking, ordering, learning, SaaS tasks, or marketplace).

RULE 2: SEPARATE RELATED BUT DIFFERENT FEATURES
- Customer Login != Admin Login. "Admin can manage products" does NOT imply customer accounts.
- Cart != Checkout. "Cart but no checkout" -> Include cart, exclude checkout.
- Order Placement != Online Payment. "Order placement with cash/WhatsApp, no online payment" -> Include order placement, exclude payment gateway.
- WhatsApp Button != WhatsApp API. A simple WhatsApp button is a contact link, NOT an SMS/API gateway.
- Responsive Website != Mobile Application.

RULE 3: STRICT EXCLUSION PRECEDENCE (Explicit Exclusion > Explicit Inclusion > Inferred Requirement)
- If user says "no patient login" or "no customer login" -> EXCLUDE customer accounts completely.
- If user says "no online payment" -> EXCLUDE online payment gateway completely.
- If user says "no admin dashboard" -> EXCLUDE admin dashboard completely.
- If user says "no mobile app" -> EXCLUDE mobile app completely.
- Excluded features must NEVER appear in included_features.

RULE 4: PRECISE INCLUSIONS LIST
List the actual functional capabilities (e.g. for restaurant ordering: "Restaurant Menu & Food Categories", "Shopping Cart", "Order Placement Workflow", "Admin Order Management"). Do NOT collapse multiple features into one vague generic label. Output technical effort units only. Do NOT generate currency numbers.`;

    const responseSchema = {
      type: "OBJECT",
      properties: {
        project_title: {
          type: "STRING",
          description: "Dominant workflow project name (e.g. 'Restaurant Ordering & Menu Web Platform', 'Clinic Appointment Booking Platform', 'SaaS Task Management Platform')."
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
          description: "Specific functional requirements derived from the domain. Never include excluded items."
        },
        excluded_features: {
          type: "ARRAY",
          items: { type: "STRING" },
          description: "Explicitly excluded features."
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
          description: "1-2 sentence technical summary explaining domain alignment and exclusion enforcement."
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
        contents: [{ parts: [{ text: `Classify domain, extract explicit inclusions, and strictly enforce exclusions:\n"${prompt}"` }] }],
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
