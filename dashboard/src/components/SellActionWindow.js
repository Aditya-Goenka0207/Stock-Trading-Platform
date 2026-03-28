import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const [stockHolding, setStockHolding] = useState(null);

  // Fetch ONLY this stock holding
  useEffect(() => {
    const fetchStockHolding = async () => {
      try {
        const res = await axios.get(
          `https://zerodha-backend-fxfd.onrender.com/holdings/${uid}`
        );

        // If stock exists, backend will return holding object
        setStockHolding(res.data);
      } catch (err) {
        // If stock not found, backend should return 404
        setStockHolding(null);
      }
    };

    fetchStockHolding();
  }, [uid]);

  const handleSellClick = async () => {
    // ✅ Check holding exists
    if (!stockHolding) {
      alert("You don't own this stock, so you can't sell it!");
      return;
    }

    // Place SELL order
    try {
      await axios.post("https://zerodha-backend-fxfd.onrender.com/newOrder", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "SELL",
      });

      GeneralContext.closeSellWindow();
    } catch (err) {
      console.log(err);
      alert("Something went wrong while placing sell order.");
    }
  };

  const handleCancelClick = () => {
    GeneralContext.closeSellWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>

        <div>
          <Link className="btn btn-red" onClick={handleSellClick}>
            Sell
          </Link>

          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;