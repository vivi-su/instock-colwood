//Ticket 7
import "./Header.scss";
import logo from "../../assets/logo/InStock-Logo.svg";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="header">
        <div className="header__logo-container">
          <Link to={`/`}>
            <img className="header__logo" src={logo} alt="InStock Logo" />
          </Link>
        </div>
        <div className="header__buttons-container">
          <Link to={`warehouses`}>
            <button
              className="header__button"
              type="button"
              name="warehousesButton"
            >
              Warehouses
            </button>
          </Link>
          <Link to={`inventory`}>
            <button
              className="header__button"
              type="button"
              name="inventoryButton"
            >
              Inventory
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
