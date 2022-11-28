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
  const [warehouseName, setWarehouseName] = useState();
  const [address, setAddress]= useState();
  const [city, setCity]= useState();
  const [country, setCountry]= useState();
  const [contactName, setContactName] = useState();
  const [contactPosition, setContactPosition]= useState();
  const [contactPhone, setContactPhone] = useState();
  const [contactEmail, setContactEmail] = useState();

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
      setWarehouseName(selectedWarehouse.warehouse_name);
      setAddress(selectedWarehouse.address);
      setCity(selectedWarehouse.city);
      setCountry(selectedWarehouse.country);
      setContactName(selectedWarehouse.contact_name);
      setContactPosition(selectedWarehouse.contact_position);
      setContactPhone(selectedWarehouse.contact_phone);
      setContactEmail(selectedWarehouse.contact_email);
    }
  }, [
    warehouseId,
    URL,
    selectedWarehouse.warehouse_name,
    selectedWarehouse.address,
    selectedWarehouse.city,
    selectedWarehouse.country,
    selectedWarehouse.contact_name,
    selectedWarehouse.contact_position,
    selectedWarehouse.contact_phone,
    selectedWarehouse.contact_email
  ]);






  const handleChange = (e)=>{
     console.log(e.target.value);
         const isWarehouseNameValid = () => {
           if (!warehouseName) {
             return true;
           }
           return false;
         };
alert(isWarehouseNameValid(warehouseName));
  }


  const handleEdit = (e) => {
    e.preventDefault();

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
                defaultValue={warehouseName}
                onChange={handleChange}
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
                defaultValue={address}
              ></input>
              <label className="edit-warehouse__label">City</label>
              <input
                className="edit-warehouse__input"
                name="city"
                type="text"
                placeholder="City"
                defaultValue={city}
              ></input>
              <label className="edit-warehouse__label">Country</label>
              <input
                className="edit-warehouse__input"
                name="country"
                type="text"
                placeholder="Country"
                defaultValue={country}
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
                defaultValue={contactName}
              ></input>

              <label className="edit-warehouse__label">Position</label>
              <input
                className="edit-warehouse__input"
                name="position"
                type="text"
                placeholder="Position"
                defaultValue={contactPosition}
              ></input>

              <label className="edit-warehouse__label">Phone Number</label>
              <input
                className="edit-warehouse__input"
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                defaultValue={contactPhone}
              ></input>

              <label className="edit-warehouse__label">Email</label>
              <input
                className="edit-warehouse__input"
                type="text"
                name="email"
                placeholder="Email"
                defaultValue={contactEmail}
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
