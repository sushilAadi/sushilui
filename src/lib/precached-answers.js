// Pre-cached answers for common questions
// These don't require any API calls - works offline!

const CONTACT = `📞 Call/WhatsApp: +91 7892808101\n📧 Email: sushiluideveloper@gmail.com`;

export const precachedAnswers = {
  skills: {
    answer: `Sushil Sharma's core skills are React.js, Next.js, React Native, JavaScript (ES6+), HTML5, CSS3 and TypeScript. He styles with Tailwind CSS, Bootstrap and Shadcn UI, and uses TanStack Query for data fetching. On the integration side he works with REST APIs, the WhatsApp Cloud API, Google Calendar and Sheets APIs, Razorpay, Stripe, OAuth and Algolia. He builds with AI/LLM APIs (Vercel AI SDK, TanStack AI) and AI-assisted tools like Claude Code, Cursor and Codex. Backend-as-a-Service experience covers Supabase (Auth, Database), Firebase and Clerk. He follows WCAG 2.1 AA accessibility standards and has built PWAs and Chrome extensions.`,
    sources: ["Resume - Technical Skills"],
  },

  experience: {
    answer: `Sushil Sharma has 6+ years of experience as a Front-end Developer. Most recently he worked at Keuro Health and Technology LLP (Keuro Digital, September 2024 - September 2026), continuing the Riyaah e-commerce and OMS projects. Before that he was at FLOOID (Remote, August 2023 - August 2024) building Centrum Wealth, HerKey PWA and EV-Ready India. Earlier he worked at Cloudberry360 in Bengaluru (September 2021 - July 2023) on a payment dashboard and a reusable React component library, and at NVEST in Bengaluru (September 2019 - July 2021) on an Ethereum Chrome extension and crypto payments.`,
    sources: ["Resume - Professional Experience"],
  },

  projects: {
    answer: `Sushil has delivered Riyaah E-commerce (bilingual English/Arabic storefront with Algolia search) and the OMS admin panel at Keuro, and Centrum Wealth (fintech), HerKey PWA and EV-Ready India dashboards at FLOOID. He has also built two WhatsApp agents: a Doctor Appointment Agent (booking, cancellation, prescriptions, Google Calendar and Sheets sync, admin dashboard) and a Course Enquiry and Registration Agent for an engineering institute (66 courses in 6 categories, AI answers, registration and enrollment requests, admin panel). Both use the WhatsApp Cloud API, Next.js and Supabase.`,
    sources: ["Resume - Projects"],
  },

  whatsapp: {
    answer: `Sushil builds WhatsApp agents on the WhatsApp Cloud API with Next.js and Supabase. His Doctor Appointment Agent lets doctors onboard, block time and send prescription PDFs from chat, while patients book, cancel and rebook with live slots. Every booking syncs to Google Calendar and Google Sheets, and an admin dashboard shows the schedule and analytics. His Course Enquiry and Registration Agent lets students browse 66 courses in 6 categories, ask questions answered by AI, register and request enrollment, with an admin panel for payments, coupons and requests.\n\nWant one for your business?\n${CONTACT}`,
    sources: ["Resume - WhatsApp Projects"],
  },

  ai: {
    answer: `Sushil integrates AI/LLM APIs into products, for example the AI-generated answers in his institute enquiry agent, which are based on the course data. He works with the Vercel AI SDK and TanStack AI, applies prompt engineering, and uses AI-assisted development tools such as Claude Code, Cursor and Codex.`,
    sources: ["Resume - AI Skills"],
  },

  education: {
    answer: `Sushil Sharma holds a Master of Computer Applications (MCA) from New Horizon College of Engineering, Bengaluru (2018) and a Bachelor of Computer Applications (BCA) from Asian Institute of Management And Science, Guwahati (2014).`,
    sources: ["Resume - Education"],
  },

  contact: {
    answer: `You can reach Sushil Sharma at:\n📧 Email: sushiluideveloper@gmail.com\n📞 Phone: +91-7892808101\n🔗 LinkedIn: linkedin.com/in/sushil-sharma-ui-developer\n🌐 Portfolio: sushildev.vercel.app\n\nHe is based in Guwahati, India.`,
    sources: ["Resume - Contact Information"],
  },

  about: {
    answer: `Sushil Sharma is a Front-end Developer with 6+ years of experience building scalable React.js, Next.js and React Native applications for fintech, e-commerce and SaaS. He focuses on performance, accessibility (WCAG 2.1 AA), design systems, API integration and payment flows, and has full-stack experience with Supabase, the WhatsApp Cloud API and AI/LLM integrations.`,
    sources: ["Resume - Professional Summary"],
  },

  payments: {
    answer: `Sushil has worked with payment integrations including Razorpay and Stripe. At NVEST he integrated multi-cryptocurrency payments (Bitcoin, Ethereum and others) with real-time exchange rates over WebSocket APIs. At Cloudberry360 he built a payment system dashboard for high-volume monthly transactions. In his institute WhatsApp agent, students can make an optional registration payment that the admin verifies before issuing a discount coupon.`,
    sources: ["Resume - Technical Skills & Experience"],
  },

  frontend: {
    answer: `Sushil's primary stack is React.js, Next.js and React Native, with JavaScript (ES6+), HTML5, CSS3 and TypeScript. He styles with Tailwind CSS, Bootstrap and Shadcn UI with a focus on responsive design, and uses TanStack Query for data fetching. He optimizes performance with code splitting, Lighthouse auditing and client-side caching.`,
    sources: ["Resume - Frontend Development Skills"],
  },

  backend: {
    answer: `While primarily a front-end developer, Sushil works with Backend-as-a-Service platforms: Supabase (Auth, Database) and Firebase, plus Clerk for authentication. He integrates REST APIs, the WhatsApp Cloud API, Google Calendar and Sheets APIs, and AI/LLM APIs, and builds Next.js API routes for his WhatsApp agents.\n\nFor more details, contact Sushil at +91 7892808101 (WhatsApp available).`,
    sources: ["Resume - Backend Skills"],
  },

  devops: {
    answer: `Sushil uses Git and GitLab for version control and works with Supabase and Firebase as managed backends. He is always open to learning new tools based on project requirements.\n\nLet's discuss your project needs!\n${CONTACT}`,
    sources: ["Resume - Technical Skills"],
  },

  fullstack: {
    answer: `Sushil is a front-end developer moving into full-stack work. He has 6+ years of front-end experience with React.js, Next.js and React Native, and has built two full WhatsApp agents end to end with Next.js, Supabase and the WhatsApp Cloud API, including admin dashboards, Google Calendar and Sheets sync, and AI-generated answers.\n\nLet's discuss your project!\n${CONTACT}`,
    sources: ["Resume - Professional Summary"],
  },

  current: {
    answer: `Sushil's most recent role was Front-end Developer at Keuro Health and Technology LLP (September 2024 - September 2026), where he worked on the Riyaah e-commerce and OMS projects. He is now open to new opportunities in front-end and full-stack roles.\n\n${CONTACT}`,
    sources: ["Resume - Current Position"],
  },

  keuro: {
    answer: `At Keuro Health and Technology LLP (Keuro Digital, September 2024 - September 2026, Hybrid), Sushil continued the Riyaah and OMS projects after they transitioned from FLOOID. Riyaah is a multi-language e-commerce platform with Algolia-powered search and full English and Arabic support. OMS is an admin panel for managing high-volume orders, the product catalog, dynamic banners and inventory. He also improved accessibility to WCAG 2.1 AA across the platforms.`,
    sources: ["Resume - Keuro Experience"],
  },

  flooid: {
    answer: `At FLOOID (Remote, August 2023 - August 2024), Sushil worked on Centrum Wealth (a fintech platform for real-time investment tracking and portfolio analytics), HerKey PWA (an offline-first Progressive Web App for women professionals) and EV-Ready India (interactive dashboards for government stakeholders).`,
    sources: ["Resume - FLOOID Experience"],
  },

  cloudberry: {
    answer: `At Cloudberry360 (September 2021 - July 2023), Sushil worked on the Apexx payment system dashboard in React.js for high-volume monthly transactions. He built a library of reusable React components used across projects, improved website performance and Lighthouse scores, delivered responsive cross-browser websites, and converted Figma designs into pixel-accurate code.`,
    sources: ["Resume - Cloudberry360 Experience"],
  },

  nvest: {
    answer: `At NVEST (September 2019 - July 2021), Sushil developed a Chrome browser extension for Ethereum transactions. He improved the interface for complex crypto transactions, integrated with the Ethereum blockchain and multiple DApps, implemented secure private key storage using AES encryption, and integrated multi-cryptocurrency payments with real-time exchange rates over WebSocket APIs.`,
    sources: ["Resume - NVEST Experience"],
  },

  crypto: {
    answer: `Sushil gained cryptocurrency and blockchain experience at NVEST. He developed a Chrome browser extension for Ethereum transactions, integrated it with multiple DApps, implemented secure private key storage and recovery using AES encryption, and built multi-cryptocurrency payments (Bitcoin, Ethereum and others) with real-time exchange rates over WebSocket APIs.`,
    sources: ["Resume - Crypto Experience"],
  },

  accessibility: {
    answer: `Sushil follows WCAG 2.1 AA guidelines and uses ARIA roles for better screen reader support. At Keuro he improved accessibility across platforms, expanding reach and supporting inclusive design.`,
    sources: ["Resume - Accessibility"],
  },

  testing: {
    answer: `Sushil has experience with Jest and React Testing Library for unit and component testing in React applications.`,
    sources: ["Resume - Testing Skills"],
  },

  agile: {
    answer: `Sushil works in Agile and Scrum teams, collaborating with design and backend teams and delivering releases on schedule.`,
    sources: ["Resume - Methodologies"],
  },

  location: {
    answer: `Sushil Sharma is based in Guwahati, Assam, India (PIN 781020). He has worked remotely and in hybrid setups, and previously in Bengaluru at Cloudberry360 and NVEST.`,
    sources: ["Resume - Location"],
  },

  hire: {
    answer: `Sushil Sharma is a Front-end Developer with 6+ years of experience in React.js, Next.js and React Native, and has delivered projects for fintech, e-commerce and government sectors. He is open to full-time, contract and freelance work. Contact him at sushiluideveloper@gmail.com or +91-7892808101, or connect on LinkedIn: linkedin.com/in/sushil-sharma-ui-developer.`,
    sources: ["Resume - Contact & Summary"],
  },

  strengths: {
    answer: `Sushil's strengths include deep experience in the React ecosystem (React.js, Next.js, React Native), a strong focus on performance and accessibility (WCAG 2.1 AA), complex integrations (payments, blockchain, WhatsApp Cloud API, AI/LLM APIs), and Agile collaboration. He has delivered projects across fintech, e-commerce, government and SaaS.`,
    sources: ["Resume - Professional Summary"],
  },

  default: {
    answer: `I don't have specific information about that topic. However, you can reach out to Sushil directly for more details!\n\n${CONTACT}\n\nOr ask me about his skills, work experience, projects, education, or contact information.`,
    sources: ["Assistant"],
  },
};

