import UserTab from "../../Components/UserTab/UserTab";
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UserForm from "../../Components/UserForm/UserForm";
import { UserContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const profile = user.userData;
  const submitHandler = async (e, userData) => {
    e.preventDefault();

    const { data } = await axios.put("/api/user", userData);

    if (data.success === true) toast.success("Profile Updated");
  };

  useEffect(() => {
    if (user.status === "unauthenticated") {
      navigate("/login");
    }
  }, [user]);

  return (
    <section className="mt-8">
      <UserTab />
      <UserForm profile={profile} submitHandler={submitHandler} />
    </section>
  );
};

export default ProfilePage;
