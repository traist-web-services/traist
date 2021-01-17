import Link from "next/link";
import { EditLink } from "../edit-link/EditLink";

export default function Footer() {
  const menu = {
    services: [
      {
        name: "Create",
        linkTo: "/services/create",
      },
      {
        name: "Manage",
        linkTo: "/services/manage",
      },
      {
        name: "Consult",
        linkTo: "/services/consult",
      },
    ],
  };
  const menuEl = Object.keys(menu).map((key, index) => {
    if (Array.isArray(menu[key])) {
      const subElements = (
        <ul>
          {menu[key].map((el) => (
            <li className="ml-2 underline">
              <Link href={el.linkTo}>{el.name}</Link>
            </li>
          ))}
        </ul>
      );
      return (
        <li>
          {key}
          {subElements}
        </li>
      );
    }
    return (
      <li>
        <Link href={menu[key]}>{key}</Link>
      </li>
    );
  });
  return (
    <footer className="flex-grow-0 flex flex-col lg:flex-row p-4 md:p-12 lg:p-24 bg-brand-900 text-white lowercase">
      <div className="w-full lg:w-1/3 lg:border-r border-brand-200 px-8 my-4 lg:my-0 ">
        <h5 className="text-xl lg:text-2xl">Traist Web Services &copy; 2021</h5>
        <p>
          <a
            href="mailto:hi@traist.co.uk"
            className="text-lg lg:text-xl underline"
          >
            hi@traist.co.uk
          </a>
        </p>
      </div>
      <div className="w-full lg:w-1/3 lg:border-r border-brand-200 px-8 my-4 lg:my-0 ">
        <h5 className="text-xl lg:text-2xl">Pages</h5>
        <ul>
          <li>{menuEl}</li>
          <li>
            <EditLink className="lowercase" />
          </li>
        </ul>
      </div>
      <div className="w-full lg:w-1/3 px-8 my-4 lg:my-0 ">
        <h5 className="text-2xl">About</h5>
        <p>
          Traist Web Services is a digital consultancy firm building exceptional
          user experiences for small to medium businesses.
        </p>
      </div>
    </footer>
  );
}
