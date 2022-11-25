//Ticket 11

import chevronIcon from "../../assets/icons/chevron_right-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import "./WarehouseInventoryList.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function WarehouseInventoryList({ warehouseId }) {
  const [warehouseInventoryList, setWarehouseInventoryList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/warehouses/${warehouseId}/inventories`)
      .then((response) => {
        setWarehouseInventoryList(response.data);
      });
  }, [warehouseId]);

  return (
    <section className="inventory">
      {warehouseInventoryList?.map((warehouseInventory) => (
        <div
          className="inventory__list"
          key={warehouseInventory.item_name + warehouseInventory.id}
        >
          <div className="inventory__card">
            {/* INVENTORY ITEM */}
            <div className="inventory__item-wrapper">
              <div className="inventory__item">
                <div className="inventory__item-header">
                  <h5 className="inventory__item-text ">INVENTORY ITEM</h5>
                  <img
                    className="inventory__sort-sortIcon"
                    src={sortIcon}
                    alt="sort icon"
                  />
                </div>
                <div className="inventory__item-thing">
                  <Link to={`/inventory/${warehouseInventory.id}`}>
                    <p className="inventory__item-thing-text">
                      {warehouseInventory.item_name}
                    </p>

                    <img src={chevronIcon} alt="more than sign" />
                  </Link>
                </div>
              </div>

              {/* INVENTORY STATUS */}
              <div className="inventory__status">
                <div className="inventory__status-header">
                  <h5 className="inventory__status-text">STATUS</h5>
                  <img
                    className="inventory__sort-sortIcon"
                    src={sortIcon}
                    alt="sort icon"
                  />
                </div>
                <p className="inventory__status-stock">
                  {warehouseInventory.status}
                </p>
              </div>
            </div>

            <div className="inventory__category-wrapper">
              {/* INVENTORY CATEGORY */}
              <div className="inventory__category">
                <div className="inventory__category-header">
                  <h5 className="inventory__category-text">CATEGORY</h5>
                </div>
                <p className="inventory__category-name">
                  {warehouseInventory.category}
                </p>
              </div>

              {/* INVENTORY QTY */}
              <div className="inventory__qty">
                <div className="inventory__qty-header">
                  <h5 className="inventory__qty-text">QTY</h5>
                  <img
                    className="inventory__sort-sortIcon"
                    src={sortIcon}
                    alt="sort icon"
                  />
                </div>
                <p className="inventory__qty-num">
                  {warehouseInventory.quantity}
                </p>
              </div>
            </div>

            {/* INVENTORY ACTIONS BUTTONS */}
            <div className="inventory__actions">
              <div className="inventory__actions-header">
                <h5 className="inventory__actions-text">ACTIONS</h5>
              </div>

              <div className="inventory__actions-btns">
                <button>
                  <img src={deleteIcon} alt="delete" />
                </button>
                <button>
                  <img src={editIcon} alt="edit" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
