
import type { LayoutProps } from "../types/layout";

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="h-screen flex bg-gradient-to-br from-orange-50 to-white">
    {children}
  </div>
);

export default Layout;
