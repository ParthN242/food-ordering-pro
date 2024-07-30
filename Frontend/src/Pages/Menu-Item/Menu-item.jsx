import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../Context/Context";
import UserTab from "../../Components/UserTab/UserTab";

const MenuItem = ({ data }) => {
  return (
    <Link
      to={`/menu-items/edit/${data._id}`}
      className="bg-gray-200 rounded-xl p-4 "
    >
      <img
        src={data.image}
        alt="img"
        width={180}
        height={150}
        className="object-contain h-36"
      />
      <p className="text-center text-slate-900 font-medium mt-2">{data.name}</p>
    </Link>
  );
};

const MenuPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios.get("/api/food/get").then((d) => setMenuItems(d.data.items));
  }, []);

  useEffect(() => {
    if (user.status === "unauthenticated" || !user.userData.admin) {
      navigate("/login");
    }
  }, [user]);

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTab />
      <Link
        to={"/menu-items/new"}
        className="w-full my-8 flex items-center justify-center gap-1 py-2 border  border-gray-300 rounded-xl font-semibold text-gray-700 cursor-pointer"
      >
        <p>Create new menu item</p>
        <IoArrowForwardCircleOutline />
      </Link>
      <div>
        <p className="text-gray-500 text-sm">Edit menu item:</p>
        <div className="flex flex-wrap justify-center gap-3">
          {menuItems.length > 1 &&
            menuItems.map((item) => <MenuItem data={item} key={item._id} />)}
        </div>
      </div>
    </section>
  );
};

export default MenuPage;
