import "./Warehouses.scss";

export default function Warehouses() {
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
            <div>
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
        <div className="Warehouses__list">
          <div className="Warehouses__subtitle-all-list-group">
            <div className="Warehouses__subtitle-session-half-for-leftand-right">
              <div className="Warehouses__subtitle-session">
                <h2 className="Warehouses__subtitle Warehouses__medium-hide">
                  warehouse
                </h2>
                <div className="Warehouses__list-icon-arrow-containter">
                  <p className="Warehouses__subdetail Warehouses__subdetail--name">
                    Manhattan
                  </p>
                  <span className="Warehouses__list-icon"></span>
                </div>
              </div>
              <div className="Warehouses__subtitle-session">
                <h2 className="Warehouses__subtitle Warehouses__medium-hide">
                  address
                </h2>
                <p className="Warehouses__subdetail">
                  503 Broadway, New York, USA
                </p>
              </div>
            </div>

            <div className="Warehouses__subtitle-session-half-for-leftand-right">
              <div className="Warehouses__subtitle-session">
                <h2 className="Warehouses__subtitle Warehouses__medium-hide">
                  contact name
                </h2>
                <div className="Warehouses__list-icon-arrow-containter">
                  <p className="Warehouses__subdetail">Parmin Aujla</p>
                </div>
              </div>
              <div className="Warehouses__subtitle-session">
                <h2 className="Warehouses__subtitle Warehouses__medium-hide">
                  contact information
                </h2>
                <p className="Warehouses__subdetail">
                  <div className="Warehouses__phonenumber">
                    +1(627) 504-0911
                  </div>
                  paujla@instock.com
                </p>
              </div>
            </div>
          </div>

          <div className="Warehouses__bottom-icons">
            <span className="Warehouses__list-icon Warehouses__list-icon--delete"></span>
            <span className="Warehouses__list-icon Warehouses__list-icon--edit"></span>
          </div>
        </div>
      </section>
    </>
  );
}
