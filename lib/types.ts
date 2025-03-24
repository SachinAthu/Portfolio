import { StaticImageData } from 'next/image';

export type NavLinkType = {
  title: string;
  tooltip: string;
  id: string;
  key: string;
  icon: JSX.Element;
};

export type TechStackType = {
  title: string;
  categories: ('all' | 'frontend' | 'backend' | 'mobile' | 'other')[];
};

export type WorkType = {
  key: string;
  title: string;
  description: string;
  slug: string;
  titleImage: {
    url: string;
    image: StaticImageData;
  };
  ogImage: string;
  content: JSX.Element;
  author: string[];
  date: {
    dateCreated: string;
    datePublished: string;
    dateModified: string;
  };
  previewLink?: string;
  demoLink?: string;
  screenshots: StaticImageData[];
};

export type MusicTrack = {
  name: string;
  path: string;
};

export interface ContactFormValues {
  nameVerify?: string;
  name: string;
  email: string;
  message: string;
}

/* custom error classes */
export class BotError extends Error {}
export class ActionError extends Error {}

export type DialogRefProps = {
  openDialog: () => void;
  closeDialog: () => void;
};
