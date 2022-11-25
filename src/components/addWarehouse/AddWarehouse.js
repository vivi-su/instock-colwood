//Ticket 17
import { useState } from "react";
import "./AddWarehouse.scss";
import ErrorIcon from "../../assets/icons/error-24px.svg";

export default function AddWarehouse() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  //check the phone number validation

  const handleChangeEmail = (event) => {
    // get inputted value from event, update state with value
    setEmail(event.target.value);
  };
  const handleChangePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const isPhoneNumberValid = () => {
    if (phoneNumber.length < 11) {
      return false;
    }
    return true;
  };

  const isFormValid = () => {
    // Check if the fields are filled
    if (email === "" || phoneNumber === "") {
      return false;
    }
    if (!isPhoneNumberValid()) {
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      // Make the post request
      alert("Warehouse added successfully");
    } else {
      alert("Failed to add Warehouse, you have errors in your form");
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
            className="add-warehouse__name-field"
            name="name"
            type="text"
            placeholder="Warehouse Name"
          ></input>
          <p className="add-warehouse__address">Street Address</p>
          <input
            className="add-warehouse__address-field"
            name="address"
            type="text"
            placeholder="Street Address"
          ></input>
          <p className="add-warehouse__city">City</p>
          <input
            className="add-warehouse__city-field"
            name="city"
            type="text"
            placeholder="City"
          ></input>
          <p className="add-warehouse__country">Country</p>
          <input
            className="add-warehouse__country-field"
            name="country"
            type="text"
            placeholder="Country"
          ></input>
        </section>

        <section className="add-warehouse_contact">
          <h2 className="add-warehouse__contact-container">Contact Details</h2>
          <p className="add-warehouse__contact-name">Contact Name</p>
          <input
            className="add-warehouse__contact-field"
            name="contact-name"
            type="text"
            placeholder="Contact Name"
          ></input>
          <p className="add-warehouse__position">Position</p>
          <input
            className="add-warehouse__position-field"
            name="position"
            type="text"
            placeholder="Position"
          ></input>
          <p className="add-warehouse__phone">Phone Number</p>
          <input
            className={`add-warehouse__phone-field ${
              isPhoneNumberValid() ? "" : "add-warehouse__phone-field--invalid"
            }`}
            type="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChangePhoneNumber}
            placeholder="Phone Number"
          ></input>
          <p className="add-warehouse__email">Email</p>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChangeEmail}
            className="add-warehouse__email-field"
            placeholder="Email"
          ></input>
          {!isFormValid() && (
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
