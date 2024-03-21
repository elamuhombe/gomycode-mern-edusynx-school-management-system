
import Logo from "./Logo";
import Navbar from "./Navbar";

const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-2">
      <Navbar />
      <Logo />
       
    </div>
  );
}

export default Header;

