import React, { useEffect, useState } from "react";
import MenuItem from "../MenuItem/MenuItem";
import SectionHeader from "../Section Header/SectionHeader";
import axios from "axios";

const HomeMenu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const { data } = await axios.get("/api/food/get");

      setMenuItems(data.items.slice(-6));
    };
    fetchMenuItems();
  }, []);
  return (
    <section className="my-5 flex flex-col gap-8 relative" id="menu">
      <div className="absolute top-0 left-0 -z-10">
        <img src="./sallad1.png" alt="" className="" />
      </div>
      <div className="absolute top-0 right-0 -z-10">
        <img src="./sallad2.png" alt="" className="mix-blend-lighten" />
      </div>
      <SectionHeader text={"CHECK OUT"} heading={"Our Best Seller"} />
      <div className="flex mt-4 items-center justify-center gap-4 flex-wrap">
        {menuItems.map((item) => (
          <MenuItem key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default HomeMenu;
