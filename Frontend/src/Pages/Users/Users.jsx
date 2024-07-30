import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserTab from "../../Components/UserTab/UserTab";
import { UserContext } from "../../Context/Context";

const User = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const { user } = useContext(UserContext);
  const profile = user.userData;

  useEffect(() => {
    axios.get("/api/user/all").then((d) => setUsers(d.data.users));
  }, []);

  useEffect(() => {
    if (user.status === "unauthenticated" || !user.userData.admin) {
      navigate("/login");
    }
  }, [user]);

  return (
    <section className="mt-8">
      <UserTab />
      <div className="mt-6 max-w-2xl mx-auto">
        <div className="flex flex-col gap-2">
          {users.length > 0 &&
            users.map((item) => (
              <div
                className="bg-gray-100 grid grid-cols-3 items-center justify-between p-2 rounded-xl"
                key={item._id}
              >
                <p>{item.name ? item.name : "No name"}</p>
                <p className="text-gray-500">{item.email}</p>
                <Link
                  to={`/users/${item._id}`}
                  className="font-semibold border border-gray-300 px-6 py-2 rounded-xl justify-self-end"
                >
                  Edit
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default User;
