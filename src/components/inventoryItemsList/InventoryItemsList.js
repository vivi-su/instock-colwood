import "./InventoryItemsList.scss";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
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
      <div>
        <span className="inventory-list__label-text inventory-list__label-text--mid">
          INVENTORY ITEM
        </span>
        <Link to={`${inventoryItemId}`}>
          <span>{name}</span>
        </Link>
      </div>
      <div>
        <span className="inventory-list__label-text inventory-list__label-text--mid">
          CATEGORY
        </span>
        <span>{category}</span>
      </div>
      <div>
        <span className="inventory-list__label-text inventory-list__label-text--mid">
          STATUS
        </span>
        <span>{status}</span>
      </div>
      <div>
        <span className="inventory-list__label-text inventory-list__label-text--mid">
          QTY
        </span>
        <span>{quantity}</span>
      </div>
      <div>
        <span className="inventory-list__label-text inventory-list__label-text--mid">
          WAREHOUSE
        </span>
        {warehouseName && <span>{warehouseName}</span>}
      </div>
      <div className="inventory__action-buttons">
        <Link to={`deleteInventoryItem/${inventoryItemId}`}>
          <img src={deleteIcon} alt="delete: trash bin icon" />
        </Link>
        <Link to={`editInventoryItem/${inventoryItemId}`}>
          <img src={editIcon} alt="edit: pencil icon" />
        </Link>
      </div>
    </section>
  );
}
