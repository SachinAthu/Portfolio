import { IoMdContacts, IoMdHome, IoMdPerson, IoMdApps, IoIosApps } from 'react-icons/io';

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
    title: 'Works',
    id: 'works',
    key: '4',
    icon: <IoMdApps />,
  },
  {
    title: 'Contact',
    id: 'contact',
    key: '5',
    icon: <IoMdContacts />,
  },
];

export const WORK_EXPERIENCE = [
  {
    key: '1',
    title: 'Full-stack Developer',
    company: 'Freelance',
    date: 'April 2023 - Present',
  },
  {
    key: '2',
    title: 'Associate Software Engineer',
    company: 'SPEMAI (Pvt) Ltd.',
    date: 'December 2021 - March 2023',
  },
  {
    key: '3',
    title: 'Intern Full-stack Developer',
    company: 'Sri Lanka Institute of Information Technology',
    date: 'November 2020 - May 2021',
  },
];
