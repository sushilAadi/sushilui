// Import service logos
import acc2 from "@/images/ServiceLogo/acc2.jpg";
import access from "@/images/ServiceLogo/access.jpg";
import APIIntegrationBlogHeader from "@/images/ServiceLogo/API-Integration-Blog-header.webp";
import api2 from "@/images/ServiceLogo/api2.png";
import Collab1 from "@/images/ServiceLogo/Collab1.jpg";
import collaboratio2 from "@/images/ServiceLogo/collaboratio2.webp";
import Mobile1 from "@/images/ServiceLogo/Mobile1.jpg";
import mobile2 from "@/images/ServiceLogo/mobile2.jpg";
import modernDashboardWebsite from "@/images/ServiceLogo/modernDashboardWebsite.webp";
import modernWeb from "@/images/ServiceLogo/modernWeb.jpg";
import modernWebsite from "@/images/ServiceLogo/modernWebsite.webp";
import responsive from "@/images/ServiceLogo/responsive.jpg";
import responsive1 from "@/images/ServiceLogo/responsive1.jpg";
import SEO1 from "@/images/ServiceLogo/SEO1.webp";
import seo2 from "@/images/ServiceLogo/seo2.webp";
import videoframe_6977 from "@/images/ServiceLogo/videoframe_6977.png";
import web1 from "@/images/ServiceLogo/web1.jpg";
import web2 from "@/images/ServiceLogo/web2.jpg";
import web3 from "@/images/ServiceLogo/web3.jpg";

export const serviceImages = {
  acc2,
  access,
  APIIntegrationBlogHeader,
  api2,
  Collab1,
  collaboratio2,
  Mobile1,
  mobile2,
  modernDashboardWebsite,
  modernWeb,
  modernWebsite,
  responsive,
  responsive1,
  SEO1,
  seo2,
  videoframe_6977,
  web1,
  web2,
  web3,
};

// Import tech stack images
import html from "@/images/techStack/html.png";

// Import company logos
import flooidLogo from "@/images/company Logo/flooid.jpeg";
import cloudberryLogo from "@/images/company Logo/cloudberry.png";
import nvestLogo from "@/images/company Logo/8.png";
import apexxLogo from "@/images/company Logo/apexx-logo.jpg";
import keuroLogo from "@/images/company Logo/keuro.png";
import css from "@/images/techStack/css.webp";
import js from "@/images/techStack/js.webp";
import react from "@/images/techStack/React.png";
import reactNative from "@/images/techStack/reactnative.svg";
import nextjs from "@/images/techStack/nextjs.png";
import tailwind from "@/images/techStack/tailwind.png";
import tailwind_css from "@/images/techStack/Tailwind_CSS.png";
import bootstrap from "@/images/techStack/Bootstrap_logo.png";
import shadcn from "@/images/techStack/shadcn.png";
import shadcnc from "@/images/techStack/shadcnc.webp";
import tanstack from "@/images/techStack/Tanstack logo.webp";
import redux from "@/images/techStack/redux.svg";
import zustand from "@/images/techStack/zustand.png";
import supabase from "@/images/techStack/supabase.png";
import supabasedb from "@/images/techStack/supabasedb.png";
import algolia from "@/images/techStack/Algolia.svg";
import Algolia_logo from "@/images/techStack/Algolia_logo.png";
import jest from "@/images/techStack/Jest.png";
import reactTesting from "@/images/techStack/reacttesting.png";
import storybook from "@/images/techStack/StoryBook.png";
import figma from "@/images/techStack/Figma.png";
import adobeXD from "@/images/techStack/AdobeXD.png";
import Image from "next/image";

