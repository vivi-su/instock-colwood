//Ticket 20 - Markup for header and calling a component for Inventory list
import "./Inventory.scss";
import InventoryItemsList from "../../components/inventoryItemsList/InventoryItemsList";
import searchIcon from "../../assets/icons/search-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Inventory() {
  const [inventoryItems, setInventoryItems] = useState([]);

  console.log(inventoryItems);
  useEffect(() => {
    const getInventoryItemsURL = "http://localhost:8080/inventories";

    axios
      .get(getInventoryItemsURL)
      .then((response) => {
        setInventoryItems(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {/* Inventory nav bar */}
      <div className="inventory">
        <section className="inventory__nav-bar">
          <h1 className="inventory__section-header">Inventory</h1>
          <div className="inventory__search-add-container">
            <form className="inventory__input-wrapper">
              <input
                className="inventory__input"
                type="text"
                placeholder="Search..."
              />

              <img
                className="inventory__search-icon"
                src={searchIcon}
                alt="search icon: magnifying glass"
              />
            </form>

            <Link className="inventory__button-link" to={`addInventoryItem`}>
              <button className="inventory__button">+Add New Item</button>
            </Link>
          </div>
        </section>
        {/* Inventory sort bar - not visible for mobile */}
        <section className="inventory__sort-bar inventory__sort-bar--mid">
          <div className="inventory__sort-item-container">
            <div className="inventory__sort-item">
              <span>INVENTORY ITEM</span>
              <img src={sortIcon} alt="sort icon: arrow up and down" />
            </div>
            <div className="inventory__sort-item">
              <span>CATEGORY</span>
              <img src={sortIcon} alt="sort icon: arrow up and down" />
            </div>
            <div className="inventory__sort-item">
              <span>STATUS</span>
              <img src={sortIcon} alt="sort icon: arrow up and down" />
            </div>
            <div className="inventory__sort-item">
              <span>QTY</span>
              <img src={sortIcon} alt="sort icon: arrow up and down" />
            </div>
            <div className="inventory__sort-item">
              <span>WAREHOUSE</span>
              <img src={sortIcon} alt="sort icon: arrow up and down" />
            </div>
          </div>
          <div className="inventory__action">
            <span className="inventory__action-text">ACTIONS</span>
          </div>
        </section>
        {/* Inventory list rendered dinamically */}
        <section className="inventory__item-list-container">
          <InventoryItemsList />
        </section>
      </div>
    </>
  );
}
