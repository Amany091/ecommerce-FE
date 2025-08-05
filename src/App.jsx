import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import RegisterPage from "./pages/RegisterPage";
import { Provider, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import UserOrders from "./pages/UserOrders";
import AdminDashboard from "./pages/AdminDashboard";
import BestOffers from "./pages/BestOffers";
import ProtectedRouting from "./authorization/ProtectedRouting";
import DetailsPage from "./pages/DetailsPage";
import CategoryPage from "./pages/CategoryPage";
import { store } from "./redux/apiStore";

function App() {

 

  return (
    <>
      <ToastContainer position="bottom-right" />
      <Provider store={store}>
        <Router>
          <Routes>
            {/* main layout */}
            <Route path="/" element={<Layout />}>
              {/* pages */}
              <Route index element={<HomePage />} />
              <Route
                path="/products"
                element={
                    <ProductsPage />
                }
              />
              <Route path="/products/:id" element={<DetailsPage />} />

              <Route path="/category/:id" element={<CategoryPage />} />
              <Route
                path="/orders"
                element={
                  <ProtectedRouting>
                    <UserOrders />
                  </ProtectedRouting>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRouting>
                    <CartPage />
                  </ProtectedRouting>
                }
              />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRouting>
                    <AdminDashboard />
                  </ProtectedRouting>
                }
              />
              <Route
                path="/offer"
                element={
                    <BestOffers />
                }
              />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
