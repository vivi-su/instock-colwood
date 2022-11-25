import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./Warehouses.scss";
import axios from "axios";

export default function Warehouses() {
  const [warehouses, setWarehouses] = useState([]);
  const navigate = useNavigate();

  const getNewId = () => {
    return uuidv4();
  };

  useEffect(() => {
    const fetchAllwarehouses = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/warehouses`);
        setWarehouses(data);
      } catch (err) {
        console.log("Error", err);
      }
    };

    fetchAllwarehouses();
  }, []);

  const handleAddWarehouse = (event) => {
    event.preventDefault();
    navigate("addWarehouse");
  };

  const handleUpdate = (event, warehouseId) => {
    event.preventDefault();
    navigate(`editWarehouse/${warehouseId}`);
  };

  const handleDelete = async (event, warehouseId) => {
    event.preventDefault();
    navigate(`deleteWarehouse/${warehouseId}`);
  };

  return (
    <>
    <Outlet />
      <section className="warehouses">
        <div className="warehouses__form-container">
          <h1 className="warehouses__title">Warehouses</h1>
          {/*---top search input---*/}
          <form className="warehouses__form">
            <div className="warehouses__search-group warehouses__search-group--search">
              <input
                type="search"
                placeholder="Search..."
                name="search"
                autoFocus
                className="warehouses__search-name"
              />
              <span className="warehouses__search-icon"></span>
            </div>

            {/*---top add new warehouse button---*/}

            <button
              className="warehouses__search-group warehouses__search-group--add"
              onClick={(event) => handleAddWarehouse(event)}
            >
              <span className="warehouses__search-icon warehouses__search-icon--add"></span>
              <span className="warehouses__add-btn">Add New Warehouse</span>
            </button>
          </form>
        </div>
        {/*---warehouse sort banner ---*/}
        <div className="warehouses__title-list ">
          <div className="warehouses__title-list--inner warehouses__small-hide">
            <div>
              <span>warehouse</span>
              <span className="warehouses__sort-icon"></span>
            </div>
            <div className="warehouses__title-list-address">
              <span>address</span>
              <span className="warehouses__sort-icon"></span>
            </div>
            <div>
              <span>contact name</span>
              <span className="warehouses__sort-icon"></span>
            </div>
            <div>
              <span>contact information</span>
              <span className="warehouses__sort-icon"></span>
            </div>
            <div>
              <span>actions</span>
              <span className="warehouses__sort-icon warehouses__sort-icon--hide-action"></span>
            </div>
          </div>
        </div>

        {/*---warehouse list---*/}
        {warehouses?.map((warehouse) => (
          <form className="warehouses__list" key={getNewId()}>
            <div className="warehouses__subtitle-all-list-group">
              <div className="warehouses__subtitle-session-half-for-leftand-right warehouses__subtitle-session-half-for-leftand-right--group-one">
                <div className="warehouses__subtitle-session warehouses__subtitle-session--group-one">
                  <h2 className="warehouses__subtitle warehouses__medium-hide">
                    warehouse
                  </h2>
                  <div className="warehouses__list-icon-arrow-containter">
                    <Link to={`${warehouse.id}`}>
                      <p className="warehouses__subdetail">
                        {warehouse.warehouse_name}
                      </p>
                      {/*--- It will link to <WarehouseDetails /> ---*/}
                    </Link>
                    <span className="warehouses__list-icon"></span>
                  </div>
                </div>
                <div className="warehouses__subtitle-session">
                  <h2 className="warehouses__subtitle warehouses__medium-hide">
                    address
                  </h2>
                  <div className="warehouses__subdetail">
                    <span>{warehouse.address}</span>,<br></br>
                    <span>{warehouse.city}</span>,<br></br>
                    <span>{warehouse.country}</span>
                  </div>
                </div>
              </div>

              <div className="warehouses__subtitle-session-half-for-leftand-right warehouses__subtitle-session-half-for-leftand-right--group-two">
                <div className="warehouses__subtitle-session warehouses__subtitle-session--group-one">
                  <h2 className="warehouses__subtitle warehouses__medium-hide">
                    contact name
                  </h2>
                  <div className="warehouses__list-icon-arrow-containter">
                    <p className="warehouses__subdetail">
                      {warehouse.contact_name}
                    </p>
                  </div>
                </div>
                <div className="warehouses__subtitle-session">
                  <h2 className="warehouses__subtitle warehouses__medium-hide">
                    contact information
                  </h2>
                  <div className="warehouses__subdetail">
                    <span className="warehouses__phonenumber">
                      {warehouse.contact_phone}
                    </span>

                    <span className="warehouses__phonenumber">
                      {warehouse.contact_email}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="warehouses__bottom-icons">
              <button
                className="warehouses__list-icon warehouses__list-icon--delete"
                onClick={(event) => handleDelete(event, warehouse.id)}
              ></button>
              <button
                className="warehouses__list-icon warehouses__list-icon--edit"
                onClick={(event) => handleUpdate(event, warehouse.id)}
              ></button>
            </div>
          </form>
        ))}
      </section>
    </>
  );
}
