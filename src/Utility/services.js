export { checkInStock, computeTotalAmount };

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
