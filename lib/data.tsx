import dynamic from "next/dynamic";
import {
  IoMdContacts,
  IoMdHome,
  IoMdPerson,
  IoMdApps,
  IoIosApps,
  IoIosPaperPlane,
  IoLogoLinkedin,
} from "react-icons/io";
import { SiCodepen, SiGithub, SiHackerrank, SiLeetcode } from "react-icons/si";

import { MusicTrackType, NavLinkType, TechStackType, WorkType } from "./types";

export const ROOTURL =
  process.env.NEXT_PUBLIC_WEBSITE_URL || "https://sachinathu.dev";

export const COOKIE_KEYS = {
  IS_MOBILE: "is-mobile",
  IS_INIT_KNOCK: "is-init-knock",
};

export const KNOCK_CONFIG = {
  COLLECTION: "portfolio-collection",
  OBJECT: "contact-object",
  DISCORD_CHANNEL_ID: "acd1d671-ca67-40fc-ad98-c81186a4805f",
  WORKFLOW_KEY: "contact",
  DISCORD_WEBHOOK_URL:
    "https://discord.com/api/webhooks/1342043247396261908/m2Wo7EcTKyGqvpVu2B2ZplwAioc0SKAfwgUS5NILeQFLTsjao6dkzmZ2NvzhPdCfL27u",
};

export const NAV_LINKS: NavLinkType[] = [
  {
    title: "SachinAthu",
    tooltip: "Num 1",
    id: "hero",
    key: "1",
    icon: <IoMdHome />,
  },
  {
    title: "About",
    tooltip: "Num 2",
    id: "about",
    key: "2",
    icon: <IoMdPerson />,
  },
  {
    title: "Tech Stack",
    tooltip: "Num 3",
    id: "techstack",
    key: "3",
    icon: <IoIosApps />,
  },
  {
    title: "Experience",
    tooltip: "Num 4",
    id: "experience",
    key: "4",
    icon: <IoIosPaperPlane />,
  },
  {
    title: "Works",
    tooltip: "Num 5",
    id: "works",
    key: "5",
    icon: <IoMdApps />,
  },
  {
    title: "Contact",
    tooltip: "Num 6",
    id: "contact",
    key: "6",
    icon: <IoMdContacts />,
  },
];

export const WORK_EXPERIENCE = [
  {
    key: "1",
    title: "Full-stack Developer",
    company: "Freelance",
    date: "April 2023 - Present",
    description:
      "Currently working as a freelance developing web and mobile applications.",
    technologies: [
      "HTML",
      "CSS",
      "SCSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Astro",
      "Next.js",
      "Tailwind",
      "GSAP",
      "Node.js",
      "Flutter",
      "React Native",
      "Docker",
      "GCP",
      "Webflow",
      "Responsive Web Design",
      "SEO",
      "ClickUp",
    ],
  },
  {
    key: "2",
    title: "Associate Software Engineer",
    company: "SPEMAI (Pvt) Ltd.",
    date: "December 2021 - March 2023",
    description: `I contributed development of Onepay's admin dashboards, developed a ticket booking application, documentations and email templates.`,
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Angular",
      "Bootstrap",
      "Node.js",
      "Slate",
      "Jira",
    ],
  },
  {
    key: "3",
    title: "Intern Full-stack Developer",
    company: "Sri Lanka Institute of Information Technology",
    date: "November 2020 - May 2021",
    description:
      "Worked as a Full Stack Developer in Culturally Sensitive Autism Assessment Tool (CSAAT) research project. Developed two web applications (Video Uploading tool, Video Trimming tool). ",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Python",
      "React",
      "Django",
      "Django REST Framework",
      "MySQL",
      "Git",
    ],
  },
];

