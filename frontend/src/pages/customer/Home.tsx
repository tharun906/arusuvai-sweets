import HeroBanner from './home-sections/HeroBanner';
import CategoryShowcase from './home-sections/CategoryShowcase';
import AboutSection from './home-sections/AboutSection';
import ContactSection from './home-sections/ContactSection';
import OrnamentDivider from '../../components/common/OrnamentDivider';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <HeroBanner />
      <CategoryShowcase />
      <OrnamentDivider />
      <AboutSection />
      <OrnamentDivider />
      <ContactSection />
    </div>
  );
}

export default Home;