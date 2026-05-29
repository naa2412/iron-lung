import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-mesh flex">
      <Sidebar />
      <main className="flex-1 min-h-screen pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 page-enter">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
