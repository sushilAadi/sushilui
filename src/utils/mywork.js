import RiyaahWEB from "../images/Project/riyaaah_web.webp";
import NeeedArchi from "../images/Project/neeedArchi.webp";
import EvDashboard from "../images/Project/OMI.webp";
import OrderManagement from "../images/ServiceLogo/modernWebsite.webp";
import HerKey from "../images/Project/herkey.webp";
import Centrum from "../images/Project/wealthverseweb.png";
import WealthVerseApp from "../images/Project/WealthVerseApp.png";
import Apexx from "../images/Project/apexx.svg";
import NeBiofuels from "../images/Project/fitness.webp";
import Tutoring from "../images/Project/tutoring.webp";
import CryptoX from "../images/Project/crypto.webp";
import MetaMask from "../images/Project/metamask.webp";

export const allProjects = [
  {
    id: '01',
    category: 'WEBSITE',
    title: 'Riyaah E-Commerce',
    projectUrl: 'https://riyaah.sa/en',
    status: 'live',
    techStack: ['Next.js', 'CSS', 'Tailwind', 'Algolia','React Query'],
    Image: RiyaahWEB,
    highlight: 'E.',
    description: 'Multi-language e-commerce platform with Algolia-powered lightning-fast search and seamless English-Arabic support, delivering excellent UX for high-volume shoppers.',
    developmentType: 'Frontend',
    gridArea: 'span 2 / span 2', // Featured Item
    isBig: true,
    client:"Saudi Arabia",
    map:"image url"
  },
  {
    id: '02',
    category: 'WEBSITE',
    title: 'Order Management',
    projectUrl: 'https://riyaah-oms-prod.access.keurolife.com/',
    status: 'private',
    techStack: ['ReactJS', 'Tailwind', 'Algolia','React Query'],
    Image: "",
    highlight: 'P.',
    description: "Comprehensive admin panel for managing orders, product catalog, dynamic banners, and inventory optimizing Riyaah's backend workflows.",
    developmentType: 'Frontend',
    gridArea: 'span 1 / span 1',
    client:"Saudi Arabia",
    map:"image url"
  },
  {
    id: '03',
    category: 'WEBSITE',
    title: 'EV-Ready Dashboard',
    projectUrl: 'https://evreadyindia.org/',
    status: 'private',
    techStack: ['NextJS', 'CSS', 'Tailwind'],
    Image: EvDashboard,
    highlight: 'C.',
    description: 'Interactive dashboard visualizing EV ecosystem metrics across states, empowering government stakeholders with data-driven policy insights.',
    developmentType: 'Frontend',
    gridArea: 'span 1 / span 1',
    client:"India",
    map:"image url",
    bgColor:"#000002"
  },
  {
    id: '04',
    category: 'PWA',
    title: 'HerKey',
    projectUrl: 'https://www.herkey.com/',
    status: 'live',
    techStack: ['ReactJS', 'CSS', 'Tailwind'],
    Image: HerKey,
    highlight: 'B.',
    description: 'Progressive Web App designed for women professionals focusing on job matching and mentorship with offline-first architecture and top Lighthouse scores.',
    developmentType: 'Frontend',
    gridArea: 'span 1 / span 1',
    client:"India",
    map:"image url",
    bgColor:"#925070"
  },
  {
    id: '05',
    category: 'WEBSITE',
    title: 'Centrum Wealthverse',
    projectUrl: 'https://wealthverse.centrumwealth.co.in',
    status: 'private',
    techStack: ['ReactJS','Tailwind','Redux'],
    Image: Centrum,
    highlight: 'T.',
    description: 'Fintech platform offering real-time investment tracking, portfolio management, and wealth analytics with performance-optimized code splitting.',
    developmentType: 'Frontend',
    gridArea: 'span 1 / span 1',
    client:"India",
    map:"image url",
    bgColor: "black"
  },
  {
    id: '06',
    category: 'APP',
    title: 'Wealthverse Mobile',
    projectUrl: 'https://apps.apple.com/in/app/wealthverse/id6443810791',
    status: 'private',
    techStack: ['React-Native','Redux'],
    Image: WealthVerseApp,
    highlight: 'S.',
    description: 'Mobile app providing seamless wealth management and investment monitoring on-the-go, built using React Native for native performance.',
    developmentType: 'Frontend',
    gridArea: 'span 1 / span 1',
    client:"India",
    map:"image url"
  },
  {
    id: '07',
    category: 'WEBSITE',
    title: 'Apexx',
    projectUrl: '',
    status: 'private',
    techStack: ['ReactJS','SCSS', 'Jest', 'React Testing Library'],
    Image: Apexx,
    highlight: 'F.',
    description: 'Internal payment system dashboard for high-volume transactions with real-time data visualization, enhancing payment monitoring efficiency.',
    developmentType: 'Frontend',
    gridArea: 'span 1 / span 1',
    client:"London",
    map:"image url"
  },
  {
    id: '08',
    category: 'PWA',
    title: 'NEEED FIT',
    projectUrl: '',
    status: 'work-in-progress',
    techStack: ['NextJS', 'Firebase', 'Clerk','Gemini API'],
    Image: NeBiofuels,
    highlight: 'C.',
    description: 'Fitness PWA with custom workout routines, AI-driven nutrition and body composition analysis, powered by OpenAI and Replicate APIs.',
    developmentType: 'Full Stack',
    gridArea: 'span 1 / span 2', // Tall item
    isBigNumber: true,
    client:"India",
    map:"image url",
    bgColor: "#e4e5ec"
  },
  {
    id: '09',
    category: 'WEBSITE',
    title: 'Tutoring Marketplace',
    projectUrl: '',
    status: 'work-in-progress',
    techStack: ['NextJS', 'Supabase', 'GCP', 'React Query'],
    Image: Tutoring,
    highlight: 'W.',
    description: 'Marketplace platform connecting students and teachers with secure multi-provider authentication, Razorpay escrow payments, and booking workflows.',
    developmentType: 'Full Stack',
    gridArea: 'span 1 / span 1',
    client:"India",
    map:"image url",
    bgColor:"#EEEEEE"
  },
  {
    id: '10',
    category: 'WEBSITE',
    title: 'Neeed Architecture',
    projectUrl: 'https://architecture.neeedassociates.com/',
    status: 'live',
    techStack: ['ReactJS', 'Tailwind','Replicate'],
    Image: NeeedArchi,
    highlight: 'N.',
    description: 'Architectural firm website showcasing project portfolios with responsive design and fluid user experience.',
    developmentType: 'Frontend',
    gridArea: 'span 1 / span 1',
    client:"India",
    map:"image url",
    bgColor:"#E3E3E3"
  },
  {
    id: '11',
    category: 'APP',
    title: 'CryptoX Trading',
    projectUrl: '',
    status: 'private',
    techStack: ['React-Native', 'Redux', 'WebSockets'],
    Image: CryptoX,
    highlight: 'X.',
    description: 'Real-time cryptocurrency trading app delivering live price updates, interactive candlestick charts, and secure trade execution.',
    developmentType: 'Frontend',
    gridArea: 'span 1 / span 1',
    client:"Canada",
    map:"image url",
    bgColor:"#151418"
  },
  {
    id: '12',
    category: 'EXTENSION',
    title: 'MetaMask Clone',
    projectUrl: '',
    status: 'private',
    techStack: ['ReactJS', 'Web3.js','metaMask'],
    Image: MetaMask,
    highlight: 'E.',
    description: 'Ethereum wallet browser extension supporting seamless DApp integration, private key encryption, and multi-cryptocurrency support.',
    developmentType: 'Frontend',
    gridArea: 'span 1 / span 1',
    client:"Canada",
    map:"image url",
    bgColor:"#F48929"
  }
];
