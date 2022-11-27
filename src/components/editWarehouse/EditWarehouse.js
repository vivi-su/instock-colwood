//Ticket 17
import "./EditWarehouse.scss";
import BackArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function EditWarehouse({
  handleEditWarehouse,
  warehouseList
}) {

     const [selectedWarehouse, setSelectedWarehouse] = useState({});
     const { warehouseId } = useParams();
     
     const URL = 
       `http://localhost:8080/warehouses/${warehouseId}`;

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


  const handleEdit = (event) => {
    event.preventDefault();

    const values = {
      warehouse_name: event.target.warehouseName.value,
      address: event.target.address.value,
      city: event.target.city.value,
      country: event.target.country.value,
      contact_name: event.target.contactName.value,
      contact_position: event.target.position.value,
      contact_phone: event.target.phoneNumber.value,
      contact_email: event.target.email.value,
    };

    axios.put(URL, values)
    .then((response) => {
      setSelectedWarehouse(response);
      alert(`The warehouse ${selectedWarehouse.warehouse_name} is updated!`);
      window.location.reload(false);
    });

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

        <form autoComplete="off" onSubmit={(event) => handleEdit(event)}>
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
            <button className="edit-warehouse__cancel-button" type="submit">
              <Link to="/warehouses" className="edit-warehouse__cancel">
                Cancel
              </Link>
            </button>
            <button className="edit-warehouse__save-button" type="submit">
              Save
            </button>
          </section>
        </form>
      </section>
    </>
  );
}
