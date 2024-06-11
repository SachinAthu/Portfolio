import { About, Contact, Hero, TechStack, Works } from '@/components';

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="container">
        <Hero />
      </div>
      <About />
      <TechStack />
      <Works />
      <Contact />
    </div>
  );
}
