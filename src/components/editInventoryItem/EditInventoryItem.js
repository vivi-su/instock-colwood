//Ticket 22
import "./EditInventoryItem.scss";
import BackArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditInventoryItem({
  inventoryItemsList,
  handleEditItem,
}) {
  const { itemId } = useParams();
  const [showEditInventoryItem, setShowEditInventoryItem] = useState({});
  // props

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
          `The item ${showEditInventoryItem.item_name} has been successfully updated!`
        );
        handleEditItem(itemId);
      } catch (err) {
        console.log(`${itemId} does not exist`, err);
      }
    };
    editInventoryItem();
  };

  const updateInputValue = (event) => {};

  return (
    <>
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

        <form>
          <section className="edit-item__form">
            <section className="edit-item__details-container">
              <h2 className="edit-item__details">Item Details</h2>
              <label className="edit-item__label">Item Name</label>
              <input
                className="edit-item__input"
                name="itemName"
                type="text"
                value={showEditInventoryItem?.item_name}
              ></input>
              <label className="edit-item__label">Description</label>
              <input
                className="edit-item__input"
                name="description"
                type="text"
                value={showEditInventoryItem?.description}
              ></input>
              <label className="edit-item__label">Category</label>
              <select
                className="edit-item__dropdown"
                name=""
                // multiple={true}
                value={showEditInventoryItem?.category}
                onChange={handleEdit}
              >
                <option className="edit-item__option">/</option>
              </select>
            </section>

            <section className="edit-item__availability-container">
              <h2 className="edit-item__availability">Item Availability</h2>
              <label className="edit-item__label">Status</label>
              <div className="edit-item__stock">
                <label className="edit-item__in-stock">
                  In Stock
                  <input
                    id="status"
                    name="status"
                    type="radio"
                    // value={showEditInventoryItem.status}
                  ></input>
                </label>
                <label className="edit-item__out-stock">
                  Out of Stock
                  <input
                    id="status"
                    name="status"
                    type="radio"
                    // value={showEditInventoryItem.status}
                  ></input>
                </label>
              </div>
              <label className="edit-item__label">Quantity</label>
              <input
                className="edit-item__input"
                name="quantity"
                type="number"
              ></input>
              <label className="edit-item__label">Warehouse</label>
              <select name="edit-item__dropdown">
                <option className="edit-item__option">Please select</option>
              </select>
              {/* DROPDOWN <option className="edit-item__warehouse" name="" type=""></option> */}
            </section>
          </section>

          <section className="edit-item__button">
            <button className="edit-item__cancel-button" type="submit">
              <Link to="/inventory" className="edit-item__cancel">
                Cancel
              </Link>
            </button>
            <button
              onClick={handleEdit}
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
