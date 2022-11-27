//Ticket 22
import "./EditInventoryItem.scss";
import BackArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";
import { Link, useNavigate, Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function EditInventoryItem({
  inventoryItemsList,
  handleEditItem,
}) {
  const navigate = useNavigate();
  const [statusButton, setStatusButton] = useState("Out of Stock");
  const [itemName, setItemName] = useState("default");
  const [description, setDescription] = useState("default");
  const [category, setCategory] = useState("default");
  const [status, setStatus] = useState("default");
  const [quantity, setQuantity] = useState(1);
  const [warehouse, setWarehouse] = useState("default");
  const [showEditInventoryItem, setShowEditInventoryItem] = useState({});
  const { itemId } = useParams();

  const warehouseList = [
    "Please Select",
    "Manhattan",
    "Washington",
    "Jersey",
    "SF",
    "Santa Monica",
    "Seattle",
    "Miami",
    "Boston",
  ];

  const categoryList = [
    "Please Select",
    "Accessories",
    "Gear",
    "Electronics",
    "Health",
    "Apparel",
  ];

  const isStatusValid = () => {
    if (status === "") {
      return false;
    }
    return true;
  };
  const isItemNameValid = () => {
    if (itemName === "") {
      return false;
    }
    return true;
  };
  const isDescriptionValid = () => {
    if (description === "") {
      return false;
    }
    return true;
  };
  const isCategoryValid = () => {
    if (category === "Please Select") {
      return false;
    }
    return true;
  };
  const isQuantityValid = () => {
    if (quantity === "" || !Number.isInteger(quantity) || quantity < 1) {
      return false;
    }
    return true;
  };
  const isWarehouseValid = () => {
    if (warehouse === "Please Select") {
      return false;
    }
    return true;
  };

  const handleWarehouseChange = (event) => {
    setWarehouse(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleStatus = (event) => {
    setStatusButton(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const itemName = event.target.itemName.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    const status = event.target.status.value;
    const warehouse = event.target.warehouse.value;
    let quantity = null;

    if (status === "In Stock") {
      quantity = Number(event.target.quantity.value);
    } else {
      quantity = 0;
    }

    const newInventoryItem = {
      id: uuidv4(),
      warehouse_id: warehouse,
      item_name: itemName,
      description: description,
      category: category,
      status: status,
      quantity: quantity,
    };

    setItemName(itemName);
    setDescription(description);
    setCategory(category);
    setStatus(status);
    setQuantity(quantity);
    setWarehouse(warehouse);

    event.target.reset();
    if (
      itemName &&
      description &&
      category &&
      status &&
      quantity &&
      warehouse
    ) {
      //make api call

      useEffect(() => {
        setShowEditInventoryItem(
          inventoryItemsList?.find((inventoryItem) => inventoryItem.id === itemId)
        );
      }, [itemId, setShowEditInventoryItem, inventoryItemsList]);

      const handleEdit = (event) => {
        event.preventDefault();

        const editInventoryItem = async () => {
          if (!itemId) {
            return;
          }
          try {
            await axios.put(`http://localhost:8080/inventories/${itemId}`);
            alert(
              `The item has been successfully updated!`
            );
            handleEditItem(itemId);
          } catch (err) {
            console.log(`${itemId} does not exist`, err);
          }
        };
        editInventoryItem();
      };
    
  return (
    <>
      <section className="edit-item">
        <Outlet />
        <h1 className="edit-item__title">
          <Link to="/inventory">
            <img
              src={BackArrowIcon}
              alt="Back arrow icon"
              className="edit-item__back-icon"
            />
          </Link>
          Edit Inventory Item
        </h1>

        <form onSubmit={handleSubmit}>
          {/* DETAILS SIDE */}
          <section className="edit-item__form">
            <section className="edit-item__details-container">
              <h2 className="edit-item__details">Item Details</h2>
              <label className="edit-item__label">Item Name</label>
              <input
                className={`edit-item__input ${
                  isItemNameValid() ? "" : "edit-item__input--invalid"
                } `}
                name="itemName"
                type="text"
              ></input>
              <label className="edit-item__label">Description</label>
              <input
                className={`edit-item__input ${
                  isDescriptionValid() ? "" : "edit-item__input--invalid"
                } `}
                name="description"
                type="text"
                cols="30"
                rows="5"
              ></input>
              <label className="edit-item__label">Category</label>
              <select
                name="category"
                className={`edit-item__input ${
                  isCategoryValid() ? "" : "edit-item__input--invalid"
                } `}
                value={category}
                onChange={handleCategoryChange}
                {...categoryList.map((category) => (
                  <option value={category} key={category + uuidv4()}>
                    {category}
                  </option>
                ))}
              ></select>
            </section>

            {/* AVAILABILITY SIDE */}
            <section className="edit-item__availability-container">
              <h2 className="edit-item__availability">Item Availability</h2>
              <label className="edit-item__label">Status</label>
              <div className="edit-item__stock">
                <label className="edit-item__in-stock">
                  In Stock
                  <input
                    className={`edit-item__input ${
                      isStatusValid() ? "" : "edit-item__input--invalid"
                    }`}
                    onClick={handleStatus}
                    id="inStock"
                    name="status"
                    type="radio"
                    value="In Stock"
                  ></input>
                </label>
                <label className="edit-item__out-stock">
                  Out of Stock
                  <input
                    className={`edit-item__input ${
                      isStatusValid() ? "" : "edit-item__input--invalid"
                    }`}
                    onClick={handleStatus}
                    id="outOfStock"
                    name="status"
                    type="radio"
                    value="Out of Stock"
                  ></input>
                </label>
              </div>
              <div
                className={`edit-item__quantity ${
                  statusButton === "In Stock"
                    ? "edit-item__quantity--inStock"
                    : ""
                }`}
              >
                <label className="edit-item__label">Quantity</label>
                <input
                  className={`edit-item__input ${
                    isQuantityValid() ? "" : "edit-item__input--invalid"
                  }`}
                  name="quantity"
                  type="text"
                ></input>
              </div>
              <div>
                <label className="edit-item__label">Warehouse</label>
                <select
                  className={`edit-item__input ${
                    isWarehouseValid() ? "" : "edit-item__input--invalid"
                  }`}
                  onChange={handleWarehouseChange}
                  value={warehouse}
                  name="warehouse"
                  id="warehouse"
                >
                  {warehouseList.map((warehouse) => (
                    <option value={warehouse} key={warehouse + uuidv4()}>
                      {warehouse}
                    </option>
                  ))}
                  <option className="edit-item__option">Please select</option>
                </select>
              </div>
            </section>
          </section>

          <section className="edit-item__button">
            <button className="edit-item__cancel-button" type="submit">
              <Link to="/inventory" className="edit-item__cancel">
                Cancel
              </Link>
            </button>
            <button className="edit-item__save" type="submit">
              Save
            </button>
          </section>
        </form>
      </section>
    </>
  );
}