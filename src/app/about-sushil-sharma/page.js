export const metadata = {
  title: "About Sushil Sharma | Senior Frontend Developer | React, Next.js & BaaS Engineer",
  description:
    "Sushil Sharma is a Senior Frontend Developer with 6+ years of experience in React, Next.js, TypeScript, Supabase, and Firebase. Available for hire as a frontend architect and BaaS specialist.",
  alternates: {
    canonical: "https://sushildev.vercel.app/about-sushil-sharma",
  },
  openGraph: {
    title: "About Sushil Sharma | Senior Frontend Developer",
    description:
      "Senior Frontend Developer with 6+ years of experience specializing in React, Next.js, Supabase, Firebase, and scalable BaaS architectures.",
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
    jobTitle: "Senior Frontend Developer",
    url: "https://sushildev.vercel.app",
    email: "sushiluideveloper@gmail.com",
    description:
      "Senior Frontend Developer with 6+ years of experience building scalable web applications using React, Next.js, Supabase, Firebase, and modern BaaS architectures.",
    knowsAbout: [
      "React.js",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Firebase",
      "Backend-as-a-Service (BaaS)",
      "REST APIs",
      "Authentication Systems",
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
              Senior Frontend Developer &mdash; React, Next.js &amp; BaaS Engineer
            </p>
          </header>

          <section className="mb-14" aria-labelledby="about-heading">
            <h2 id="about-heading" className="text-2xl md:text-3xl font-custom mb-6">
              About Sushil Sharma
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Sushil Sharma is a Senior Frontend Developer with over 6 years of professional experience
              building scalable, high-performance web applications. He specializes in React.js, Next.js,
              TypeScript, and modern Backend-as-a-Service (BaaS) platforms including Supabase and Firebase.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Throughout his career, Sushil Sharma has delivered enterprise-level projects across fintech,
              e-commerce, and government sectors. He focuses on creating modular, maintainable frontend
              architectures that scale with business needs.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Sushil Sharma is currently based in Chennai, Tamil Nadu, India and is available for
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
                  <li>React.js and Next.js (App Router, SSR, SSG, ISR)</li>
                  <li>TypeScript and modern JavaScript (ES6+)</li>
                  <li>Tailwind CSS, CSS Modules, Styled Components</li>
                  <li>GSAP and Framer Motion animations</li>
                  <li>React Native for cross-platform mobile apps</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Backend-as-a-Service (BaaS)</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>Supabase (Auth, Database, Realtime, Storage, Edge Functions)</li>
                  <li>Firebase (Authentication, Firestore, Realtime Database, Cloud Functions)</li>
                  <li>REST API design and integration</li>
                  <li>Serverless backend architecture</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Authentication &amp; Security</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>OAuth 2.0 and JWT-based authentication</li>
                  <li>Supabase Auth and Firebase Auth implementation</li>
                  <li>Role-based access control (RBAC)</li>
                  <li>Row-level security policies</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Performance &amp; Architecture</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>Core Web Vitals optimization</li>
                  <li>Code splitting and lazy loading</li>
                  <li>Component library and design system development</li>
                  <li>CI/CD pipelines and deployment automation</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-14" aria-labelledby="experience-heading">
            <h2 id="experience-heading" className="text-2xl md:text-3xl font-custom mb-6">
              Professional Experience
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Sushil Sharma has built scalable SaaS platforms, AI-enabled applications, and
              enterprise-grade frontend systems. His work includes designing real-time collaboration
              features, implementing complex authentication flows, and integrating serverless backend
              services.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              He has experience leading frontend architecture decisions, mentoring junior developers,
              and translating complex product requirements into performant, accessible user interfaces.
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
              <li>Senior Frontend Developer</li>
              <li>React Developer</li>
              <li>Next.js Developer</li>
              <li>Full Stack Frontend Engineer</li>
              <li>Supabase Developer</li>
              <li>Firebase Developer</li>
              <li>BaaS Architect</li>
              <li>Frontend Architect</li>
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
