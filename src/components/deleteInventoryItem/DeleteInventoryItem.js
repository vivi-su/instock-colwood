import Inventory from "../../pages/inventory/Inventory";
import "./DeleteInventoryItem.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const DisplayDeletePopup = (props) => {
  const formRef = useRef();
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteInventoryItem, SetDeleteInventoryItem] = useState([]);
  console.log("showDeleteInventoryItem",props.showDeleteInventoryItem);

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
        setDeletePopup(false);
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
        <p>Delete {props.showDeleteInventoryItem} inventory item?</p>
        <p>
          Please confirm that you'd like to delete {props.showDeleteInventoryItem} from the inventory list. You won't be able to undo this action.
        </p>
        <button
          className="deleteInventory__close-btn"
          onClick={() => props.setTrigger(false)}
        >
          close
        </button>
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleDelete}>Delete</button>
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
           console.log(data.item_name);
           SetShowDeleteInventoryItem(data.item_name);
           console.log(showDeleteInventoryItem);
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
