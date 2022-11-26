import Inventory from "../../pages/inventory/Inventory";
import "./DeleteInventoryItem.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import closeIcon from "../../assets/icons/close-24px.svg";

const DisplayDeletePopup = (props) => {
  const formRef = useRef();
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteInventoryItem, SetDeleteInventoryItem] = useState([]);

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/inventory");
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const deleteInventoryItem = async () => {
      if (!itemId) {
        return;
      }
      try {
        const { data } = await axios.delete(
          `http://localhost:8080/inventories/${itemId}`
        );
        SetDeleteInventoryItem(data);
        alert(
          `Your ${props.showDeleteInventoryItem} item is successfully deleted!`
        );
        window.location.reload(false);
      } catch (err) {
        console.log(`${itemId} does not exist`, err);
      }
    };
    deleteInventoryItem();
  };

  return props.trigger ? (
    <form className="deleteInventory__popup" ref={formRef}>
      <div className="deleteInventory__pop-inner">
        <div className="deleteInventory__main-group">
          <h1 className="deleteInventory__title">
            Delete {props.showDeleteInventoryItem} inventory item?
          </h1>
          <p className="deleteInventory__p">
            Please confirm that you'd like to delete{" "}
            {props.showDeleteInventoryItem} from the inventory list. You won't
            be able to undo this action.
          </p>
          <button
            className=" deleteInventory__close-btn"
            onClick={() => props.setTrigger(false)}
          >
            <img src={closeIcon} alt="close icon: close popup window" />
          </button>
        </div>
        <div className="deleteInventory__btn-group ">
          <button
            onClick={handleCancel}
            className="deleteInventory__btn deleteInventory__cancel-btn"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="deleteInventory__btn  deleteInventory__delete-btn"
          >
            Delete
          </button>
        </div>
      </div>
    </form>
  ) : (
    ""
  );
};

export default function DeleteInventoryItem() {
     const { itemId } = useParams();
     const [deletePopup, setDeletePopup] = useState(false);
     const [showDeleteInventoryItem, SetShowDeleteInventoryItem] = useState([]);
     
     
     useEffect(() => {
       const fetchInventoryItem = async () => {
         if (!itemId) {
           return;
         }
         try {
           const { data } = await axios.get(
             `http://localhost:8080/inventories/${itemId}`
           );
           setDeletePopup(true);
           SetShowDeleteInventoryItem(data.item_name);
         } catch (err) {
           console.log(`${itemId} does not exist`, err);
         }
       };

       fetchInventoryItem();
     }, [itemId, SetShowDeleteInventoryItem, showDeleteInventoryItem]);
    

  return (
    <>
      <DisplayDeletePopup
        trigger={deletePopup}
        setTrigger={setDeletePopup}
        showDeleteInventoryItem={showDeleteInventoryItem}
      ></DisplayDeletePopup>

      <Inventory />
    </>
  );
}
