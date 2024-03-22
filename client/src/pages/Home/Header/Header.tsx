import Logo from "./Logo";
import Navbar from "./Navbar";

const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-2">
      {/* Navbar appears on the right for large screens */}
      <div className="lg:order-2">
        <Navbar />
      </div>
      {/* Logo appears on the left for small screens */}
      <div className="order-1 lg:order-1">
        <Logo />
      </div>
      {/* Hide one Navbar for small screens */}
      <div className="lg:hidden hidden">
        <Navbar />
      </div>
    </div>
  );
}

export default Header;
