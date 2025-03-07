import { Link } from "react-router-dom"
import { footerLinks } from "../constants"

const Footer = () => {
  return (
    <footer className="flex flex-col text-black-100 mt-5 border-t border-gray-100">
      <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
        <div className="flex flex-col justify-start items-start gap-6">
          <img src="./logo.svg" alt="logo" className="h-15 object-contain"/>
          <p className="text-base textt-gray-700">Carhub 2023 <br/>All rights reserved &copy;</p>
        </div>
        <div className="footer__links">
          {footerLinks.map((link) => (
            <div key={link.title} className="footer__link">
              <h3 className="font-bold">{link.title}</h3>
              {link.links.map((item) => (
                <Link key={item.title} to={item.url} className="text-gray-500">{item.title}</Link>
              ))}
            </div>
          ))}
        </div>
        </div>
        <div className="flex justify-between items-center flex-wrap mt-10 border-t border-gray-100 sm:px-16 px-6 py-10">
            <p>@2023 CarHub. All Rights Reserverd</p>
          <div className="footer__copyrights-link">
            <Link to="/" className="text-gray-500">
              Política de privacidade
            </Link>
            <Link to="/" className="text-gray-500">
              Termos de uso
            </Link>
          </div>
        </div>
    </footer>
  )
}

export default Footer