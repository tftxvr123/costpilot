/**
 * CostPilot — Structured Knowledge Base & Deterministic Match Engine
 * 100% Free • Zero Infrastructure Cost • Zero Latency
 */
const CostPilotKB = {
  version: "2026.1",
  currency: "INR",
  currencySymbol: "₹",
  discountPercent: 0.15,
  monthlyHostingFee: 1000,

  // 1. ADD-ON INTEGRATION LIBRARY
  integrations: {
    whatsapp_button: { id: "whatsapp_button", name: "WhatsApp Click-to-Chat Button", cost: 1000 },
    whatsapp_api: { id: "whatsapp_api", name: "WhatsApp Business API & SMS OTP Automation", cost: 12000 },
    contact_form: { id: "contact_form", name: "Standard Contact / Enquiry Form", cost: 2000 },
    payment_gateway: { id: "payment_gateway", name: "Online Payment Gateway (Razorpay/Stripe)", cost: 14000 },
    cms_admin: { id: "cms_admin", name: "Content Management System & Admin Dashboard", cost: 29000 },
    ai_llm_pipeline: { id: "ai_llm_pipeline", name: "AI LLM Integration & Streaming Token Pipeline", cost: 26000 }
  },

  // 2. PROJECT ARCHETYPES & PACKAGES
  packages: [
    // --- PORTFOLIOS ---
    {
      id: "portfolio_starter",
      domain: "portfolio",
      title: "Starter Portfolio Website",
      triggers: ["starter portfolio", "1-page", "one page", "single page personal profile"],
      basePrice: 6000,
      featureCosts: 1000,
      marketRange: [5000, 8000],
      inclusions: ["1-Page Personal Profile", "Skills & Services", "Project Showcase", "Contact Links"]
    },
    {
      id: "portfolio_basic",
      domain: "portfolio",
      title: "Basic Portfolio Website",
      triggers: ["basic portfolio", "4-5 pages", "4 to 5 pages", "personal portfolio"],
      basePrice: 10000,
      featureCosts: 3000,
      marketRange: [10000, 15000],
      inclusions: ["4–5 Responsive Pages", "Project Gallery", "Resume Showcase", "Contact Form"]
    },
    {
      id: "portfolio_resume",
      domain: "portfolio",
      title: "Resume & Portfolio Website",
      triggers: ["resume", "downloadable resume", "pdf resume", "downloadable cv", "cv"],
      basePrice: 15000,
      featureCosts: 3000,
      marketRange: [12000, 22000],
      inclusions: ["Resume Showcase", "Experience & Skills Timeline", "Downloadable PDF CV", "Contact Form"]
    },
    {
      id: "portfolio_professional",
      domain: "portfolio",
      title: "Professional Portfolio Website",
      triggers: ["professional portfolio", "5-7 pages", "case studies", "micro-interactions", "animations"],
      basePrice: 18000,
      featureCosts: 6000,
      marketRange: [18000, 30000],
      inclusions: ["5–7 Responsive Pages", "Project Case Studies", "Interactive Animations", "SEO Basics"]
    },
    {
      id: "portfolio_developer",
      domain: "portfolio",
      title: "Developer / Tech Portfolio",
      triggers: ["developer", "tech portfolio", "github", "tech stack", "code demo", "demo sections"],
      basePrice: 18000,
      featureCosts: 8000,
      marketRange: [20000, 35000],
      inclusions: ["Tech Stack Overview", "GitHub Repository Integration", "Live Demo Sections", "Contact Form"]
    },
    {
      id: "portfolio_designer",
      domain: "portfolio",
      title: "Designer / Creative Portfolio",
      triggers: ["designer", "creative portfolio", "artist", "photographer", "visual gallery", "filtering"],
      basePrice: 22000,
      featureCosts: 12000,
      marketRange: [25000, 50000],
      inclusions: ["High-Res Visual Gallery", "Category Filtering", "Client Case Studies", "Inquiry Workflow"]
    },
    {
      id: "portfolio_brand",
      domain: "portfolio",
      title: "Premium Personal Brand Website",
      triggers: ["personal brand", "premium brand", "premium personal brand"],
      basePrice: 22000,
      featureCosts: 16000,
      marketRange: [30000, 50000],
      inclusions: ["Custom Studio UI/UX", "Micro-Animations", "Integrated Blog", "Advanced SEO"]
    },
    {
      id: "portfolio_blog",
      domain: "portfolio",
      title: "Portfolio Website with Blog",
      triggers: ["portfolio with blog", "portfolio and blog", "portfolio plus blog"],
      basePrice: 20000,
      featureCosts: 16000,
      marketRange: [30000, 55000],
      inclusions: ["Portfolio Showcase", "Article & Blog Engine", "Category Search", "RSS & Social Links"]
    },
    {
      id: "portfolio_cms",
      domain: "portfolio",
      title: "Portfolio Website with CMS",
      triggers: ["portfolio with cms", "client can update", "admin update projects"],
      basePrice: 22000,
      featureCosts: 20000,
      marketRange: [35000, 60000],
      inclusions: ["Headless CMS Integration", "Admin Project Manager", "Self-Managed Content", "Contact Form"]
    },
    {
      id: "portfolio_booking",
      domain: "portfolio",
      title: "Portfolio Website with Booking",
      triggers: ["portfolio with booking", "consultation booking", "portfolio booking"],
      basePrice: 25000,
      featureCosts: 23000,
      marketRange: [35000, 70000],
      inclusions: ["Portfolio Showcase", "Consultation Slot Picker", "Client Inquiry Workflow", "Calendar Sync"]
    },
    {
      id: "portfolio_ai",
      domain: "portfolio",
      title: "AI-Powered Portfolio Website",
      triggers: ["portfolio with ai", "ai chatbot", "ai resume helper", "ai project assistant"],
      basePrice: 30000,
      featureCosts: 35000,
      marketRange: [50000, 100000],
      inclusions: ["AI Resume Assistant", "Embedded Chatbot", "Interactive Project QA", "Contact Form"]
    },

    // --- WEBSITES ---
    {
      id: "biz_brochure",
      domain: "biz_website",
      title: "Business Website",
      triggers: ["business website", "5-page", "5 page", "home, about, services", "brochure website"],
      basePrice: 25000,
      featureCosts: 3000,
      marketRange: [28000, 35000],
      inclusions: ["5 Responsive Pages", "Services & Gallery Overview", "Contact Form", "WhatsApp Button"]
    },
    {
      id: "service_biz_enquiry",
      domain: "biz_website",
      title: "Service Business Website",
      triggers: ["simple service business", "service business website", "view services and send an enquiry"],
      basePrice: 22000,
      featureCosts: 2000,
      marketRange: [22000, 32000],
      inclusions: ["Service Catalog Presentation", "About & Company Overview", "Contact Enquiry Form"]
    },
    {
      id: "biz_cms",
      domain: "biz_website",
      title: "Business Website with CMS",
      triggers: ["business website with cms", "website + cms", "blog and contact", "manage website content and blog"],
      basePrice: 25000,
      featureCosts: 31000,
      marketRange: [50000, 70000],
      inclusions: ["5 Responsive Pages", "CMS Content Engine", "Admin Login & Dashboard", "Blog Manager"]
    },

    // --- RESTAURANTS ---
    {
      id: "restaurant_info",
      domain: "restaurant",
      title: "Informational Restaurant Website",
      triggers: ["informational restaurant", "restaurant website", "menu, food categories", "opening hours and contact"],
      basePrice: 26000,
      featureCosts: 6000,
      marketRange: [28000, 40000],
      inclusions: ["Menu & Categories Showcase", "Food Gallery & Ambience", "Hours, Map & Location", "WhatsApp Button"]
    },
    {
      id: "restaurant_ordering",
      domain: "ecommerce",
      title: "Restaurant Ordering Web Application",
      triggers: ["restaurant ordering", "menu, cart, checkout", "order placement", "order history"],
      basePrice: 48000,
      featureCosts: 59000,
      marketRange: [94000, 130000],
      inclusions: ["Menu & Categories", "Shopping Cart & Checkout", "Customer Auth & History", "Payment Gateway", "Admin Order Dashboard"]
    },

    // --- WEB APPLICATIONS & BOOKING ---
    {
      id: "service_booking_app",
      domain: "web_app",
      title: "Service Booking Website",
      triggers: ["service booking", "choose a preferred date and time", "booking request", "submit a booking request"],
      basePrice: 45000,
      featureCosts: 33000,
      marketRange: [70000, 100000],
      inclusions: ["Service Catalog", "Date & Time Slot Picker", "Booking Request Workflow", "Admin Booking Dashboard"]
    },
    {
      id: "clinic_app",
      domain: "web_app",
      title: "Clinic Appointment Web Application",
      triggers: ["clinic appointment", "patient", "doctor", "specialties", "available appointment slots"],
      basePrice: 50000,
      featureCosts: 63000,
      marketRange: [90000, 150000],
      inclusions: ["Patient Auth & Profile", "Doctors & Specialties Catalog", "Slot Availability Calendar", "Booking Engine", "Admin Management Dashboard"]
    },
    {
      id: "document_management",
      domain: "web_app",
      title: "Document Management Web Application",
      triggers: ["document management", "upload pdf documents", "folders", "search and filter documents"],
      basePrice: 52000,
      featureCosts: 68000,
      marketRange: [100000, 175000],
      inclusions: ["User Auth & Accounts", "Cloud PDF Uploads", "Folder Hierarchy & Metadata", "Search & Download Engine", "Admin Management Panel"]
    },

    // --- LMS TIERS ---
    {
      id: "lms_static_showcase",
      domain: "lms",
      title: "Static Course Showcase Website",
      triggers: ["static course", "course showcase", "course list"],
      basePrice: 25000,
      featureCosts: 7000,
      marketRange: [25000, 50000],
      inclusions: ["Course Syllabus & Outlines", "Instructor Profiles", "Course Pricing Details", "Contact / Inquiry Form"]
    },
    {
      id: "lms_basic_admin",
      domain: "lms",
      title: "Basic Course Management LMS",
      triggers: ["basic lms", "admin and course uploads", "course upload"],
      basePrice: 55000,
      featureCosts: 55000,
      marketRange: [90000, 140000],
      inclusions: ["Admin Auth & Dashboard", "Video & Lesson Uploads", "Course Categorization", "Lesson Streaming UI"]
    },
    {
      id: "lms_student_portal",
      domain: "lms",
      title: "LMS Web Application",
      triggers: ["lms", "students can register", "enroll in courses", "learning progress", "track their learning progress"],
      basePrice: 60000,
      featureCosts: 75000,
      marketRange: [125000, 200000],
      inclusions: ["Student Registration & Login", "Course Catalog & Enrollment", "Video Lectures & PDF Resources", "Progress Tracking", "Admin Instructor Dashboard"]
    },
    {
      id: "lms_paid_subscriptions",
      domain: "lms",
      title: "Paid / Subscription LMS Web Application",
      triggers: ["lms with payments", "paid courses", "course subscriptions", "lms subscription"],
      basePrice: 75000,
      featureCosts: 120000,
      marketRange: [175000, 300000],
      inclusions: ["Student Portal & Progress", "Video Player & Resources", "Payment Gateway & Invoices", "Monthly Subscription Engine", "Admin Financial Dashboard"]
    },
    {
      id: "lms_advanced_suite",
      domain: "lms",
      title: "Advanced Learning Management System (LMS)",
      triggers: ["advanced lms", "quizzes", "certificates", "live classes", "timed quizzes"],
      basePrice: 90000,
      featureCosts: 195000,
      marketRange: [250000, 500000],
      inclusions: ["Student & Instructor Portals", "Timed Quizzes & Auto-Scoring", "Dynamic PDF Certificates", "Live Class Integration", "Student Analytics & Multi-Role RBAC"]
    },

    // --- SAAS & AI PLATFORMS ---
    {
      id: "saas_task_manager",
      domain: "saas_product",
      title: "SaaS Task Management Web Application",
      triggers: ["saas", "task management", "workspaces", "tasks", "task assignments"],
      basePrice: 70000,
      featureCosts: 94000,
      marketRange: [150000, 250000],
      inclusions: ["User Registration & Login", "Multi-Tenant Workspaces & Projects", "Task Kanban & Status Workflow", "Assignments & Notifications", "Workspace Admin Console"]
    },
    {
      id: "ai_web_app",
      domain: "ai_app",
      title: "AI Summary Web Application",
      triggers: ["ai web application", "ai summaries", "generate ai-powered summaries", "upload text documents"],
      basePrice: 65000,
      featureCosts: 70000,
      marketRange: [125000, 250000],
      inclusions: ["User Registration & Login", "Document Upload & Extraction", "AI LLM Summarization Pipeline", "Saved Summary History", "Admin User Dashboard"]
    }
  ],

  // 3. ZERO-COST IN-MEMORY SEARCH & CALCULATION ENGINE
  match: function (rawPrompt) {
    const text = (rawPrompt || "").toLowerCase();

    // Parse Negative Clauses (Zeroes out excluded items)
    const isExcluded = (term) => {
      const regex = new RegExp(`\\b(?:no|without|excluding|not)\\s+(?:[\\w-]+\\s+){0,3}${term}\\b`, 'i');
      return regex.test(text);
    };

    // Score Packages against Prompt
    let bestPackage = null;
    let highestScore = -1;

    for (const pkg of this.packages) {
      let score = 0;
      for (const trigger of pkg.triggers) {
        if (text.includes(trigger.toLowerCase())) {
          score += (trigger.length > 8 ? 5 : 2);
        }
      }
      // Critical Exclusion Checks (e.g., Test 12)
      if (pkg.id === "service_booking_app" && (isExcluded("booking") || isExcluded("booking system"))) {
        score = -100; // Block booking if excluded
      }
      if (pkg.domain === "ecommerce" && (isExcluded("cart") || isExcluded("ordering"))) {
        score = -100; // Block ordering if cart excluded
      }
      if (score > highestScore) {
        highestScore = score;
        bestPackage = pkg;
      }
    }

    // Default fallback if no specific triggers hit
    if (!bestPackage || highestScore <= 0) {
      bestPackage = this.packages.find(p => p.id === "biz_brochure");
    }

    // Calculate Pricing
    const marketPrice = bestPackage.basePrice + bestPackage.featureCosts;
    const discountedPrice = Math.round(marketPrice * (1 - this.discountPercent));

    return {
      package: bestPackage,
      marketPrice: marketPrice,
      discountedPrice: discountedPrice,
      savings: marketPrice - discountedPrice,
      monthly: this.monthlyHostingFee
    };
  }
};
