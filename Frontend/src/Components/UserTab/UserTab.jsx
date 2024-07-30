import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../Context/Context";

const TabLink = ({ link, label }) => {
  const { pathname } = useLocation();

  return (
    <Link
      to={link}
      key={link}
      className={`${
        pathname?.includes(link)
          ? "bg-primary text-white"
          : "bg-gray-300 text-gray-800"
      } rounded-full py-2 px-4`}
    >
      {label}
    </Link>
  );
};

const UserTab = () => {
  const { user } = useContext(UserContext);
  console.log("user: ", user);
  const userData = user.userData;
  return (
    <div className="flex gap-4 max-md:gap-2 justify-center flex-wrap items-center">
      <TabLink link={"/profile"} label={"Profile"} />
      {userData?.admin && (
        <>
          <TabLink link={"/categories"} label={"Categories"} />
          <TabLink link={"/menu-items"} label={"Menu Items"} />
          <TabLink link={"/users"} label={"Users"} />
        </>
      )}
      <TabLink link={"/orders"} label={"Orders"} />
    </div>
  );
};

export default UserTab;
