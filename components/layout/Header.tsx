import Link from 'next/link';
import Menu from '../icons/Menu';

export default function Header() {
  return (
    <header className="flex-grow-0 border-b-4 border-brand-500 bg-white w-full z-10">
      <nav
        className="relative text-2xl lowercase flex justify-between items-center text-brand-500 py-4 px-4 md:px-24"
      > 
        <div className="font-bold text-center w-full md:w-auto md:text-left">
          <Link href="/">Traist Web Services</Link>
        </div>
        <div>
          <ul className="hidden flex-shrink-0 md:flex text-brand-400">
            <li>
              Menu Item 1
            </li>
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

