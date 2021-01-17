import Link from 'next/link';
import Menu from '../icons/Menu';

import { useState } from 'react';
import ChevronDown from '../icons/ChevronDown';

const menu = {
  services: [{
    name: "Create",
    linkTo: "/services/create"
  }, {
    name: "Manage",
    linkTo: "/services/manage"
  }, {
    name: "Consult",
    linkTo: "/services/consult"
  }]
}

export default function Header() {
  const [subMenuToDisplay, setSubMenuToDisplay] = useState(null);
  function handleClick(index) {
    setSubMenuToDisplay(subMenuToDisplay !== null ? null : index);
  }
  const menuEl = Object.keys(menu).map((key, index) => {
    if (Array.isArray(menu[key])) {
      const subElements = 
        <ul 
          className={`${subMenuToDisplay === index ? 'translate-y-full' : ''} overflow-hidden transition-transform transform duration-500 absolute bg-white border-4 border-brand-500 -mb-4 w-full rounded-b-lg border-t-0 bottom-0 -ml-4 flex flex-col`}
          style={{
            zIndex: -10
          }}
        >    
          {menu[key].map(el => 
            <li className="hover:text-brand-400"><Link href={el.linkTo}>{el.name}</Link></li>
          )}
        </ul>;
          return (
            <li className="relative w-full group px-4 h-full text-center" id={""+index} onClick={() => handleClick(index)}>
              <div className="flex items-center hover:text-brand-400">{key} <div className={`ml-2 transform transition-transform duration-200 ${subMenuToDisplay === index ? 'rotate-180' : '' }`}><ChevronDown /></div></div>
              {subElements}
            </li>
          )
    }
    return (<li className="relative w-full group px-4 h-full" id={""+index} onClick={handleClick}>{key}</li>);
  });
  return (
    <header className="relative flex-grow-0 border-b-4 border-brand-500 bg-white w-full z-10">
      <nav
        className="text-2xl lowercase flex justify-between items-center text-brand-500 py-4 px-4 md:px-24 z-20 bg-white"
      >
        <div className="font-bold text-center w-full md:w-auto md:text-left">
          <Link href="/">Traist Web Services</Link>
        </div>
        <div>
          <ul className="hidden flex-shrink-0 md:flex text-brand-600 h-full text-center select-none">
            {menuEl}
          </ul>
          <div className="absolute rounded md:hidden top-0 right-0 h-full w-16 flex flex-col items-center justify-center">
            <div className="bg-brand-300 hover:bg-brand-500 border border-brand-500 p-2 rounded transition-colors duration-200">
              <Menu />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

/* <li className="relative w-full group px-4 h-full" >
  Test Menu
  <ul className={`${subMenuToDisplay === "1" ? 'block' : 'hidden'} absolute top-full bg-white p-4 mt-4 left-0 border-4 border-t-0 border-brand-500 rounded-b-lg`}>
    <li>Sub menu</li>
  </ul>
</li> */