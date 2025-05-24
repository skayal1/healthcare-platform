import { useEffect } from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import PopularDoctors from '../components/home/PopularDoctors';
import Testimonials from '../components/home/Testimonials';
import CtaSection from '../components/home/CtaSection';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'MediConnect | Healthcare Platform';
  }, []);

  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <PopularDoctors />
      <Testimonials />
      <CtaSection />
    </>
  );
};

export default Home;