import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export const logos = [
  {
    icon: <Image src={html} alt="HTML" width={48} height={48} />,
    label: "HTML",
  },
  {
    icon: <Image src={css} alt="CSS" width={48} height={48} />,
    label: "CSS",
  },
  {
    icon: <Image src={js} alt="JavaScript" width={48} height={48} />,
    label: "JavaScript",
  },
  {
    icon: <Image src={react} alt="React" width={48} height={48} />,
    label: "React",
  },
  {
    icon: <Image src={reactNative} alt="React Native" width={48} height={48} />,
    label: "React Native",
  },
  {
    icon: <Image src={nextjs} alt="Next.js" width={48} height={48} />,
    label: "Next.js",
  },
  {
    icon: <Image src={tailwind} alt="Tailwind CSS" width={48} height={48} />,
    label: "Tailwind",
  },
  {
    icon: <Image src={bootstrap} alt="Bootstrap" width={48} height={48} />,
    label: "Bootstrap",
  },
  {
    icon: <Image src={shadcn} alt="Shadcn UI" width={48} height={48} />,
    label: "Shadcn",
  },
  {
    icon: <Image src={tanstack} alt="Tanstack" width={48} height={48} />,
    label: "Tanstack",
  },
  {
    icon: <Image src={zustand} alt="Zustand" width={48} height={48} />,
    label: "Zustand",
  },
  {
    icon: <Image src={redux} alt="Redux" width={48} height={48} />,
    label: "Redux",
  },
  {
    icon: <Image src={supabase} alt="Supabase" width={48} height={48} />,
    label: "Supabase",
  },
  {
    icon: <Image src={algolia} alt="Algolia" width={48} height={48} />,
    label: "Algolia",
  },
  {
    icon: <Image src={jest} alt="Jest" width={48} height={48} />,
    label: "Jest",
  },
  {
    icon: (
      <Image
        src={reactTesting}
        alt="React Testing Library"
        width={48}
        height={48}
      />
    ),
    label: "RTL",
  },
  {
    icon: <Image src={storybook} alt="Storybook" width={48} height={48} />,
    label: "Storybook",
  },
  // {
  //   icon: <Image src={figma} alt="Figma" width={48} height={48} />,
  //   label: "Figma",
  // },
  // {
  //   icon: <Image src={adobeXD} alt="Adobe XD" width={48} height={48} />,
  //   label: "Adobe XD",
  // },
];

export const frameworkAndPackage = [
  { icon: html, label: "HTML" },
  { icon: css, label: "CSS" },
  { icon: js, label: "JavaScript" },
  { icon: react, label: "React" },
  { icon: reactNative, label: "React Native" },
  { icon: nextjs, label: "Next.js" },
  { icon: tanstack, label: "Tanstack" },
  { icon: tailwind_css, label: "Tailwind" },
];

export const frameworkAndPackageOne = [
  { icon: bootstrap, label: "Bootstrap" },
  { icon: shadcnc, label: "Shadcn" },
  { icon: supabasedb, label: "Supabase" },
  { icon: Algolia_logo, label: "Algolia" },
  { icon: zustand, label: "Zustand" },
  { icon: redux, label: "Redux" },
  { icon: jest, label: "Jest" },
  { icon: reactTesting, label: "React Testing Library" },
  { icon: storybook, label: "Storybook" },
  { icon: figma, label: "Figma" },
  { icon: adobeXD, label: "Adobe XD" },
];

