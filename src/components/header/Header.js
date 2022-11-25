//Ticket 7
import "./Header.scss";
import logo from "../../assets/logo/InStock-Logo.svg";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();
  return (
    <>
      <div className="header">
        <div className="header__logo-container">
          <Link to={`/`}>
            <img className="header__logo" src={logo} alt="InStock Logo" />
          </Link>
        </div>
        <div className="header__buttons-container">
          <div className="header__button-wrapper">
            <Link to={`warehouses`}>
              <button
                className={`header__button ${
                  pathname.includes("warehouses")
                    ? "header__button--current-page"
                    : ""
                }`}
                type="button"
                name="warehousesButton"
              >
                Warehouses
              </button>
            </Link>
          </div>
          <div className="header__button-wrapper">
            <Link to={`inventory`}>
              <button
                className={`header__button ${
                  pathname.includes("inventory")
                    ? "header__button--current-page"
                    : ""
                }`}
                type="button"
                name="inventoryButton"
              >
                Inventory
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
