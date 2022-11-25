import Inventory from "../../pages/inventory/Inventory";
import "./DeleteInventoryItem.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const DisplayDeletePopup = (
  props
) => {
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
      if(!itemId){return}
      try {
        const { data } = await axios.delete(
          `http://localhost:8080/inventories/${itemId}`
        );
        SetDeleteInventoryItem(data);
        setDeletePopup(false);
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
        {props.children}
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
     
     
     useEffect(() => {
       const fetchInventoryItem = async () => {
         if (!itemId) {
           return;
         }
         try{
           await axios.get(
           `http://localhost:8080/inventories/${itemId}`);
           setDeletePopup(true);
         }catch(err){
          console.log(`${itemId} does not exist`, err);
         }
       };

       fetchInventoryItem();
     }, [itemId]);
    

  return (
    <>
      <DisplayDeletePopup
        trigger={deletePopup}
        setTrigger={setDeletePopup}
      >
        <p>popup test</p>
      </DisplayDeletePopup>

      <Inventory />
    </>
  );
}
