
import type { LayoutProps } from "../types/layout";
import { Toaster } from "../components/ui/sonner"

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="h-screen flex bg-gradient-to-br from-orange-50 to-white">
    <Toaster />
    {children}
  </div>
);

export default Layout;