export const TECH_STACK: TechStackType[] = [
  { title: "HTML", categories: ["frontend"] },
  { title: "CSS", categories: ["frontend"] },
  { title: "SCSS", categories: ["frontend"] },
  { title: "JavaScript", categories: ["frontend"] },
  { title: "TypeScript", categories: ["frontend"] },
  { title: "React", categories: ["frontend"] },
  { title: "Astro", categories: ["frontend"] },
  { title: "Tailwind", categories: ["frontend"] },
  { title: "Webflow", categories: ["frontend"] },
  { title: "GSAP", categories: ["frontend"] },
  { title: "TanStack", categories: ["frontend"] },

  { title: "Python", categories: ["backend"] },
  { title: "Node.js", categories: ["backend"] },
  { title: "Django REST Framework", categories: ["backend"] },
  { title: "MongoDB", categories: ["backend"] },
  { title: "MySQL", categories: ["backend"] },
  { title: "Firebase", categories: ["backend", "other"] },
  { title: "Express.js", categories: ["backend"] },
  { title: "GraphQL", categories: ["backend"] },

  { title: "Next.js", categories: ["frontend", "backend"] },
  { title: "Django", categories: ["frontend", "backend"] },

  { title: "Flutter", categories: ["mobile"] },
  { title: "React Native", categories: ["mobile"] },
  { title: "Expo", categories: ["mobile"] },

  { title: "Docker", categories: ["other"] },
  { title: "Git", categories: ["other"] },
  { title: "VS Code", categories: ["other"] },
  { title: "Antigravity", categories: ["other"] },
  { title: "OpenCode", categories: ["other"] },
  { title: "OpenRouter", categories: ["other"] },
  { title: "Open WebUI", categories: ["other"] },
  { title: "Postman", categories: ["other"] },
  { title: "ClickUp", categories: ["other"] },
  { title: "Digital Ocean", categories: ["other"] },
  { title: "Vercel", categories: ["other"] },
  { title: "GitHub", categories: ["other"] },
  { title: "Railway", categories: ["other"] },
];

/* works */
const ArticleLoading = () => (
  <div className="flex items-center justify-center text-2xl text-gray-500 dark:text-gray-400">
    Loading article...
  </div>
);

// const SampleWork1MDX = dynamic(
//   () => import("@/components/mdx/SampleWork1.mdx"),
//   {
//     loading: ArticleLoading,
//   }
// );

const VoxitecMDX = dynamic(() => import("@/components/mdx/Voxitec.mdx"), {
  loading: ArticleLoading,
});

const TealeafMDX = dynamic(() => import("@/components/mdx/Tealeaf.mdx"), {
  loading: ArticleLoading,
});

const WheelstockMDX = dynamic(() => import("@/components/mdx/Wheelstock.mdx"), {
  loading: ArticleLoading,
});

// voxitec screenshots
import voxitec_ss_1 from "@/public/static/works/voxitec/screenshots/ss_1.png";
import voxitec_ss_2 from "@/public/static/works/voxitec/screenshots/ss_2.png";
import voxitec_ss_3 from "@/public/static/works/voxitec/screenshots/ss_3.png";
import voxitec_ss_4 from "@/public/static/works/voxitec/screenshots/ss_4.png";
import voxitec_ss_5 from "@/public/static/works/voxitec/screenshots/ss_5.png";
import voxitec_ss_6 from "@/public/static/works/voxitec/screenshots/ss_6.png";
import voxitec_ss_7 from "@/public/static/works/voxitec/screenshots/ss_7.png";
import voxitec_ss_8 from "@/public/static/works/voxitec/screenshots/ss_8.png";
import voxitec_ss_9 from "@/public/static/works/voxitec/screenshots/ss_9.jpeg";
import voxitec_ss_10 from "@/public/static/works/voxitec/screenshots/ss_10.jpeg";
import voxitec_ss_11 from "@/public/static/works/voxitec/screenshots/ss_11.jpeg";
import voxitec_ss_12 from "@/public/static/works/voxitec/screenshots/ss_12.jpeg";
import voxitec_ss_13 from "@/public/static/works/voxitec/screenshots/ss_13.jpeg";
import voxitec_ss_14 from "@/public/static/works/voxitec/screenshots/ss_14.jpeg";

// tealeaf screenshots
import tealeaf_ss_1 from "@/public/static/works/tealeaf/screenshots/ss_1.png";
import tealeaf_ss_2 from "@/public/static/works/tealeaf/screenshots/ss_2.png";
import tealeaf_ss_3 from "@/public/static/works/tealeaf/screenshots/ss_3.png";
import tealeaf_ss_4 from "@/public/static/works/tealeaf/screenshots/ss_4.png";
import tealeaf_ss_5 from "@/public/static/works/tealeaf/screenshots/ss_5.png";
import tealeaf_ss_6 from "@/public/static/works/tealeaf/screenshots/ss_6.png";
import tealeaf_ss_9 from "@/public/static/works/tealeaf/screenshots/ss_9.jpeg";
import tealeaf_ss_10 from "@/public/static/works/tealeaf/screenshots/ss_10.jpeg";

