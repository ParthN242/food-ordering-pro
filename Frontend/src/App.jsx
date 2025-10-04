import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Header from "./Components/Header/Header";
import axios from "axios";
import Footer from "./Components/Footer/Footer";
import Menu from "./Pages/Menu/Menu";
import Profile from "./Pages/Profile/Profile";
import Categories from "./Pages/Categories/Categories";
import MenuItem from "./Pages/Menu-Item/Menu-item";
import MenuItemCreate from "./Pages/Menu-Item/MenuItemCreate";
import MenuItemUpdate from "./Pages/Menu-Item/MenuItemUpdate";
import Users from "./Pages/Users/Users";
import EditUsers from "./Pages/Users/EditUsers";
import Cart from "./Pages/Cart/Cart";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import OrderItems from "./Pages/Orders/OrderItems";
import Context from "./Context/Context";
import Practice from "./Pages/Practice/Pratice";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL_0;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

function App() {
  return (
    <main className="max-w-6xl max-lg:max-w-3xl mx-auto p-4">
      <Context>
        <ToastContainer />
        <Router>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/menu-items" element={<MenuItem />} />
            <Route path="/menu-items/new" element={<MenuItemCreate />} />
            <Route path="/menu-items/edit/:id" element={<MenuItemUpdate />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<EditUsers />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderItems />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/practice-route" element={<>Practice page route</>} />
          </Routes>
          <Footer />
        </Router>
      </Context>
    </main>
  );
}

export default App;
