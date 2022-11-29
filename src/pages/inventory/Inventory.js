//Ticket 20 - Markup for header and calling a component for Inventory list
import "./Inventory.scss";
import InventoryItemsList from "../../components/inventoryItemsList/InventoryItemsList";
import searchIcon from "../../assets/icons/search-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import { Outlet, Link } from "react-router-dom";

export default function Inventory({ inventoryItemsList }) {
  return (
    <>
      <Outlet />
      {/* Inventory nav bar */}
      <div className="inventory-contaneiner">
        <section className="inventory">
          <div className="inventory__nav-bar">
            <h1 className="inventory__section-header">Inventory</h1>
            <div className="inventory__search-add-container">
              <form className="inventory__input-wrapper-form">
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
              <div className="invetory__link-wrapper">
                <Link
                  className="inventory__button-link"
                  to={`addInventoryItem`}
                >
                  <button className="inventory__button">+Add New Item</button>
                </Link>
              </div>
            </div>
          </div>
          {/* Inventory sort bar - not visible for mobile */}
          <div className="inventory__sort-bar inventory__sort-bar--mid">
            <div className="inventory__sort-item-container">
              <div className="inventory__sort-item">
                <span className="inventory__label-text">INVENTORY ITEM</span>
                <img
                  className="inventory__sort-icon"
                  src={sortIcon}
                  alt="sort icon: arrow up and down"
                />
              </div>
              <div className="inventory__sort-item">
                <span className="inventory__label-text">CATEGORY</span>
                <img
                  className="inventory__sort-icon"
                  src={sortIcon}
                  alt="sort icon: arrow up and down"
                />
              </div>
              <div className="inventory__sort-item">
                <span className="inventory__label-text">STATUS</span>
                <img
                  className="inventory__sort-icon"
                  src={sortIcon}
                  alt="sort icon: arrow up and down"
                />
              </div>
              <div className="inventory__sort-item">
                <span className="inventory__label-text">QTY</span>
                <img
                  className="inventory__sort-icon"
                  src={sortIcon}
                  alt="sort icon: arrow up and down"
                />
              </div>
              <div className="inventory__sort-item">
                <span className="inventory__label-text">WAREHOUSE</span>
                <img
                  className="inventory__sort-icon"
                  src={sortIcon}
                  alt="sort icon: arrow up and down"
                />
              </div>
            </div>
            <div className="inventory__action">
              <span className="inventory__label-text">ACTIONS</span>
            </div>
            {/* Inventory list rendered dinamically */}
          </div>
          {inventoryItemsList?.map((inventoryItem) => {
            return (
              <InventoryItemsList
                key={inventoryItem?.id + inventoryItem?.item_name}
                name={inventoryItem?.item_name}
                category={inventoryItem?.category}
                status={inventoryItem?.status}
                quantity={inventoryItem?.quantity}
                warehouseId={inventoryItem?.warehouse_id}
                inventoryItemId={inventoryItem?.id}
              />
            );
          })}
        </section>
      </div>
    </>
  );
}