// wheelstock screenshots
import wheelstock_ss_3 from "@/public/static/works/wheelstock/screenshots/ss_3.png";
import wheelstock_ss_4 from "@/public/static/works/wheelstock/screenshots/ss_4.png";
import wheelstock_ss_5 from "@/public/static/works/wheelstock/screenshots/ss_5.png";
import wheelstock_ss_6 from "@/public/static/works/wheelstock/screenshots/ss_6.png";
import wheelstock_ss_7 from "@/public/static/works/wheelstock/screenshots/ss_7.png";
import wheelstock_ss_8 from "@/public/static/works/wheelstock/screenshots/ss_8.png";
import wheelstock_ss_9 from "@/public/static/works/wheelstock/screenshots/ss_9.png";
import wheelstock_ss_10 from "@/public/static/works/wheelstock/screenshots/ss_10.png";
import wheelstock_ss_11 from "@/public/static/works/wheelstock/screenshots/ss_11.jpeg";
import wheelstock_ss_12 from "@/public/static/works/wheelstock/screenshots/ss_12.jpeg";

export const WORKS: WorkType[] = [
  {
    key: "work_voxitec",
    title: "Voxitec website",
    description:
      "Discover how I developed a complete business website for Voxitec (a tech startup) for a showcase their worth and carry their image to the world. Learn about the business challenges, technical solutions, and key results in this in-depth case study.",
    slug: "voxitec",
    video: {
      urls: [
        {
          src: "/static/works/voxitec/voxitec.webm",
          type: "video/webm",
        },
        {
          src: "/static/works/voxitec/voxitec.mp4",
          type: "video/mp4",
        },
      ],
      poster: "/static/works/voxitec/voxitec_poster.webp",
    },
    image: "/static/works/voxitec/voxitec.png",
    ogImage: "/static/works/voxitec/voxitec_og.png",
    content: <VoxitecMDX />,
    author: ["Sachin Athukorala"],
    date: {
      dateCreated: "2025-01-10",
      datePublished: "2025-01-22",
      dateModified: "2025-01-22",
    },
    previewLink: "https://voxitec.com/",
    screenshots: [
      {
        key: "work_voxitec_ss_1",
        img: voxitec_ss_1,
        title: "Home page hero section - dark mode",
        cols: 2,
        rows: 1,
      },
      {
        key: "work_voxitec_ss_9",
        img: voxitec_ss_9,
        title: "Mission page",
        cols: 1,
        rows: 2,
      },
      {
        key: "work_voxitec_ss_12",
        img: voxitec_ss_12,
        title: "Home page (Mobile)",
        cols: 1,
        rows: 2,
      },
      {
        key: "work_voxitec_ss_2",
        img: voxitec_ss_2,
        title: "Home page hero section - light mode",
        cols: 2,
        rows: 1,
      },
      {
        key: "work_voxitec_ss_3",
        img: voxitec_ss_3,
        title: "Home page - what we offer section",
        cols: 2,
        rows: 1,
      },
      {
        key: "work_voxitec_ss_4",
        img: voxitec_ss_4,
        title: "Navigation menu",
        cols: 2,
        rows: 1,
      },
      {
        key: "work_voxitec_ss_13",
        img: voxitec_ss_13,
        title: "Blog page - articles",
        cols: 1,
        rows: 2,
      },
      {
        key: "work_voxitec_ss_14",
        img: voxitec_ss_14,
        title: "Single blog page - hero section",
        cols: 1,
        rows: 2,
      },
      {
        key: "work_voxitec_ss_5",
        img: voxitec_ss_5,
        title: "Services page",
        cols: 2,
        rows: 1,
      },
      {
        key: "work_voxitec_ss_6",
        img: voxitec_ss_6,
        title: "Careers page",
        cols: 2,
        rows: 1,
      },
      {
        key: "work_voxitec_ss_7",
        img: voxitec_ss_7,
        title: "Contact us page",
        cols: 2,
        rows: 1,
      },
      {
        key: "work_voxitec_ss_10",
        img: voxitec_ss_10,
        title: "Home page - Hero section (Mobile)",
        cols: 1,
        rows: 2,
      },
      {
        key: "work_voxitec_ss_11",
        img: voxitec_ss_11,
        title: "Mission page",
        cols: 1,
        rows: 2,
      },
      {
        key: "work_voxitec_ss_8",
        img: voxitec_ss_8,
        title: "Footer",
        cols: 2,
        rows: 1,
      },
    ],
  },
  {
    key: "work_wheelstock",
    title: "Wheelstock",
    description:
      "Discover how I developed a complete inventory management system called Wheelstock for a vehicle battery shop retailer. Learn about the business challenges, technical solutions, and key results in this in-depth case study.",
    slug: "wheelstock",
    video: {
      urls: [
        {
          src: "/static/works/wheelstock/wheelstock.webm",
          type: "video/webm",
        },
        {
          src: "/static/works/wheelstock/wheelstock.mp4",
          type: "video/mp4",
        },
      ],
      poster: "/static/works/wheelstock/wheelstock_poster.webp",
    },
    image: "/static/works/wheelstock/wheelstock.png",
    ogImage: "/static/works/wheelstock/wheelstock_og.png",
    content: <WheelstockMDX />,
    author: ["Sachin Athukorala"],
    date: {
      dateCreated: "2025-01-10",
      datePublished: "2025-01-22",
      dateModified: "2025-01-22",
    },
    demoLink: "https://dev-wheelstock.netlify.app/",
    screenshots: [
      {
        key: "work_wheelstock_ss_3",
        img: wheelstock_ss_3,
        title: "Dashboard - dark mode",
        cols: 2,
        rows: 1,
      },
      {
        key: "work_wheelstock_ss_4",
        img: wheelstock_ss_4,
        title: "Sales",
        cols: 2,
        rows: 1,
      },
      {
        key: "work_wheelstock_ss_5",
        img: wheelstock_ss_5,
        title: "Stocks",
        cols: 2,
        rows: 1,
      },
      {
        key: "work_wheelstock_ss_6",
        img: wheelstock_ss_6,
        title: "Stock snapshots",
        cols: 2,
        rows: 1,
      },
      {
        key: "work_wheelstock_ss_11",
        img: wheelstock_ss_11,
        title: "Stock adjustments (mobile)",
        cols: 1,
        rows: 2,
      },
      {
        key: "work_wheelstock_ss_12",
        img: wheelstock_ss_12,
        title: "Login page - dark mode (mobile)",
        cols: 1,
        rows: 2,
      },
      {
        key: "work_wheelstock_ss_7",
        img: wheelstock_ss_7,
        title: "Reports",
        cols: 2,
        rows: 1,
      },
      {
        key: "work_wheelstock_ss_8",
        img: wheelstock_ss_8,
        title: "Generate reports",
        cols: 2,
        rows: 1,
      },
      {
        key: "work_wheelstock_ss_9",
        img: wheelstock_ss_9,
        title: "Notifications",
        cols: 2,
        rows: 1,
      },
      {
        key: "work_wheelstock_ss_10",
        img: wheelstock_ss_10,
        title: "Settings",
        cols: 2,
        rows: 1,
      },
    ],
  },
  {
    key: "work_tealeaf",
    title: "Tealeaf consulting",
    description:
      "Discover how I developed a complete business website for Tealeaf consulting, a consulting company based in Canada.",
    slug: "tealeaf",
    video: {
      urls: [
        {
          src: "/static/works/tealeaf/tealeaf.webm",
          type: "video/webm",
        },
        {
          src: "/static/works/tealeaf/tealeaf.mp4",
          type: "video/mp4",
        },
      ],
      poster: "/static/works/tealeaf/tealeaf_poster.webp",
    },
    image: "/static/works/tealeaf/tealeaf.png",
    ogImage: "/static/works/tealeaf/tealeaf_og.png",
    content: <TealeafMDX />,
    author: ["Sachin Athukorala"],
    date: {
      dateCreated: "2025-01-10",
      datePublished: "2025-01-22",
      dateModified: "2025-01-22",
    },
    previewLink: "https://www.tealeafconsult.com/",
    screenshots: [
      {
        key: "work_tealeaf_ss_1",
        img: tealeaf_ss_1,
        title: "Splash screen",
        cols: 2,
        rows: 1,
      },
      {
        key: "work_tealeaf_ss_2",
        img: tealeaf_ss_2,
        title: "Home page - hero section",
        cols: 2,
        rows: 1,
      },
      {
        key: "work_tealeaf_ss_10",
        img: tealeaf_ss_10,
        title: "Home page - hero section (mobile)",
        cols: 1,
        rows: 2,
      },
      {
        key: "work_tealeaf_ss_9",
        img: tealeaf_ss_9,
        title: "Mobile navigation menu",
        cols: 1,
        rows: 2,
      },
      {
        key: "work_tealeaf_ss_3",
        img: tealeaf_ss_3,
        title: "Home page",
        cols: 2,
        rows: 1,
      },
      {
        key: "work_tealeaf_ss_4",
        img: tealeaf_ss_4,
        title: "Home page - services section",
        cols: 2,
        rows: 1,
      },
      {
        key: "work_tealeaf_ss_5",
        img: tealeaf_ss_5,
        title: "Home page - about us section",
        cols: 2,
        rows: 1,
      },
      {
        key: "work_tealeaf_ss_6",
        img: tealeaf_ss_6,
        title: "Home page - testimonials section",
        cols: 2,
        rows: 1,
      },
    ],
  },
  // {
  //   key: 'work2',
  //   title: 'Sample Work 2',
  //   description:
  //     'Discover how I developed a scalable e-commerce platform for a specialty foods retailer, increasing sales by 30% in the first quarter. Learn about the business challenges, technical solutions, and key results in this in-depth case study.',
  //   slug: 'sample-work-2',
  //   titleImage: {
  //     url: `${ROOTURL}/static/works/portfolio/portfolio.png`,
  //     image: IMG_WORK_PORTFOLIO,
  //   },
  //   ogImage: `${ROOTURL}/static/works/portfolio/og_image.jpg`,
  //   content: <SampleWork1MDX />,
  //   author: ['Sachin Athukorala'],
  //   date: {
  //     dateCreated: '2025-03-15',
  //     datePublished: '2025-03-15',
  //     dateModified: '2025-03-15',
  //   },
  //   previewLink: 'https://portfolio-sachinathu.vercel.app/',
  //   screenshots: [],
  // },
];
/**/

