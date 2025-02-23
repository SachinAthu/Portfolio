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
  slug: string;
  titleImage: StaticImageData;
  readme: string;
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
