import { IoMdContacts, IoMdHome, IoMdPerson, IoMdApps, IoIosApps, IoIosPaperPlane } from 'react-icons/io';

import { NavLinkType } from './types';

export const NAV_LINKS: NavLinkType[] = [
  {
    title: 'SachinAthu',
    id: 'hero',
    key: '1',
    icon: <IoMdHome />,
  },
  {
    title: 'About',
    id: 'about',
    key: '2',
    icon: <IoMdPerson />,
  },
  {
    title: 'Tech Stack',
    id: 'techstack',
    key: '3',
    icon: <IoIosApps />,
  },
  {
    title: 'Experience',
    id: 'experience',
    key: '4',
    icon: <IoIosPaperPlane />,
  },
  {
    title: 'Works',
    id: 'works',
    key: '5',
    icon: <IoMdApps />,
  },
  {
    title: 'Contact',
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
    description: 'Currently working as a freelance developer in web development and mobile development.',
    technologies: [
      'HTML',
      'CSS',
      'SCSS',
      'JavaScript',
      'React',
      'Next.js',
      'Astro',
      'Tailwind',
      'Node.js',
      'MongoDB',
      'Firebase',
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
    technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'Bootstrap', 'Node.js', 'Slate', 'Jira'],
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
