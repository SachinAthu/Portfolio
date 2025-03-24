import dynamic from 'next/dynamic';
import { IoMdContacts, IoMdHome, IoMdPerson, IoMdApps, IoIosApps, IoIosPaperPlane } from 'react-icons/io';
import { SiCodepen, SiGithub, SiHackerrank, SiLeetcode, SiLinkedin } from 'react-icons/si';

import { MusicTrack, NavLinkType, TechStackType, WorkType } from './types';
import assets from './assets';

export const ROOTURL = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://sachinathu.dev';

export const COOKIE_KEYS = {
  IS_MOBILE: 'is-mobile',
  IS_INIT_KNOCK: 'is-init-knock',
};

export const KNOCK_CONFIG = {
  COLLECTION: 'portfolio-collection',
  OBJECT: 'contact-object',
  DISCORD_CHANNEL_ID: 'acd1d671-ca67-40fc-ad98-c81186a4805f',
  WORKFLOW_KEY: 'contact',
  DISCORD_WEBHOOK_URL:
    'https://discord.com/api/webhooks/1342043247396261908/m2Wo7EcTKyGqvpVu2B2ZplwAioc0SKAfwgUS5NILeQFLTsjao6dkzmZ2NvzhPdCfL27u',
};

export const NAV_LINKS: NavLinkType[] = [
  {
    title: 'SachinAthu',
    tooltip: 'Num 1',
    id: 'hero',
    key: '1',
    icon: <IoMdHome />,
  },
  {
    title: 'About',
    tooltip: 'Num 2',
    id: 'about',
    key: '2',
    icon: <IoMdPerson />,
  },
  {
    title: 'Tech Stack',
    tooltip: 'Num 3',
    id: 'techstack',
    key: '3',
    icon: <IoIosApps />,
  },
  {
    title: 'Experience',
    tooltip: 'Num 4',
    id: 'experience',
    key: '4',
    icon: <IoIosPaperPlane />,
  },
  {
    title: 'Works',
    tooltip: 'Num 5',
    id: 'works',
    key: '5',
    icon: <IoMdApps />,
  },
  {
    title: 'Contact',
    tooltip: 'Num 6',
    id: 'contact',
    key: '6',
    icon: <IoMdContacts />,
  },
];

export const WORK_EXPERIENCE = [
  {
    key: '1',
    title: 'Full-stack Developer',
    company: 'Freelance',
    date: 'April 2023 - Present',
    description: 'Currently working as a freelance developing web and mobile applications.',
    technologies: [
      'HTML',
      'CSS',
      'SCSS',
      'JavaScript',
      'TypeScript',
      'React',
      'Astro',
      'Next.js',
      'Tailwind',
      'GSAP',
      'Node.js',
      'Flutter',
      'React Native',
      'Docker',
      'GCP',
      'Webflow',
      'Responsive Web Design',
      'SEO',
      'ClickUp',
    ],
  },
  {
    key: '2',
    title: 'Associate Software Engineer',
    company: 'SPEMAI (Pvt) Ltd.',
    date: 'December 2021 - March 2023',
    description: `I contributed development of Onepay's admin dashboards, developed a ticket booking application, documentations and email templates.`,
    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'React',
      'Angular',
      'Bootstrap',
      'Node.js',
      'Slate',
      'Jira',
    ],
  },
  {
    key: '3',
    title: 'Intern Full-stack Developer',
    company: 'Sri Lanka Institute of Information Technology',
    date: 'November 2020 - May 2021',
    description:
      'Worked as a Full Stack Developer in Culturally Sensitive Autism Assessment Tool (CSAAT) research project. Developed two web applications (Video Uploading tool, Video Trimming tool). ',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Python', 'React', 'Django', 'Django REST Framework', 'MySQL', 'Git'],
  },
];

