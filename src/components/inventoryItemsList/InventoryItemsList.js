import "./InventoryItemsList.scss";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import chevron from "../../assets/icons/chevron_right-24px.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function InventoryItemsList({
  name,
  category,
  status,
  quantity,
  warehouseId,
  inventoryItemId,
}) {
  const [warehouseName, setWarehouseName] = useState();

  useEffect(() => {
    const getSingleWarehouseURL = `http://localhost:8080/warehouses/${warehouseId}`;
    axios.get(getSingleWarehouseURL).then((response) => {
      setWarehouseName(response.data.warehouse_name);
    });
  }, [warehouseId]);

  return (
    <section className="inventory-list">
      <div className="inventory-list__row-container">
        <div className="inventory-list__column">
          <div className="inventory-list__info">
            <span className="inventory-list__label-text inventory-list__label-text--mid">
              INVENTORY ITEM
            </span>
            <Link className="inventory-list__link" to={`${inventoryItemId}`}>
              <span className="inventory-list__body-text inventory-list__body-text--link">
                {name}
              </span>
              <img
                className="inventory-list__chevron"
                src={chevron}
                alt="chevron"
              />
            </Link>
          </div>
          <div className="inventory-list__info">
            <span className="inventory-list__label-text inventory-list__label-text--mid">
              CATEGORY
            </span>
            <span className="inventory-list__body-text">{category}</span>
          </div>
        </div>

        <div className="inventory-list__column">
          <div className="inventory-list__info">
            <span className="inventory-list__label-text inventory-list__label-text--mid">
              STATUS
            </span>
            <span
              className={`inventory-list__status ${
                status === "In Stock"
                  ? "inventory-list__status--green"
                  : "inventory-list__status--red"
              }  `}
            >
              {status}
            </span>
          </div>
          <div className="inventory-list__info">
            <span className="inventory-list__label-text inventory-list__label-text--mid">
              QTY
            </span>
            <span className="inventory-list__body-text">{quantity}</span>
          </div>
          <div className="inventory-list__info">
            <span className="inventory-list__label-text inventory-list__label-text--mid">
              WAREHOUSE
            </span>
            {warehouseName && (
              <span className="inventory-list__body-text">{warehouseName}</span>
            )}
          </div>
        </div>
      </div>

      <div className="inventory-list__icons-container">
        <div className="inventory-list__action-buttons inventory-list__action-buttons--mid">
          <Link
            className="inventory-list__link"
            to={`deleteInventoryItem/${inventoryItemId}`}
          >
            <img
              className="inventory-list__icon"
              src={deleteIcon}
              alt="delete: trash bin icon"
            />
          </Link>
        </div>
        <div className="inventory-list__action-buttons inventory-list__action-buttons--mid">
          <Link
            className="inventory-list__link"
            to={`editInventoryItem/${inventoryItemId}`}
          >
            <img
              className="inventory-list__icon"
              src={editIcon}
              alt="edit: pencil icon"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
