import { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import DeleteWarehouse from "../../components/deleteWarehouse/DeleteWarehouse";
import "./Warehouses.scss";
import axios from "axios";


export default function Warehouses() {

  const [warehouses, setWarehouses] = useState([]);
  const navigate = useNavigate();
  
  const getNewId = () => {
     return uuidv4();
   };

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

    const handleUpdate = (event, warehouseId) => {
      event.preventDefault();
      const values = {
        warehouse_name: event.target.warehouse_name.value,
        address: event.target.address.value,
        city: event.target.city.value,
        country: event.target.country.value,
        contact_name: event.target.contact_name.value,
        contact_phone: event.target.contact_phone.value,
        contact_email: event.target.contact_email.value,
      };
      axios
        .patch(`http://localhost:8080/warehouses`, values)
        .then(({data}) => {
          const updatedWarehouses= warehouses.map((warehouse) =>
            warehouseId === data.id ? data : warehouse
          );
          setWarehouses(updatedWarehouses);
        })
        .catch(err=>
          {console.log(err)});
    };


      const handleDelete = async (event, warehouseId) => {
        event.preventDefault();
      
        navigate("/deleteWarehouse/:warehouseId");

        <DeleteWarehouse handleDelete={handleDelete} warehouseId ={warehouseId} />;

        //if user click confirm delete then continue going, following code can be written in deleteWarehouse

        /** 
        const {
          data: { deletedwarehouseId },
        } = await axios.delete(
          `http://localhost:8080/warehouses/${warehouseId}`
        );
        setWarehouses(
          warehouses.filter((warehouse) => warehouse.id !== deletedwarehouseId)
        );
        */
      };


  return (
    <>
      <section className="warehouses">
        <div className="warehouses__form-container">
          <h1 className="warehouses__title">Warehouses</h1>
          {/*---top search input---*/}
          <form className="warehouses__form">
            <div className="warehouses__search-group">
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

            <button className="warehouses__search-group warehouses__search-group--modify">
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
        {warehouses.map((warehouse) => (
          <form className="warehouses__list" key={getNewId()}>
            <div className="warehouses__subtitle-all-list-group">
              <div className="warehouses__subtitle-session-half-for-leftand-right warehouses__subtitle-session-half-for-leftand-right--group-one">
                <div className="warehouses__subtitle-session">
                  <h2 className="warehouses__subtitle warehouses__medium-hide">
                    warehouse
                  </h2>
                  <div className="warehouses__list-icon-arrow-containter">
                    <Link to={`warehouses/${warehouse.id}`}>
                      <p className="warehouses__subdetail warehouses__subdetail--name">
                        {warehouse.warehouse_name}
                        {/*--- It will link to <WarehouseDetails /> ---*/}
                      </p>
                    </Link>
                    <span className="warehouses__list-icon"></span>
                  </div>
                </div>
                <div className="warehouses__subtitle-session">
                  <h2 className="warehouses__subtitle warehouses__medium-hide">
                    address
                  </h2>
                  <p className="warehouses__subdetail">
                    {warehouse.address}, {warehouse.city}, {warehouse.country}
                  </p>
                </div>
              </div>

              <div className="warehouses__subtitle-session-half-for-leftand-right warehouses__subtitle-session-half-for-leftand-right--group-two">
                <div className="warehouses__subtitle-session warehouses__subtitle-session--group-one">
                  <h2 className="warehouses__subtitle warehouses__medium-hide">
                    contact name
                  </h2>
                  <div className="warehouses__list-icon-arrow-containter">
                    <p
                      type="text"
                      name="contact_name"
                      className="warehouses__subdetail"
                    >
                      {warehouse.contact_name}
                    </p>
                  </div>
                </div>
                <div className="warehouses__subtitle-session warehouses__subtitle-session--group-two">
                  <h2 className="warehouses__subtitle warehouses__medium-hide">
                    contact information
                  </h2>
                  <p className="warehouses__subdetail">
                    <span className="warehouses__phonenumber">
                      {warehouse.contact_phone}
                    </span>
                    {warehouse.contact_email}
                  </p>
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
