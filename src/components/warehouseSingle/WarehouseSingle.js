//Parent component to ticket 10 and ticket 11

import WarehouseDetails from "../warehouseDetails/WarehouseDetails";
import WarehouseInventoryList from "../warehouseInventoryList/WarehouseInventoryList";
import { useParams } from "react-router-dom";


export default function WarehouseSingle() {

  const { warehouseId } = useParams();


  return (
    <>
      <h1>Single Warehouse Section Header</h1>
      <WarehouseDetails />
      <WarehouseInventoryList warehouseId = {warehouseId}/>
    </>
  );
}
