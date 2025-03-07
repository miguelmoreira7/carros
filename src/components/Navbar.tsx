import { Link, useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../utils";
import { MouseEventHandler } from "react";
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { FiShoppingCart } from "react-icons/fi";
import { useStateContext } from "../contexts/ContextProvider";
import Cart from "./Cart";

const Navbar = () => {
  const navigate = useNavigate();
  const {handleClick, isClicked} = useStateContext();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload()
    navigate("/");
  };

  type NavButtonProps = {
    title: string,
    customFunc: MouseEventHandler<HTMLButtonElement>,
    icon: React.ReactNode,
    color: string,
    dotColor: string,
  }
  
  const NavButton = ({title, customFunc, icon, color, dotColor}: NavButtonProps) => (
    <TooltipComponent content={title}>
      <button type='button' onClick={customFunc} style={{ color }} 
      className='relative text-xl rounded-full p-3 hover:bg-light-gray'>
        <span style={{ background: dotColor}} 
        className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2'/>
        {icon}
      </button>
    </TooltipComponent>
  )

  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link to="/" className="flex justify-center items-center">
          <img src="./logo.svg" alt="Car Rent Logo" className="object-contain  h-20"/>
        </Link>
        
        <div className="flex justify-between p-2 md:mx-6 relative">
          {isUserLoggedIn() ? (
            <>
              <button
                onClick={handleLogout}
                className="text-primary-blue rounded-full bg-white min-w-[130px] px-4 py-2"
              >
                Logout
              </button>
              <NavButton title='Carrinho'
              customFunc={() => handleClick('cart')}
              color = "white"
              icon = {<FiShoppingCart/>}
              dotColor=""
              />
              {isClicked.cart && <Cart/>}
            </>
          ) : (
            <button
              onClick={() => navigate("/loginOrRegister")}
              className="text-primary-blue rounded-full bg-white min-w-[130px] px-4 py-2"
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
