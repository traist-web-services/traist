import Link from "next/link";
import styles from "./Menu.module.scss";

import { useState } from "react";
import ChevronDown from "../icons/ChevronDown";
import MenuIcon from "../icons/Menu";

const menuDefault = {
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

interface SubMenu {
  name: string;
  linkTo: string;
}

interface MenuInterface {
  [key: string]: SubMenu[];
}

interface Props {
  menu?: MenuInterface;
  simple?: boolean;
}

const Menu = ({ menu = menuDefault, simple = false }: Props) => {
  const menuKeys: string[] = Object.keys(menu);
  if (simple) {
    return (
      <ul>
        {menuKeys.map((key) => {
          return menu[key].map((thisItem) => (
            <li key={thisItem.name}>
              <Link href={thisItem.linkTo}>{thisItem.name}</Link>
            </li>
          ));
        })}
      </ul>
    );
  }
  const [subMenuToDisplay, setSubMenuToDisplay] = useState(null);
  const [displayMobileMenu, setDisplayMobileMenu] = useState(false);
  function handleClick(index: number) {
    setSubMenuToDisplay(subMenuToDisplay !== null ? null : index);
  }
  const menuElements = menuKeys.map((topLevelItem, index) => {
    const thisItem = menu[topLevelItem];
    if (thisItem.length === 1) {
      return (
        <li className={styles.topLevelItem} key={thisItem[0].name}>
          <Link href={thisItem[0].linkTo}>{thisItem[0].name}</Link>
        </li>
      );
    }

    return (
      <li className={styles.topLevelItem} key={topLevelItem}>
        {topLevelItem}
        <span
          className={`${styles.chevron} ${
            subMenuToDisplay === index ? styles.chevron__invert : ""
          }`}
        >
          <span
            onClick={() => {
              handleClick(index);
            }}
          >
            <ChevronDown />
          </span>
        </span>

        <ul
          className={`${styles.subMenu} ${
            subMenuToDisplay === index ? styles.subMenu__open : ""
          }`}
        >
          {Array.isArray(menu[topLevelItem])
            ? menu[topLevelItem].map(
                ({ linkTo, name }: { linkTo: string; name: string }) => {
                  return (
                    <li className={styles.subMenuItem} key={name}>
                      <Link href={linkTo}>{name}</Link>
                    </li>
                  );
                }
              )
            : ""}
          <li
            className={styles.closeMobileMenu}
            onClick={() => setDisplayMobileMenu(false)}
          >
            X
          </li>
        </ul>
      </li>
    );
  });

  return (
    <>
      <div
        className={`${styles.desktopMenu} ${
          displayMobileMenu
            ? styles.desktopMenu__open
            : styles.desktopMenu__close
        }`}
      >
        <ul
          className={`${styles.menu} ${
            displayMobileMenu ? styles.menu__show : styles.menu__hide
          }`}
        >
          {menuElements}
        </ul>
      </div>
      <div className={styles.mobileMenu}>
        <div
          className={styles.mobileMenuTapTarget}
          onClick={() => setDisplayMobileMenu(!displayMobileMenu)}
        >
          <MenuIcon />
        </div>
      </div>
    </>
  );
};

export default Menu;
