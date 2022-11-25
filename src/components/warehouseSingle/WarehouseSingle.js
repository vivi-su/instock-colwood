//Parent component to ticket 10 and ticket 11

import WarehouseDetails from "../warehouseDetails/WarehouseDetails";
import WarehouseInventoryList from "../warehouseInventoryList/WarehouseInventoryList";
import { useParams } from "react-router-dom";

export default function WarehouseSingle() {
  const { warehouseId } = useParams();

  return (
    <>
      <WarehouseDetails warehouseId={warehouseId} />
      <WarehouseInventoryList warehouseId={warehouseId} />
    </>
  );
}
