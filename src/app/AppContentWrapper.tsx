import { BackToTop } from '@/app/components/BackToTop';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { WorldTour } from '@/app/components/world/WorldTour';
import { EditorialHome } from '@/app/components/world/EditorialHome';
import '@/app/components/world/world.css';

export function AppContent() {
  return (
    <div className="avante-world-home">
      <Navbar />
      <main>
        <WorldTour />
        <EditorialHome />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
