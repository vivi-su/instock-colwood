//Ticket 13
import React from "react";
import { Link } from "react-router-dom";
import Exit from "../../assets/icons/close-24px.svg";
import "./DeleteWarehouse.scss";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DisplayDeletePopup = (props) => {
  //const formRef = useRef();
  const navigate = useNavigate();
  const { warehouseId } = useParams();
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteWarehouse, SetDeleteWarehouse] = useState([]);
  //console.log("showDeleteWarehouse",props.showDeleteWarehouse);

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/warehouses");
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const deleteWarehouse = async () => {
      if (!warehouseId) {
        return;
      }
      try {
        const { data } = await axios.delete(
          `http://localhost:8080/warehouses/${warehouseId}`
        );
        SetDeleteWarehouse(data);
        setDeletePopup(false);
        alert(
          `${props.showDeleteInventoryItem} warehouse is successfully deleted!`
        );
        window.location.reload(false);
      } catch (err) {
        //console.log(`${warehouseId} does not exist`, err);
      }
    };
    deleteWarehouse();
  };

  return props.trigger ? (
    <div className="opacity">
      <div className="delete-warehouse">
        <div className="delete-warehouse__container">
          <Link to="/warehouses">
            <img
              src={Exit}
              alt="Exit Icon"
              className="delete-warehouse__icon"
            />
          </Link>
          <h1 className="delete-warehouse__heading">
            Delete {props.showDeleteWarehouse} warehouse?
          </h1>
          <p className="delete-warehouse__text">
            Please confirm that you’d like to delete the{" "}
            {props.showDeleteWarehouse} from the list of warehouses. You won’t
            be able to undo this action.
          </p>
          <div className="delete-warehouse__button-container">
            <Link to="/warehouses" className="delete-warehouse__cancel">
              <button
                onClick={handleCancel}
                className="delete-warehouse__button delete-warehouse__button-cancel"
              >
                Cancel
              </button>
            </Link>
            <button
              className="delete-warehouse__button delete-warehouse__button-delete"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default function DeleteWarehouse() {
  const { warehouseId } = useParams();
  const [deletePopup, setDeletePopup] = useState(false);
  const [showDeleteWarehouse, SetShowDeleteWarehouse] = useState([]);

  useEffect(() => {
    const fetchWarehouse = async () => {
      if (!warehouseId) {
        return;
      }
      try {
        const { data } = await axios.get(
          `http://localhost:8080/warehouses/${warehouseId}`
        );
        setDeletePopup(true);
        console.log(data.warehouse_name);
        SetShowDeleteWarehouse(data.warehouse_name);
        console.log(showDeleteWarehouse);
      } catch (err) {
        console.log(`${warehouseId} does not exist`, err);
      }
    };

    fetchWarehouse();
  }, [warehouseId, SetShowDeleteWarehouse, showDeleteWarehouse]);

  return (
    <>
      <DisplayDeletePopup
        trigger={deletePopup}
        setTrigger={setDeletePopup}
        showDeleteWarehouse={showDeleteWarehouse}
      ></DisplayDeletePopup>
      
    </>
  );
}
