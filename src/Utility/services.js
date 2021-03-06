export { checkInStock, computeTotalAmount, computeTotalItems, isCartEmpty };

function checkInStock(itemID, inventory) {
  return inventory[itemID].quantity > 0;
}

function computeTotalAmount(cart) {
  let total = Object.keys(cart).reduce(
    (amount, itemID) => amount + cart[itemID].quantity * cart[itemID].price,
    0
  );
  return total;
}

function computeTotalItems(cart) {
  return Object.keys(cart).reduce(
    (total, item) => total + cart[item].quantity,
    0
  );
}

function isCartEmpty(cart) {
  return Object.keys(cart).length === 0;
}
