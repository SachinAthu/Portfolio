import { IoMdContacts, IoMdHome, IoMdPerson, IoMdApps, IoIosApps, IoIosPaperPlane } from 'react-icons/io';

import { MusicTrack, NavLinkType, TechStackType, WorkType } from './types';
import assets from './assets';

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

export const WORKS: WorkType[] = [
  {
    key: '1',
    title: 'Voxitec',
    slug: 'voxitec',
    titleImage: assets.WORK_VOXITEC,
    readme: '',
  },
  {
    key: '2',
    title: 'Portfolio',
    slug: 'portfolio',
    titleImage: assets.WORK_PORTFOLIO,
    readme: '',
  },
];

export const MUSIC_PLAYLIST: MusicTrack[] = [
  {
    name: 'Witcher 3 Kaer Morhen',
    path: '/static/music/kaer_morhen.mp3',
  },
];
