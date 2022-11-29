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
  const [warehouseId, setWarehouseId] = useState();
  const [warehouseList, setWarehouseList] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const { itemId } = useParams();

  useEffect(() => {
    if (!firstLoad) return;

    const editInventoryItem = inventoryItemsList?.find(
      (inventoryItem) => inventoryItem.id === itemId
    );

    setItemName(editInventoryItem?.item_name);
    setDescription(editInventoryItem?.description);
    setCategory(editInventoryItem?.category);
    setQuantity(editInventoryItem?.quantity);
    setStatusButton(editInventoryItem?.status);
    setWarehouseId(editInventoryItem?.warehouse_id);
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

  const validateFields = (inventoryItemsList) => {
    let ret = true;

    if (inventoryItemsList.id === undefined || inventoryItemsList.id === "") {
      ret = false;
    }

    if (
      inventoryItemsList.warehouse_id === undefined ||
      inventoryItemsList.warehouse_id === ""
    ) {
      ret = false;
    }

    if (
      inventoryItemsList.item_name === undefined ||
      inventoryItemsList.item_name === ""
    ) {
      ret = false;
    }

    if (
      inventoryItemsList.description === undefined ||
      inventoryItemsList.description === ""
    ) {
      ret = false;
    }

    if (
      inventoryItemsList.category === undefined ||
      inventoryItemsList.category === ""
    ) {
      ret = false;
    }

    if (
      inventoryItemsList.status === undefined ||
      (inventoryItemsList.status !== "In Stock" &&
        inventoryItemsList.status !== "Out of Stock")
    ) {
      ret = false;
    }

    if (
      inventoryItemsList.quantity === undefined ||
      !Number.isInteger(Number(inventoryItemsList.quantity)) ||
      inventoryItemsList.quantity < 0
    ) {
      ret = false;
    }

    return ret;
  };

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
    setWarehouseId(event.target.value);
  };

  const handleQuantityChange = (event) => {
    console.log(event.target.value);
    if (event.target.value) {
      setQuantity(Number(event.target.value));
    } else {
      setQuantity(-1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let newQuantity = null;
    if (statusButton === "In Stock") {
      newQuantity = Number(quantity);
    } else {
      newQuantity = 0;
    }

    const editedInventoryItem = {
      id: itemId,
      warehouse_id: warehouseId,
      item_name: itemName,
      description: description,
      category: category,
      status: statusButton,
      quantity: newQuantity,
    };

    if (validateFields(editedInventoryItem)) {
      axios
        .put(`http://localhost:8080/inventories/${itemId}`, editedInventoryItem)
        .then((response) => {
          handleEditItem([...inventoryItemsList, response.data]);
        })
        .catch((err) => {
          console.log("ERRO", err);
        });
      navigate("/inventory");
    }
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
                  <option
                    className="edit-item__category"
                    value={category}
                    key={category}
                  >
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
                  In Stock
                </label>
                <label className="edit-item__out-stock">
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
                  Out of Stock
                </label>
              </div>
              <div
                className={`edit-item__quantity ${
                  statusButton === "Out of Stock"
                    ? "edit-item__quantity--outOfStock"
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
              <div className="edit-item__warehouse">
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
            <button className="edit-item__save" type="submit">
              Save
            </button>
          </section>
        </form>
      </section>
    </>
  );
}
