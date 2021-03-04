import "./styles.css";
import { useState } from "react";

export default function App() {
  const [inventory, setInventory] = useState({
    ITEM01: {
      name: "potato",
      quantity: 3,
      price: 58,
      unit: "kg",
      perUnit: 1,
      inStock: true
    },
    ITEM02: {
      name: "bread",
      quantity: 5,
      price: 87,
      unit: "gm",
      perUnit: 100,
      inStock: true
    },
    ITEM03: {
      name: "milk",
      quantity: 2,
      price: 25.5,
      unit: "L",
      perUnit: 1,
      inStock: true
    }
  });

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

  return (
    <div className="App">
      <h1>Shopping cart</h1>
      <div className="inventory">
        {Object.keys(inventory).map((item) => (
          <div key={item} className="inventory-item">
            <h3>{inventory[item].name}</h3>
            <p>
              Price:{" "}
              {`Rs. ${inventory[item].price}/ ${inventory[item].perUnit} ${inventory[item].unit}`}
            </p>
            <p>{inventory[item].quantity}</p>
            <div className={checkInStock(item) ? "in-stock" : "no-stock"}>
              {checkInStock(item) ? "In Stock!" : "Out of stock"}
            </div>
            <button
              disabled={!checkInStock(item)}
              onClick={() => addToCart(item)}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
      <button onClick={() => setShowCartList(!showCartList)}>My Cart</button>
      <div style={{ display: showCartList ? "flex" : "none" }} className="cart">
        {Object.keys(cart).map((item) => (
          <div key={item} className="cart-item">
            <h3>{cart[item].name}</h3>
            <p>{`Price: Rs. ${cart[item].quantity * cart[item].price}`}</p>
            <p>
              Quantity:{" "}
              {`${cart[item].perUnit * cart[item].quantity} ${cart[item].unit}`}
            </p>
            <button
              disabled={cart[item].quantity <= 0}
              onClick={() => decreaseQuantity(item)}
            >
              -
            </button>
            <span> Num: {cart[item].quantity} </span>
            <button
              disabled={!checkInStock(item)}
              onClick={() => increaseQuantity(item)}
            >
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/*
total price
button for cart - when clicked only then display cartlist
*/
