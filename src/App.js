//styles
import "./App.scss";

//components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import AddInventoryItem from "./components/addInventoryItem/AddInventoryItem";
import AddWarehouse from "./components/addWarehouse/AddWarehouse";
import DeleteInventoryItem from "./components/deleteInventoryItem/DeleteInventoryItem";
import DeleteWarehouse from "./components/deleteWarehouse/DeleteWarehouse";
import EditInventoryItem from "./components/editInventoryItem/EditInventoryItem";
import EditWarehouse from "./components/editWarehouse/EditWarehouse";
import InventoryItemDetails from "./components/inventoryItemDetails/InventoryItemDetails";
import WarehouseDetails from "./components/warehouseDetails/WarehouseDetails";

//pages
import Inventory from "./pages/inventory/Inventory";
import Warehouses from "./pages/warehouses/Warehouses";

//react router components
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Header stays outside the routes */}
        <header className="header-container">
          <Header />
        </header>
        <main className="main-container">
          <Routes>
            {/*<---------------- HOME ---------------->*/}
            {/* Home will navigate the user to the Warehouses page so there is no need for a file homePage.js */}
            <Route path="/" element={<Navigate to={"warehouses"} />} />

            {/*<---------------- WAREHOUSE PAGE ---------------->*/}
            {/* The Warehouses page has one nested route to ADD a new warehouse and one to DELETE an existing warehouse*/}
            <Route path="warehouses" element={<Warehouses />}>
              <Route path="addWarehouse" element={<AddWarehouse />} />
              <Route
                path="deleteWarehouse/:warehouseId"
                element={<DeleteWarehouse />}
              />
            </Route>

            {/* The WarehouseDetails component has a nested route to EDIT the selected warehouse */}
            <Route
              path="warehouses/:warehouseId"
              element={<WarehouseDetails />}
            >
              <Route
                path="editWarehouse/:warehouseId"
                element={<EditWarehouse />}
              />
            </Route>

            {/*<---------------- INVENTORY PAGE ---------------->*/}
            {/* The Inventory page has one nested route to ADD a new item and one to DELETE an existing item*/}
            <Route path="inventory" element={<Inventory />}>
              <Route path="addInventoryItem" element={<AddInventoryItem />} />
              <Route
                path="deleteInventoryItem/:itemId"
                element={<DeleteInventoryItem />}
              />
            </Route>
            {/* The InventoryItemDetails component has a nested route to EDIT the selected item */}
            <Route path="inventory/:itemId" element={<InventoryItemDetails />}>
              <Route
                path="editInventoryItem/:itemId"
                element={<EditInventoryItem />}
              />
            </Route>

            {/*<---------------- FALLBACK ROUTE ---------------->*/}
            {/* Fallback route will direct user to Warehouses page*/}
            <Route path="*" element={<Warehouses />} />
          </Routes>
        </main>
        {/* Footer stays outside the routes */}
        <footer className="footer-container">
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
