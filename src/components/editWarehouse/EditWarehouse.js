//Ticket 17
import "./EditWarehouse.scss";
import ErrorIcon from "../../assets/icons/error-24px.svg";
import BackArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function EditWarehouse() {
  const [selectedWarehouse, setSelectedWarehouse] = useState({});
  const { warehouseId } = useParams();
  const [warehouseNameValid, setWarehouseNameValid] = useState(true);

  const URL = `http://localhost:8080/warehouses/${warehouseId}`;
  useEffect(() => {
    if (warehouseId) {
      const fetchSelectedWarehouse = async () => {
        try {
          const { data } = await axios.get(URL);
          setSelectedWarehouse(data);
        } catch (err) {
          console.log("error", err);
        }
      };
      fetchSelectedWarehouse();
    }
  }, [warehouseId, URL]);

  const isWarehouseNameValid = (e) => {
    console.log(e.target.warehouseName.value);
    if (e.target.warehouseName.value === "") {
      return false;
    }
   return true;
  };


  

  const handleEdit = (e) => {
    e.preventDefault();
    console.log(isWarehouseNameValid(e));
    console.log(e);
    setWarehouseNameValid(isWarehouseNameValid(e));
    // alert(warehouseNameValid);
 
    
    if (warehouseNameValid) 
      {
      const values = {
        warehouse_name: e.target.warehouseName.value,
        address: e.target.address.value,
        city: e.target.city.value,
        country: e.target.country.value,
        contact_name: e.target.contactName.value,
        contact_position: e.target.position.value,
        contact_phone: e.target.phoneNumber.value,
        contact_email: e.target.email.value,
      };

      axios.put(URL, values).then((response) => {
        setSelectedWarehouse(response);
        alert(`The warehouse ${selectedWarehouse.warehouse_name} is updated!`);
        window.location.reload(false);
      });
      }
      else{
        alert("required form");
      }
  };
  return (
    <>
      <section className="edit-warehouse">
        <h1 className="edit-warehouse__title">
          <Link to="/warehouses">
            <img
              src={BackArrowIcon}
              alt="Back arrow icon"
              className="edit-warehouse__back-icon"
            />
          </Link>
          Edit New Warehouse
        </h1>

        <form autoComplete="off" onSubmit={(e) => handleEdit(e)}>
          <section className="edit-warehouse__form">
            <section className="edit-warehouse__details-container">
              <h2 className="edit-warehouse__details">Warehouse Details</h2>
              <label className="edit-warehouse__label">Warehouse Name</label>
              <input
                className="edit-warehouse__input"
                name="warehouseName"
                type="text"
                placeholder="Warehouse Name"
                defaultValue={selectedWarehouse.warehouse_name}
              ></input>
              {!warehouseNameValid && (
                <p className="edit-warehouse__error">
                  <img src={ErrorIcon} alt="Error icon" />
                  This field is required
                </p>
              )}
              <label className="edit-warehouse__label">Street Address</label>
              <input
                className="edit-warehouse__input"
                name="address"
                type="text"
                placeholder="Street Address"
                defaultValue={selectedWarehouse.address}
              ></input>
              <label className="edit-warehouse__label">City</label>
              <input
                className="edit-warehouse__input"
                name="city"
                type="text"
                placeholder="City"
                defaultValue={selectedWarehouse.city}
              ></input>
              <label className="edit-warehouse__label">Country</label>
              <input
                className="edit-warehouse__input"
                name="country"
                type="text"
                placeholder="Country"
                defaultValue={selectedWarehouse.country}
              ></input>
            </section>

            <section className="edit-warehouse__contact-container">
              <h2 className="edit-warehouse__contact">Contact Details</h2>
              <label className="edit-warehouse__label">Contact Name</label>
              <input
                className="edit-warehouse__input"
                name="contactName"
                type="text"
                placeholder="Contact Name"
                defaultValue={selectedWarehouse.contact_name}
              ></input>

              <label className="edit-warehouse__label">Position</label>
              <input
                className="edit-warehouse__input"
                name="position"
                type="text"
                placeholder="Position"
                defaultValue={selectedWarehouse.contact_position}
              ></input>

              <label className="edit-warehouse__label">Phone Number</label>
              <input
                className="edit-warehouse__input"
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                defaultValue={selectedWarehouse.contact_phone}
              ></input>

              <label className="edit-warehouse__label">Email</label>
              <input
                className="edit-warehouse__input"
                type="text"
                name="email"
                placeholder="Email"
                defaultValue={selectedWarehouse.contact_email}
              ></input>
            </section>
          </section>
          <section className="edit-warehouse__button">
            <Link to="/warehouses" className="edit-warehouse__cancel-button">
              Cancel
            </Link>

            <button className="edit-warehouse__save-button" type="submit">
              Save
            </button>
          </section>
        </form>
      </section>
    </>
  );
}