export const features = [
    {
      title: "Build Modern Web Interfaces",
      description:
        "I create interactive, performance-optimized web applications and sites using React, Next.js, and today's best UI frameworks. My work covers everything from pixel-perfect layouts to smooth interactions.",
      icon: <IconTerminal2 />,
       images: [
        {
          src: serviceImages.modernWebsite.src,
          alt: "Image 1",
        },
        {
          src: serviceImages.modernWeb.src,
          alt: "Image 2",
        },
      ],
    },
    {
      title: "Develop Mobile User Experiences",
      description:
        "Need your app on mobile? I implement fast, consistent, and visually appealing interfaces using React Native.",
      icon: <IconEaseInOut />,
      images: [
        {
          src: serviceImages.Mobile1.src,
          alt: "Image 1",
        },
        {
          src: serviceImages.mobile2.src,
          alt: "Image 2",
        },
      ],
    },
    {
      title: "Integrate API & Cloud Services",
      description:
        "I connect your frontend to cloud databases (Supabase, Firebase) for dynamic content and features like authentication—no backend coding required, just efficient client-side integration.",
      icon: <IconCloud />,
      images: [
        {
          src: serviceImages.APIIntegrationBlogHeader.src,
          alt: "Image 1",
        },
        {
          src: serviceImages.api2.src,
          alt: "Image 2",
        },
      ],
    },
    {
      title: "Turn Designs into Live Products",
      description: "Have your designs in Figma or XD? I bring them to life, translating mockups into robust code with attention to detail, accessibility, and usability.",
      icon: <IconAdjustmentsBolt />,
       images: [
        {
          src: serviceImages.web1.src,
          alt: "Image 1",
        },
        {
          src: serviceImages.web2.src,
          alt: "Image 2",
        },
      ],
    },
    {
      title: "Collaborate Efficiently",
      description: "I work directly with backend developers and designers, ensuring clean handoff and seamless product delivery.",
      icon: <IconRouteAltLeft />,
       images: [
        {
          src: serviceImages.Collab1.src,
          alt: "Image 1",
        },
        {
          src: serviceImages.collaboratio2.src,
          alt: "Image 2",
        },
      ],
    },
    {
      title: "Optimize Performance & SEO",
      description:
        "I enhance your site's speed, Core Web Vitals, and search visibility through code optimization, lazy loading, and modern SEO best practices.",
      icon: <IconCurrencyDollar />,
       images: [
        {
          src: serviceImages.SEO1.src,
          alt: "Image 1",
        },
        {
          src: serviceImages.seo2.src,
          alt: "Image 2",
        },
      ],
    },
    {
      title: "Implement Responsive Design",
      description:
        "Your site will look stunning on every device. I build mobile-first, responsive layouts that adapt seamlessly across all screen sizes.",
      icon: <IconHelp />,
       images: [
        {
          src: serviceImages.responsive.src,
          alt: "Image 1",
        },
        {
          src: serviceImages.responsive1.src,
          alt: "Image 2",
        },
      ],
    },
    {
      title: "Ensure Accessibility & Quality",
      description: "I follow WCAG standards and modern web practices to deliver inclusive, maintainable code that serves all users effectively.",
      icon: <IconHeart />,
       images: [
        {
          src: serviceImages.acc2.src,
          alt: "Image 1",
        },
        {
          src: serviceImages.access.src,
          alt: "Image 2",
        },
      ],
    },
  ];

export const testimonials = [
  {
    id: 1,
    quote: "Worked with Sushil on our e-commerce redesign. He picked up our Figma files quickly and delivered the pages on time. The mobile experience improved a lot after the update.",
    author: "Priya Mehta",
    role: "Product Lead",
    company: "RetailX",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmVzc2lvbmFsJTIwd29tYW58ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    quote: "Sushil helped us build our dashboard in Next.js and handled the API integration smoothly. Communication was easy and things moved without delays.",
    author: "Karan Singh",
    role: "Engineering Manager",
    company: "DataMetrics",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2Zlc3Npb25hbCUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
  id: 3,
  quote: "We brought Sushil in to fix performance issues in our web app first, and later the React Native mobile app. He cleaned up a few problem areas and both run much smoother now.",
  author: "Vikram Desai",
  role: "Founder",
  company: "HealthTech Startup",
  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmVzc2lvbmFsJTIwbWFufGVufDB8fDB8fHww",
}
,
];


export const companyDetails = [
  {
    id: 1,
    name: "FLOOID (Keuro)",
    logo: flooidLogo,
    secondaryLogo: keuroLogo,
    role: "Front-end Developer",
    type: "Remote",
    duration: "August 2023 - Present",
    projects: [
      "Riyaah Ecommerce",
      "OMS Order Management",
      "EV-Ready India (OMI Foundation)",
      "HerKey PWA",
      "Centrum Wealth",
    ],
    description:
      "Led front-end development for enterprise platforms (Fintech, PWA, Government, E-Commerce), driving performance improvements and user experience.",
  },
  {
    id: 2,
    name: "Cloudberry360",
    logo: cloudberryLogo,
    secondaryLogo: apexxLogo,
    role: "Front-end Developer",
    type: "Bengaluru, India",
    duration: "September 2021 - July 2023",
    projects: ["Apexx Payment Dashboard", "Client Projects", "Component Library"],
    description:
      "Developed and maintained internal payment system dashboard using React.js, built reusable component library, and improved website performance across client projects.",
  },
  {
    id: 3,
    name: "NVEST",
    logo: nvestLogo,
    role: "Front-end Developer",
    type: "Bengaluru, India",
    duration: "September 2019 - July 2021",
    projects: ["Ethereum Chrome Extension", "Crypto Wallet UI", "Multi-currency Payments"],
    description:
      "Developed Chrome browser extension for seamless Ethereum transactions, enhanced UI for crypto transactions, and implemented secure private key storage using AES encryption.",
  },
];
