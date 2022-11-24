import { useState, useEffect } from "react";
import "./Warehouses.scss";
import axios from "axios";

export default function Warehouses() {

  const [warehouses, setWarehouses] = useState([]);

  useEffect(()=>{
    const fetchAllwarehouses = async () =>{
      try{
        const {data} = await axios.get(`http://localhost:8080/warehouses`);
        setWarehouses(data);
        console.log(data);
      } catch (err){
        console.log("Error", err);
      }
    };

    fetchAllwarehouses();
  },[]);



  return (
    <>
      <section className="Warehouses">
        <div className="Warehouses__form-container">
          <h1 className="Warehouses__title">Warehouses</h1>
          {/*---top search input---*/}
          <form className="Warehouses__form">
            <div className="Warehouses__search-group">
              <input
                type="search"
                placeholder="Search..."
                name="search"
                autoFocus
                className="Warehouses__search-name"
              />
              <span className="Warehouses__search-icon"></span>
            </div>

            {/*---top add new warehouse button---*/}

            <button className="Warehouses__search-group Warehouses__search-group--modify">
              <span className="Warehouses__search-icon Warehouses__search-icon--add"></span>
              <span className="Warehouses__add-btn">Add New Warehouse</span>
            </button>
          </form>
        </div>
        {/*---warehouse sort banner ---*/}
        <div className="Warehouses__title-list ">
          <div className="Warehouses__title-list--inner Warehouses__small-hide">
            <div>
              <span>warehouse</span>
              <span className="Warehouses__sort-icon"></span>
            </div>
            <div className="Warehouses__title-list-address">
              <span>address</span>
              <span className="Warehouses__sort-icon"></span>
            </div>
            <div>
              <span>contact name</span>
              <span className="Warehouses__sort-icon"></span>
            </div>
            <div>
              <span>contact information</span>
              <span className="Warehouses__sort-icon"></span>
            </div>
            <div>
              <span>actions</span>
              <span className="Warehouses__sort-icon Warehouses__sort-icon--hide-action"></span>
            </div>
          </div>
        </div>

        {/*---warehouse list---*/}
        {warehouses.map((warehouse) => (
          <div className="Warehouses__list" key={warehouse.id}>
            <div className="Warehouses__subtitle-all-list-group">
              <div className="Warehouses__subtitle-session-half-for-leftand-right Warehouses__subtitle-session-half-for-leftand-right--group-one">
                <div className="Warehouses__subtitle-session">
                  <h2 className="Warehouses__subtitle Warehouses__medium-hide">
                    warehouse
                  </h2>
                  <div className="Warehouses__list-icon-arrow-containter">
                    <p className="Warehouses__subdetail Warehouses__subdetail--name">
                      {warehouse.warehouse_name}
                    </p>
                    <span className="Warehouses__list-icon"></span>
                  </div>
                </div>
                <div className="Warehouses__subtitle-session">
                  <h2 className="Warehouses__subtitle Warehouses__medium-hide">
                    address
                  </h2>
                  <p className="Warehouses__subdetail">
                    {warehouse.address}, {warehouse.city}, {warehouse.country}
                  </p>
                </div>
              </div>

              <div className="Warehouses__subtitle-session-half-for-leftand-right Warehouses__subtitle-session-half-for-leftand-right--group-two">
                <div className="Warehouses__subtitle-session Warehouses__subtitle-session--group-one">
                  <h2 className="Warehouses__subtitle Warehouses__medium-hide">
                    contact name
                  </h2>
                  <div className="Warehouses__list-icon-arrow-containter">
                    <p className="Warehouses__subdetail">
                      {warehouse.contact_name}
                    </p>
                  </div>
                </div>
                <div className="Warehouses__subtitle-session Warehouses__subtitle-session--group-two">
                  <h2 className="Warehouses__subtitle Warehouses__medium-hide">
                    contact information
                  </h2>
                  <p className="Warehouses__subdetail">
                    <span className="Warehouses__phonenumber">
                      {warehouse.contact_phone}
                    </span>
                    {warehouse.contact_email}
                  </p>
                </div>
              </div>
            </div>

            <div className="Warehouses__bottom-icons">
              <span className="Warehouses__list-icon Warehouses__list-icon--delete"></span>
              <span className="Warehouses__list-icon Warehouses__list-icon--edit"></span>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
