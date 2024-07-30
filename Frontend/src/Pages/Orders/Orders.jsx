import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UserTab from "../../Components/UserTab/UserTab";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/Context";
import { toast } from "react-toastify";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user.status === "unauthenticated") {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    axios
      .get("/api/order")
      .then(({ data }) => {
        setLoading(false);
        setOrders(data.orders.reverse());
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  }, []);

  return (
    <>
      {false ? (
        <Loading />
      ) : (
        <section className="mt-8 max-w-2xl mx-auto">
          <UserTab />
          <div className="mt-8">
            {loading && <div className="text-center">Loading orders...</div>}
            {orders.length < 1 && !loading && (
              <div className="text-center">No orders</div>
            )}
            {orders?.length > 0 &&
              orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6"
                >
                  <div className="grow flex flex-col md:flex-row items-center gap-6">
                    <div>
                      <div
                        className={
                          (order.paid ? "bg-green-500" : "bg-red-400") +
                          " p-2 rounded-md text-white w-24 text-center"
                        }
                      >
                        {order.paid ? "Paid" : "Not paid"}
                      </div>
                    </div>
                    <div className="grow">
                      <div className="flex gap-2 items-center mb-1">
                        <div className="grow">{order.userEmail}</div>
                        <div className="text-gray-500 text-sm"></div>
                      </div>
                      <div className="text-gray-500 text-xs">
                        {order.cartProducts.map((p) => p.name).join(", ")}
                      </div>
                    </div>
                  </div>
                  <div className="justify-end flex gap-2 items-center whitespace-nowrap">
                    <Link
                      to={"/orders/" + order._id}
                      className="bg-transparent border border-gray-300 py-2 px-4 rounded-lg font-bold "
                    >
                      Show order
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Orders;
