//Ticket 13
import React from "react";
import { Link } from "react-router-dom";
import Exit from "../../assets/icons/close-24px.svg";
import "./DeleteWarehouse.scss";

export default function DeleteWarehouse() {
  return (
    //<div class="opacity">
    <div className="delete-warehouse">
      <div className="delete-warehouse__container">
        <Link to="/warehouses">
          <img src={Exit} alt="Exit Icon" className="delete-warehouse__icon" />
        </Link>
        <h1 className="delete-warehouse__heading">Delete NAME warehouse?</h1>
        <p className="delete-warehouse__text">
          Please confirm that you’d like to delete the NAME from the list of
          warehouses. You won’t be able to undo this action.
        </p>
        <div className="delete-warehouse__button-container">
          <Link to="/warehouses" className="delete-warehouse__cancel">
            <button className="delete-warehouse__button delete-warehouse__button-cancel">
              Cancel
            </button>
          </Link>
          <button
            className="delete-warehouse__button delete-warehouse__button-delete"
            //onClick={}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    //</div>
  );
}