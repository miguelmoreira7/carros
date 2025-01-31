import { Link } from "react-router-dom"
import { CustomButton } from "."

const Navbar = () => {
  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link to="/" className="flex justify-center items-center">
          <img src="./logo.svg" alt="Car Hub Logo" className="object-contain h-5"/>
        </Link>
        <Link to="/loginOrRegister">
          <CustomButton
            title="Login"
            btnType="button"
            containerStyles="text-primary-blue rounded-full bg-white min-w-[130px] "
          />
        </Link>
        
      </nav>
    </header>
  )
}

export default Navbar