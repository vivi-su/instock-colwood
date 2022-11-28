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
    <>
      <section className="inventory">
        <div className="inventory-header__list">
          {/* <div className="inventory-header__list-wrapper--large"> */}
          <div className="inventory-header__list-content">
            <div className="inventory-header__list-content-text">
              INVENTORY ITEM
            </div>
            <img
              className="inventory-header__list-sortIcon"
              src={sortIcon}
              alt="sort icon"
            />
          </div>
          <div className="inventory-header__list-content">
            <div className="inventory-header__list-content-text">CATEGORY</div>
            <img
              className="inventory-header__list-sortIcon"
              src={sortIcon}
              alt="sort icon"
            />
          </div>
          <div className="inventory-header__list-content">
            <div className="inventory-header__list-content-text">STATUS</div>
            <img
              className="inventory-header__list-sortIcon"
              src={sortIcon}
              alt="sort icon"
            />
          </div>
          <div className="inventory-header__list-content">
            <div className="inventory-header__list-content-text">QTY</div>
            <img
              src={sortIcon}
              className="inventory-header__list-sortIcon"
              alt="sort icon"
            />
          </div>
          <div className="inventory-header__list-content-text">ACTIONS</div>
          {/* </div> */}
        </div>

        {warehouseInventoryList?.map((warehouseInventory) => (
          <>
            <section
              className="inventory-wrapper"
              key={warehouseInventory.item_name + warehouseInventory.id}
            >
              <div className="inventory__list">
                <div className="inventory__card">
                  {/* INVENTORY ITEM */}
                  <div className="inventory__item-wrapper">
                    <div className="inventory__item">
                      <div className="inventory__item-header">
                        <h5 className="inventory__item-text ">
                          INVENTORY ITEM
                        </h5>
                      </div>
                      <div className="inventory__item-thing">
                        <Link
                          className="inventory__item-link"
                          to={`/inventory/${warehouseInventory.id}`}
                        >
                          <p
                            className="inventory__item-name inventory__item-link
                          "
                          >
                            {warehouseInventory.item_name}
                          </p>

                          <img src={chevronIcon} alt="more than sign" />
                        </Link>
                      </div>
                    </div>

                    {/* INVENTORY STATUS */}
                    <div className="inventory__status">
                      <div className="inventory__status-header">
                        <h5 className="inventory__item-text">STATUS</h5>
                      </div>
                      <p className="inventory__item-status">
                        {warehouseInventory.status}
                      </p>
                    </div>
                  </div>

                  <div className="inventory__category-wrapper">
                    {/* INVENTORY CATEGORY */}
                    <div className="inventory__category">
                      <div className="inventory__category-header">
                        <h5 className="inventory__item-text">CATEGORY</h5>
                      </div>
                      <p className="inventory__item-name">
                        {warehouseInventory.category}
                      </p>
                    </div>

                    {/* INVENTORY QTY */}
                    <div className="inventory__qty">
                      <div className="inventory__qty-header">
                        <h5 className="inventory__item-text">QTY</h5>
                      </div>
                      <p className="inventory__item-name">
                        {warehouseInventory.quantity}
                      </p>
                    </div>
                  </div>

                  {/* INVENTORY ACTIONS BUTTONS */}
                  <div className="inventory__actions">
                    <div className="inventory__actions-btns">
                      <Link
                        className="inventory__actions-edit"
                        to={`/inventory/deleteInventoryItem/${warehouseInventory.id}`}
                      >
                        <img src={deleteIcon} alt="delete" />
                      </Link>
                      <Link
                        to={`/inventory/editInventoryItem/${warehouseInventory.id}`}
                      >
                        <img src={editIcon} alt="edit" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* my experiment */}
            <section className="inventory-tablet">
              <div className="inventory-tablet__list-tablet">
                <div className="inventory-tablet__card">
                  {/* INVENTORY ITEM */}
                  <div className="inventory-tablet__item-wrapper">
                    <div className="inventory-tablet__item">
                      {/* <div className="inventory__item-thing"> */}
                      <Link
                        className="inventory-tablet__item-link"
                        to={`/inventory/${warehouseInventory.id}`}
                      >
                        <p
                          className="inventory-tablet__item-name inventory-tablet__item-link
                          "
                        >
                          {warehouseInventory.item_name}
                        </p>

                        <img
                          className="inventory-tablet__item-icon"
                          src={chevronIcon}
                          alt="more than sign"
                        />
                      </Link>
                      {/* </div> */}
                    </div>
                    {/* 
                    <div className="inventory__category-wrapper"> */}
                    {/* INVENTORY CATEGORY */}
                    <div className="inventory-tablet__category">
                      <p className="inventory-tablet__item-name">
                        {warehouseInventory.category}
                      </p>
                    </div>
                    {/* </div> */}
                  </div>
                  <div className="inventory-tablet__status-qty">
                    {/* INVENTORY STATUS */}
                    <div className="inventory-tablet__status">
                      <p className="inventory-tablet__item-status">
                        {warehouseInventory.status}
                      </p>
                    </div>

                    {/* INVENTORY QTY */}
                    <div className="inventory-tablet__qty">
                      <p className="inventory-tablet__item-name">
                        {warehouseInventory.quantity}
                      </p>
                    </div>
                  </div>
                </div>
                {/* INVENTORY ACTIONS BUTTONS */}

                <div className="inventory-tablet__actions-btns">
                  <Link
                    className="inventory-tablet__actions-edit"
                    to={`/inventory/deleteInventoryItem/${warehouseInventory.id}`}
                  >
                    <img src={deleteIcon} alt="delete" />
                  </Link>
                  <Link
                    to={`/inventory/editInventoryItem/${warehouseInventory.id}`}
                  >
                    <img src={editIcon} alt="edit" />
                  </Link>
                </div>
              </div>
            </section>
          </>
        ))}
      </section>
    </>
  );
}
