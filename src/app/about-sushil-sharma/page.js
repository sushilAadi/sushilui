export const metadata = {
  title: "About Sushil Sharma | Front-end Developer | React, Next.js & WhatsApp Agents",
  description:
    "Sushil Sharma is a Front-end Developer with 6+ years of experience in React, Next.js, React Native and Supabase, and builds WhatsApp Cloud API agents. Available for hire.",
  alternates: {
    canonical: "https://sushildev.vercel.app/about-sushil-sharma",
  },
  openGraph: {
    title: "About Sushil Sharma | Front-end Developer",
    description:
      "Front-end Developer with 6+ years of experience specializing in React, Next.js and React Native, with WhatsApp Cloud API agents built on Supabase.",
    url: "https://sushildev.vercel.app/about-sushil-sharma",
    type: "profile",
  },
};

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Sushil Sharma",
    jobTitle: "Front-end Developer",
    url: "https://sushildev.vercel.app",
    email: "sushiluideveloper@gmail.com",
    description:
      "Front-end Developer with 6+ years of experience building scalable web and mobile applications using React, Next.js, React Native and Supabase, and WhatsApp Cloud API agents.",
    knowsAbout: [
      "React.js",
      "Next.js",
      "JavaScript",
      "Tailwind CSS",
      "Supabase",
      "Firebase",
      "Backend-as-a-Service (BaaS)",
      "REST APIs",
      "WhatsApp Cloud API",
      "Web Performance Optimization",
    ],
    sameAs: [
      "https://www.linkedin.com/in/sushil-sharma-ui-developer",
      "https://github.com/sushilsharma",
    ],
  },
};

export default function AboutSushilSharma() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />

      <main className="min-h-screen bg-white text-black">
        <article className="container mx-auto max-w-4xl px-6 py-20 md:py-28 font-matangi">
          <header className="mb-16">
            <h1 className="text-4xl md:text-6xl font-custom leading-tight mb-6">
              Sushil Sharma
            </h1>
            <p className="text-xl md:text-2xl text-gray-600">
              Front-end Developer &mdash; React, Next.js &amp; WhatsApp Agents
            </p>
          </header>

          <section className="mb-14" aria-labelledby="about-heading">
            <h2 id="about-heading" className="text-2xl md:text-3xl font-custom mb-6">
              About Sushil Sharma
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Sushil Sharma is a Front-end Developer with over 6 years of professional experience
              building scalable, high-performance web and mobile applications. He specializes in React.js,
              Next.js and React Native, with full-stack work in Supabase, the WhatsApp Cloud API and AI/LLM integrations.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Throughout his career, Sushil Sharma has delivered projects across fintech,
              e-commerce, and government sectors, focusing on performance, accessibility (WCAG 2.1 AA)
              and maintainable, modular interfaces.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Sushil Sharma is based in Guwahati, Assam, India and is available for
              full-time, contract, and freelance opportunities worldwide.
            </p>
          </section>

          <section className="mb-14" aria-labelledby="expertise-heading">
            <h2 id="expertise-heading" className="text-2xl md:text-3xl font-custom mb-6">
              Technical Expertise
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Frontend Development</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>React.js and Next.js</li>
                  <li>JavaScript (ES6+) and TypeScript</li>
                  <li>Tailwind CSS, Bootstrap, Shadcn UI</li>
                  <li>TanStack Query for data fetching</li>
                  <li>React Native for mobile apps</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Backend-as-a-Service (BaaS)</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>Supabase (Auth, Database)</li>
                  <li>Firebase and Clerk</li>
                  <li>REST APIs, WhatsApp Cloud API, Google Calendar and Sheets APIs</li>
                  <li>AI/LLM API integration</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Payments &amp; Authentication</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>OAuth, Supabase Auth, Firebase Auth, Clerk</li>
                  <li>Razorpay and Stripe payment flows</li>
                  <li>Multi-cryptocurrency payments and AES key storage (NVEST)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Performance &amp; Architecture</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>Lighthouse auditing and code splitting</li>
                  <li>WCAG 2.1 AA accessibility and ARIA</li>
                  <li>Reusable component libraries</li>
                  <li>PWA and Chrome extension development</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-14" aria-labelledby="experience-heading">
            <h2 id="experience-heading" className="text-2xl md:text-3xl font-custom mb-6">
              Professional Experience
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Sushil Sharma worked at Keuro Health and Technology LLP (2024&ndash;2026) on the Riyaah
              e-commerce platform and OMS admin panel, at FLOOID (2023&ndash;2024) on Centrum Wealth,
              HerKey PWA and EV-Ready India, at Cloudberry360 (2021&ndash;2023) on a payment dashboard,
              and at NVEST (2019&ndash;2021) on an Ethereum Chrome extension.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              He has also built two WhatsApp agents with the WhatsApp Cloud API, Next.js and Supabase:
              a doctor appointment system and a course enquiry and registration agent, each with an admin dashboard.
            </p>
          </section>

          <section className="mb-14" aria-labelledby="hiring-heading">
            <h2 id="hiring-heading" className="text-2xl md:text-3xl font-custom mb-6">
              Hiring Availability
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Sushil Sharma is actively open to new opportunities. He is best suited for roles including:
            </p>
            <ul className="text-lg text-gray-700 space-y-2 mb-6">
              <li>Front-end Developer</li>
              <li>React Developer</li>
              <li>Next.js Developer</li>
              <li>React Native Developer</li>
              <li>Full-stack Developer (Next.js and Supabase)</li>
              <li>WhatsApp Cloud API Developer</li>
            </ul>
            <p className="text-lg leading-relaxed text-gray-700">
              For inquiries, reach out via email at{" "}
              <a href="mailto:sushiluideveloper@gmail.com" className="text-red-600 hover:underline">
                sushiluideveloper@gmail.com
              </a>{" "}
              or connect on{" "}
              <a
                href="https://www.linkedin.com/in/sushil-sharma-ui-developer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:underline"
              >
                LinkedIn
              </a>.
            </p>
          </section>

          <footer className="border-t border-gray-200 pt-10 mt-14">
            <nav aria-label="Profile links" className="flex flex-wrap gap-6 text-sm text-gray-500">
              <a href="https://sushildev.vercel.app" className="hover:text-red-600 transition-colors">
                Portfolio
              </a>
              <a
                href="https://www.linkedin.com/in/sushil-sharma-ui-developer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-600 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/sushilsharma"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-600 transition-colors"
              >
                GitHub
              </a>
              <a href="mailto:sushiluideveloper@gmail.com" className="hover:text-red-600 transition-colors">
                sushiluideveloper@gmail.com
              </a>
            </nav>
            <p className="mt-4 text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Sushil Sharma. All rights reserved.
            </p>
          </footer>
        </article>
      </main>
    </>
  );
}