export const TECH_STACK: TechStackType[] = [
  { title: 'HTML', categories: ['frontend'] },
  { title: 'CSS', categories: ['frontend'] },
  { title: 'SCSS', categories: ['frontend'] },
  { title: 'JavaScript', categories: ['frontend'] },
  { title: 'TypeScript', categories: ['frontend'] },
  { title: 'React', categories: ['frontend'] },
  { title: 'Astro', categories: ['frontend'] },
  { title: 'Tailwind', categories: ['frontend'] },
  { title: 'Webflow', categories: ['frontend'] },
  { title: 'GSAP', categories: ['frontend'] },

  { title: 'Python', categories: ['backend'] },
  { title: 'Node.js', categories: ['backend'] },
  { title: 'Django REST Framework', categories: ['backend'] },
  { title: 'MongoDB', categories: ['backend'] },
  { title: 'MySQL', categories: ['backend'] },
  { title: 'Firebase', categories: ['backend'] },
  { title: 'Express.js', categories: ['backend'] },
  { title: 'GraphQL', categories: ['backend'] },

  { title: 'Next.js', categories: ['frontend', 'backend'] },
  { title: 'Django', categories: ['frontend', 'backend'] },

  { title: 'Flutter', categories: ['mobile'] },
  { title: 'React Native', categories: ['mobile'] },
  { title: 'Expo', categories: ['mobile'] },

  { title: 'Docker', categories: ['other'] },
  { title: 'Git', categories: ['other'] },
  { title: 'VS Code', categories: ['other'] },
  { title: 'Postman', categories: ['other'] },
  { title: 'ClickUp', categories: ['other'] },
  { title: 'Digital Ocean', categories: ['other'] },
  { title: 'Vercel', categories: ['other'] },
  { title: 'GitHub', categories: ['other'] },
  { title: 'Railway', categories: ['other'] },
];

/* works */
const SampleWork1MDX = dynamic(() => import('@/components/mdx/works/SampleWork1.mdx'), {
  ssr: false,
  loading: () => <div>loading mdx...</div>,
});

export const WORKS: WorkType[] = [
  {
    key: 'work1',
    title: 'Sample Work 1',
    description:
      'Discover how I developed a scalable e-commerce platform for a specialty foods retailer, increasing sales by 30% in the first quarter. Learn about the business challenges, technical solutions, and key results in this in-depth case study.',
    slug: 'sample-work-1',
    titleImage: {
      url: `${ROOTURL}/static/works/portfolio/portfolio.png`,
      image: assets.WORK_PORTFOLIO,
    },

    ogImage: `${ROOTURL}/static/works/portfolio/og_image.jpg`,
    content: <SampleWork1MDX />,
    author: ['Sachin Athukorala'],
    date: {
      dateCreated: '2025-03-15',
      datePublished: '2025-03-15',
      dateModified: '2025-03-15',
    },
    previewLink: 'https://portfolio-sachinathu.vercel.app/',
    demoLink: 'https://portfolio-sachinathu.vercel.app/',
    screenshots: [],
  },
  {
    key: 'work2',
    title: 'Sample Work 2',
    description:
      'Discover how I developed a scalable e-commerce platform for a specialty foods retailer, increasing sales by 30% in the first quarter. Learn about the business challenges, technical solutions, and key results in this in-depth case study.',
    slug: 'sample-work-2',
    titleImage: {
      url: `${ROOTURL}/static/works/portfolio/portfolio.png`,
      image: assets.WORK_PORTFOLIO,
    },
    ogImage: `${ROOTURL}/static/works/portfolio/og_image.jpg`,
    content: <SampleWork1MDX />,
    author: ['Sachin Athukorala'],
    date: {
      dateCreated: '2025-03-15',
      datePublished: '2025-03-15',
      dateModified: '2025-03-15',
    },
    previewLink: 'https://portfolio-sachinathu.vercel.app/',
    screenshots: [],
  },
];
/**/

export const MUSIC_PLAYLIST: MusicTrack[] = [
  {
    name: 'Witcher 3 Kaer Morhen',
    path: '/static/music/kaer_morhen.mp3',
  },
];

export const SOCIAL_LINKS = [
  {
    id: 'sl_github',
    title: 'Github',
    link: 'https://github.com/SachinAthu',
    icon: <SiGithub />,
  },
  {
    id: 'sl_linkedin',
    title: 'LinkedIn',
    link: 'https://www.linkedin.com/in/sachinathu/',
    icon: <SiLinkedin />,
  },
  {
    id: 'sl_codepen',
    title: 'CodePen',
    link: 'https://codepen.io/sachinathu',
    icon: <SiCodepen />,
  },
  {
    id: 'sl_hackerrank',
    title: 'HackerRank',
    link: 'https://www.hackerrank.com/profile/sachin2262716',
    icon: <SiHackerrank />,
  },
  {
    id: 'sl_leetcode',
    title: 'LeetCode',
    link: 'https://leetcode.com/sachin2262716',
    icon: <SiLeetcode />,
  },
];
