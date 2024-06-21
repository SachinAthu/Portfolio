import { IoMdContacts, IoMdHome, IoMdPerson, IoMdApps, IoIosApps } from 'react-icons/io';

import { NavLinkType } from './types';

export const navLinks: NavLinkType[] = [
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