// Check if question matches a pre-cached answer
export function getPrecachedAnswer(question) {
  const normalized = question.toLowerCase().trim();

  const patterns = [
    // Role-based questions (check FIRST)
    { match: /full.?stack|fullstack/i, key: "fullstack" },

    // Specific Technologies (check these before general skills)
    { match: /whatsapp|chatbot|chat.?bot|appointment|booking|institute|enquiry/i, key: "whatsapp" },
    { match: /\bai\b|llm|openai|gpt|vercel ai|tanstack ai|prompt|cursor|codex|claude/i, key: "ai" },
    { match: /devops|ci\/cd|docker|kubernetes|jenkins|aws|azure|gcp|cloud|deploy|infrastructure/i, key: "devops" },
    { match: /supabase|firebase|backend|database|server|postgres/i, key: "backend" },
    { match: /react|next\.?js|javascript|typescript|html|css|tailwind|frontend|front-end/i, key: "frontend" },
    { match: /test|jest|testing/i, key: "testing" },
    { match: /access|wcag|aria|screen.?reader|inclusive/i, key: "accessibility" },
    { match: /payment|razorpay|stripe|transaction|pay/i, key: "payments" },
    { match: /crypto|bitcoin|ethereum|blockchain|web3|dapp/i, key: "crypto" },

    // Experience (check before general skills)
    { match: /experience|work|job|career|history|years|how long/i, key: "experience" },
    { match: /keuro|riyaah|oms/i, key: "keuro" },
    { match: /flooid|herkey|centrum|ev.?ready/i, key: "flooid" },
    { match: /current|now|present|today|working|remote/i, key: "current" },
    { match: /cloudberry|apexx/i, key: "cloudberry" },
    { match: /nvest|chrome.?extension/i, key: "nvest" },

    // Projects
    { match: /project|built|develop|create|portfolio/i, key: "projects" },

    // Personal Info
    { match: /education|degree|college|university|study|qualification|mca|bca/i, key: "education" },
    { match: /contact|email|phone|reach|linkedin|connect|talk/i, key: "contact" },
    { match: /location|where|city|based|live|guwahati|bengaluru/i, key: "location" },

    // General
    { match: /^(who|about|tell|introduce|summary|describe|what does)/i, key: "about" },
    { match: /agile|scrum|methodology|team|collaborate/i, key: "agile" },
    { match: /hire|recruit|opportunity|job|position|available/i, key: "hire" },
    { match: /strength|good at|best|excel|strong/i, key: "strengths" },

    // General Skills (check LAST - this is a catch-all for skill-related questions)
    { match: /skill|tech|stack|expertise|technologies|proficient|capable/i, key: "skills" },

    // Catch-all for greetings and unclear questions
    { match: /^(hi|hello|hey|help|what can)/i, key: "default" },
  ];

  for (const pattern of patterns) {
    if (pattern.match.test(normalized)) {
      return precachedAnswers[pattern.key];
    }
  }

  // Return default response for unknown questions
  return precachedAnswers.default;
}
