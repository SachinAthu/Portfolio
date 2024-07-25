import { About, Contact, Experience, Hero, HomeScrollNav, HomeSideMenu, TechStack, Works } from '@/components';

export default function HomePage() {
  return (
    <div className="home-page | pt-[var(--header-height)]">
      <HomeSideMenu />
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