export const MUSIC_PLAYLIST: MusicTrackType[] = [
  // {
  //   key: "track_output",
  //   name: "Witcher 3 Kaer Morhen",
  //   path: "/static/music/output.mp3",
  // },
  {
    key: "track_aurum_spacesounds",
    name: "Aurum - Spacesounds",
    path: "/static/music/aurum_spacesounds.mp3",
  },
  {
    key: "track_a_cabin_by_the_lake",
    name: "Lazarus Moment - In A Cabin By The Lake",
    path: "/static/music/a_cabin_by_the_lake.mp3",
  },
  {
    key: "track_unforgiven",
    name: "Lazarus Moment - Unforgiven",
    path: "/static/music/unforgiven.mp3",
  },
  {
    key: "track_falling_apart",
    name: "Etsu - Falling Apart",
    path: "/static/music/falling_apart.mp3",
  },
  {
    key: "track_music_is_dead",
    name: "Blackbird - Music is Dead",
    path: "/static/music/music_is_dead.mp3",
  },
  {
    key: "track_hypernova",
    name: "Arnyd - Hypernova",
    path: "/static/music/hypernova.mp3",
  },
  {
    key: "track_kaer_morhen",
    name: "Witcher 3 Kaer Morhen",
    path: "/static/music/kaer_morhen.mp3",
  },
];

export const SOCIAL_LINKS = [
  {
    id: "sl_github",
    title: "Github",
    link: "https://github.com/SachinAthu",
    icon: <SiGithub />,
  },
  {
    id: "sl_linkedin",
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/sachinathu/",
    icon: <IoLogoLinkedin />,
  },
  {
    id: "sl_codepen",
    title: "CodePen",
    link: "https://codepen.io/sachinathu",
    icon: <SiCodepen />,
  },
  {
    id: "sl_hackerrank",
    title: "HackerRank",
    link: "https://www.hackerrank.com/profile/sachin2262716",
    icon: <SiHackerrank />,
  },
  {
    id: "sl_leetcode",
    title: "LeetCode",
    link: "https://leetcode.com/sachin2262716",
    icon: <SiLeetcode />,
  },
];
