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

const handleWarehouseNameChange = (e)=>{
  setWarehouseName(e.target.value);
};

const handleAddressChange = (e) =>{
  setAddress(e.target.value);
}

const handleCityChange = (e) =>{
  setCity(e.target.value);
}

const handleCountryChange = (e) =>{
  setCountry(e.target.value);
} 

const handleContactNameChange = (e) =>{
  setContactName(e.target.value);
}

const handlePositionChange = (e) => {
  setContactPosition(e.target.value);
};

const handleContactPhoneChange = (e) =>{
  setContactPhone(e.target.value);
}

const handleContactEmailChange = (e) =>{
  setContactEmail(e.target.value);
}

   
const isWarehouseNameValid = () => {
      if (warehouseName==="") {
          return false;
      }
          return true;
  };

const isAddressValid = () => {
      if (address === "") {
        return false;
      }
      return true;
};

const isCityValid = () => {
  if (city === "") {
    return false;
  }
  return true;
};

const isCountryValid = () =>{
  if (country === ""){
    return false;
  }
  return true;
}

const isContactNameValid = () => {
  if (contactName === "") {
    return false;
  }
  return true;
};

const isContactPositionValid = () => {
  if (contactPosition === "") {
    return false;
  }
  return true;
};

const isContactPhoneValid = () => {
  
  if (contactPhone ==="") {
    return false;
  }
  return true;
};

const isContactEmailValid = ()=>{
    if (contactEmail==="") {
      return false;
    }
  return true;
};




  
  const handleEdit = (e) => {
    e.preventDefault();


    if (
      isWarehouseNameValid(warehouseName) &&
      isAddressValid(address) &&
      isCityValid(city) &&
      isCountryValid(country) &&
      isContactNameValid(contactName) &&
      isContactPositionValid(contactPosition) &&
      isContactPhoneValid(contactPhone) &&
      isContactEmailValid(contactEmail)
    ) {
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
    } else {
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
                className={`edit-warehouse__input ${
                  isWarehouseNameValid(warehouseName)
                    ? ""
                    : "edit-warehouse__input--invalid"
                }`}
                name="warehouseName"
                type="text"
                placeholder="Warehouse Name"
                defaultValue={warehouseName}
                onChange={handleWarehouseNameChange}
              ></input>
              {!isWarehouseNameValid(warehouseName) && (
                <p className="edit-warehouse__error">
                  <img src={ErrorIcon} alt="Error icon" />
                  This field is required
                </p>
              )}
              <label className="edit-warehouse__label">Street Address</label>
              <input
                className={`edit-warehouse__input ${
                  isAddressValid(address)
                    ? ""
                    : "edit-warehouse__input--invalid"
                }`}
                name="address"
                type="text"
                placeholder="Street Address"
                defaultValue={address}
                onChange={handleAddressChange}
              ></input>
              {!isAddressValid(address) && (
                <p className="edit-warehouse__error">
                  <img src={ErrorIcon} alt="Error icon" />
                  This field is required
                </p>
              )}

              <label className="edit-warehouse__label">City</label>
              <input
                className={`edit-warehouse__input ${
                  isCityValid(city) ? "" : "edit-warehouse__input--invalid"
                }`}
                name="city"
                type="text"
                placeholder="City"
                defaultValue={city}
                onChange={handleCityChange}
              ></input>
              {!isCityValid(city) && (
                <p className="edit-warehouse__error">
                  <img src={ErrorIcon} alt="Error icon" />
                  This field is required
                </p>
              )}

              <label className="edit-warehouse__label">Country</label>
              <input
                className={`edit-warehouse__input ${
                  isCountryValid(country)
                    ? ""
                    : "edit-warehouse__input--invalid"
                }`}
                name="country"
                type="text"
                placeholder="Country"
                defaultValue={country}
                onChange={handleCountryChange}
              ></input>

              {!isCountryValid(country) && (
                <p className="edit-warehouse__error">
                  <img src={ErrorIcon} alt="Error icon" />
                  This field is required
                </p>
              )}
            </section>

            <section className="edit-warehouse__contact-container">
              <h2 className="edit-warehouse__contact">Contact Details</h2>
              <label className="edit-warehouse__label">Contact Name</label>
              <input
                className={`edit-warehouse__input ${
                  isContactNameValid(contactName)
                    ? ""
                    : "edit-warehouse__input--invalid"
                }`}
                name="contactName"
                type="text"
                placeholder="Contact Name"
                defaultValue={contactName}
                onChange={handleContactNameChange}
              ></input>
              {!isContactNameValid(contactName) && (
                <p className="edit-warehouse__error">
                  <img src={ErrorIcon} alt="Error icon" />
                  This field is required
                </p>
              )}
              <label className="edit-warehouse__label">Position</label>
              <input
                className={`edit-warehouse__input ${
                  isContactPositionValid(contactPosition)
                    ? ""
                    : "edit-warehouse__input--invalid"
                }`}
                name="position"
                type="text"
                placeholder="Position"
                defaultValue={contactPosition}
                onChange={handlePositionChange}
              ></input>
              {!isContactPositionValid(contactPosition) && (
                <p className="edit-warehouse__error">
                  <img src={ErrorIcon} alt="Error icon" />
                  This field is required
                </p>
              )}
              <label className="edit-warehouse__label">Phone Number</label>
              <input
                className={`edit-warehouse__input ${
                  isContactPhoneValid(contactPhone)
                    ? ""
                    : "edit-warehouse__input--invalid"
                }`}
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                defaultValue={contactPhone}
                onChange={handleContactPhoneChange}
              ></input>
              {!isContactPhoneValid(contactPhone) && (
                <p className="edit-warehouse__error">
                  <img src={ErrorIcon} alt="Error icon" />
                  This field is required
                </p>
              )}
          
              <label className="edit-warehouse__label">Email</label>
              <input
                className={`edit-warehouse__input ${
                  isContactEmailValid(contactEmail)
                    ? ""
                    : "edit-warehouse__input--invalid"
                }`}
                type="text"
                name="email"
                placeholder="Email"
                defaultValue={contactEmail}
                onChange={handleContactEmailChange}
              ></input>

              {!isContactEmailValid(contactEmail) && (
                <p className="edit-warehouse__error">
                  <img src={ErrorIcon} alt="Error icon" />
                  This field is required
                </p>
              )}
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
