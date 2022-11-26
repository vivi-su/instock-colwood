//Ticket 21
import React from "react";
import { Link } from "react-router-dom";
import "./InventoryItemDetails.scss";
import axios from "axios";
import Edit from "../../assets/icons/edit-24px.svg";
import Arrow from "../../assets/icons/arrow_back-24px.svg";
//import EditInventoryItem from "../EditInventoryItem/EditInventoryItem";



export default function InventoryItemDetails() {
  return (
    <section className="item-details">
      <div className="item-details__header">
        <div className="item-details__arrow-title">
          <img
            className="item-details__header-arrow"
            src={Arrow}
            alt="Back arrow"
          />
          <h1 className="item-details__header-title">TELEVISION</h1>
        </div>
        <Link className="item-details__link">
          <button
            className="item-details__header-button"
            // onClick={() => {
            //   this.editItem(
            //     this.state.singleItem.id,
            //     this.state.singleItem.warehouseName
            //   );
            // }}
          >
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
          <h3 className="item-details__description-header">
            ITEM DESCRIPTION:
          </h3>
          <p className="item-details__description-description">
            This 5- 4k LED TV provide....
          </p>
          <h3 className="item-details__description-header">CATEGORY:</h3>
          <p className="item-details__description-description">Electronics</p>
        </div>
        <div className="item-details__line"></div>
        <div className="item-details__logistics">
          <div className="item-details__logistics-amount">
            <div className="item-details__logistics-amount-status">
              <h3 className="item-details__logistics-header">STATUS:</h3>

              <p className="item-details__logistics-instock">IN STOCK</p>

              <p className="item-details__logistics-outstock">OUT OF STOCK</p>
            </div>
            <div className="item-details__logistics-amount-quantity">
              <h3 className="item-details__logistics-header">QUANTITY:</h3>
              <p className="item-details__logistics-description">500</p>
            </div>
          </div>
          <div className="item-details__logistics-warehouse">
            <h3 className="item-details__logistics-header">WAREHOUSE:</h3>
            <p className="item-details__logistics-description">Manhattan</p>
          </div>
        </div>
      </div>
    </section>
  );
}
