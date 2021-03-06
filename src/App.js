import "./styles.css";
import { useState, useEffect } from "react";
import heroIcon from "../public/shopping-cart.svg";
import { Header, PrimaryButton, Cart, Inventory } from "./Components/index.js";
import {
  inventoryList,
  computeTotalAmount,
  computeTotalItems
} from "./Utility/index.js";

export default function App() {
  const [inventory, setInventory] = useState(inventoryList);
  const [cart, setCart] = useState({});
  const [amount, setAmount] = useState(0);
  const [displayState, setDisplayState] = useState("inventory");

  useEffect(() => setAmount(computeTotalAmount(cart)), [cart]);

  return (
    <div className="app shopping-cart">
      <Header brandName="Shopping Cart" brandIcon={heroIcon} />
      <span className="cart--total-amount">{`Total amount: Rs. ${amount}`}</span>
      <nav className="nav__side-bar">
        <PrimaryButton
          btnText="Offers"
          onClickHandler={() => setDisplayState("inventory")}
        />
        <PrimaryButton
          btnText={`My Cart (${computeTotalItems(cart)})`}
          onClickHandler={() => setDisplayState("cart")}
        />
      </nav>
      <Inventory
        inventory={inventory}
        setInventory={setInventory}
        cart={cart}
        setCart={setCart}
        displayState={displayState}
      />

      <Cart
        inventory={inventory}
        setInventory={setInventory}
        cart={cart}
        setCart={setCart}
        displayState={displayState}
      />
    </div>
  );
}
