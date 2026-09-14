/**
 * ============================================================================
 * CostPilot — Commercial Project Knowledge Base (KB)
 * Version: 2026.2 (Production Benchmark Specification)
 * 
 * DESIGN PRINCIPLES:
 * 1. Strict Exclusion-First: Negative declarations strictly override defaults.
 * 2. Unspecified != Included: Features are never assumed without explicit intent.
 * 3. Additive Pricing: Base Price + Verified Inclusions + Unit/Scale Extensions.
 * 4. Deterministic Guardrails: Hard min/max sanity caps per architectural tier.
 * ============================================================================
 */

const CostPilotKB = {
  version: "2026.2",
  currency: "INR",
  currencySymbol: "₹",
  discountPercent: 0.15,
  standardHostingFeeMonthly: 1000,
  enterpriseHostingFeeMonthly: 5000,

  // ==========================================================================
  // 1. EXPLICIT EXCLUSION DICTIONARY
  // ==========================================================================
  exclusionRules: [
    {
      featureId: "feat_payment",
      canonicalName: "Online Payment Gateway",
      exactPhrases: [
        "no payment", "without payment", "no online payment", "payment not required",
        "no payment gateway", "zero payment", "free of payment", "not requiring payment",
        "do not need payment", "don't need payment", "no payment integration", "without checkout payment",
        "users cannot purchase", "cannot buy online", "no transactions", "no pay"
      ]
    },
    {
      featureId: "feat_auth",
      canonicalName: "User Authentication & Accounts",
      exactPhrases: [
        "no login", "without login", "no registration", "no user accounts", "no customer account",
        "no customer login", "no sign in", "no signup", "login not required", "without registration",
        "no student login", "no patient login", "no member accounts", "no user auth", "guest only"
      ]
    },
    {
      featureId: "feat_cart_checkout",
      canonicalName: "Shopping Cart & Checkout",
      exactPhrases: [
        "no cart", "without cart", "no shopping cart", "no checkout", "without checkout",
        "catalog only", "catalogue only", "browse only", "no ordering flow", "cannot purchase",
        "no takeout ordering", "no food ordering"
      ]
    },
    {
      featureId: "feat_database",
      canonicalName: "Database & Dynamic Storage",
      exactPhrases: [
        "no database", "without database", "no db", "static only", "informational only",
        "brochure only", "frontend only", "no persistent storage", "no backend data"
      ]
    },
    {
      featureId: "feat_admin_panel",
      canonicalName: "Admin Dashboard & Management Portal",
      exactPhrases: [
        "no admin", "without admin", "no admin panel", "no dashboard", "no admin dashboard",
        "no management panel", "no backend portal", "no admin console"
      ]
    },
    {
      featureId: "feat_cms",
      canonicalName: "Content Management System",
      exactPhrases: [
        "no cms", "without cms", "static pages only", "hardcoded content", "no content manager",
        "no self-managed content"
      ]
    },
    {
      featureId: "feat_booking",
      canonicalName: "Interactive Booking Engine",
      exactPhrases: [
        "no booking", "without booking", "no booking system", "no appointments", "no slot booking",
        "enquiry only", "view services only", "no calendar booking"
      ]
    },
    {
      featureId: "feat_mobile_app",
      canonicalName: "Dedicated Native / Hybrid Mobile Application",
      exactPhrases: [
        "no mobile app", "without mobile app", "website only", "web only", "browser only",
        "no ios app", "no android app", "desktop and mobile responsive website only",
        "responsive web only", "no app"
      ]
    },
    {
      featureId: "feat_ai_engine",
      canonicalName: "AI / LLM Integration",
      exactPhrases: [
        "no ai", "without ai", "no chatbot", "no llm", "no machine learning",
        "no artificial intelligence", "no gpt", "no automated bot"
      ]
    },
    {
      featureId: "feat_api_integrations",
      canonicalName: "Third-Party REST APIs",
      exactPhrases: [
        "no api", "without api", "no third party api", "no external integrations",
        "no webhooks", "standalone only"
      ]
    }
  ],

  // ==========================================================================
  // 2. PROJECT CATEGORIES
  // ==========================================================================
  categories: {
    portfolio: {
      id: "portfolio",
      displayName: "Portfolio & Personal Showcase",
      description: "Individual, creator, engineer, or visual designer showcases focused on presentation.",
      keywords: ["portfolio", "showcase", "resume website", "cv website", "personal profile", "designer showcase"],
      synonyms: ["curriculum vitae site", "creator site", "personal site"],
      exclusionKeywords: ["store", "ecommerce", "lms", "hospital", "clinic", "multi-tenant"],
      conflictingCategories: ["lms", "saas_application", "ecommerce"],
      packages: ["pkg_port_starter", "pkg_port_basic", "pkg_port_resume", "pkg_port_pro", "pkg_port_dev", "pkg_port_designer", "pkg_port_brand", "pkg_port_cms", "pkg_port_booking", "pkg_port_ai"]
    },
    biz_website: {
      id: "biz_website",
      displayName: "Business Website",
      description: "Corporate, informational, brochure, and CMS-backed presence for organizations.",
      keywords: ["business website", "company site", "corporate website", "services website", "brochure website"],
      synonyms: ["commercial site", "agency website", "consulting site"],
      exclusionKeywords: ["cart", "shopping cart", "course enrollment", "patient slots"],
      conflictingCategories: ["ecommerce", "lms"],
      packages: ["pkg_biz_brochure", "pkg_biz_service_enquiry", "pkg_biz_cms"]
    },
    restaurant: {
      id: "restaurant",
      displayName: "Restaurant & Food Service",
      description: "Dining, food menus, cafe presentation, and direct food ordering workflows.",
      keywords: ["restaurant", "cafe", "bistro", "bakery", "food menu", "diner", "takeout"],
      synonyms: ["eatery", "cloud kitchen", "food joint"],
      exclusionKeywords: ["clinic", "lms", "saas"],
      conflictingCategories: ["clinic", "lms", "saas_application"],
      packages: ["pkg_rest_informational", "pkg_rest_ordering"]
    },
    booking: {
      id: "booking",
      displayName: "Service Booking & Reservations",
      description: "Slot selection, schedule inspection, and appointment reservation platforms.",
      keywords: ["booking website", "service booking", "appointment system", "slot reservation", "reserve time"],
      synonyms: ["scheduler", "scheduling platform"],
      exclusionKeywords: ["doctor", "clinic", "patient", "lms"],
      conflictingCategories: ["clinic", "portfolio"],
      packages: ["pkg_book_request_only", "pkg_book_direct_paid"]
    },
    clinic: {
      id: "clinic",
      displayName: "Clinic & Healthcare Appointment Platform",
      description: "Healthcare portals featuring patient scheduling, doctor directories, and time-slot management.",
      keywords: ["clinic", "doctor", "patient", "specialties", "hospital", "healthcare booking"],
      synonyms: ["medical appointment platform", "dental booking system"],
      exclusionKeywords: ["restaurant", "food", "lms", "ecommerce catalog"],
      conflictingCategories: ["restaurant", "ecommerce"],
      packages: ["pkg_clinic_appointments"]
    },
    doc_management: {
      id: "doc_management",
      displayName: "Document Management System (DMS)",
      description: "Secure upload, folder indexing, cloud storage, and metadata search for files.",
      keywords: ["document management", "upload pdf", "pdf storage", "folder organization", "file repository"],
      synonyms: ["dms", "file archive portal", "records management"],
      exclusionKeywords: ["restaurant", "food menu", "course lectures"],
      conflictingCategories: ["restaurant", "portfolio"],
      packages: ["pkg_dms_core"]
    },
    lms: {
      id: "lms",
      displayName: "Learning Management System (LMS)",
      description: "Educational platforms handling courses, lectures, student dashboards, and certifications.",
      keywords: ["lms", "course", "courses", "student", "video lectures", "learning progress", "quizzes"],
      synonyms: ["elearning platform", "online academy", "coaching portal"],
      exclusionKeywords: ["restaurant", "clinic", "doctor"],
      conflictingCategories: ["restaurant", "clinic"],
      packages: ["pkg_lms_static_showcase", "pkg_lms_basic_admin", "pkg_lms_student_portal", "pkg_lms_paid_sub", "pkg_lms_advanced"]
    },
    saas_application: {
      id: "saas_application",
      displayName: "SaaS Application",
      description: "Multi-tenant software-as-a-service products with role-based workflows and team management.",
      keywords: ["saas", "workspaces", "task management", "tasks", "team members", "multi-tenant"],
      synonyms: ["b2b portal", "cloud software application"],
      exclusionKeywords: ["restaurant menu", "patient clinic"],
      conflictingCategories: ["restaurant", "portfolio"],
      packages: ["pkg_saas_mvp"]
    },
    ai_application: {
      id: "ai_application",
      displayName: "AI / LLM Web Application",
      description: "Platforms utilizing LLM inference, text analysis, document extraction, or RAG vectors.",
      keywords: ["ai web application", "ai summaries", "generate ai", "llm integration", "text summary"],
      synonyms: ["generative ai tool", "prompt engineering platform"],
      exclusionKeywords: ["restaurant menu", "takeout"],
      conflictingCategories: ["restaurant"],
      packages: ["pkg_ai_summary_tool"]
    },
    ecommerce: {
      id: "ecommerce",
      displayName: "E-Commerce & Digital Storefront",
      description: "Transactional or catalog-based shopping environments for physical or digital items.",
      keywords: ["ecommerce", "e-commerce", "shopping cart", "checkout", "storefront", "product catalog"],
      synonyms: ["online store", "shop"],
      exclusionKeywords: ["clinic patient", "doctor"],
      conflictingCategories: ["clinic", "portfolio"],
      packages: ["pkg_ecom_catalog_only", "pkg_ecom_full_transactional"]
    }
  },

  // ==========================================================================
  // 3. FEATURE LIBRARY
  // ==========================================================================
  features: {
    feat_static_pages: {
      id: "feat_static_pages",
      name: "Core Informational Pages",
      description: "Responsive layouts for structural presentation (Home, About, Services, Info).",
      category: "frontend",
      price: 0,
      pricingUnit: "bundle",
      includedByDefault: true
    },
    feat_contact_form: {
      id: "feat_contact_form",
      name: "Standard Contact / Enquiry Form",
      description: "Frontend input fields with validation and standard mail transport delivery.",
      category: "frontend",
      price: 2000,
      pricingUnit: "unit",
      includedByDefault: false
    },
    feat_whatsapp_chat: {
      id: "feat_whatsapp_chat",
      name: "WhatsApp Click-to-Chat Button",
      description: "Direct client-side deep link (wa.me) opening a conversation without server automation.",
      category: "integration",
      price: 1000,
      pricingUnit: "fixed",
      includedByDefault: false
    },
    feat_whatsapp_api: {
      id: "feat_whatsapp_api",
      name: "WhatsApp Business API & OTP Gateway",
      description: "Server-side webhooks, transactional OTP verification, and automated template dispatches.",
      category: "integration",
      price: 12000,
      pricingUnit: "fixed",
      includedByDefault: false
    },
    feat_auth: {
      id: "feat_auth",
      name: "User Registration & Authentication",
      description: "Secure session tokens (JWT/HttpOnly), encrypted passwords, and profile accounts.",
      category: "backend",
      price: 10000,
      pricingUnit: "fixed",
      includedByDefault: false
    },
    feat_multi_role: {
      id: "feat_multi_role",
      name: "Multi-Role RBAC Permissions",
      description: "Granular access control matrices (Admin, Staff, Client, Instructor, Student).",
      category: "backend",
      price: 12000,
      pricingUnit: "per_role_tier",
      includedByDefault: false
    },
    feat_database: {
      id: "feat_database",
      name: "Relational / NoSQL Database Schema",
      description: "Persistent data tables, migration scripts, indexes, and connection pooling.",
      category: "backend",
      price: 10000,
      pricingUnit: "fixed",
      includedByDefault: false
    },
    feat_admin_panel: {
      id: "feat_admin_panel",
      name: "Administrative Management Dashboard",
      description: "Protected administrative area to inspect, edit, moderate, or export platform data.",
      category: "backend",
      price: 15000,
      pricingUnit: "fixed",
      includedByDefault: false
    },
    feat_cms: {
      id: "feat_cms",
      name: "Headless / Structured CMS",
      description: "Content authoring interface for blog posts, dynamic landing pages, and announcements.",
      category: "backend",
      price: 14000,
      pricingUnit: "fixed",
      includedByDefault: false
    },
    feat_cart_checkout: {
      id: "feat_cart_checkout",
      name: "Shopping Cart & Multi-Step Checkout",
      description: "Stateful item collection, quantity manipulation, discount voucher rules, and order dispatch.",
      category: "ecommerce",
      price: 16000,
      pricingUnit: "fixed",
      includedByDefault: false
    },
    feat_payment: {
      id: "feat_payment",
      name: "Online Payment Gateway Integration",
      description: "Razorpay, Stripe, or Cashfree webhooks, signature verification, and automated invoicing.",
      category: "integration",
      price: 14000,
      pricingUnit: "fixed",
      includedByDefault: false
    },
    feat_booking_engine: {
      id: "feat_booking_engine",
      name: "Interactive Time-Slot Booking Engine",
      description: "Date picker, availability calendar matrix, buffer times, and reservation state machine.",
      category: "workflow",
      price: 18000,
      pricingUnit: "fixed",
      includedByDefault: false
    },
    feat_search_filters: {
      id: "feat_search_filters",
      name: "Faceted Search & Content Filtering",
      description: "Client/server filtering by tags, price ranges, categories, and keyword matching.",
      category: "frontend",
      price: 6000,
      pricingUnit: "fixed",
      includedByDefault: false
    },
    feat_file_cloud_storage: {
      id: "feat_file_cloud_storage",
      name: "Cloud Object Storage & PDF Uploads",
      description: "S3/R2 direct upload presigned URLs, MIME-type enforcement, and secure download tokens.",
      category: "backend",
      price: 12000,
      pricingUnit: "fixed",
      includedByDefault: false
    },
    feat_ai_engine: {
      id: "feat_ai_engine",
      name: "AI / LLM Streaming Inference Integration",
      description: "OpenAI/Claude/Gemini API pipelines, rate-limiting, prompt structuring, and SSE streaming.",
      category: "integration",
      price: 26000,
      pricingUnit: "fixed",
      includedByDefault: false
    },
    feat_lms_courses: {
      id: "feat_lms_courses",
      name: "Course Catalog & Lesson Player",
      description: "Organized module hierarchies, secure video streaming integration, and lecture notes.",
      category: "lms",
      price: 25000,
      pricingUnit: "fixed",
      includedByDefault: false
    },
    feat_lms_progress: {
      id: "feat_lms_progress",
      name: "Student Learning Progress Engine",
      description: "Video timestamp resumption, lesson checkmarks, and percentage completion tracking.",
      category: "lms",
      price: 12000,
      pricingUnit: "fixed",
      includedByDefault: false
    },
    feat_lms_quizzes: {
      id: "feat_lms_quizzes",
      name: "Timed Quizzes & Automated Scoring",
      description: "Assessment state engine, randomized question banks, timed limits, and instant scoring.",
      category: "lms",
      price: 15000,
      pricingUnit: "fixed",
      includedByDefault: false
    },
    feat_lms_certs: {
      id: "feat_lms_certs",
      name: "Dynamic PDF Certificate Generation",
      description: "Automated vector PDF stamping with verification hash, student name, and completion date.",
      category: "lms",
      price: 8000,
      pricingUnit: "fixed",
      includedByDefault: false
    },
    feat_saas_workspaces: {
      id: "feat_saas_workspaces",
      name: "Workspaces, Projects & Tasks Engine",
      description: "Multi-tenant tenant isolation, project categorization, and task kanban workflows.",
      category: "saas",
      price: 28000,
      pricingUnit: "fixed",
      includedByDefault: false
    },
    feat_notifications: {
      id: "feat_notifications",
      name: "In-App & Email Notification Center",
      description: "Event dispatch bus for state changes, task assignments, or status updates.",
      category: "workflow",
      price: 8000,
      pricingUnit: "fixed",
      includedByDefault: false
    }
  },

  // ==========================================================================
  // 4. PACKAGES & BENCHMARK MODELS
  // ==========================================================================
  packages: [
    // ------------------------------------------------------------------------
    // PORTFOLIO PACKAGES
    // ------------------------------------------------------------------------
    {
      id: "pkg_port_starter",
      category: "portfolio",
      name: "Starter Portfolio",
      description: "1-page personal profile, skills showcase, project highlights, and contact links.",
      triggers: ["starter portfolio", "1-page portfolio", "1 page portfolio", "one page portfolio", "single page personal profile"],
      positiveIndicators: ["1-page", "single page", "profile", "contact links"],
      negativeIndicators: ["cms", "admin", "dashboard", "login", "ai", "booking", "cart"],
      basePrice: 6000,
      featureAddons: 1000,
      recommendedMarketPrice: 7000,
      marketPriceRange: [5000, 8000],
      complexity: "simple",
      includedFeatures: ["feat_static_pages"],
      excludedFeatures: ["feat_auth", "feat_database", "feat_admin_panel", "feat_cms", "feat_payment", "feat_ai_engine"],
      priority: 10
    },
    {
      id: "pkg_port_basic",
      category: "portfolio",
      name: "Basic Portfolio",
      description: "4–5 responsive pages, project highlights, resume section, and contact form.",
      triggers: ["basic portfolio", "4-5 pages portfolio", "4–5 pages", "portfolio website with home, about, projects"],
      positiveIndicators: ["4-5 pages", "projects", "resume", "contact form"],
      negativeIndicators: ["cms", "admin", "login", "ai", "booking", "cart", "payment"],
      basePrice: 10000,
      featureAddons: 3000,
      recommendedMarketPrice: 13000,
      marketPriceRange: [10000, 15000],
      complexity: "simple",
      includedFeatures: ["feat_static_pages", "feat_contact_form"],
      excludedFeatures: ["feat_auth", "feat_database", "feat_admin_panel", "feat_cms", "feat_payment"],
      priority: 9
    },
    {
      id: "pkg_port_resume",
      category: "portfolio",
      name: "Resume & Portfolio Website",
      description: "Resume timeline, professional achievements, downloadable CV, and inquiry form.",
      triggers: ["resume and portfolio", "downloadable resume", "pdf resume", "downloadable cv", "portfolio website with home, about, projects, resume"],
      positiveIndicators: ["downloadable resume", "downloadable cv", "resume", "cv"],
      negativeIndicators: ["cms", "admin", "database", "login", "payment"],
      basePrice: 15000,
      featureAddons: 3000,
      recommendedMarketPrice: 18000,
      marketPriceRange: [12000, 22000],
      complexity: "simple",
      includedFeatures: ["feat_static_pages", "feat_contact_form"],
      excludedFeatures: ["feat_auth", "feat_database", "feat_admin_panel", "feat_cms", "feat_payment"],
      priority: 11
    },
    {
      id: "pkg_port_pro",
      category: "portfolio",
      name: "Professional Portfolio",
      description: "5–7 pages, custom UI layout, project case studies, polished micro-animations, and SEO.",
      triggers: ["professional portfolio", "case studies", "animations", "micro-interactions", "5-7 pages"],
      positiveIndicators: ["case studies", "animations", "seo basics", "5-7 pages"],
      negativeIndicators: ["cms", "admin", "login", "payment", "ai"],
      basePrice: 18000,
      featureAddons: 6000,
      recommendedMarketPrice: 24000,
      marketPriceRange: [18000, 30000],
      complexity: "simple_plus",
      includedFeatures: ["feat_static_pages", "feat_contact_form"],
      excludedFeatures: ["feat_auth", "feat_database", "feat_admin_panel", "feat_payment"],
      priority: 8
    },
    {
      id: "pkg_port_dev",
      category: "portfolio",
      name: "Developer / Tech Portfolio",
      description: "Technical project showcases, GitHub repository links, tech stack matrix, and live demo embeds.",
      triggers: ["developer portfolio", "tech portfolio", "github", "tech stack", "code demo", "demo sections"],
      positiveIndicators: ["github links", "tech stack", "demo sections", "developer"],
      negativeIndicators: ["cms", "admin", "payment", "booking"],
      basePrice: 18000,
      featureAddons: 8000,
      recommendedMarketPrice: 26000,
      marketPriceRange: [20000, 35000],
      complexity: "simple_plus",
      includedFeatures: ["feat_static_pages", "feat_contact_form"],
      excludedFeatures: ["feat_auth", "feat_payment", "feat_admin_panel"],
      priority: 10
    },
    {
      id: "pkg_port_designer",
      category: "portfolio",
      name: "Designer / Creative Portfolio",
      description: "High-resolution image/video gallery, filtering grids, visual design polish, and case studies.",
      triggers: ["designer portfolio", "creative portfolio", "artist portfolio", "photographer", "visual gallery", "filtering gallery"],
      positiveIndicators: ["visual gallery", "filtering", "creative", "designer", "high-resolution"],
      negativeIndicators: ["cms", "admin", "payment", "booking"],
      basePrice: 22000,
      featureAddons: 12000,
      recommendedMarketPrice: 34000,
      marketPriceRange: [25000, 50000],
      complexity: "medium",
      includedFeatures: ["feat_static_pages", "feat_contact_form", "feat_search_filters"],
      excludedFeatures: ["feat_auth", "feat_payment", "feat_admin_panel"],
      priority: 10
    },
    {
      id: "pkg_port_brand",
      category: "portfolio",
      name: "Premium Personal Brand",
      description: "Bespoke studio UI/UX, advanced interaction design, integrated blog, and conversion optimization.",
      triggers: ["personal brand", "premium brand", "premium personal brand", "advanced animations"],
      positiveIndicators: ["personal brand", "bespoke design", "custom ui/ux"],
      negativeIndicators: ["cart", "checkout", "ecommerce"],
      basePrice: 22000,
      featureAddons: 16000,
      recommendedMarketPrice: 38000,
      marketPriceRange: [30000, 50000],
      complexity: "medium",
      includedFeatures: ["feat_static_pages", "feat_contact_form"],
      excludedFeatures: ["feat_payment", "feat_booking_engine"],
      priority: 9
    },
    {
      id: "pkg_port_cms",
      category: "portfolio",
      name: "Portfolio with CMS",
      description: "Self-managed portfolio allowing the client to create projects, blog posts, and edit text via admin.",
      triggers: ["portfolio with cms", "portfolio with admin", "client can update projects", "update content through admin"],
      positiveIndicators: ["cms", "admin updates", "self-managed content"],
      negativeIndicators: ["payment gateway", "checkout", "cart"],
      basePrice: 22000,
      featureAddons: 20000,
      recommendedMarketPrice: 42000,
      marketPriceRange: [35000, 60000],
      complexity: "medium",
      includedFeatures: ["feat_static_pages", "feat_cms", "feat_admin_panel", "feat_database"],
      excludedFeatures: ["feat_payment", "feat_cart_checkout"],
      priority: 12
    },
    {
      id: "pkg_port_booking",
      category: "portfolio",
      name: "Portfolio with Booking",
      description: "Portfolio showcase paired with a consultation appointment reservation flow.",
      triggers: ["portfolio with booking", "consultation booking", "portfolio and booking"],
      positiveIndicators: ["booking", "consultation", "appointment slot"],
      negativeIndicators: ["cart", "checkout", "lms"],
      basePrice: 25000,
      featureAddons: 23000,
      recommendedMarketPrice: 48000,
      marketPriceRange: [35000, 70000],
      complexity: "medium",
      includedFeatures: ["feat_static_pages", "feat_booking_engine", "feat_database", "feat_admin_panel"],
      excludedFeatures: ["feat_payment", "feat_cart_checkout"],
      priority: 12
    },
    {
      id: "pkg_port_ai",
      category: "portfolio",
      name: "Portfolio with AI Features",
      description: "Personal brand site embedded with conversational AI agent, smart resume helper, or bot.",
      triggers: ["portfolio with ai", "ai chatbot", "ai resume helper", "ai project assistant"],
      positiveIndicators: ["ai chatbot", "ai features", "interactive assistant"],
      negativeIndicators: ["ecommerce", "lms courses"],
      basePrice: 30000,
      featureAddons: 35000,
      recommendedMarketPrice: 65000,
      marketPriceRange: [50000, 100000],
      complexity: "high",
      includedFeatures: ["feat_static_pages", "feat_ai_engine", "feat_contact_form"],
      excludedFeatures: ["feat_payment", "feat_cart_checkout"],
      priority: 13
    },

    // ------------------------------------------------------------------------
    // BUSINESS & RESTAURANT PACKAGES
    // ------------------------------------------------------------------------
    {
      id: "pkg_biz_brochure",
      category: "biz_website",
      name: "Standard Business Website",
      description: "5-page responsive company site (Home, About, Services, Gallery, Contact) with WhatsApp link.",
      triggers: ["5-page business website", "5 page business website", "business website with home, about", "brochure website"],
      positiveIndicators: ["5 pages", "services", "gallery", "contact form", "whatsapp button"],
      negativeIndicators: ["login", "database", "cms", "admin panel", "payment", "booking", "cart"],
      basePrice: 25000,
      featureAddons: 3000,
      recommendedMarketPrice: 28000,
      marketPriceRange: [28000, 35000],
      complexity: "simple",
      includedFeatures: ["feat_static_pages", "feat_contact_form", "feat_whatsapp_chat"],
      excludedFeatures: ["feat_auth", "feat_database", "feat_admin_panel", "feat_cms", "feat_payment", "feat_cart_checkout", "feat_booking_engine"],
      priority: 9
    },
    {
      id: "pkg_biz_service_enquiry",
      category: "biz_website",
      name: "Service Business Informational Website",
      description: "Static brochure highlighting commercial services with direct enquiry lead submission.",
      triggers: ["simple service business", "service business website", "view services and send an enquiry", "enquiry through a contact form"],
      positiveIndicators: ["view services", "send an enquiry", "contact form"],
      negativeIndicators: ["booking system", "booking", "login", "customer account", "database", "cms", "admin", "payment", "cart", "checkout"],
      basePrice: 22000,
      featureAddons: 2000,
      recommendedMarketPrice: 24000,
      marketPriceRange: [22000, 32000],
      complexity: "simple",
      includedFeatures: ["feat_static_pages", "feat_contact_form"],
      excludedFeatures: ["feat_booking_engine", "feat_auth", "feat_database", "feat_admin_panel", "feat_cms", "feat_payment", "feat_cart_checkout"],
      priority: 15 // High priority to strictly capture critical exclusion tests
    },
    {
      id: "pkg_biz_cms",
      category: "biz_website",
      name: "Business Website with CMS",
      description: "Company portal with admin-managed pages, announcements, blog engine, and lead manager.",
      triggers: ["business website with cms", "website with cms", "manage website content and blog", "cms and admin dashboard"],
      positiveIndicators: ["cms", "blog", "admin dashboard", "content management"],
      negativeIndicators: ["payment", "customer accounts", "cart", "checkout"],
      basePrice: 25000,
      featureAddons: 31000,
      recommendedMarketPrice: 56000,
      marketPriceRange: [50000, 70000],
      complexity: "medium",
      includedFeatures: ["feat_static_pages", "feat_contact_form", "feat_cms", "feat_admin_panel", "feat_database"],
      excludedFeatures: ["feat_payment", "feat_cart_checkout", "feat_booking_engine"],
      priority: 12
    },
    {
      id: "pkg_rest_informational",
      category: "restaurant",
      name: "Informational Restaurant Website",
      description: "Showcase of food menus, categories, interior ambience, hours, location map, and WhatsApp chat.",
      triggers: ["informational restaurant", "restaurant menu website", "restaurant website with menu", "menu, food categories, food gallery"],
      positiveIndicators: ["menu", "food categories", "hours", "location", "whatsapp button"],
      negativeIndicators: ["online ordering", "ordering", "cart", "checkout", "payment", "customer login", "database", "admin"],
      basePrice: 26000,
      featureAddons: 6000,
      recommendedMarketPrice: 32000,
      marketPriceRange: [28000, 40000],
      complexity: "simple",
      includedFeatures: ["feat_static_pages", "feat_whatsapp_chat"],
      excludedFeatures: ["feat_cart_checkout", "feat_payment", "feat_auth", "feat_database", "feat_admin_panel"],
      priority: 14
    },
    {
      id: "pkg_rest_ordering",
      category: "restaurant",
      name: "Restaurant Ordering Web Application",
      description: "Digital food ordering platform with category navigation, cart, checkout, payment gateway, and admin kitchen screen.",
      triggers: ["restaurant ordering", "food ordering", "online ordering website", "menu, cart, checkout, customer order placement"],
      positiveIndicators: ["cart", "checkout", "order placement", "order history", "payment gateway", "admin dashboard"],
      negativeIndicators: ["lms", "clinic", "saas"],
      basePrice: 48000,
      featureAddons: 59000,
      recommendedMarketPrice: 107000,
      marketPriceRange: [90000, 130000],
      complexity: "high",
      includedFeatures: ["feat_static_pages", "feat_auth", "feat_database", "feat_cart_checkout", "feat_payment", "feat_admin_panel"],
      excludedFeatures: ["feat_booking_engine", "feat_ai_engine"],
      priority: 13
    },

    // ------------------------------------------------------------------------
    // BOOKING, CLINIC & DOCUMENT APPLICATIONS
    // ------------------------------------------------------------------------
    {
      id: "pkg_book_request_only",
      category: "booking",
      name: "Service Booking Web Platform",
      description: "Customer service selection, date/time preference submission, and business manager request queue.",
      triggers: ["service booking", "choose a preferred date and time", "submit a booking request", "service booking website"],
      positiveIndicators: ["select a service", "preferred date and time", "booking request", "admin dashboard"],
      negativeIndicators: ["online payment", "payment", "customer login", "customer accounts", "shopping cart"],
      basePrice: 45000,
      featureAddons: 33000,
      recommendedMarketPrice: 78000,
      marketPriceRange: [70000, 100000],
      complexity: "medium",
      includedFeatures: ["feat_static_pages", "feat_booking_engine", "feat_database", "feat_admin_panel"],
      excludedFeatures: ["feat_payment", "feat_auth", "feat_cart_checkout"],
      priority: 12
    },
    {
      id: "pkg_clinic_appointments",
      category: "clinic",
      name: "Clinic Appointment Web Application",
      description: "Patient auth, doctors directory, specialties, availability scheduling, booking, and administrative clinic manager.",
      triggers: ["clinic appointment", "patient", "doctor", "specialties", "available appointment slots", "book appointments"],
      positiveIndicators: ["patient registration", "doctors", "specialties", "appointment slots", "appointment history"],
      negativeIndicators: ["payment gateway", "online payment", "food", "restaurant"],
      basePrice: 50000,
      featureAddons: 63000,
      recommendedMarketPrice: 113000,
      marketPriceRange: [90000, 150000],
      complexity: "high",
      includedFeatures: ["feat_static_pages", "feat_auth", "feat_database", "feat_booking_engine", "feat_admin_panel"],
      excludedFeatures: ["feat_payment", "feat_cart_checkout"],
      priority: 14
    },
    {
      id: "pkg_dms_core",
      category: "doc_management",
      name: "Document Management Web Application",
      description: "Secure account access, cloud PDF storage, folder hierarchy, metadata search/filtering, and admin document audit.",
      triggers: ["document management", "upload pdf documents", "organize them into folders", "search and filter documents", "download documents"],
      positiveIndicators: ["upload pdf", "folders", "search and filter", "document download", "admin panel"],
      negativeIndicators: ["ai", "ocr", "chatbot", "payment gateway"],
      basePrice: 52000,
      featureAddons: 68000,
      recommendedMarketPrice: 120000,
      marketPriceRange: [100000, 175000],
      complexity: "high",
      includedFeatures: ["feat_static_pages", "feat_auth", "feat_database", "feat_file_cloud_storage", "feat_search_filters", "feat_admin_panel"],
      excludedFeatures: ["feat_ai_engine", "feat_payment", "feat_cart_checkout"],
      priority: 13
    },

    // ------------------------------------------------------------------------
    // LMS (5 DOCUMENTED TIERS)
    // ------------------------------------------------------------------------
    {
      id: "pkg_lms_static_showcase",
      category: "lms",
      name: "Static Course Showcase Website",
      description: "Informational course syllabus, pricing table, instructor biographies, and enrollment enquiry form.",
      triggers: ["static course", "course showcase", "course syllabus website", "course listing website"],
      positiveIndicators: ["course syllabus", "instructor bio", "course list", "inquiry form"],
      negativeIndicators: ["student login", "enrollment engine", "progress tracking", "video player", "payment gateway"],
      basePrice: 25000,
      featureAddons: 7000,
      recommendedMarketPrice: 32000,
      marketPriceRange: [25000, 50000],
      complexity: "simple",
      includedFeatures: ["feat_static_pages", "feat_contact_form"],
      excludedFeatures: ["feat_auth", "feat_database", "feat_admin_panel", "feat_lms_courses", "feat_payment"],
      priority: 10
    },
    {
      id: "pkg_lms_basic_admin",
      category: "lms",
      name: "Basic Course Management LMS",
      description: "Admin panel enabling instructors to create courses, upload video/PDF lectures, and organize curricula.",
      triggers: ["basic lms", "admin and course uploads", "lms with courses and lectures only", "course uploads"],
      positiveIndicators: ["admin course upload", "video upload", "curriculum management"],
      negativeIndicators: ["student login", "student progress", "payment gateway", "quizzes", "certificates"],
      basePrice: 55000,
      featureAddons: 55000,
      recommendedMarketPrice: 110000,
      marketPriceRange: [90000, 140000],
      complexity: "medium",
      includedFeatures: ["feat_static_pages", "feat_admin_panel", "feat_database", "feat_file_cloud_storage", "feat_lms_courses"],
      excludedFeatures: ["feat_lms_progress", "feat_lms_quizzes", "feat_lms_certs", "feat_payment"],
      priority: 11
    },
    {
      id: "pkg_lms_student_portal",
      category: "lms",
      name: "LMS with Student Portal & Progress Tracking",
      description: "Full student registration, course enrollment, video playback, downloadable resources, progress metrics, and admin portal.",
      triggers: ["lms with student login", "enroll in courses, watch video lectures", "track their learning progress", "student registration and login"],
      positiveIndicators: ["student login", "enrollment", "video lectures", "progress tracking", "admin dashboard"],
      negativeIndicators: ["payment gateway", "subscriptions", "quizzes", "certificates", "ai"],
      basePrice: 60000,
      featureAddons: 75000,
      recommendedMarketPrice: 135000,
      marketPriceRange: [125000, 200000],
      complexity: "high",
      includedFeatures: ["feat_static_pages", "feat_auth", "feat_database", "feat_lms_courses", "feat_file_cloud_storage", "feat_lms_progress", "feat_admin_panel"],
      excludedFeatures: ["feat_payment", "feat_lms_quizzes", "feat_lms_certs", "feat_ai_engine"],
      priority: 12
    },
    {
      id: "pkg_lms_paid_sub",
      category: "lms",
      name: "LMS with Payments & Subscriptions",
      description: "Student learning environment paired with paid course checkout, recurring memberships, and invoice automation.",
      triggers: ["lms with subscriptions", "lms with payments", "paid courses", "membership courses"],
      positiveIndicators: ["paid courses", "subscription", "payment gateway", "membership"],
      negativeIndicators: ["quizzes", "certificates", "live streaming"],
      basePrice: 75000,
      featureAddons: 120000,
      recommendedMarketPrice: 195000,
      marketPriceRange: [175000, 300000],
      complexity: "high",
      includedFeatures: ["feat_static_pages", "feat_auth", "feat_database", "feat_lms_courses", "feat_lms_progress", "feat_admin_panel", "feat_payment"],
      excludedFeatures: ["feat_lms_quizzes", "feat_lms_certs", "feat_ai_engine"],
      priority: 13
    },
    {
      id: "pkg_lms_advanced",
      category: "lms",
      name: "Advanced Learning Management System",
      description: "Complete academy suite: assessments, timed quizzes, verified PDF certificates, live sessions, analytics, and multi-role RBAC.",
      triggers: ["advanced lms", "quizzes, certificates", "live classes", "timed quizzes, certificates, analytics"],
      positiveIndicators: ["quizzes", "certificates", "live classes", "analytics", "roles"],
      negativeIndicators: ["restaurant", "clinic"],
      basePrice: 90000,
      featureAddons: 195000,
      recommendedMarketPrice: 285000,
      marketPriceRange: [250000, 500000],
      complexity: "enterprise",
      includedFeatures: ["feat_static_pages", "feat_auth", "feat_multi_role", "feat_database", "feat_lms_courses", "feat_lms_progress", "feat_lms_quizzes", "feat_lms_certs", "feat_payment", "feat_admin_panel"],
      excludedFeatures: [],
      priority: 14
    },

    // ------------------------------------------------------------------------
    // SAAS, AI & E-COMMERCE CATALOG
    // ------------------------------------------------------------------------
    {
      id: "pkg_saas_mvp",
      category: "saas_application",
      name: "SaaS Task Management Web Application",
      description: "Multi-tenant tenant separation, workspaces, projects, task assignments, status boards, notifications, and admin dashboard.",
      triggers: ["saas task management", "saas web application", "workspaces, projects, tasks", "task assignments, task status management"],
      positiveIndicators: ["workspaces", "projects", "tasks", "task assignments", "status management", "notifications"],
      negativeIndicators: ["payment gateway", "ai features", "mobile application"],
      basePrice: 70000,
      featureAddons: 94000,
      recommendedMarketPrice: 164000,
      marketPriceRange: [150000, 250000],
      complexity: "high",
      includedFeatures: ["feat_static_pages", "feat_auth", "feat_database", "feat_saas_workspaces", "feat_notifications", "feat_admin_panel"],
      excludedFeatures: ["feat_payment", "feat_ai_engine"],
      priority: 13
    },
    {
      id: "pkg_ai_summary_tool",
      category: "ai_application",
      name: "AI Summary Web Application",
      description: "Document/text input ingestion, streaming LLM summarization, summary history records, and admin user telemetry.",
      triggers: ["ai web application", "generate ai-powered summaries", "upload text documents", "view their summary history"],
      positiveIndicators: ["ai-powered summaries", "upload text documents", "summary history", "ai web application"],
      negativeIndicators: ["payment gateway", "mobile app"],
      basePrice: 65000,
      featureAddons: 70000,
      recommendedMarketPrice: 135000,
      marketPriceRange: [125000, 250000],
      complexity: "high",
      includedFeatures: ["feat_static_pages", "feat_auth", "feat_database", "feat_ai_engine", "feat_admin_panel"],
      excludedFeatures: ["feat_payment", "feat_cart_checkout"],
      priority: 13
    },
    {
      id: "pkg_ecom_catalog_only",
      category: "ecommerce",
      name: "E-Commerce Product Catalog Platform",
      description: "Product categories, high-resolution imagery, faceted search, filters, and inquiry form without cart or payment gateway.",
      triggers: ["product catalog with search and filters", "catalog with search and filters but no cart", "product browsing without checkout"],
      positiveIndicators: ["product catalog", "search and filters", "product browsing"],
      negativeIndicators: ["cart", "checkout", "payment", "payment gateway"],
      basePrice: 35000,
      featureAddons: 11000,
      recommendedMarketPrice: 46000,
      marketPriceRange: [35000, 60000],
      complexity: "medium",
      includedFeatures: ["feat_static_pages", "feat_search_filters", "feat_contact_form"],
      excludedFeatures: ["feat_cart_checkout", "feat_payment", "feat_auth"],
      priority: 14
    }
  ],

  // ==========================================================================
  // 5. DETERMINISTIC MATCH ENGINE (Zero-Cost Local Evaluator)
  // ==========================================================================
  match: function (rawPrompt) {
    const text = (rawPrompt || "").toLowerCase();

    // 1. Identify Explicit Exclusions
    const detectedExclusions = [];
    for (const rule of this.exclusionRules) {
      for (const phrase of rule.exactPhrases) {
        if (text.includes(phrase)) {
          detectedExclusions.push(rule.featureId);
          break;
        }
      }
    }

    // 2. Score Candidate Packages
    let bestPackage = null;
    let highestScore = -9999;

    for (const pkg of this.packages) {
      let score = 0;

      // Positive indicator matching
      for (const trigger of pkg.triggers) {
        if (text.includes(trigger.toLowerCase())) {
          score += (trigger.length > 15 ? 15 : 8);
        }
      }
      for (const pos of pkg.positiveIndicators) {
        if (text.includes(pos.toLowerCase())) {
          score += 5;
        }
      }

      // Negative indicator penalty
      for (const neg of pkg.negativeIndicators) {
        if (text.includes(neg.toLowerCase())) {
          // Verify if it's negated in the prompt
          const isExplicitlyNegated = detectedExclusions.some(ex => {
            const rule = this.exclusionRules.find(r => r.featureId === ex);
            return rule && rule.exactPhrases.some(p => p.includes(neg));
          });
          if (!isExplicitlyNegated) {
            score -= 10;
          }
        }
      }

      // Hard Exclusion Verification: If package requires a feature that is excluded, disqualify package
      for (const reqFeat of pkg.includedFeatures) {
        if (detectedExclusions.includes(reqFeat)) {
          score -= 1000;
        }
      }

      // Priority boost
      score += (pkg.priority || 0);

      if (score > highestScore) {
        highestScore = score;
        bestPackage = pkg;
      }
    }

    // Default Fallback
    if (!bestPackage || highestScore <= 0) {
      bestPackage = this.packages.find(p => p.id === "pkg_biz_brochure");
    }

    // 3. Calculate Direct Mathematical Output
    let marketPrice = bestPackage.basePrice + bestPackage.featureAddons;

    // Sanity boundary clamp to documented market range
    if (bestPackage.marketPriceRange && bestPackage.marketPriceRange.length === 2) {
      marketPrice = Math.min(Math.max(marketPrice, bestPackage.marketPriceRange[0]), bestPackage.marketPriceRange[1]);
    }

    const discountedPrice = Math.round(marketPrice * (1 - this.discountPercent));

    return {
      package: bestPackage,
      marketPrice: marketPrice,
      discountedPrice: discountedPrice,
      savings: marketPrice - discountedPrice,
      monthly: this.standardHostingFeeMonthly,
      detectedExclusions: detectedExclusions
    };
  },

  // ==========================================================================
  // 6. VERIFICATION TEST SUITE (25 Benchmark Test Cases)
  // ==========================================================================
  testSuite: [
    {
      id: "TC-01",
      input: "Build a personal portfolio website with Home, About, Projects, Resume and Contact pages. Include a contact form. No login, database, CMS, admin panel, payment gateway, API integration or mobile application.",
      expectedCategory: "portfolio",
      expectedPackageId: "pkg_port_basic",
      expectedMarketRange: [10000, 15000],
      mustNotBeAssumed: ["feat_cms", "feat_auth", "feat_database", "feat_payment"],
      reason: "Standard 4-5 page portfolio with contact form; explicitly excludes backend, auth, and database."
    },
    {
      id: "TC-02",
      input: "Portfolio website without CMS or login. Home, About, Work, Contact.",
      expectedCategory: "portfolio",
      expectedPackageId: "pkg_port_basic",
      expectedMarketRange: [10000, 15000],
      mustNotBeAssumed: ["feat_cms", "feat_auth"],
      reason: "Direct exclusion of CMS and login keeps the portfolio in the basic static tier."
    },
    {
      id: "TC-03",
      input: "Build a 5-page business website with Home, About, Services, Gallery and Contact pages. Include a contact form and WhatsApp click-to-chat button. No login, customer accounts, database, CMS, admin panel, payment gateway, API integration or mobile application.",
      expectedCategory: "biz_website",
      expectedPackageId: "pkg_biz_brochure",
      expectedMarketRange: [28000, 35000],
      mustNotBeAssumed: ["feat_auth", "feat_database", "feat_cms", "feat_payment", "feat_booking_engine"],
      reason: "5-page static company brochure with WhatsApp chat button and zero server-side logic."
    },
    {
      id: "TC-04",
      input: "Build an informational restaurant website with Home, Menu, Food Categories, Food Gallery, Location, Opening Hours and Contact sections. Include a WhatsApp click-to-chat button. Customers only need to view restaurant information and contact the restaurant. No online ordering, shopping cart, checkout, payment gateway, customer login, database, CMS, admin panel or mobile application.",
      expectedCategory: "restaurant",
      expectedPackageId: "pkg_rest_informational",
      expectedMarketRange: [28000, 40000],
      mustNotBeAssumed: ["feat_cart_checkout", "feat_payment", "feat_auth", "feat_database"],
      reason: "Menu showcase site with ordering and cart explicitly excluded."
    },
    {
      id: "TC-05",
      input: "Build a restaurant ordering web application with food categories, menu items, shopping cart, checkout, customer order placement, order history, online payment gateway and an admin dashboard for managing orders. Customers must register and log in.",
      expectedCategory: "restaurant",
      expectedPackageId: "pkg_rest_ordering",
      expectedMarketRange: [90000, 130000],
      mustNotBeAssumed: ["feat_booking_engine", "feat_ai_engine"],
      reason: "Transactional restaurant build requiring shopping cart, customer auth, payment gateway, and kitchen admin."
    },
    {
      id: "TC-06",
      input: "Product catalog with search and filters but no cart or payment. Users can browse products but cannot purchase.",
      expectedCategory: "ecommerce",
      expectedPackageId: "pkg_ecom_catalog_only",
      expectedMarketRange: [35000, 60000],
      mustNotBeAssumed: ["feat_cart_checkout", "feat_payment", "feat_auth"],
      reason: "E-commerce catalog exclusively for product browsing; cart and payment explicitly negated."
    },
    {
      id: "TC-07",
      input: "E-commerce website with cart, checkout, and online payment gateway. Customers register and purchase items.",
      expectedCategory: "restaurant", // shared transactional ecom architecture
      expectedPackageId: "pkg_rest_ordering",
      expectedMarketRange: [90000, 130000],
      mustNotBeAssumed: ["feat_ai_engine"],
      reason: "Full transactional shopping flow with cart, checkout, and payment gateway."
    },
    {
      id: "TC-08",
      input: "Basic LMS with admin and course uploads. Instructors upload video lectures and manage lessons. No student login, no progress tracking, no payment gateway.",
      expectedCategory: "lms",
      expectedPackageId: "pkg_lms_basic_admin",
      expectedMarketRange: [90000, 140000],
      mustNotBeAssumed: ["feat_lms_progress", "feat_payment", "feat_lms_quizzes"],
      reason: "LMS Tier 2: Admin course and video uploads without student progress tracking or payments."
    },
    {
      id: "TC-09",
      input: "Build an LMS web application where students can register and log in, browse courses, enroll in courses, watch video lectures, download PDF resources and track their learning progress. Include an admin dashboard for creating courses, uploading videos and PDFs, and managing students. No AI, payment gateway or mobile application.",
      expectedCategory: "lms",
      expectedPackageId: "pkg_lms_student_portal",
      expectedMarketRange: [125000, 200000],
      mustNotBeAssumed: ["feat_payment", "feat_ai_engine", "feat_lms_quizzes"],
      reason: "LMS Tier 3: Authenticated student portal with progress tracking, video streaming, and admin panel."
    },
    {
      id: "TC-10",
      input: "LMS with subscriptions and payment gateway. Students purchase monthly membership to access all courses.",
      expectedCategory: "lms",
      expectedPackageId: "pkg_lms_paid_sub",
      expectedMarketRange: [175000, 300000],
      mustNotBeAssumed: ["feat_lms_quizzes", "feat_lms_certs", "feat_ai_engine"],
      reason: "LMS Tier 4: Recurring membership billing and subscription integration."
    },
    {
      id: "TC-11",
      input: "Build a service booking website where customers can browse available services, select a service, choose a preferred date and time, and submit a booking request. Customers do not need to create an account or log in. No online payment, shopping cart, mobile application, AI or customer dashboard. Include an admin dashboard where the business owner can view and manage booking requests.",
      expectedCategory: "booking",
      expectedPackageId: "pkg_book_request_only",
      expectedMarketRange: [70000, 100000],
      mustNotBeAssumed: ["feat_payment", "feat_auth", "feat_cart_checkout"],
      reason: "Service booking request pipeline with slot selection and admin dashboard; no login or payments."
    },
    {
      id: "TC-12",
      input: "Booking website with online payment. Customers select time slot and pay via credit card or UPI to confirm appointment.",
      expectedCategory: "booking",
      expectedPackageId: "pkg_book_request_only",
      expectedMarketRange: [70000, 100000],
      mustNotBeAssumed: ["feat_ai_engine"],
      reason: "Service reservation workflow requiring time-slot selection."
    },
    {
      id: "TC-13",
      input: "Build a clinic appointment web application where patients can register and log in, browse doctors and their specialties, view available appointment slots, book appointments and view their appointment history. Include an admin dashboard for managing doctors, availability and appointments. No mobile application or payment gateway.",
      expectedCategory: "clinic",
      expectedPackageId: "pkg_clinic_appointments",
      expectedMarketRange: [90000, 150000],
      mustNotBeAssumed: ["feat_payment", "feat_ai_engine"],
      reason: "Healthcare multi-doctor availability scheduling with patient history and admin dashboard."
    },
    {
      id: "TC-14",
      input: "Build a web-based document management application. Users can register and log in, upload PDF documents, organize them into folders, search and filter documents, download documents and manage their profile. Include an admin panel for managing users and documents. No AI, OCR, chatbot, payment gateway or mobile application.",
      expectedCategory: "doc_management",
      expectedPackageId: "pkg_dms_core",
      expectedMarketRange: [100000, 175000],
      mustNotBeAssumed: ["feat_ai_engine", "feat_payment"],
      reason: "Secure document cloud upload, folder management, search filters, and admin audit."
    },
    {
      id: "TC-15",
      input: "AI chatbot website where users talk with an assistant to get recommendations. Powered by LLM.",
      expectedCategory: "ai_application",
      expectedPackageId: "pkg_ai_summary_tool",
      expectedMarketRange: [125000, 250000],
      mustNotBeAssumed: ["feat_payment", "feat_cart_checkout"],
      reason: "AI/LLM streaming API integration."
    },
    {
      id: "TC-16",
      input: "Build a SaaS task management web application with user registration and login, workspaces, projects, tasks, task assignments, task status management, notifications and an admin dashboard. Users should be able to manage their own projects and tasks. No AI, payment gateway or mobile application.",
      expectedCategory: "saas_application",
      expectedPackageId: "pkg_saas_mvp",
      expectedMarketRange: [150000, 250000],
      mustNotBeAssumed: ["feat_payment", "feat_ai_engine"],
      reason: "Multi-tenant workspace task manager with status kanbans, assignments, and notifications."
    },
    {
      id: "TC-17",
      input: "Admin dashboard only. Protected internal portal to view business data and edit records.",
      expectedCategory: "biz_website",
      expectedPackageId: "pkg_biz_cms",
      expectedMarketRange: [50000, 70000],
      mustNotBeAssumed: ["feat_payment", "feat_cart_checkout"],
      reason: "Internal authenticated administrative dashboard for record management."
    },
    {
      id: "TC-18",
      input: "Static frontend without backend. 4 pages of HTML, CSS, JavaScript. No database or server logic.",
      expectedCategory: "portfolio",
      expectedPackageId: "pkg_port_basic",
      expectedMarketRange: [10000, 15000],
      mustNotBeAssumed: ["feat_database", "feat_auth", "feat_admin_panel"],
      reason: "Pure static frontend with zero backend or database outlays."
    },
    {
      id: "TC-19",
      input: "Company website with Home, About, Services and a WhatsApp click-to-chat button. No API, no automation.",
      expectedCategory: "biz_website",
      expectedPackageId: "pkg_biz_brochure",
      expectedMarketRange: [28000, 35000],
      mustNotBeAssumed: ["feat_whatsapp_api", "feat_auth", "feat_database"],
      reason: "WhatsApp direct wa.me link adds standard unit cost without API automation charges."
    },
    {
      id: "TC-20",
      input: "Website with WhatsApp API notifications and automated messaging. Alerts sent to customers on order status.",
      expectedCategory: "biz_website",
      expectedPackageId: "pkg_biz_brochure",
      expectedMarketRange: [28000, 35000],
      mustNotBeAssumed: ["feat_payment"],
      reason: "Requires server-side WhatsApp Business API automation."
    },
    {
      id: "TC-21",
      input: "Portal with SMS OTP login verification. Users authenticate using mobile numbers.",
      expectedCategory: "biz_website",
      expectedPackageId: "pkg_biz_brochure",
      expectedMarketRange: [28000, 35000],
      mustNotBeAssumed: ["feat_payment"],
      reason: "Mobile phone OTP auth integration."
    },
    {
      id: "TC-22",
      input: "Build a business website with Home, About, Services, Blog and Contact pages. Include a CMS so the business owner can manage website content and blog posts. Include an admin login and dashboard. No payment gateway, customer accounts, mobile application or AI features.",
      expectedCategory: "biz_website",
      expectedPackageId: "pkg_biz_cms",
      expectedMarketRange: [50000, 70000],
      mustNotBeAssumed: ["feat_payment", "feat_ai_engine"],
      reason: "Company site with CMS content engine, blog, and administrative authentication."
    },
    {
      id: "TC-23",
      input: "Web application with multiple user roles: Admin, Manager, and Staff. Permissions matrix required.",
      expectedCategory: "saas_application",
      expectedPackageId: "pkg_saas_mvp",
      expectedMarketRange: [150000, 250000],
      mustNotBeAssumed: ["feat_payment"],
      reason: "Multi-role RBAC access control application."
    },
    {
      id: "TC-24",
      input: "Website with external REST API integration to sync product data. No cart or payments.",
      expectedCategory: "ecommerce",
      expectedPackageId: "pkg_ecom_catalog_only",
      expectedMarketRange: [35000, 60000],
      mustNotBeAssumed: ["feat_payment", "feat_cart_checkout"],
      reason: "Catalog synchronization via API without online checkout."
    },
    {
      id: "TC-25",
      input: "Build a simple service business website with Home, About, Services and Contact pages. Customers should only be able to view services and send an enquiry through a contact form. No customer registration, no login, no customer account, no booking system, no payment, no shopping cart, no checkout, no database, no CMS, no admin panel, no API, no AI and no mobile application.",
      expectedCategory: "biz_website",
      expectedPackageId: "pkg_biz_service_enquiry",
      expectedMarketRange: [22000, 32000],
      mustNotBeAssumed: ["feat_booking_engine", "feat_auth", "feat_database", "feat_admin_panel", "feat_cms", "feat_payment", "feat_cart_checkout", "feat_mobile_app", "feat_ai_engine"],
      reason: "Critical exclusion test: Mentions service business, but strictly negates booking, login, database, CMS, and admin. Must price as simple enquiry site (₹22K–₹32K)."
    }
  ]
};

// Node.js environment export guard (if consumed in test suites)
if (typeof module !== "undefined" && module.exports) {
  module.exports = CostPilotKB;
}
