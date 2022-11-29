//Ticket 24
import "./AddInventoryItem.scss";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

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

  //The warehouse list and the category list is hardcoded because
  //it didn't make sense to have them generated dinamically.
  //If we had them generated dinamically, if somebody deleted the warehouses,
  //leaving only a warehouse that had no inventory, there would be nothing in the category list.
  //And same applies to warehouses. If all the warehouses in the list get deleted, there won't be
  //any warehouse for the user to select from in the dropdown options.
  const warehouseList = [
    {
      warehouse_name: "Please Select",
    },
    {
      id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      warehouse_name: "Manhattan",
    },
    {
      id: "5bf7bd6c-2b16-4129-bddc-9d37ff8539e9",
      warehouse_name: "Washington",
    },
    {
      id: "90ac3319-70d1-4a51-b91d-ba6c2464408c",
      warehouse_name: "Jersey",
    },
    {
      id: "bfc9bea7-66f1-44e9-879b-4d363a888eb4",
      warehouse_name: "SF",
    },
    {
      id: "89898957-04ba-4bd0-9f5c-a7aea7447963",
      warehouse_name: "Santa Monica",
    },
    {
      id: "ade0a47b-cee6-4693-b4cd-a7e6cb25f4b7",
      warehouse_name: "Seattle",
    },
    {
      id: "bb1491eb-30e6-4728-a5fa-72f89feaf622",
      warehouse_name: "Miami",
    },
    {
      id: "150a36cf-f38e-4f59-8e31-39974207372d",
      warehouse_name: "Boston",
    },
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
  const handleStatusChange = (event) => {
    setStatusButton(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const warehouse = event.target.warehouse.value;
    const warehouseObj = warehouseList.find(
      (element) => element.warehouse_name === warehouse
    );
    const itemName = event.target.itemName.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    const status = event.target.status.value;
    const warehouseId = warehouseObj.id;
    let quantity = null;

    if (status === "In Stock") {
      quantity = Number(event.target.quantity.value);
    } else {
      quantity = 0;
    }

    const newInventoryItem = {
      warehouse_id: warehouseId,
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

    if (
      warehouseId &&
      itemName &&
      description &&
      category &&
      status &&
      quantity
    ) {
      axios
        .post("http://localhost:8080/inventories", newInventoryItem)
        .then((response) => {
          handleAddItem([...inventoryItemsList, response.data]);
        });
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
                onChange={handleStatusChange}
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
                onChange={handleStatusChange}
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
                    <option
                      value={warehouse.warehouse_name}
                      key={warehouse.warehouse_name + warehouse.id}
                    >
                      {warehouse.warehouse_name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <Link className="add-item__back-link" to={`/inventory`}>
            <div className="add-item__button add-item__button--cancel">
              Cancel
            </div>
          </Link>
          <button className="add-item__button add-item__button--add">
            +Add New Item
          </button>
        </form>
      </section>
    </div>
  );
}
