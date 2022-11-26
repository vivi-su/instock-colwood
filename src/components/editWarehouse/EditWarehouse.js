//Ticket 17
import "./EditWarehouse.scss";
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

    // function formatPhoneNumber(phoneNumber) {
    //   let result = phoneNumber.match(/[0-9]/g);
    //   const beginning = result.slice(0, 3).join("");
    //   const middle = result.slice(3, 6).join("");
    //   const end = result.slice(6, 10).join("");
    //   console.log(formatPhoneNumber);
    //   return `(${beginning}) ${middle}- ${end}`;
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

        <form onSubmit={handleSubmit}>
          <section className="edit-warehouse__form">
            <section className="edit-warehouse__details-container">
              <h2 className="edit-warehouse__details">Warehouse Details</h2>
              <label className="edit-warehouse__label">Warehouse Name</label>
              <input
                className={`edit-warehouse__input ${
                  isWarehouseNameValid() ? "" : "edit-warehouse__input--invalid"
                }`}
                name="warehouseName"
                type="text"
                placeholder="Warehouse Name"
              ></input>
              {!isFormValid && (
                <p className="edit-warehouse__error">
                  <img src={ErrorIcon} alt="Error icon" />
                  This field is required
                </p>
              )}
              <label className="edit-warehouse__label">Street Address</label>
              <input
                className={`edit-warehouse__input ${
                  isAddressValid() ? "" : "edit-warehouse__input--invalid"
                }`}
                name="address"
                type="text"
                placeholder="Street Address"
              ></input>
              {!isFormValid && (
                <p className="edit-warehouse__error">
                  <img src={ErrorIcon} alt="Error icon" />
                  This field is required
                </p>
              )}
              <label className="edit-warehouse__label">City</label>
              <input
                className={`edit-warehouse__input ${
                  isCityValid() ? "" : "edit-warehouse__input--invalid"
                }`}
                name="city"
                type="text"
                placeholder="City"
              ></input>
              {!isFormValid && (
                <p className="edit-warehouse__error">
                  <img src={ErrorIcon} alt="Error icon" />
                  This field is required
                </p>
              )}
              <label className="edit-warehouse__label">Country</label>
              <input
                className={`edit-warehouse__input ${
                  isCountryValid() ? "" : "edit-warehouse__input--invalid"
                }`}
                name="country"
                type="text"
                placeholder="Country"
              ></input>
              {!isFormValid && (
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
                  isContactNameValid() ? "" : "edit-warehouse__input--invalid"
                }`}
                name="contactName"
                type="text"
                placeholder="Contact Name"
              ></input>
              {!isFormValid && (
                <p className="edit-warehouse__error">
                  <img src={ErrorIcon} alt="Error icon" />
                  This field is required
                </p>
              )}
              <label className="edit-warehouse__label">Position</label>
              <input
                className={`edit-warehouse__input ${
                  isPositionValid() ? "" : "edit-warehouse__input--invalid"
                }`}
                name="position"
                type="text"
                placeholder="Position"
              ></input>
              {!isFormValid && (
                <p className="edit-warehouse__error">
                  <img src={ErrorIcon} alt="Error icon" />
                  This field is required
                </p>
              )}
              <label className="edit-warehouse__label">Phone Number</label>
              <input
                className={`edit-warehouse__input ${
                  isPhoneNumberValid() ? "" : "edit-warehouse__input--invalid"
                }`}
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
              ></input>
              {!isFormValid && (
                <p className="edit-warehouse__error">
                  <img src={ErrorIcon} alt="Error icon" />
                  This field is required
                </p>
              )}
              <label className="edit-warehouse__label">Email</label>
              <input
                className={`edit-warehouse__input ${
                  isEmailValid() ? "" : "edit-warehouse__input--invalid"
                }`}
                type="text"
                name="email"
                placeholder="Email"
              ></input>
              {!isFormValid && (
                <p className="edit-warehouse__error">
                  <img src={ErrorIcon} alt="Error icon" />
                  This field is required
                </p>
              )}
            </section>
          </section>
          <section className="edit-warehouse__button">
            <button className="edit-warehouse__cancel-button" type="submit">
              <Link to="/warehouses" className="edit-warehouse__cancel">
                Cancel
              </Link>
            </button>
            <button className="edit-warehouse__edit-button" type="submit">
              + Edit Warehouse
            </button>
          </section>
        </form>
      </section>
    </>
  );
}
