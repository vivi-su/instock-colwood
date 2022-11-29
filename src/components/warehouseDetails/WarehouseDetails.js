//Ticket 10
import "./WarehouseDetails.scss";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function WarehouseDetails({ warehouseId }) {
  const [warehouseDetails, setWarehouseDetails] = useState();
  useEffect(() => {
    const getSingleWarehouseURL = `http://localhost:8080/warehouses/${warehouseId}`;
    axios.get(getSingleWarehouseURL).then((response) => {
      setWarehouseDetails(response.data);
    });
  }, [warehouseId]);

  return (
    <>
      <Outlet />
      <section className="warehouse-details">
        <div className="warehouse-details__nav-bar">
          <div className="warehouse-details__arrow-text-wrapper">
            <Link className="warehouse-details__back-link" to={`/warehouses`}>
              <img
                className="warehouse-details__back-icon"
                src={backArrow}
                alt="back arrow"
              />
            </Link>
            <h1 className="warehouse-details__section-header">
              {warehouseDetails?.warehouse_name}
            </h1>
          </div>
          <Link
            className="warehouse-details__edit-link"
            to={`/warehouses/editWarehouse/${warehouseId}`}
          >
            <div className="warehouse-details__edit-button">
              <img
                className="warehouse-details__edit-icon"
                src={editIcon}
                alt="edit icon: pencil"
              />
              <span className="warehouse-details__edit-text warehouse-details__edit-text--mid">
                Edit
              </span>
            </div>
          </Link>
        </div>
        <div className="warehouse-details__info">
          <div className="warehouse-details__address-container">
            <span className="warehouse-details__label-text">
              WAREHOUSE ADDRESS:
            </span>
            <div className="warehouse-details__address-wrapper">
              <span className="warehouse-details__info-text">
                {`${warehouseDetails?.address}, `}
              </span>
              <span className="warehouse-details__info-text">
                {`${warehouseDetails?.city}, ${warehouseDetails?.country}`}
              </span>
            </div>
          </div>
          <div className="warehouse-details__contact-wrapper">
            <div className="warehouse-details__contact warehouse-details__contact--name">
              <span className="warehouse-details__label-text">
                CONTACT NAME:
              </span>
              <span className="warehouse-details__info-text">
                {warehouseDetails?.contact_name}
              </span>
              <span className="warehouse-details__info-text">
                {warehouseDetails?.contact_position}
              </span>
            </div>
            <div className="warehouse-details__contact">
              <span className="warehouse-details__label-text">
                CONTACT INFORMATION:
              </span>
              <span className="warehouse-details__info-text">
                {warehouseDetails?.contact_phone}
              </span>
              <span className="warehouse-details__info-text">
                {warehouseDetails?.contact_email}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
