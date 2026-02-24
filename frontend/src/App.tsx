import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import AnnouncementsSection from './components/AnnouncementsSection';
import DonateSection from './components/DonateSection';
import ContactSection from './components/ContactSection';

export default function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <HeroSection />
                <AboutSection />
                <ServicesSection />
                <AnnouncementsSection />
                <DonateSection />
            </main>
            <ContactSection />
        </div>
    );
}
