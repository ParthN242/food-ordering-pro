import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserForm from "../../Components/UserForm/UserForm";
import UserTab from "../../Components/UserTab/UserTab";
import { UserContext } from "../../Context/Context";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [userProfile, setUserProfile] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    axios.get(`/api/user/${id}`).then((d) => setUserProfile(d.data.user));
  }, []);

  useEffect(() => {
    if (user.status === "unauthenticated" || !user.userData.admin) {
      navigate("/login");
    }
  }, [user]);

  const submitHandler = async (e, userData) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/user`, userData);

      if (data.success) toast.success();
    } catch (error) {}
  };

  return (
    <section className="mt-8">
      <UserTab />
      <div className="mt-6 max-w-2xl mx-auto">
        <UserForm profile={userProfile} submitHandler={submitHandler} />
      </div>
    </section>
  );
};

export default EditUser;
