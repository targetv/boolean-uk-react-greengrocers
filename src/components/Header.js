function Header({ shopItems, addToCart }) {
  return (
    <header id="store">
      <h1>Greengrocers</h1>
      <ul class="item-list store--item-list">
        {shopItems.map((item) => {
          return (
            <li>
              <div class="store--item-icon">
                <img src={`assets/icons/${item.id}.svg`} alt={item.id} />
              </div>
              <button onClick={() => addToCart(item)}>Add to cart</button>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
export default Header;
