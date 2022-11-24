//Ticket 11

import chevronIcon from "../../assets/icons/chevron_right-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import "./WarehouseInventoryList.scss";

export default function WarehouseInventoryList() {
  return (
    <section className="inventory">
      <div className="inventory__list">
        <div className="inventory__card">
          {/* INVENTORY ITEM */}
          <div className="inventory__item-wrapper">
            <div className="inventory__item">
              <div className="inventory__item-header">
                <h5 className="inventory__item-text ">INVENTORY ITEM</h5>
                <img
                  className="inventory__sort-sortIcon"
                  src={sortIcon}
                  alt="sort icon"
                />
              </div>
              <div className="inventory__item-thing">
                <a className="inventory__item-link" href="">
                  <p className="inventory__item-thing-text">Television</p>

                  <img src={chevronIcon} alt="more than sign" />
                </a>
              </div>
            </div>

            {/* INVENTORY STATUS */}
            <div className="inventory__status">
              <div className="inventory__status-header">
                <h5 className="inventory__status-text">STATUS</h5>
                <img
                  className="inventory__sort-sortIcon"
                  src={sortIcon}
                  alt="sort icon"
                />
              </div>
              <p className="inventory__status-stock">IN STOCK</p>
            </div>
          </div>

          <div className="inventory__category-wrapper">
            {/* INVENTORY CATEGORY */}
            <div className="inventory__category">
              <div className="inventory__category-header">
                <h5 className="inventory__category-text">CATEGORY</h5>
              </div>
              <p className="inventory__category-name">Electronics</p>
            </div>

            {/* INVENTORY QTY */}
            <div className="inventory__qty">
              <div className="inventory__qty-header">
                <h5 className="inventory__qty-text">QTY</h5>
                <img
                  className="inventory__sort-sortIcon"
                  src={sortIcon}
                  alt="sort icon"
                />
              </div>
              <p className="inventory__qty-num">500</p>
            </div>
          </div>

          {/* INVENTORY ACTIONS BUTTONS */}
          <div className="inventory__actions">
            <div className="inventory__actions-header">
              <h5 className="inventory__actions-text">ACTIONS</h5>
            </div>

            <div className="inventory__actions-btns">
              <button>
                <img src={deleteIcon} alt="delete" />
              </button>
              <button>
                <img src={editIcon} alt="edit" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
