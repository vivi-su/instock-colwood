//Ticket 17
import "./AddWarehouse.scss";
import ErrorIcon from "../../assets/icons/error-24px.svg";
import BackArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function AddWarehouse() {
  const navigate = useNavigate();
  const [warehouseName, setWarehouseName] = useState("default");
  const [address, setAddress] = useState("default");
  const [city, setCity] = useState("default");
  const [country, setCountry] = useState("default");
  const [contactName, setContactName] = useState("default");
  const [position, setPosition] = useState("default");
  const [email, setEmail] = useState("instock@email.com");
  const [phoneNumber, setPhoneNumber] = useState("0123456789");

  const handleWarehouseNameChange = (e) => {
    setWarehouseName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleContactNameChange = (e) => {
    setContactName(e.target.value);
  };

  const handlePositionChange = (e) => {
    setPosition(e.target.value);
  };

  const handleContactPhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleContactEmailChange = (e) => {
    setEmail(e.target.value);
  };

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
    const pass =
      /^[+]?([0-9]{1})?\x20?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
    if (phoneNumber === "" || !phoneNumber?.match(pass)) {
      return false;
    }
    return true;
  };

  const isEmailValid = () => {
    const pass =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email === "" || !email?.match(pass)) {
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

    setWarehouseName(warehouseName);
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
      isWarehouseNameValid(warehouseName) &&
      isAddressValid(address) &&
      isCityValid(city) &&
      isCountryValid(country) &&
      isContactNameValid(contactName) &&
      isPositionValid(position) &&
      isPhoneNumberValid(phoneNumber) &&
      isEmailValid(email)
    ) {
      axios
        .post("http://localhost:8080/warehouses", warehouseDetails)
        .then((response) => {
          alert("Warehouse added successfully");
          window.location.reload(true);
          navigate("/warehouses");
        })
        .catch((error) => {
          console.log(error);
          alert("Failed to add Warehouse, please check your form");
        });
    } else {
      return;
    }
  };

  return (
    <>
      <section className="add-warehouse">
        <h1 className="add-warehouse__title">
          <Link to="/warehouses">
            <img
              src={BackArrowIcon}
              alt="Back arrow icon"
              className="add-warehouse__back-icon"
            />
          </Link>
          Add New Warehouse
        </h1>

        <form onSubmit={handleSubmit}>
          <section className="add-warehouse__form">
            <section className="add-warehouse__details-container">
              <h2 className="add-warehouse__details">Warehouse Details</h2>
              <label className="add-warehouse__label">Warehouse Name</label>
              <input
                className={`add-warehouse__input ${
                  isWarehouseNameValid(warehouseName)
                    ? ""
                    : "add-warehouse__input--invalid"
                }`}
                name="warehouseName"
                type="text"
                placeholder="Warehouse Name"
                onChange={handleWarehouseNameChange}
              ></input>
              {!isWarehouseNameValid(warehouseName) && (
                <p className="add-warehouse__error">
                  <img src={ErrorIcon} alt="Error icon" />
                  This field is required
                </p>
              )}
              <label className="add-warehouse__label">Street Address</label>
              <input
                className={`add-warehouse__input ${
                  isAddressValid(address) ? "" : "add-warehouse__input--invalid"
                }`}
                name="address"
                type="text"
                placeholder="Street Address"
                onChange={handleAddressChange}
              ></input>
              {!isAddressValid(address) && (
                <p className="add-warehouse__error">
                  <img src={ErrorIcon} alt="Error icon" />
                  This field is required
                </p>
              )}
              <label className="add-warehouse__label">City</label>
              <input
                className={`add-warehouse__input ${
                  isCityValid(city) ? "" : "add-warehouse__input--invalid"
                }`}
                name="city"
                type="text"
                placeholder="City"
                onChange={handleCityChange}
              ></input>
              {!isCityValid(city) && (
                <p className="add-warehouse__error">
                  <img src={ErrorIcon} alt="Error icon" />
                  This field is required
                </p>
              )}
              <label className="add-warehouse__label">Country</label>
              <input
                className={`add-warehouse__input ${
                  isCountryValid(country) ? "" : "add-warehouse__input--invalid"
                }`}
                name="country"
                type="text"
                placeholder="Country"
                onChange={handleCountryChange}
              ></input>
              {!isCountryValid(country) && (
                <p className="add-warehouse__error">
                  <img src={ErrorIcon} alt="Error icon" />
                  This field is required
                </p>
              )}
            </section>

            <section className="add-warehouse__contact-container">
              <h2 className="add-warehouse__contact">Contact Details</h2>
              <label className="add-warehouse__label">Contact Name</label>
              <input
                className={`add-warehouse__input ${
                  isContactNameValid(contactName)
                    ? ""
                    : "add-warehouse__input--invalid"
                }`}
                name="contactName"
                type="text"
                placeholder="Contact Name"
                onChange={handleContactNameChange}
              ></input>
              {!isContactNameValid(contactName) && (
                <p className="add-warehouse__error">
                  <img src={ErrorIcon} alt="Error icon" />
                  This field is required
                </p>
              )}
              <label className="add-warehouse__label">Position</label>
              <input
                className={`add-warehouse__input ${
                  isPositionValid(position)
                    ? ""
                    : "add-warehouse__input--invalid"
                }`}
                name="position"
                type="text"
                placeholder="Position"
                onChange={handlePositionChange}
              ></input>
              {!isPositionValid(position) && (
                <p className="add-warehouse__error">
                  <img src={ErrorIcon} alt="Error icon" />
                  This field is required
                </p>
              )}
              <label className="add-warehouse__label">Phone Number</label>
              <input
                className={`add-warehouse__input ${
                  isPhoneNumberValid(phoneNumber)
                    ? ""
                    : "add-warehouse__input--invalid"
                }`}
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                onChange={handleContactPhoneChange}
              ></input>
              {!isPhoneNumberValid(phoneNumber) && (
                <p className="add-warehouse__error">
                  <img src={ErrorIcon} alt="Error icon" />
                  This field is required
                </p>
              )}
              <label className="add-warehouse__label">Email</label>
              <input
                className={`add-warehouse__input ${
                  isEmailValid(email) ? "" : "add-warehouse__input--invalid"
                }`}
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleContactEmailChange}
              ></input>
              {!isEmailValid(email) && (
                <p className="add-warehouse__error">
                  <img src={ErrorIcon} alt="Error icon" />
                  This field is required
                </p>
              )}
            </section>
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
