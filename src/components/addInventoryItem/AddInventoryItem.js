//Ticket 24
import "./AddInventoryItem.scss";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function AddInventoryItem({
  inventoryItemsList,
  handleAddItem,
}) {
  const navigate = useNavigate();
  const [statusButton, setStatusButton] = useState("Out of Stock");
  const [itemName, setItemName] = useState("default");
  const [description, setDescription] = useState("default");
  const [category, setCategory] = useState("default");
  const [status, setStatus] = useState("default");
  const [quantity, setQuantity] = useState(1);
  const [warehouse, setWarehouse] = useState("default");

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
      navigate("/inventory");
    }
  };

  return (
    <div className="add-item-container">
      <Outlet />
      <section className="add-item">
        <div className="add-item__nav-bar">
          <div className="add-item__arrow-text-wrapper">
            <Link className="add-item__back-link" to={`/inventory`}>
              <img
                className="add-item__back-icon"
                src={backArrow}
                alt="back arrow"
              />
            </Link>
            <h1 className="add-item__section-header">Add New Inventory Item</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          {/* DETAILS SIDE */}
          <div className="add-item__details">
            <h2 className="add-item__subheader">Item Details</h2>
            <div>
              <label htmlFor="itemName">Item Name</label>
              <input
                // className="add-item__input add-item__input--invalid"
                className={`add-item__input ${
                  isItemNameValid() ? "" : "add-item__input--invalid"
                }`}
                type="text"
                id="itemName"
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                className={`add-item__input ${
                  isDescriptionValid() ? "" : "add-item__input--invalid"
                }`}
                name="description"
                id="description"
                cols="30"
                rows="5"
                placeholder="Please enter a brief item description..."
              ></textarea>
            </div>
            <div>
              <label>
                Category
                <select
                  className={`add-item__input ${
                    isCategoryValid() ? "" : "add-item__input--invalid"
                  }`}
                  value={category}
                  onChange={handleCategoryChange}
                  name="category"
                  id="category"
                >
                  {categoryList.map((category) => (
                    <option value={category} key={category + uuidv4()}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {/* AVAILABILITY SIDE */}
          <div className="add-item__availability">
            <h2 className="add-item__subheader">Item Availability</h2>
            <div>
              <label>Status</label>
              <label htmlFor="inStock">In Stock</label>
              <input
                className={`add-item__input ${
                  isStatusValid() ? "" : "add-item__input--invalid"
                }`}
                onClick={handleStatus}
                type="radio"
                id="inStock"
                name="status"
                value="In Stock"
              />

              <label htmlFor="outOfStock">Out of Stock</label>
              <input
                className={`add-item__input ${
                  isItemNameValid() ? "" : "add-item__input--invalid"
                }`}
                onClick={handleStatus}
                type="radio"
                id="outOfStock"
                name="status"
                value="Out of Stock"
              />
            </div>
            <div
              className={`add-item__quantity ${
                statusButton === "In Stock" ? "add-item__quantity--inStock" : ""
              }`}
            >
              <label htmlFor="quantity">Quantity</label>
              <input
                className={`add-item__input ${
                  isQuantityValid() ? "" : "add-item__input--invalid"
                }`}
                type="text"
                id="quantity"
              />
            </div>
            <div>
              <label>
                Warehouse
                <select
                  className={`add-item__input ${
                    isWarehouseValid() ? "" : "add-item__input--invalid"
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
                </select>
              </label>
            </div>
          </div>
          <div className="add-item__button add-item__button--cancel">
            Cancel
          </div>
          <button className="add-item__button add-item__button--add">
            +Add New Item
          </button>
        </form>
      </section>
    </div>
  );
}
