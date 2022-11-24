import WarehouseDetails from "../warehouseDetails/WarehouseDetails";
import WarehouseInventoryList from "../warehouseInventoryList/WarehouseInventoryList";

export default function WarehouseSingle() {
  return (
    <>
      <h1>Single Warehouse Section Header</h1>
      <WarehouseDetails />
      <WarehouseInventoryList />
    </>
  );
}
