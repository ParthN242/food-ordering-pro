import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import MenuItemForm from "../../Components/MenuItemForm/MenuItemForm";
import UserTab from "../../Components/UserTab/UserTab";
import { UserContext } from "../../Context/Context";

const MenuItemUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [menuItem, setMenuItem] = useState({});

  useEffect(() => {
    axios
      .get(`/api/food/get`)
      .then((d) => setMenuItem(() => d.data.items.find((i) => i._id === id)));
  }, [id]);

  useEffect(() => {
    if (user.status === "unauthenticated" || !user.userData.admin) {
      navigate("/login");
    }
  }, [user]);
  const submitHandler = async (itemData) => {
    try {
      const { data } = await axios.put("/api/food", { id, itemData });

      if (data.success) {
        toast.success(data.message);
        navigate("/menu-items");
      }

      if (!data.success) console.log(data.error);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const deleteItemHandler = async () => {
    try {
      const { data } = await axios.delete(`/api/menu-items?id=${id}`);

      if (data.success) {
        toast.success(data.message);
        router.push("/menu-items");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTab />
      <Link
        to={"/menu-items"}
        className="w-full my-8 flex items-center justify-center gap-1 py-2 border  border-gray-300 rounded-xl font-semibold text-gray-700 cursor-pointer"
      >
        <IoArrowBackCircleOutline className="text-xl" />
        <p>Show all menu item</p>
      </Link>

      <MenuItemForm menuItem={menuItem} onSubmit={submitHandler} />
      <div className="flex mt-2 gap-4 ">
        <div className="w-40 max-md:hidden"></div>
        <button
          className="flex-1 p-2 font-semibold border border-gray-300 rounded-lg"
          onClick={deleteItemHandler}
        >
          Delete this menu item
        </button>
      </div>
    </section>
  );
};

export default MenuItemUpdate;
