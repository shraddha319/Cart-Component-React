export default function Cart({
  cart,
  setCart,
  inventory,
  setInventory,
  checkInStock
}) {
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
    <div
      className="cart card--list"
      /* style={{ display: showCartList ? "flex" : "none" }} */
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
            <div className="card--units card--field">{cart[item].quantity}</div>
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
  );
}
