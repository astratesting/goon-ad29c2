import Header from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import TrustStrip from '@/components/sections/TrustStrip';
import HowItWorks from '@/components/sections/HowItWorks';
import Features from '@/components/sections/Features';
import Demo from '@/components/sections/Demo';
import Pricing from '@/components/sections/Pricing';
import FAQ from '@/components/sections/FAQ';
import WaitlistCTA from '@/components/sections/WaitlistCTA';
import Footer from '@/components/sections/Footer';
import { buildOrganizationJsonLd } from '@/lib/seo';

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildOrganizationJsonLd()),
        }}
      />
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <HowItWorks />
        <Features />
        <Demo />
        <Pricing />
        <FAQ />
        <WaitlistCTA />
      </main>
      <Footer />
    </>
  );
}
