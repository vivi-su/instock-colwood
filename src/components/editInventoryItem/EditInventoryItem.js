//Ticket 22
import "./EditInventoryItem.scss";
import BackArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";
import { Link, useNavigate, Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditInventoryItem({
  inventoryItemsList,
  handleEditItem,
}) {
  const navigate = useNavigate();
  const [statusButton, setStatusButton] = useState();
  const [itemName, setItemName] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [quantity, setQuantity] = useState();
  const [warehouseId, setWarehouse] = useState();
  const [warehouseList, setWarehouseList] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const { itemId } = useParams();

  useEffect(() => {
    if (!firstLoad) return;

    const editInventoryItem = inventoryItemsList?.find(
      (inventoryItem) => inventoryItem.id === itemId
    );

    setItemName(editInventoryItem.item_name);
    setDescription(editInventoryItem.description);
    setCategory(editInventoryItem.category);
    setQuantity(editInventoryItem.quantity);
    setStatusButton(editInventoryItem.status);
    setWarehouse(editInventoryItem.warehouse_id);
    setFirstLoad(false);
  }, [itemId, inventoryItemsList]);

  useEffect(() => {
    const getSingleWarehouseURL = `http://localhost:8080/warehouses/`;
    axios.get(getSingleWarehouseURL).then((response) => {
      setWarehouseList(response.data);
    });
  });

  const categoryList = [
    "Please Select",
    "Accessories",
    "Gear",
    "Electronics",
    "Health",
    "Apparel",
  ];

  const isItemNameValid = () => {
    if (itemName === "") {
      return false;
    }
    return true;
  };

  const isStatusValid = () => {
    if (statusButton === "") {
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
    if (warehouseId === "Please Select") {
      return false;
    }
    return true;
  };

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusButton(event.target.value);
  };

  const handleWarehouseChange = (event) => {
    setWarehouse(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    // const itemName = event.target.itemName.value;
    // const description = event.target.description.value;
    // const category = event.target.category.value;
    // const status = event.target.status.value;
    // const warehouse = event.target.warehouse.value;
    // let quantity = null;
    // if (status === "In Stock") {
    //   quantity = Number(event.target.quantity.value);
    // } else {
    //   quantity = 0;
    // }
    // const editedInventoryItem = {
    //   warehouse: warehouse,
    //   item_name: itemName,
    //   description: description,
    //   category: category,
    //   status: status,
    //   quantity: quantity,
    // };
    // setItemName(itemName);
    // setDescription(description);
    // setCategory(category);
    // setStatus(status);
    // setQuantity(quantity);
    // setWarehouse(warehouse);
    // if (
    //   warehouse &&
    //   itemName &&
    //   description &&
    //   category &&
    //   status &&
    //   quantity
    // ) {
    //   axios
    //     .put(`http://localhost:8080/inventories/${itemId}`)
    //     .then((response) => {
    //       handleEditItem([...inventoryItemsList, response.data]);
    //     });
    //   navigate("/inventory");
    // }
  };

  return (
    <>
      <Outlet />
      <section className="edit-item">
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
          {/* DETAILS */}
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
                defaultValue={itemName}
                onChange={handleItemNameChange}
              ></input>
              <label className="edit-item__label">Description</label>
              <input
                className={`edit-item__input ${
                  isDescriptionValid() ? "" : "edit-item__input--invalid"
                } `}
                defaultValue={description}
                onChange={handleDescriptionChange}
                name="description"
                type="text"
                cols="30"
                rows="5"
              ></input>
              <label className="edit-item__label">Category</label>
              <select
                value={category}
                name="category"
                className={`edit-item__input ${
                  isCategoryValid() ? "" : "edit-item__input--invalid"
                } `}
                onChange={handleCategoryChange}
              >
                {categoryList.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>
            </section>

            {/* AVAILABILITY */}
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
                    onChange={handleStatusChange}
                    id="inStock"
                    type="radio"
                    value="In Stock"
                    checked={statusButton === "In Stock"}
                  ></input>
                </label>
                <label className="edit-item__out-stock">
                  Out of Stock
                  <input
                    className={`edit-item__input ${
                      isStatusValid() ? "" : "edit-item__input--invalid"
                    }`}
                    onChange={handleStatusChange}
                    id="outOfStock"
                    type="radio"
                    value="Out of Stock"
                    checked={statusButton === "Out of Stock"}
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
                  onChange={handleQuantityChange}
                  defaultValue={quantity}
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
                  value={warehouseId}
                  onChange={handleWarehouseChange}
                  name="warehouse"
                  id="warehouse"
                >
                  <option className="edit-item__option" value="Please Select">
                    Please select
                  </option>
                  {warehouseList.map((warehouse) => (
                    <option value={warehouse.id} key={warehouse.id}>
                      {warehouse.warehouse_name}
                    </option>
                  ))}
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
            <button
              // onClick={handleEdit}
              className="edit-item__save"
              type="submit"
            >
              Save
            </button>
          </section>
        </form>
      </section>
    </>
  );
}
