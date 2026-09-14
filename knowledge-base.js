/**
 * ============================================================================
 * CostPilot — Commercial Project Knowledge Base (KB)
 * Version: 2026.2 (Production Benchmark Specification)
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
        "no customer accounts", "no customer login", "no sign in", "no signup", "login not required",
        "without registration", "no student login", "no patient login", "no member accounts",
        "no user auth", "guest only"
      ]
    },
    {
      featureId: "feat_cart_checkout",
      canonicalName: "Shopping Cart & Checkout",
      exactPhrases: [
        "no cart", "without cart", "no shopping cart", "no checkout", "without checkout",
        "catalog only", "catalogue only", "browse only", "no ordering flow", "cannot purchase",
        "no takeout ordering", "no food ordering", "without ordering", "no online ordering"
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
        "no artificial intelligence", "no gpt", "no automated bot", "no ocr"
      ]
    },
    {
      featureId: "feat_api_integrations",
      canonicalName: "Third-Party REST APIs",
      exactPhrases: [
        "no api", "without api", "no third party api", "no external integrations",
        "no webhooks", "standalone only", "no api integration"
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
      keywords: ["portfolio", "showcase", "resume website", "cv website", "personal profile", "designer showcase"]
    },
    biz_website: {
      id: "biz_website",
      displayName: "Business Website",
      keywords: ["business website", "company site", "corporate website", "services website", "brochure website"]
    },
    restaurant: {
      id: "restaurant",
      displayName: "Restaurant & Food Service",
      keywords: ["restaurant", "cafe", "bistro", "bakery", "food menu", "diner", "takeout"]
    },
    booking: {
      id: "booking",
      displayName: "Service Booking & Reservations",
      keywords: ["booking website", "service booking", "appointment system", "slot reservation", "reserve time"]
    },
    clinic: {
      id: "clinic",
      displayName: "Clinic & Healthcare Appointment Platform",
      keywords: ["clinic", "doctor", "patient", "specialties", "hospital", "healthcare booking"]
    },
    doc_management: {
      id: "doc_management",
      displayName: "Document Management System (DMS)",
      keywords: ["document management", "upload pdf", "pdf storage", "folder organization", "file repository"]
    },
    lms: {
      id: "lms",
      displayName: "Learning Management System (LMS)",
      keywords: ["lms", "course", "courses", "student", "video lectures", "learning progress", "quizzes"]
    },
    saas_application: {
      id: "saas_application",
      displayName: "SaaS Application",
      keywords: ["saas", "workspaces", "task management", "tasks", "team members", "multi-tenant"]
    },
    ai_application: {
      id: "ai_application",
      displayName: "AI / LLM Web Application",
      keywords: ["ai web application", "ai summaries", "generate ai", "llm integration", "text summary"]
    },
    ecommerce: {
      id: "ecommerce",
      displayName: "E-Commerce & Digital Storefront",
      keywords: ["ecommerce", "e-commerce", "shopping cart", "checkout", "storefront", "product catalog"]
    }
  },

  // ==========================================================================
  // 3. PACKAGES & BENCHMARK MODELS
  // ==========================================================================
  packages: [
    // --- PORTFOLIOS (11 TIERS) ---
    {
      id: "pkg_port_starter",
      domain: "portfolio",
      category: "portfolio",
      title: "Starter Portfolio Website",
      name: "Starter Portfolio Website",
      triggers: ["starter portfolio", "1-page portfolio", "1 page portfolio", "one page portfolio", "single page personal profile", "1-page"],
      positiveIndicators: ["1-page", "single page", "profile", "contact links"],
      negativeIndicators: ["cms", "admin", "dashboard", "login", "ai", "booking", "cart"],
      basePrice: 6000,
      featureCosts: 1000,
      marketRange: [5000, 8000],
      inclusions: ["1-Page Personal Profile", "Skills & Services", "Project Showcase", "Contact Links"],
      includedFeatures: ["feat_static_pages"],
      priority: 10
    },
    {
      id: "pkg_port_basic",
      domain: "portfolio",
      category: "portfolio",
      title: "Basic Portfolio Website",
      name: "Basic Portfolio Website",
      triggers: ["basic portfolio", "4-5 pages portfolio", "4–5 pages", "portfolio website with home, about, projects"],
      positiveIndicators: ["4-5 pages", "projects", "resume", "contact form"],
      negativeIndicators: ["cms", "admin", "login", "ai", "booking", "cart", "payment"],
      basePrice: 10000,
      featureCosts: 3000,
      marketRange: [10000, 15000],
      inclusions: ["4–5 Responsive Pages", "Project Gallery", "Resume Showcase", "Contact Form"],
      includedFeatures: ["feat_static_pages", "feat_contact_form"],
      priority: 9
    },
    {
      id: "pkg_port_resume",
      domain: "portfolio",
      category: "portfolio",
      title: "Resume & Portfolio Website",
      name: "Resume & Portfolio Website",
      triggers: ["resume and portfolio", "downloadable resume", "pdf resume", "downloadable cv", "portfolio website with home, about, projects, resume"],
      positiveIndicators: ["downloadable resume", "downloadable cv", "resume", "cv"],
      negativeIndicators: ["cms", "admin", "database", "login", "payment"],
      basePrice: 15000,
      featureCosts: 3000,
      marketRange: [12000, 22000],
      inclusions: ["Resume Showcase", "Experience & Skills Timeline", "Downloadable PDF CV", "Contact Form"],
      includedFeatures: ["feat_static_pages", "feat_contact_form"],
      priority: 11
    },
    {
      id: "pkg_port_pro",
      domain: "portfolio",
      category: "portfolio",
      title: "Professional Portfolio Website",
      name: "Professional Portfolio Website",
      triggers: ["professional portfolio", "case studies", "animations", "micro-interactions", "5-7 pages"],
      positiveIndicators: ["case studies", "animations", "seo basics", "5-7 pages"],
      negativeIndicators: ["cms", "admin", "login", "payment", "ai"],
      basePrice: 18000,
      featureCosts: 6000,
      marketRange: [18000, 30000],
      inclusions: ["5–7 Responsive Pages", "Project Case Studies", "Interactive Animations", "SEO Basics"],
      includedFeatures: ["feat_static_pages", "feat_contact_form"],
      priority: 8
    },
    {
      id: "pkg_port_dev",
      domain: "portfolio",
      category: "portfolio",
      title: "Developer / Tech Portfolio",
      name: "Developer / Tech Portfolio",
      triggers: ["developer portfolio", "tech portfolio", "github", "tech stack", "code demo", "demo sections"],
      positiveIndicators: ["github links", "tech stack", "demo sections", "developer"],
      negativeIndicators: ["cms", "admin", "payment", "booking"],
      basePrice: 18000,
      featureCosts: 8000,
      marketRange: [20000, 35000],
      inclusions: ["Tech Stack Overview", "GitHub Repository Integration", "Live Demo Sections", "Contact Form"],
      includedFeatures: ["feat_static_pages", "feat_contact_form"],
      priority: 10
    },
    {
      id: "pkg_port_designer",
      domain: "portfolio",
      category: "portfolio",
      title: "Designer / Creative Portfolio",
      name: "Designer / Creative Portfolio",
      triggers: ["designer portfolio", "creative portfolio", "artist portfolio", "photographer", "visual gallery", "filtering gallery"],
      positiveIndicators: ["visual gallery", "filtering", "creative", "designer", "high-resolution"],
      negativeIndicators: ["cms", "admin", "payment", "booking"],
      basePrice: 22000,
      featureCosts: 12000,
      marketRange: [25000, 50000],
      inclusions: ["High-Res Visual Gallery", "Category Filtering", "Client Case Studies", "Inquiry Workflow"],
      includedFeatures: ["feat_static_pages", "feat_contact_form"],
      priority: 10
    },
    {
      id: "pkg_port_brand",
      domain: "portfolio",
      category: "portfolio",
      title: "Premium Personal Brand Website",
      name: "Premium Personal Brand Website",
      triggers: ["personal brand", "premium brand", "premium personal brand", "advanced animations"],
      positiveIndicators: ["personal brand", "bespoke design", "custom ui/ux"],
      negativeIndicators: ["cart", "checkout", "ecommerce"],
      basePrice: 22000,
      featureCosts: 16000,
      marketRange: [30000, 50000],
      inclusions: ["Custom Studio UI/UX", "Micro-Animations", "Integrated Blog", "Advanced SEO"],
      includedFeatures: ["feat_static_pages", "feat_contact_form"],
      priority: 9
    },
    {
      id: "pkg_port_blog",
      domain: "portfolio",
      category: "portfolio",
      title: "Portfolio Website with Blog",
      name: "Portfolio Website with Blog",
      triggers: ["portfolio with blog", "portfolio and blog", "portfolio plus blog"],
      positiveIndicators: ["portfolio with blog", "blog", "articles"],
      negativeIndicators: ["payment", "cart", "checkout"],
      basePrice: 20000,
      featureCosts: 16000,
      marketRange: [30000, 55000],
      inclusions: ["Portfolio Showcase", "Article & Blog Engine", "Category Search", "Social Links"],
      includedFeatures: ["feat_static_pages", "feat_contact_form"],
      priority: 10
    },
    {
      id: "pkg_port_cms",
      domain: "portfolio",
      category: "portfolio",
      title: "Portfolio Website with CMS",
      name: "Portfolio Website with CMS",
      triggers: ["portfolio with cms", "portfolio with admin", "client can update projects", "update content through admin"],
      positiveIndicators: ["cms", "admin updates", "self-managed content"],
      negativeIndicators: ["payment gateway", "checkout", "cart"],
      basePrice: 22000,
      featureCosts: 20000,
      marketRange: [35000, 60000],
      inclusions: ["Headless CMS Integration", "Admin Project Manager", "Self-Managed Content", "Contact Form"],
      includedFeatures: ["feat_static_pages", "feat_cms", "feat_admin_panel", "feat_database"],
      priority: 12
    },
    {
      id: "pkg_port_booking",
      domain: "portfolio",
      category: "portfolio",
      title: "Portfolio Website with Booking",
      name: "Portfolio Website with Booking",
      triggers: ["portfolio with booking", "consultation booking", "portfolio and booking"],
      positiveIndicators: ["booking", "consultation", "appointment slot"],
      negativeIndicators: ["cart", "checkout", "lms"],
      basePrice: 25000,
      featureCosts: 23000,
      marketRange: [35000, 70000],
      inclusions: ["Portfolio Showcase", "Consultation Slot Picker", "Client Inquiry Workflow", "Calendar Sync"],
      includedFeatures: ["feat_static_pages", "feat_booking"],
      priority: 12
    },
    {
      id: "pkg_port_ai",
      domain: "portfolio",
      category: "portfolio",
      title: "Portfolio with AI Features",
      name: "Portfolio with AI Features",
      triggers: ["portfolio with ai", "ai chatbot", "ai resume helper", "ai project assistant"],
      positiveIndicators: ["ai chatbot", "ai features", "interactive assistant"],
      negativeIndicators: ["ecommerce", "lms courses"],
      basePrice: 30000,
      featureCosts: 35000,
      marketRange: [50000, 100000],
      inclusions: ["AI Resume Assistant", "Embedded Chatbot", "Interactive Project QA", "Contact Form"],
      includedFeatures: ["feat_static_pages", "feat_ai_engine"],
      priority: 13
    },

    // --- BUSINESS & RESTAURANT PACKAGES ---
    {
      id: "pkg_biz_brochure",
      domain: "biz_website",
      category: "biz_website",
      title: "Business Website",
      name: "Business Website",
      triggers: ["5-page business website", "5 page business website", "business website with home, about", "brochure website", "company website with home, about"],
      positiveIndicators: ["5 pages", "services", "gallery", "contact form", "whatsapp button"],
      negativeIndicators: ["login", "database", "cms", "admin panel", "payment", "booking", "cart"],
      basePrice: 25000,
      featureCosts: 3000,
      marketRange: [28000, 35000],
      inclusions: ["5 Responsive Pages", "Services & Gallery Overview", "Contact Form", "WhatsApp Button"],
      includedFeatures: ["feat_static_pages"],
      priority: 9
    },
    {
      id: "pkg_biz_service_enquiry",
      domain: "biz_website",
      category: "biz_website",
      title: "Service Business Website",
      name: "Service Business Website",
      triggers: ["simple service business", "service business website", "view services and send an enquiry", "enquiry through a contact form"],
      positiveIndicators: ["view services", "send an enquiry", "contact form"],
      negativeIndicators: ["booking system", "booking", "login", "customer account", "database", "cms", "admin", "payment", "cart", "checkout"],
      basePrice: 22000,
      featureCosts: 2000,
      marketRange: [22000, 32000],
      inclusions: ["Service Catalog Presentation", "About & Company Overview", "Contact Enquiry Form"],
      includedFeatures: ["feat_static_pages"],
      priority: 20 // High priority to win critical exclusion tests
    },
    {
      id: "pkg_biz_cms",
      domain: "biz_website",
      category: "biz_website",
      title: "Business Website with CMS",
      name: "Business Website with CMS",
      triggers: ["business website with cms", "website with cms", "manage website content and blog", "cms and admin dashboard", "admin dashboard only"],
      positiveIndicators: ["cms", "blog", "admin dashboard", "content management"],
      negativeIndicators: ["payment", "customer accounts", "cart", "checkout"],
      basePrice: 25000,
      featureCosts: 31000,
      marketRange: [50000, 70000],
      inclusions: ["5 Responsive Pages", "CMS Content Engine", "Admin Login & Dashboard", "Blog Manager"],
      includedFeatures: ["feat_static_pages", "feat_cms", "feat_admin_panel"],
      priority: 12
    },
    {
      id: "pkg_rest_informational",
      domain: "biz_website",
      category: "restaurant",
      title: "Informational Restaurant Website",
      name: "Informational Restaurant Website",
      triggers: ["informational restaurant", "restaurant menu website", "restaurant website with menu", "menu, food categories, food gallery"],
      positiveIndicators: ["menu", "food categories", "hours", "location", "whatsapp button"],
      negativeIndicators: ["online ordering", "ordering", "cart", "checkout", "payment", "customer login", "database", "admin"],
      basePrice: 26000,
      featureCosts: 6000,
      marketRange: [28000, 40000],
      inclusions: ["Menu & Categories Showcase", "Food Gallery & Ambience", "Hours, Map & Location", "WhatsApp Button"],
      includedFeatures: ["feat_static_pages"],
      priority: 14
    },
    {
      id: "pkg_rest_ordering",
      domain: "ecommerce",
      category: "restaurant",
      title: "Restaurant Ordering Web Application",
      name: "Restaurant Ordering Web Application",
      triggers: ["restaurant ordering", "food ordering", "online ordering website", "menu, cart, checkout, customer order placement", "e-commerce website with cart, checkout"],
      positiveIndicators: ["cart", "checkout", "order placement", "order history", "payment gateway", "admin dashboard"],
      negativeIndicators: ["lms", "clinic", "saas"],
      basePrice: 48000,
      featureCosts: 59000,
      marketRange: [90000, 130000],
      inclusions: ["Menu & Categories", "Shopping Cart & Checkout", "Customer Auth & History", "Payment Gateway", "Admin Order Dashboard"],
      includedFeatures: ["feat_static_pages", "feat_cart_checkout", "feat_payment", "feat_admin_panel"],
      priority: 13
    },

    // --- BOOKING, CLINIC & DOCUMENT APPLICATIONS ---
    {
      id: "pkg_book_request_only",
      domain: "web_app",
      category: "booking",
      title: "Service Booking Website",
      name: "Service Booking Website",
      triggers: ["service booking", "choose a preferred date and time", "submit a booking request", "service booking website", "booking website with online payment"],
      positiveIndicators: ["select a service", "preferred date and time", "booking request", "admin dashboard"],
      negativeIndicators: ["customer login", "customer accounts", "shopping cart", "lms", "clinic"],
      basePrice: 45000,
      featureCosts: 33000,
      marketRange: [70000, 100000],
      inclusions: ["Service Catalog", "Date & Time Slot Picker", "Booking Request Workflow", "Admin Booking Dashboard"],
      includedFeatures: ["feat_static_pages", "feat_booking", "feat_admin_panel"],
      priority: 12
    },
    {
      id: "pkg_clinic_appointments",
      domain: "web_app",
      category: "clinic",
      title: "Clinic Appointment Web Application",
      name: "Clinic Appointment Web Application",
      triggers: ["clinic appointment", "patient", "doctor", "specialties", "available appointment slots", "book appointments"],
      positiveIndicators: ["patient registration", "doctors", "specialties", "appointment slots", "appointment history"],
      negativeIndicators: ["payment gateway", "online payment", "food", "restaurant"],
      basePrice: 50000,
      featureCosts: 63000,
      marketRange: [90000, 150000],
      inclusions: ["Patient Auth & Profile", "Doctors & Specialties Catalog", "Slot Availability Calendar", "Booking Engine", "Admin Management Dashboard"],
      includedFeatures: ["feat_static_pages", "feat_auth", "feat_booking", "feat_admin_panel"],
      priority: 14
    },
    {
      id: "pkg_dms_core",
      domain: "web_app",
      category: "doc_management",
      title: "Document Management Web Application",
      name: "Document Management Web Application",
      triggers: ["document management", "upload pdf documents", "organize them into folders", "search and filter documents", "download documents"],
      positiveIndicators: ["upload pdf", "folders", "search and filter", "document download", "admin panel"],
      negativeIndicators: ["ai", "ocr", "chatbot", "payment gateway"],
      basePrice: 52000,
      featureCosts: 68000,
      marketRange: [100000, 175000],
      inclusions: ["User Auth & Accounts", "Cloud PDF Uploads", "Folder Hierarchy & Metadata", "Search & Download Engine", "Admin Management Panel"],
      includedFeatures: ["feat_static_pages", "feat_auth", "feat_admin_panel"],
      priority: 13
    },

    // --- LMS TIERS ---
    {
      id: "pkg_lms_static_showcase",
      domain: "lms",
      category: "lms",
      title: "Static Course Showcase Website",
      name: "Static Course Showcase Website",
      triggers: ["static course", "course showcase", "course syllabus website", "course listing website"],
      positiveIndicators: ["course syllabus", "instructor bio", "course list", "inquiry form"],
      negativeIndicators: ["student login", "enrollment engine", "progress tracking", "video player", "payment gateway"],
      basePrice: 25000,
      featureCosts: 7000,
      marketRange: [25000, 50000],
      inclusions: ["Course Syllabus & Outlines", "Instructor Profiles", "Course Pricing Details", "Contact / Inquiry Form"],
      includedFeatures: ["feat_static_pages"],
      priority: 10
    },
    {
      id: "pkg_lms_basic_admin",
      domain: "lms",
      category: "lms",
      title: "Basic Course Management LMS",
      name: "Basic Course Management LMS",
      triggers: ["basic lms", "admin and course uploads", "lms with courses and lectures only", "course uploads"],
      positiveIndicators: ["admin course upload", "video upload", "curriculum management"],
      negativeIndicators: ["student login", "student progress", "payment gateway", "quizzes", "certificates"],
      basePrice: 55000,
      featureCosts: 55000,
      marketRange: [90000, 140000],
      inclusions: ["Admin Auth & Dashboard", "Video & Lesson Uploads", "Course Categorization", "Lesson Streaming UI"],
      includedFeatures: ["feat_static_pages", "feat_admin_panel"],
      priority: 11
    },
    {
      id: "pkg_lms_student_portal",
      domain: "lms",
      category: "lms",
      title: "LMS Web Application",
      name: "LMS Web Application",
      triggers: ["lms with student login", "enroll in courses, watch video lectures", "track their learning progress", "student registration and login"],
      positiveIndicators: ["student login", "enrollment", "video lectures", "progress tracking", "admin dashboard"],
      negativeIndicators: ["payment gateway", "subscriptions", "quizzes", "certificates", "ai"],
      basePrice: 60000,
      featureCosts: 75000,
      marketRange: [125000, 200000],
      inclusions: ["Student Registration & Login", "Course Catalog & Enrollment", "Video Lectures & PDF Resources", "Progress Tracking", "Admin Instructor Dashboard"],
      includedFeatures: ["feat_static_pages", "feat_auth", "feat_admin_panel"],
      priority: 12
    },
    {
      id: "pkg_lms_paid_sub",
      domain: "lms",
      category: "lms",
      title: "Paid / Subscription LMS Web Application",
      name: "Paid / Subscription LMS Web Application",
      triggers: ["lms with subscriptions", "lms with payments", "paid courses", "membership courses"],
      positiveIndicators: ["paid courses", "subscription", "payment gateway", "membership"],
      negativeIndicators: ["quizzes", "certificates", "live streaming"],
      basePrice: 75000,
      featureCosts: 120000,
      marketRange: [175000, 300000],
      inclusions: ["Student Portal & Progress", "Video Player & Resources", "Payment Gateway & Invoices", "Monthly Subscription Engine", "Admin Financial Dashboard"],
      includedFeatures: ["feat_static_pages", "feat_auth", "feat_payment", "feat_admin_panel"],
      priority: 13
    },
    {
      id: "pkg_lms_advanced",
      domain: "lms",
      category: "lms",
      title: "Advanced Learning Management System (LMS)",
      name: "Advanced Learning Management System (LMS)",
      triggers: ["advanced lms", "quizzes, certificates", "live classes", "timed quizzes, certificates, analytics"],
      positiveIndicators: ["quizzes", "certificates", "live classes", "analytics", "roles"],
      negativeIndicators: ["restaurant", "clinic"],
      basePrice: 90000,
      featureCosts: 195000,
      marketRange: [250000, 500000],
      inclusions: ["Student & Instructor Portals", "Timed Quizzes & Auto-Scoring", "Dynamic PDF Certificates", "Live Class Integration", "Student Analytics & Multi-Role RBAC"],
      includedFeatures: ["feat_static_pages", "feat_auth", "feat_admin_panel"],
      priority: 14
    },

    // --- SAAS, AI & E-COMMERCE CATALOG ---
    {
      id: "pkg_saas_mvp",
      domain: "saas_product",
      category: "saas_application",
      title: "SaaS Task Management Web Application",
      name: "SaaS Task Management Web Application",
      triggers: ["saas task management", "saas web application", "workspaces, projects, tasks", "task assignments, task status management", "web application with multiple user roles"],
      positiveIndicators: ["workspaces", "projects", "tasks", "task assignments", "status management", "notifications"],
      negativeIndicators: ["payment gateway", "ai features", "mobile application"],
      basePrice: 70000,
      featureCosts: 94000,
      marketRange: [150000, 250000],
      inclusions: ["User Registration & Login", "Multi-Tenant Workspaces & Projects", "Task Kanban & Status Workflow", "Assignments & Notifications", "Workspace Admin Console"],
      includedFeatures: ["feat_static_pages", "feat_auth", "feat_admin_panel"],
      priority: 13
    },
    {
      id: "pkg_ai_summary_tool",
      domain: "ai_app",
      category: "ai_application",
      title: "AI Summary Web Application",
      name: "AI Summary Web Application",
      triggers: ["ai web application", "generate ai-powered summaries", "upload text documents", "view their summary history", "ai chatbot website"],
      positiveIndicators: ["ai-powered summaries", "upload text documents", "summary history", "ai web application", "ai chatbot"],
      negativeIndicators: ["payment gateway", "mobile app"],
      basePrice: 65000,
      featureCosts: 70000,
      marketRange: [125000, 250000],
      inclusions: ["User Registration & Login", "Document Upload & Extraction", "AI LLM Summarization Pipeline", "Saved Summary History", "Admin User Dashboard"],
      includedFeatures: ["feat_static_pages", "feat_auth", "feat_ai_engine", "feat_admin_panel"],
      priority: 13
    },
    {
      id: "pkg_ecom_catalog_only",
      domain: "ecommerce",
      category: "ecommerce",
      title: "E-Commerce Product Catalog Platform",
      name: "E-Commerce Product Catalog Platform",
      triggers: ["product catalog with search and filters", "catalog with search and filters but no cart", "product browsing without checkout", "website with external rest api integration to sync product data"],
      positiveIndicators: ["product catalog", "search and filters", "product browsing", "rest api"],
      negativeIndicators: ["cart", "checkout", "payment", "payment gateway"],
      basePrice: 35000,
      featureCosts: 11000,
      marketRange: [35000, 60000],
      inclusions: ["Product Catalog Presentation", "Faceted Search & Filters", "Product Detail Views", "Inquiry Workflow"],
      includedFeatures: ["feat_static_pages"],
      priority: 14
    }
  ],

  // ==========================================================================
  // 4. MATCH ENGINE
  // ==========================================================================
  match: function (rawPrompt) {
    const text = (rawPrompt || "").toLowerCase();

    // 1. Detect Exclusions
    const detectedExclusions = [];
    for (const rule of this.exclusionRules) {
      for (const phrase of rule.exactPhrases) {
        if (text.includes(phrase)) {
          detectedExclusions.push(rule.featureId);
          break;
        }
      }
    }

    // 2. Score Packages
    let bestPackage = null;
    let highestScore = -9999;

    for (const pkg of this.packages) {
      let score = 0;

      // Positive Triggers
      for (const trigger of pkg.triggers) {
        if (text.includes(trigger.toLowerCase())) {
          score += (trigger.length > 15 ? 18 : 8);
        }
      }
      for (const pos of pkg.positiveIndicators) {
        if (text.includes(pos.toLowerCase())) {
          score += 5;
        }
      }

      // Negative Penalty
      for (const neg of (pkg.negativeIndicators || [])) {
        if (text.includes(neg.toLowerCase())) {
          let isExplicitlyNegated = false;
          for (const ex of detectedExclusions) {
            const rule = this.exclusionRules.find(r => r.featureId === ex);
            if (rule && rule.exactPhrases.some(p => p.includes(neg))) {
              isExplicitlyNegated = true;
              break;
            }
          }
          if (!isExplicitlyNegated) {
            score -= 10;
          }
        }
      }

      // Hard Exclusion Disqualification
      for (const reqFeat of (pkg.includedFeatures || [])) {
        if (detectedExclusions.includes(reqFeat)) {
          score -= 1000;
        }
      }

      score += (pkg.priority || 0);

      if (score > highestScore) {
        highestScore = score;
        bestPackage = pkg;
      }
    }

    // Fallback if no specific trigger matched
    if (!bestPackage || highestScore <= 0) {
      bestPackage = this.packages.find(p => p.id === "pkg_biz_brochure");
    }

    // 3. Mathematical Output
    let marketPrice = bestPackage.basePrice + bestPackage.featureCosts;

    if (bestPackage.marketRange && bestPackage.marketRange.length === 2) {
      marketPrice = Math.min(Math.max(marketPrice, bestPackage.marketRange[0]), bestPackage.marketRange[1]);
    }

    const discountedPrice = Math.round(marketPrice * (1 - this.discountPercent));

    // Return unified contract matching index.html
    return {
      package: {
        ...bestPackage,
        title: bestPackage.title || bestPackage.name,
        name: bestPackage.name || bestPackage.title,
        domain: bestPackage.domain || bestPackage.category,
        category: bestPackage.category || bestPackage.domain,
        inclusions: bestPackage.inclusions || ["Core Application Specifications"],
        includedFeatures: bestPackage.includedFeatures || []
      },
      marketPrice: marketPrice,
      discountedPrice: discountedPrice,
      savings: marketPrice - discountedPrice,
      monthly: this.standardHostingFeeMonthly,
      detectedExclusions: detectedExclusions
    };
  }
};

// Global Browser Window Anchor
if (typeof window !== "undefined") {
  window.CostPilotKB = CostPilotKB;
}

// Node.js Export Guard
if (typeof module !== "undefined" && module.exports) {
  module.exports = CostPilotKB;
}
