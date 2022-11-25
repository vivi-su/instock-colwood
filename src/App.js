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
import WarehouseSingle from "./components/warehouseSingle/WarehouseSingle";

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
            {/* The Warehouses page has only one nested route to DELETE an existing warehouse*/}
            <Route path="warehouses" element={<Warehouses />}>
              <Route
                path="deleteWarehouse/:warehouseId"
                element={<DeleteWarehouse />}
              />
            </Route>
            <Route
              path="warehouses/:warehouseId"
              element={<WarehouseSingle />}
            />
            <Route
              element={<EditWarehouse />}
              path="warehouses/editWarehouse/:warehouseId"
            />
            <Route path="warehouses/addWarehouse" element={<AddWarehouse />} />

            {/*<---------------- INVENTORY PAGE ---------------->*/}
            {/* The Inventory page has only one nested to DELETE an existing item*/}
            <Route path="/inventory" element={<Inventory />}>
              <Route
                path="deleteInventoryItem/:itemId"
                element={<DeleteInventoryItem />}
              />
            </Route>
            <Route
              path="inventory/:itemId"
              element={<InventoryItemDetails />}
            />
            <Route
              path="inventory/editInventoryItem/:itemId"
              element={<EditInventoryItem />}
            />
            <Route
              path="inventory/addInventoryItem"
              element={<AddInventoryItem />}
            />

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
