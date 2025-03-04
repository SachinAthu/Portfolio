import dynamic from 'next/dynamic';

import { About, Contact, Experience, Hero, TechStack, Works } from '@/components';

const HomeScrollNav = dynamic(() => import('@/components/home/HomeScrollNav'), { ssr: false });
const HomeSideNav = dynamic(() => import('@/components/home/HomeSideNav'), { ssr: false });

export default function HomePage() {
  return (
    <div className="home-page | pt-[var(--header-height)]">
      <HomeSideNav />
      <HomeScrollNav />

      <Hero />
      <About />
      <TechStack />
      <Experience />
      <Works />
      <Contact />
    </div>
  );
}
