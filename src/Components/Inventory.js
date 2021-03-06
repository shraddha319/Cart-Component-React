import { checkInStock } from "../Utility/index.js";

export default function Inventory({
  inventory,
  setInventory,
  cart,
  setCart,
  displayState
}) {
  function addToCart(itemID) {
    let newItem = Object.keys(cart).includes(itemID)
      ? { ...cart[itemID], quantity: cart[itemID].quantity + 1 }
      : { ...inventory[itemID], quantity: 1 };

    setCart({ ...cart, [itemID]: newItem });

    let inventoryItem = inventory[itemID];
    if (inventoryItem.quantity > 0)
      setInventory({
        ...inventory,
        [itemID]: { ...inventoryItem, quantity: inventoryItem.quantity - 1 }
      });
  }

  return (
    <div
      className="inventory card--list"
      style={{ display: displayState === "inventory" ? "flex" : "none" }}
    >
      {Object.keys(inventory).map((item) => (
        <div key={item} className="card--item">
          <div
            className={`card--stock ${
              checkInStock(item, inventory) ? "in-stock" : "no-stock"
            }`}
          >
            {checkInStock(item, inventory) ? "Hurry!" : "Out of stock"}
          </div>
          <img
            src={inventory[item].img}
            alt=""
            className={`card--img card--field ${
              !checkInStock(item, inventory) ? "img--no-stock" : "img--in-stock"
            }`}
          />
          <p className="card--title">{inventory[item].name}</p>
          <p className="card--price card--field">
            Price:{" "}
            {`Rs. ${inventory[item].price}/ ${inventory[item].perUnit} ${inventory[item].unit}`}
          </p>
          <p
            className="card--quantity card--field"
            style={{
              color: checkInStock(item, inventory) ? "#d81a1a" : "black"
            }}
          >
            {checkInStock(item, inventory)
              ? `Only ${inventory[item].quantity} left in stock!`
              : "-"}
          </p>

          <button
            className="btn card--btn"
            disabled={!checkInStock(item, inventory)}
            onClick={() => addToCart(item)}
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}
