//Ticket 24
import "./AddInventoryItem.scss";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import errorIcon from "../../assets/icons/error-24px.svg";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function AddInventoryItem({
  inventoryItemsList,
  handleAddItem,
}) {
  const navigate = useNavigate();
  const [statusButton, setStatusButton] = useState("default");
  const [itemName, setItemName] = useState("default");
  const [description, setDescription] = useState("default");
  const [category, setCategory] = useState("default");
  const [status, setStatus] = useState("Out of Stock");
  const [quantity, setQuantity] = useState(1);
  const [warehouse, setWarehouse] = useState("default");
  const [uniqueId, setUniqueId] = useState();
  useEffect(() => {
    setUniqueId(uuidv4());
  }, []);
  //The warehouse list and the category list are hardcoded because
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
  //Validation for fields

  const isStatusValid = () => {
    if (status === "In Stock" || status === "Out of Stock") {
      return true;
    }
    return false;
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
    if (
      quantity === "" ||
      !Number.isInteger(Number(quantity)) ||
      quantity < 0
    ) {
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

  //Handel changes
  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
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

  //API call
  const handleSubmit = (event) => {
    event.preventDefault();

    const isWarehouseIdValid = (warehouseId) => {
      if (warehouseId === "") {
        return false;
      }
      return true;
    };
    const isStatusValid = (status) => {
      if (status === "In Stock" || status === "Out of Stock") {
        return true;
      }
      return false;
    };
    const isItemNameValid = (itemName) => {
      if (itemName === "") {
        return false;
      }
      return true;
    };
    const isDescriptionValid = (description) => {
      if (description === "") {
        return false;
      }
      return true;
    };
    const isCategoryValid = (category) => {
      if (category === "Please Select") {
        return false;
      }
      return true;
    };
    const isQuantityValid = (quantity) => {
      if (
        quantity === "" ||
        !Number.isInteger(Number(quantity)) ||
        quantity < 0
      ) {
        return false;
      }
      return true;
    };

    const warehouse = event.target.warehouse.value;
    const warehouseObj = warehouseList.find(
      (element) => element.warehouse_name === warehouse
    );
    const itemName = event.target.itemName.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    const status = event.target.status.value;
    const quantityStr = event.target.quantity.value;
    const warehouseId = warehouseObj.id;

    setItemName(itemName);
    setDescription(description);
    setCategory(category);
    setStatus(status);
    setQuantity(quantityStr);
    setWarehouse(warehouse);

    if (
      isWarehouseIdValid(warehouseId) &&
      isItemNameValid(itemName) &&
      isDescriptionValid(description) &&
      isCategoryValid(category) &&
      isStatusValid(status) &&
      isQuantityValid(quantityStr)
    ) {
      const newInventoryItem = {
        warehouse_id: warehouseId,
        item_name: itemName,
        description: description,
        category: category,
        status: status,
        quantity: quantity,
      };

      console.log(newInventoryItem);

      axios
        .post("http://localhost:8080/inventories", newInventoryItem)
        .then((response) => {
          console.log(response.data);
          handleAddItem([...inventoryItemsList, response.data]);
        });
      navigate("/inventory");
      // event.target.reset();
    }
  };

  return (
    <div className="add-item-container">
      <Outlet />
      <section className="add-item">
        <div className="add-item__nav-bar">
          <div className="add-item__arrow-text-wrapper">
            <Link to={`/inventory`}>
              <img
                className="add-item__back-icon"
                src={backArrow}
                alt="back arrow"
              />
            </Link>
            <h1 className="add-item__section-header">Add New Inventory Item</h1>
          </div>
        </div>
        <form
          className="add-item__form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div className="add-item__columns">
            {/* DETAILS SIDE */}
            <div className="add-item__details">
              <h2 className="add-item__subheader">Item Details</h2>

              <div className="add-item__item-name-container">
                <label className="add-item__label-text" htmlFor="itemName">
                  Item Name
                </label>
                <input
                  className={`add-item__input-regular ${
                    isItemNameValid() ? "" : "add-item__input-regular--invalid"
                  }`}
                  type="text"
                  id="itemName"
                  placeholder="Item Name"
                  onChange={handleItemNameChange}
                />
              </div>

              {!isItemNameValid() && (
                <span className="add-item__error-text">
                  <img
                    className="add-item__error-image"
                    src={errorIcon}
                    alt="Error icon"
                  />
                  This field is required
                </span>
              )}

              <div className="add-item__description-container">
                <label className="add-item__label-text" htmlFor="description">
                  Description
                </label>
                <textarea
                  className={`add-item__input-textarea ${
                    isDescriptionValid()
                      ? ""
                      : "add-item__input-textarea--invalid"
                  }`}
                  name="description"
                  id="description"
                  cols="30"
                  rows="5"
                  placeholder="Please enter a brief item description..."
                  onChange={handleDescriptionChange}
                ></textarea>
                {!isDescriptionValid() && (
                  <span className="add-item__error-text">
                    <img
                      className="add-item__error-image"
                      src={errorIcon}
                      alt="Error icon"
                    />
                    This field is required
                  </span>
                )}
              </div>
              <div className="add-item__category-container">
                <label className="add-item__label-text">Category</label>

                <select
                  className={`add-item__input-select ${
                    isCategoryValid() ? "" : "add-item__input-select--invalid"
                  }`}
                  value={category}
                  onChange={handleCategoryChange}
                  name="category"
                  id="category"
                >
                  {categoryList?.map((category) => (
                    <option
                      className="add-item__options"
                      value={category}
                      key={category + uniqueId}
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              {!isCategoryValid() && (
                <span className="add-item__error-text">
                  <img
                    className="add-item__error-image"
                    src={errorIcon}
                    alt="Error icon"
                  />
                  This field is required
                </span>
              )}
            </div>

            {/* AVAILABILITY SIDE */}
            <div className="add-item__availability">
              <h2 className="add-item__subheader">Item Availability</h2>
              <div className="add-item__status-container">
                <label className="add-item__label-text">Status</label>

                {/* In Stock Button */}
                <div className="add-item__radio-buttons-container">
                  <div className="add-item__stock-container">
                    <div
                      className={`add-item__input-radio
                      ${
                        statusButton === "In Stock"
                          ? "add-item__input-radio--selected"
                          : "" || isStatusValid()
                          ? ""
                          : "add-item__input-radio--invalid"
                      }`}
                    >
                      <input
                        className={`add-item__radio-button
                      ${
                        statusButton === "In Stock"
                          ? "add-item__radio-button--selected"
                          : ""
                      }`}
                        onChange={handleStatusChange}
                        type="radio"
                        id="inStock"
                        name="status"
                        value="In Stock"
                      />
                    </div>
                    <label
                      htmlFor="inStock"
                      className={`add-item__text ${
                        statusButton === "In Stock"
                          ? "add-item__text--selected"
                          : ""
                      }`}
                    >
                      In Stock
                    </label>
                  </div>

                  {/* Out of Stock button */}
                  <div className="add-item__stock-container">
                    <div
                      className={`add-item__input-radio
                      ${
                        statusButton === "Out of Stock"
                          ? "add-item__input-radio--selected"
                          : "" || isStatusValid()
                          ? ""
                          : "add-item__input-radio--invalid"
                      }`}
                    >
                      <input
                        className={`add-item__radio-button
                      ${
                        statusButton === "Out of Stock"
                          ? "add-item__radio-button--selected"
                          : ""
                      }`}
                        onChange={handleStatusChange}
                        type="radio"
                        id="outOfStock"
                        name="status"
                        value="Out of Stock"
                      />
                    </div>
                    <label
                      htmlFor="outOfStock"
                      className={`add-item__text ${
                        statusButton === "Out of Stock"
                          ? "add-item__text--selected"
                          : ""
                      }`}
                    >
                      Out of Stock
                    </label>
                  </div>
                </div>

                {/* Error Icon Validation */}
                {!isStatusValid() && (
                  <span className="add-item__error-text">
                    <img
                      className="add-item__error-image"
                      src={errorIcon}
                      alt="Error icon"
                    />
                    This field is required
                  </span>
                )}
              </div>

              <div
                className={`add-item__quantity ${
                  statusButton === "In Stock"
                    ? "add-item__quantity--inStock"
                    : ""
                }`}
              >
                <label className="add-item__label-text" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  className={`add-item__input-regular ${
                    isQuantityValid() ? "" : "add-item__input-regular--invalid"
                  }`}
                  type="text"
                  id="quantity"
                  onChange={handleQuantityChange}
                />

                {status === "In Stock" && !isQuantityValid() && (
                  <span className="add-item__error-text">
                    <img
                      className="add-item__error-image"
                      src={errorIcon}
                      alt="Error icon"
                    />
                    This field is required
                  </span>
                )}
              </div>

              <div className="add-item__warehouse-container">
                <label className="add-item__label-text">Warehouse</label>
                <select
                  className={`add-item__input-select ${
                    isWarehouseValid() ? "" : "add-item__input-select--invalid"
                  }`}
                  src={backArrow}
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
                {!isWarehouseValid() && (
                  <span className="add-item__error-text">
                    <img
                      className="add-item__error-image"
                      src={errorIcon}
                      alt="Error icon"
                    />
                    This field is required
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="add-item__buttons-container">
            <div className="add-item__button-wrapper">
              <Link className="add-item__back-link" to={`/inventory`}>
                <button className="add-item__button add-item__button--cancel">
                  Cancel
                </button>
              </Link>
            </div>

            <button className="add-item__button add-item__button--add">
              +Add Item
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
