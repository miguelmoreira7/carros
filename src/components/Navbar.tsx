import { Link, useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../utils";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload()
    navigate("/");
  };

  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link to="/" className="flex justify-center items-center">
          <img src="./logo.svg" alt="Car Hub Logo" className="object-contain h-5"/>
        </Link>
        
        {isUserLoggedIn() ? (
          <button
            onClick={handleLogout}
            className="text-primary-blue rounded-full bg-white min-w-[130px] px-4 py-2"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/loginOrRegister")}
            className="text-primary-blue rounded-full bg-white min-w-[130px] px-4 py-2"
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
