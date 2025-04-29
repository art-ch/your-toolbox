import { Home } from '@/components/pages/Home/Home';

import { RedirectToLastVisitedPage } from './components/LastVisitedPage/RedirectToLastVisitedPage';

export default function HomePage() {
  return (
    <>
      <RedirectToLastVisitedPage />
      <Home />
    </>
  );
}
