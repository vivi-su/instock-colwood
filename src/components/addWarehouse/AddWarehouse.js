//Ticket 17
import "./AddWarehouse.scss";
import ErrorIcon from "../../assets/icons/error-24px.svg";
import axios from "axios";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

// const handleChangeEmail = (event) => {
//   // get inputted value from event, update state with value
//   setEmail(event.target.value);
// };
// const handleChangePhoneNumber = (event) => {
//   setPhoneNumber(event.target.value);
// };
export default function AddWarehouse() {
  const [warehouseName, setwarehouseName] = useState("default");
  const [address, setAddress] = useState("default");
  const [city, setCity] = useState("default");
  const [country, setCountry] = useState("default");
  const [contactName, setContactName] = useState("default");
  const [position, setPosition] = useState("default");
  const [email, setEmail] = useState("default");
  const [phoneNumber, setPhoneNumber] = useState("default");
  const [isFormValid, setIsFormValid] = useState(true);

  const isWarehouseNameValid = () => {
    if (warehouseName === "") {
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

  const isCountryValid = () => {
    if (country === "") {
      return false;
    }
    return true;
  };

  const isContactNameValid = () => {
    if (contactName === "") {
      return false;
    }
    return true;
  };

  const isPositionValid = () => {
    if (position === "") {
      return false;
    }
    return true;
  };

  const isPhoneNumberValid = () => {
    if (phoneNumber === "" && phoneNumber.length < 11) {
      return false;
    }
    return true;
  };

  const isEmailValid = () => {
    if (email === "" && !email.includes("@")) {
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const warehouseName = event.target.warehouseName.value;
    const address = event.target.address.value;
    const city = event.target.city.value;
    const country = event.target.country.value;
    const contactName = event.target.contactName.value;
    const position = event.target.position.value;
    const phoneNumber = event.target.phoneNumber.value;
    const email = event.target.email.value;

    setwarehouseName(warehouseName);
    setAddress(address);
    setCity(city);
    setCountry(country);
    setContactName(contactName);
    setPosition(position);
    setPhoneNumber(phoneNumber);
    setEmail(email);

    const warehouseDetails = {
      id: uuidv4(),
      warehouse_name: warehouseName,
      address: address,
      city: city,
      country: country,
      contact_name: contactName,
      contact_position: position,
      contact_phone: phoneNumber,
      contact_email: email,
    };

    console.log(warehouseDetails);

    if (
      warehouseName &&
      address &&
      city &&
      country &&
      contactName &&
      position &&
      phoneNumber &&
      email
    ) {
      axios
        .post("http://localhost:8080/warehouses", warehouseDetails)
        .catch((error) => {
          console.log(error);
          alert("Failed to add Warehouse, please check your form");
        });
    } else {
      setIsFormValid(false);
    }
  };

  return (
    <>
      <h1 className="add-warehouse">Add New Warehouse</h1>

      <form onSubmit={handleSubmit}>
        <section className="add-warehouse__details-container">
          <h2 className="add-warehouse__title">Warehouse Details</h2>
          <p className="add-warehouse__name">Warehouse Name</p>
          <input
            className={`add-warehouse__input ${
              isWarehouseNameValid() ? "" : "add-warehouse__input--invalid"
            }`}
            name="warehouseName"
            type="text"
            placeholder="Warehouse Name"
          ></input>
          <p className="add-warehouse__address">Street Address</p>
          <input
            className={`add-warehouse__input ${
              isAddressValid() ? "" : "add-warehouse__input--invalid"
            }`}
            name="address"
            type="text"
            placeholder="Street Address"
          ></input>
          <p className="add-warehouse__city">City</p>
          <input
            className={`add-warehouse__input ${
              isCityValid() ? "" : "add-warehouse__input--invalid"
            }`}
            name="city"
            type="text"
            placeholder="City"
          ></input>
          <p className="add-warehouse__country">Country</p>
          <input
            className={`add-warehouse__input ${
              isCountryValid() ? "" : "add-warehouse__input--invalid"
            }`}
            name="country"
            type="text"
            placeholder="Country"
          ></input>
        </section>

        <section className="add-warehouse_contact">
          <h2 className="add-warehouse__contact-container">Contact Details</h2>
          <p className="add-warehouse__contact-name">Contact Name</p>
          <input
            className={`add-warehouse__input ${
              isContactNameValid() ? "" : "add-warehouse__input--invalid"
            }`}
            name="contactName"
            type="text"
            placeholder="Contact Name"
          ></input>
          <p className="add-warehouse__position">Position</p>
          <input
            className={`add-warehouse__input ${
              isPositionValid() ? "" : "add-warehouse__input--invalid"
            }`}
            name="position"
            type="text"
            placeholder="Position"
          ></input>
          <p className="add-warehouse__phone">Phone Number</p>
          <input
            className={`add-warehouse__input ${
              isPhoneNumberValid() ? "" : "add-warehouse__input--invalid"
            }`}
            type="phoneNumber"
            name="phoneNumber"
            placeholder="Phone Number"
          ></input>
          <p className="add-warehouse__email">Email</p>
          <input
            className={`add-warehouse__input ${
              isEmailValid() ? "" : "add-warehouse__input--invalid"
            }`}
            type="text"
            name="email"
            placeholder="Email"
          ></input>
          {!isFormValid && (
            // paste in all fields
            <p>
              <img src={ErrorIcon} alt="Error icon" />
              This field is required
            </p>
          )}
        </section>
        <button className="add-warehouse__cancel-button" type="text">
          Cancel
        </button>
        <button className="add-warehouse__add-button" type="submit">
          + Add Warehouse
        </button>
      </form>
    </>
  );
}
