import "bootstrap/dist/css/bootstrap.min.css";
import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import StoresCollab from "./Pages/StoresCollab";
import SellandBidding from "./Pages/SellandBidding";
import HomePageLogIn from "./Pages/HomePageLogIn";
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";
import CustomerHomePage from "./Pages/CustomerHomePage";
import Admin from "./Pages/Admin";
import Promotions from "./Pages/Promotions";
import TestAddbook from "./Components/TestAddbook";
import DriverSignupPage from "./Pages/DriverSignupPage";
import SuperAdminPage from "./Pages/SuperAdminPage";
import AdminViewUserPage from "./Pages/AdminViewUserPage";
import AdminViewStorePage from "./Pages/AdminViewStorePage";
import AdminViewDriverPage from "./Pages/AdminViewDriverPage";
import AdminViewCouponPage from "./Pages/AdminViewCouponPage";
import StorePage from "./Pages/StorePage";
import ViewAccount from "./Pages/ViewAccount";
import DriverPage from "./Pages/DriverPage";
import Wishlist from "./Components/Wishlist";
import WishlistPage from "./Pages/WishlistPage";
import ViewWishListItemPage from "./Pages/ViewWishListItemPage";
import AddBooktoCartPage from "./Pages/AddBooktoCartPage";
import CartPage from "./Pages/CartPage";
import AdminViewOrderPage from "./Pages/AdminViewPendingOrdersPage";
import DriverViewOrdersPage from "./Pages/DriverViewOrdersPage";
import Sell from "./Pages/SellPage";
import ViewRepliesPage from "./Pages/ViewRepliesPage";
function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<HomePageLogIn />}></Route>
        <Route path="/Stores" element={<StoresCollab />}></Route>
        <Route path="/Sell&Bid" element={<SellandBidding />}></Route>
        <Route path="/LogIn" element={<LogIn />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>

        <Route path="/Home" element={<CustomerHomePage />}></Route>
        <Route path="/Home/wishlists" element={<WishlistPage />}></Route>

        <Route
          path="/Home/wishlists/:book_id"
          element={<ViewWishListItemPage />}
        ></Route>
        <Route path="/driver" element={<DriverPage />}></Route>
        <Route path="/Admin" element={<Admin />}></Route>
        <Route path="/Home/Sell" element={<Sell />}></Route>
        <Route path="/Home/viewReplies" element={<ViewRepliesPage />}></Route>
        <Route path="/Promotions" element={<Promotions />}></Route>
        <Route path="/addBook" element={<TestAddbook />}></Route>
        <Route path="/driversignup" element={<DriverSignupPage />}></Route>
        <Route path="/superadmin" element={<SuperAdminPage />}></Route>
        <Route path="/users/:id" element={<AdminViewUserPage />}></Route>
        <Route path="/stores/:id" element={<AdminViewStorePage />}></Route>
        <Route path="/drivers/:ssn" element={<AdminViewDriverPage />}></Route>
        <Route path="/coupons/:code" element={<AdminViewCouponPage />}></Route>
        <Route
          path="/pendingorders/:id"
          element={<AdminViewOrderPage />}
        ></Route>
        <Route
          path="/driverorders/:id"
          element={<DriverViewOrdersPage />}
        ></Route>
        <Route path="/store" element={<StorePage />}></Route>

        <Route path="/home/ViewAccount" element={<ViewAccount />}></Route>
        <Route
          path="/home/book/:book_id"
          element={<AddBooktoCartPage />}
        ></Route>
        <Route path="/home/Cart" element={<CartPage />}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
