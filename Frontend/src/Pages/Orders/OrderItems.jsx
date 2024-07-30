import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import CartItem from "../../Components/CartItem/CartItem";
import SectionHeader from "../../Components/Section Header/SectionHeader";
import AddressInputs from "../../Components/UserForm/AddressInputs";
import { cartProductPrice, UserContext } from "../../Context/Context";

const OrderItems = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setLoadingOrder(true);
      axios.get(`/api/order/${id}`).then(({ data }) => {
        setOrder(data.order);
        setLoadingOrder(false);
      });
    }
  }, [id]);

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }

  useEffect(() => {
    if (user.status === "unauthenticated") {
      navigate("/login");
    }
  }, [user]);
  return (
    <section className="max-w-4xl mx-auto mt-8">
      <div className="text-center">
        <SectionHeader heading="Your order" />
        <div className="mt-4 mb-8">
          <p>Thanks for your order.</p>
          <p>We will call you when your order will be on the way.</p>
        </div>
      </div>
      {loadingOrder && <div>Loading order...</div>}
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div>
            {order.cartProducts.map((product) => (
              <CartItem key={product._id} item={product} />
            ))}
            <div className="text-right py-2 text-gray-500">
              Subtotal:
              <span className="text-black font-bold inline-block w-8">
                ${subtotal}
              </span>
              <br />
              Delivery:
              <span className="text-black font-bold inline-block w-8">$5</span>
              <br />
              Total:
              <span className="text-black font-bold inline-block w-8">
                ${subtotal + 5}
              </span>
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInputs
                disabled={true}
                addressProps={order}
                setAddressProp={{}}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderItems;
