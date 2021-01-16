import { EditLink } from "../edit-link/EditLink";

export default function Footer() {
  return (
    <footer className="flex-grow-0 flex p-24 bg-brand-900 text-white lowercase">
      <div className="w-1/3 border-r border-brand-200 px-8">
        <h5 className="text-2xl">Traist Web Services &copy; 2021</h5>
        <p>
          <a href="mailto:hi@traist.co.uk" className="text-xl underline">hi@traist.co.uk</a>
        </p>
      </div>
      <div className="w-1/3 border-r border-brand-200 px-8">
        <h5 className="text-2xl">Pages</h5>
        <ul>
            <li>
              Menu Item
            </li>
            <li>
              <EditLink className='lowercase' />
            </li>
        </ul>
      </div>
      <div className="w-1/3 px-8">
        <h5 className="text-2xl">About</h5>
        <p>Traist Web Services is a digital consultancy firm building exceptional user experiences for small to medium businesses.</p>
      </div>
    </footer>
  )
}