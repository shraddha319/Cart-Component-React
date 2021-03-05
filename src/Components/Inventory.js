import { checkInStock } from "../Utility/index.js";

export default function Inventory({ inventory, setInventory, cart, setCart }) {
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

  return (
    <div className="inventory card--list">
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
