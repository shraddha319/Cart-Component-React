import "./styles.css";
import { useState, useEffect } from "react";
import heroIcon from "../public/shopping-cart.svg";
import { inventoryList } from "./Utility/data.js";
import Inventory from "./Components/Inventory.js";
import Cart from "./Components/Cart.js";

export default function App() {
  const [inventory, setInventory] = useState(inventoryList);
  const [cart, setCart] = useState({});
  const [showCartList, setShowCartList] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(computeTotalAmount, [cart]);

  function checkInStock(itemID) {
    return inventory[itemID].quantity > 0;
  }

  function computeTotalAmount() {
    let total = Object.keys(cart).reduce(
      (amount, itemID) => amount + cart[itemID].quantity * cart[itemID].price,
      0
    );
    setAmount(total);
  }

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
        checkInStock={checkInStock}
      />
      <button
        className="btn btn__primary btn__add-to-cart"
        onClick={() => setShowCartList(!showCartList)}
      >
        My Cart ({Object.keys(cart).length})
      </button>
      <Cart
        inventory={inventory}
        setInventory={setInventory}
        cart={cart}
        setCart={setCart}
        checkInStock={checkInStock}
      />
    </div>
  );
}
