function Main({ shopItems, cartItems, addToCart, removeCart }) {
  function cartTotal() {
    let totalCost = 0;

    cartItems.map((item) => {
      const foundItem = shopItems.find((storeItem) => storeItem.id === item.id);
      totalCost += foundItem.price * item.quantity;
    });

    return totalCost;
  }
  return (
    <main id="cart">
      <h2>Your Cart</h2>
      <div class="cart--item-list-container">
        <ul class="item-list cart--item-list">
          {cartItems.map((item) => {
            const foundItem = shopItems.find(
              (storeItem) => storeItem.id === item.id
            );

            return (
              <li>
                <img
                  class="cart--item-icon"
                  src={`assets/icons/${foundItem.id}.svg`}
                  alt={foundItem.id}
                />
                <p>{foundItem.name}</p>
                <button
                  class="quantity-btn remove-btn center"
                  onClick={() => removeCart(item)}
                >
                  -
                </button>
                <span class="quantity-text center">{item.quantity}</span>
                <button
                  class="quantity-btn add-btn center"
                  onClick={() => addToCart(item)}
                >
                  +
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div class="total-section">
        <div>
          <h3>Total</h3>
        </div>
        <div>
          <span class="total-number">{`£${cartTotal().toFixed(2)}`}</span>
        </div>
      </div>
    </main>
  );
}
export default Main;
