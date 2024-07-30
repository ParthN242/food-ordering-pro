import React, { useContext } from "react";
import { UserContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Payment = () => {
  const navigate = useNavigate();
  const { user, cart, clearCart } = useContext(UserContext);
  const profile = user.userData;

  const orderInfo = JSON.parse(localStorage.getItem("orderInfo"));

  const submitHandler = async (e) => {
    e.preventDefault();

    const order = {
      userEmail: profile.email,
      phone: orderInfo.shippingInfo.phone,
      address: orderInfo.shippingInfo.address,
      postalCode: orderInfo.shippingInfo.postalCode,
      city: orderInfo.shippingInfo.city,
      country: orderInfo.shippingInfo.country,
      cartProducts: cart,
    };

    try {
      const { data } = await axios.post("/api/order", {
        orderInfo: order,
      });
      clearCart();
      localStorage.removeItem("orderInfo");

      toast.success("Payment success");

      navigate("/orders");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <section className="mt-8 max-w-lg mx-auto">
      <form className="flex flex-col gap-4" onSubmit={(e) => submitHandler(e)}>
        <h1 className="text-center font-semibold text-3xl text-primary">
          Payment
        </h1>
        <div>
          <label htmlFor="">Card Number</label>
          <input
            type="number"
            className="paymentInput"
            placeholder="Card Number"
          />
        </div>
        <div>
          <label htmlFor="">Expiry Date</label>
          <input
            type="text"
            className="paymentInput"
            placeholder="Expiry Date"
          />
        </div>
        <div>
          <label htmlFor="">CVV</label>
          <input type="number" className="paymentInput" placeholder="CVV" />
        </div>

        <button className="button">Pay - ${orderInfo?.total}</button>
      </form>
    </section>
  );
};

export default Payment;
