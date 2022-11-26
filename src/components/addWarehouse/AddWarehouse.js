//Ticket 17
import "./AddWarehouse.scss";
import ErrorIcon from "../../assets/icons/error-24px.svg";
import BackArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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
    if (
      phoneNumber === "" &&
      phoneNumber.length < 11
      // phoneNumber.match(/^[0-9]+$/) != null
    ) {
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

    // function formatPhoneNumber(phoneNumber) {
    //   const regEx = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im;
    //   const isValid = regEx.test(phoneNumber);
    //   console.log(isValid);
    //   return isValid;
    // }
    //    write function here
    //    once converted, send this new phone number to API
    // }

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
        .then((response) => {
          alert("Warehouse added successfully");
          window.location.reload(true);
        })
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
      <section className="add-warehouse">
        <h1 className="add-warehouse__title">
          <Link to="/warehouses">
            <img src={BackArrowIcon} alt="Back arrow icon" />
          </Link>
          Add New Warehouse
        </h1>

        <form className="add-warehouse__form" onSubmit={handleSubmit}>
          <section className="add-warehouse__details-container">
            <h2 className="add-warehouse__details">Warehouse Details</h2>
            <label className="add-warehouse__label">Warehouse Name</label>
            <input
              className={`add-warehouse__input ${
                isWarehouseNameValid() ? "" : "add-warehouse__input--invalid"
              }`}
              name="warehouseName"
              type="text"
              placeholder="Warehouse Name"
            ></input>
            {!isFormValid && (
              <p className="add-warehouse__error">
                <img src={ErrorIcon} alt="Error icon" />
                This field is required
              </p>
            )}
            <label className="add-warehouse__label">Street Address</label>
            <input
              className={`add-warehouse__input ${
                isAddressValid() ? "" : "add-warehouse__input--invalid"
              }`}
              name="address"
              type="text"
              placeholder="Street Address"
            ></input>
            {!isFormValid && (
              <p className="add-warehouse__error">
                <img src={ErrorIcon} alt="Error icon" />
                This field is required
              </p>
            )}
            <label className="add-warehouse__label">City</label>
            <input
              className={`add-warehouse__input ${
                isCityValid() ? "" : "add-warehouse__input--invalid"
              }`}
              name="city"
              type="text"
              placeholder="City"
            ></input>
            {!isFormValid && (
              <p className="add-warehouse__error">
                <img src={ErrorIcon} alt="Error icon" />
                This field is required
              </p>
            )}
            <label className="add-warehouse__label">Country</label>
            <input
              className={`add-warehouse__input ${
                isCountryValid() ? "" : "add-warehouse__input--invalid"
              }`}
              name="country"
              type="text"
              placeholder="Country"
            ></input>
            {!isFormValid && (
              <p className="add-warehouse__error">
                <img src={ErrorIcon} alt="Error icon" />
                This field is required
              </p>
            )}
          </section>

          <section className="add-warehouse__contact">
            <h2 className="add-warehouse__contact-container">
              Contact Details
            </h2>
            <label className="add-warehouse__label">Contact Name</label>
            <input
              className={`add-warehouse__input ${
                isContactNameValid() ? "" : "add-warehouse__input--invalid"
              }`}
              name="contactName"
              type="text"
              placeholder="Contact Name"
            ></input>
            {!isFormValid && (
              <p className="add-warehouse__error">
                <img src={ErrorIcon} alt="Error icon" />
                This field is required
              </p>
            )}
            <label className="add-warehouse__label">Position</label>
            <input
              className={`add-warehouse__input ${
                isPositionValid() ? "" : "add-warehouse__input--invalid"
              }`}
              name="position"
              type="text"
              placeholder="Position"
            ></input>
            {!isFormValid && (
              <p className="add-warehouse__error">
                <img src={ErrorIcon} alt="Error icon" />
                This field is required
              </p>
            )}
            <label className="add-warehouse__label">Phone Number</label>
            <input
              className={`add-warehouse__input ${
                isPhoneNumberValid() ? "" : "add-warehouse__input--invalid"
              }`}
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
            ></input>
            {!isFormValid && (
              <p className="add-warehouse__error">
                <img src={ErrorIcon} alt="Error icon" />
                This field is required
              </p>
            )}
            <label className="add-warehouse__label">Email</label>
            <input
              className={`add-warehouse__input ${
                isEmailValid() ? "" : "add-warehouse__input--invalid"
              }`}
              type="text"
              name="email"
              placeholder="Email"
            ></input>
            {!isFormValid && (
              <p className="add-warehouse__error">
                <img src={ErrorIcon} alt="Error icon" />
                This field is required
              </p>
            )}
          </section>
          <section className="add-warehouse__button">
            <button className="add-warehouse__cancel-button" type="submit">
              <Link to="/warehouses" className="add-warehouse__cancel">
                Cancel
              </Link>
            </button>
            <button className="add-warehouse__add-button" type="submit">
              + Add Warehouse
            </button>
          </section>
        </form>
      </section>
    </>
  );
}
