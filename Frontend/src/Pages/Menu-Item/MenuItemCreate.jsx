import axios from "axios";
import React, { useContext, useEffect } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import UserTab from "../../Components/UserTab/UserTab";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../Context/Context";
import MenuItemForm from "../../Components/MenuItemForm/MenuItemForm";

const NewItemPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const profile = user.userData;

  useEffect(() => {
    if (user.status === "unauthenticated" || !user.userData.admin) {
      navigate("/login");
    }
  }, [user]);

  const submitHandler = async (itemData) => {
    // const itemData = {
    //   name,
    //   image,
    //   category,
    //   description,
    //   basePrice,
    //   sizes,
    //   extraIngridients,
    // };

    try {
      const { data } = await axios.post("/api/food/create", itemData);

      if (data.success) toast.success(data.message);

      if (data.error) toast.error(error);

      navigate("/menu-items");
    } catch (error) {
      toast.error(error.message);
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

      <MenuItemForm meuItem={null} onSubmit={submitHandler} />
    </section>
  );
};

export default NewItemPage;
