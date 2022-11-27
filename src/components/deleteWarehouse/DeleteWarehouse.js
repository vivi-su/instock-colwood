//Ticket 13
import React from "react";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import Exit from "../../assets/icons/close-24px.svg";
import "./DeleteWarehouse.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DeleteWarehouse({
 handleDeleteWarehouse,
  warehouseList,
}) {
  const navigate = useNavigate();
  const { warehouseId } = useParams();
  const [showDeleteWarehouse, setShowDeleteWarehouse] = useState({});

   useEffect(() => {
    setShowDeleteWarehouse(
      warehouseList?.find((warehouse) => warehouse.id === warehouseId)
    );
  }, [
    warehouseId,
    setShowDeleteWarehouse,
    warehouseList
  ]);

const handleDelete = (event) => {
    event.preventDefault();

    const deleteWarehouse = async () => {
      if (!warehouseId) {
        return;
      }
      try {
        await axios.delete(`http://localhost:8080/warehouses/${warehouseId}`);
       
        handleDeleteWarehouse(warehouseId);
        navigate("/warehouses");
      } catch (err) {
        console.log(`${warehouseId} does not exist`, err);
      }
    };
    deleteWarehouse();
  };



return (
  <>
    <Outlet />
    <div className="delete-warehouse__box">
      <div className="delete-warehouse__popup">
        <Link to={`/warehouses`}>
          <button className="delete-warehouse__exit">
            <img
              src={Exit}
              alt="Exit Icon"
              className="delete-warehouse__icon"
            />
          </button>
        </Link>
        <div className="delete-warehouse__heading">
          <h1 className="delete-warehouse__heading-text">
            Delete {showDeleteWarehouse?.warehouse_name} warehouse?
          </h1>
        </div>
        <div className="delete-warehouse__details">
          <p className="delete-warehouse__details-text">
            Please confirm that you’d like to delete the{" "}
            {showDeleteWarehouse?.warehouse_name} from the list of warehouses.
            You won’t be able to undo this action.
          </p>
        </div>
        <div className="delete-warehouse__button-container">
          <Link to={`warehouses`} className="delete-warehouse__button-cancel">
            <button className="delete-warehouse__button delete-warehouse__cancel">
              Cancel
            </button>
          </Link>
          <button
            className="delete-warehouse__button delete-warehouse__delete"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </>
);
}




