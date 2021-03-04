import "./styles.css";
import { useState, useEffect } from "react";
import heroIcon from "../public/shopping-cart.svg";

export default function App() {
  const [inventory, setInventory] = useState({
    ITEM01: {
      name: "Moong Dal Yellow (Split)",
      img:
        "https://rukminim1.flixcart.com/image/352/352/j8rnpu80/pulses/m/j/c/1-moong-dal-moong-dal-un-branded-original-imaeymjgdha3wqts.jpeg?q=70",
      quantity: 5,
      price: 128,
      unit: "kg",
      perUnit: 1,
      inStock: true
    },
    ITEM02: {
      name: "Red Bull Sugar free Energy Drink",
      img:
        "https://rukminim1.flixcart.com/image/352/352/kf2v3ww0/energy-sport-drink-mix/g/y/z/6000-sugarfree-red-bull-original-imafvmeft3jhruky.jpeg?q=70",
      quantity: 5,
      price: 115,
      unit: "ml",
      perUnit: 250,
      inStock: true
    },
    ITEM03: {
      name: "Britannia Treat Jim Jam",
      img:
        "https://rukminim1.flixcart.com/image/352/352/k8j3gcw0/cookie-biscuit/e/t/g/150-treat-jim-jam-britannia-original-imafqgw8mhyxgmy3.jpeg?q=70",
      quantity: 3,
      price: 31,
      unit: "g",
      perUnit: 250,
      inStock: true
    }
  });

  const [amount, setAmount] = useState(0);
  const [cart, setCart] = useState({});
  const [showCartList, setShowCartList] = useState(false);

  function addToCart(itemID) {
    let newItem = Object.keys(cart).includes(itemID)
      ? { ...cart[itemID], quantity: cart[itemID].quantity + 1 }
      : { ...inventory[itemID], quantity: 1 };

    setCart({ ...cart, [itemID]: newItem });

    let inventoryItem = inventory[itemID];
    if (inventoryItem.quantity > 1)
      setInventory({
        ...inventory,
        [itemID]: { ...inventoryItem, quantity: inventoryItem.quantity - 1 }
      });
    else
      setInventory({
        ...inventory,
        [itemID]: { ...inventoryItem, quantity: "-", inStock: false }
      });
  }

  function checkInStock(itemID) {
    return inventory[itemID].quantity > 0;
  }

  function decreaseQuantity(itemID) {
    let quantityInCart = cart[itemID].quantity,
      quantityAvailable = inventory[itemID].quantity;

    if (quantityInCart === 1) {
      delete cart[itemID];
      setCart({ ...cart });
    } else
      setCart({
        ...cart,
        [itemID]: { ...cart[itemID], quantity: quantityInCart - 1 }
      });

    if (quantityInCart >= 1)
      setInventory({
        ...inventory,
        [itemID]: {
          ...inventory[itemID],
          quantity: (Number(quantityAvailable) || 0) + 1
        }
      });
  }

  function increaseQuantity(itemID) {
    let quantityInCart = cart[itemID].quantity,
      quantityAvailable = inventory[itemID].quantity;

    if (quantityAvailable > 0) {
      setCart({
        ...cart,
        [itemID]: { ...cart[itemID], quantity: quantityInCart + 1 }
      });
      if (quantityAvailable > 1)
        setInventory({
          ...inventory,
          [itemID]: { ...inventory[itemID], quantity: quantityAvailable - 1 }
        });
      else
        setInventory({
          ...inventory,
          [itemID]: { ...inventory[itemID], quantity: "-", inStock: false }
        });
    }
  }

  function computeTotalAmount() {
    let total = Object.keys(cart).reduce(
      (amount, itemID) => amount + cart[itemID].quantity * cart[itemID].price,
      0
    );
    setAmount(total);
  }

  useEffect(computeTotalAmount, [cart]);

  return (
    <div className="app shopping-cart">
      <h1 className="app--title">
        Shopping cart
        <img className="hero--icon" alt="" src={heroIcon} />
      </h1>
      <span className="cart--total-amount">{`Total amount: Rs. ${amount}`}</span>
      <div className="inventory card--list">
        {Object.keys(inventory).map((item) => (
          <div key={item} className="card--item">
            <div
              className={`card--stock ${
                checkInStock(item) ? "in-stock" : "no-stock"
              }`}
            >
              {checkInStock(item) ? "Hurry!" : "Out of stock"}
            </div>
            <img
              src={inventory[item].img}
              alt=""
              className="card--img card--field"
            />
            <p className="card--title">{inventory[item].name}</p>
            <p className="card--price card--field">
              Price:{" "}
              {`Rs. ${inventory[item].price}/ ${inventory[item].perUnit} ${inventory[item].unit}`}
            </p>
            <p className="card--quantity card--field">
              {inventory[item].quantity}
            </p>

            <button
              className="btn card--btn"
              disabled={!checkInStock(item)}
              onClick={() => addToCart(item)}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
      <button
        className="btn btn__primary btn__add-to-cart"
        onClick={() => setShowCartList(!showCartList)}
      >
        My Cart ({Object.keys(cart).length})
      </button>
      <div
        className="cart card--list"
        style={{ display: showCartList ? "flex" : "none" }}
      >
        {Object.keys(cart).map((item) => (
          <div key={item} className="card--item">
            <img
              src={inventory[item].img}
              alt=""
              className="card--img card--field"
            />
            <p className="card--title card--field">{cart[item].name}</p>
            <p className="card--price card--field">{`Price: Rs. ${
              cart[item].quantity * cart[item].price
            }`}</p>
            <p className="card--quantity card--field">
              Quantity:{" "}
              {`${cart[item].perUnit * cart[item].quantity} ${cart[item].unit}`}
            </p>
            <div className="cart--units-control">
              <button
                className="btn card--btn"
                disabled={cart[item].quantity <= 0}
                onClick={() => decreaseQuantity(item)}
              >
                -
              </button>
              <div className="card--units card--field">
                {cart[item].quantity}
              </div>
              <button
                className="btn card--btn"
                disabled={!checkInStock(item)}
                onClick={() => increaseQuantity(item)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}