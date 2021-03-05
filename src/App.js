import "./styles.css";
import { useState, useEffect } from "react";
import heroIcon from "../public/shopping-cart.svg";
import { PrimaryButton, Cart, Inventory } from "./Components/index.js";
import { inventoryList, computeTotalAmount } from "./Utility/index.js";

export default function App() {
  const [inventory, setInventory] = useState(inventoryList);
  const [cart, setCart] = useState({});
  const [showCartList, setShowCartList] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => setAmount(computeTotalAmount(cart)), [cart]);

  return (
    <div className="app shopping-cart">
      <h1 className="app--title">
        Shopping cart
        <img className="hero--icon" alt="" src={heroIcon} />
      </h1>
      <span className="cart--total-amount">{`Total amount: Rs. ${amount}`}</span>
      <Inventory
        inventory={inventory}
        setInventory={setInventory}
        cart={cart}
        setCart={setCart}
      />
      <PrimaryButton
        btnText="My Cart"
        onClickHandler={() => setShowCartList(!showCartList)}
      />
      <Cart
        inventory={inventory}
        setInventory={setInventory}
        cart={cart}
        setCart={setCart}
        showCartList={showCartList}
      />
    </div>
  );
}
