import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/allOrders").then((res) => {
      setOrders(res.data);
    });
  }, []);

  return (
    <div className="orders">
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      ) : (
        orders.map((order) => (
          <p key={order._id}>
            {order.mode} {order.name} | Qty: {order.qty} | ₹{order.price}
          </p>
        ))
      )}
    </div>
  );
};

export default Orders;