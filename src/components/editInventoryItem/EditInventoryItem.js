//Ticket 22

export default function EditInventoryItem() {
  return (
    <>
      <section className="edit-item">
        <h1 className="edit-item__title">
          <Link to="/inventories">
            <img src={BackArrowIcon} alt="Back arrow icon" />
          </Link>
          Edit Inventory Item
        </h1>

        <form className="edit-item__form">
          <section className="edit-item__">
            <section className="edit-item__details-container">
              <h2 className="edit-item__details">Item Details</h2>
              <label className="edit-item__">Item Name</label>
              <input className="edit-item__" name="" type=""></input>
              <label className="">Description</label>
              <input className="" name="" type=""></input>
              <label className="">Category</label>
              {/* DROPDOWN <input className="" name="" type=""></input> */}
            </section>

            <section className="">
              <h2 className="">Item Availability</h2>
              <label className="">Status</label>
              {/* SELECT IN STOCK/ OUT OF STOCK<input className="" name="" type=""></input> */}
              <label className="">Quantity</label>
              <input className="" name="" type=""></input>
              <label className="">Warehouse</label>
              {/* DROPDOWN <input className="" name="" type=""></input> */}
            </section>
          </section>

          <section className="edit-item__button">
            <button className="edit-item__cancel-button" type="submit">
              <Link to="/inventories" className="edit-item__cancel">
                Cancel
              </Link>
            </button>
            <button className="edit-item__save" type="submit">
              Save
            </button>
          </section>
        </form>
      </section>
    </>
  );
}
