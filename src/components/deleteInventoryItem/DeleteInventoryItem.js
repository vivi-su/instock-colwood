import "./DeleteInventoryItem.scss";
import { useParams, useNavigate, Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import closeIcon from "../../assets/icons/close-24px.svg";

export default function DeleteInventoryItem({
  handleDeleteItem,
  inventoryItemsList,
}) {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [showDeleteInventoryItem, setShowDeleteInventoryItem] = useState({});

  useEffect(() => {
    setShowDeleteInventoryItem(
      inventoryItemsList?.find((inventoryItem) => inventoryItem.id === itemId)
    );
  }, [
    itemId,
    setShowDeleteInventoryItem,
    inventoryItemsList
  ]);

  const handleDelete = (event) => {
    event.preventDefault();

    const deleteInventoryItem = async () => {
      if (!itemId) {
        return;
      }
      try {
        await axios.delete(`http://localhost:8080/inventories/${itemId}`);
        alert(
          `Your ${showDeleteInventoryItem.item_name} item is successfully deleted!`
        );
        handleDeleteItem(itemId);
        navigate("/inventory");
      } catch (err) {
        console.log(`${itemId} does not exist`, err);
      }
    };
    deleteInventoryItem();
  };

  return (
    <>
      <Outlet />
      <div className="deleteInventory__popup">
        <div className="deleteInventory__pop-inner">
          <div className="deleteInventory__main-group">
            {showDeleteInventoryItem?.item_name && (
              <h1 className="deleteInventory__title">
                Delete {showDeleteInventoryItem?.item_name} inventory item?
              </h1>
            )}
            {showDeleteInventoryItem?.item_name && (
              <p className="deleteInventory__p">
                Please confirm that you'd like to delete{" "}
                {showDeleteInventoryItem?.item_name} from the inventory list.
                You won't be able to undo this action.
              </p>
            )}
            <Link to={`/inventory`}>
              <div className=" deleteInventory__close-btn">
                <img src={closeIcon} alt="close icon: close popup window" />
              </div>
            </Link>
          </div>
          <div className="deleteInventory__btn-group ">
            <Link
              to={`/inventory`}
              className="deleteInventory__btn deleteInventory__cancel-btn"
              style={{ textDecoration: "none" }}
            >
              Cancel
            </Link>
            <button
              onClick={handleDelete}
              className="deleteInventory__btn  deleteInventory__delete-btn"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
