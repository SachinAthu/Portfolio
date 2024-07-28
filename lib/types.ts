export type NavLinkType = {
  title: string;
  id: string;
  key: string;
  icon: JSX.Element;
};

export type TechStackType = {
  title: string;
  categories: ('all' | 'frontend' | 'backend' | 'mobile' | 'other')[];
};
