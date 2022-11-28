//Ticket 21
import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import "./InventoryItemDetails.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Edit from "../../assets/icons/edit-24px.svg";
import Arrow from "../../assets/icons/arrow_back-24px.svg";

export default function InventoryItemDetails({ warehouseList }) {
  const { itemId } = useParams();

  const [itemDetails, setItemDetails] = useState();

  const warehouseObj = warehouseList.find(
    (element) => element?.id === itemDetails?.warehouse_id
  );

  useEffect(() => {
    const getSingleItemURL = `http://localhost:8080/inventories/${itemId}`;
    axios.get(getSingleItemURL).then((response) => {
      setItemDetails(response.data);
    });
  }, [itemId]);

  return (
    <>
      <Outlet />
      <section className="item-details">
        <div className="item-details__header">
          <Link to={`/inventory`}>
            <img
              className="item-details__header-arrow"
              src={Arrow}
              alt="Back arrow"
            />
          </Link>

          <h1 className="item-details__header-title">
            {itemDetails?.item_name}
          </h1>

          <Link
            to={`/inventory/editInventoryItem/:itemId`}
            className="item-details__link"
          >
            <button className="item-details__header-button">
              <img
                className="item-details__header-button-icon"
                src={Edit}
                alt="edit"
              />
              <p className="item-details__header-button-text">Edit</p>
            </button>
          </Link>
        </div>

        <div className="item-details__container">
          <div className="item-details__description">
            <div>
              <h3 className="item-details__description-header">
                ITEM DESCRIPTION:
              </h3>
              <p className="item-details__description-description">
                {itemDetails?.description}
              </p>
            </div>

            <div className="item-details__description-wrap">
              <h3 className="item-details__description-header">CATEGORY:</h3>
              <p className="item-details__description-description">
                {itemDetails?.category}
              </p>
            </div>
          </div>

          <div className="item-details__logistics">
            <div className="item-details__logistics-amount">
              <div className="item-details__logistics-amount-status">
                <h3 className="item-details__logistics-header">STATUS:</h3>

                <p
                  className={`item-details__logistics-instock ${
                    itemDetails?.status === "In Stock"
                      ? "item-details__logistics-instock--instock"
                      : ""
                  }`}
                >
                  {itemDetails?.status}
                </p>
              </div>
              <div className="item-details__logistics-amount-quantity">
                <h3 className="item-details__logistics-header">QUANTITY:</h3>
                <p className="item-details__logistics-description">
                  {itemDetails?.quantity}
                </p>
              </div>
            </div>
            <div className="item-details__logistics-warehouse">
              <h3 className="item-details__logistics-header">WAREHOUSE:</h3>
              <p className="item-details__logistics-description">
                {warehouseObj?.warehouse_name}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
