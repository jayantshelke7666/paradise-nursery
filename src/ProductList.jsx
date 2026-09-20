import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: 'https://picsum.photos/seed/snakeplant/300/300', description: 'Produces oxygen at night', cost: 15 },
      { name: 'Spider Plant', image: 'https://picsum.photos/seed/spiderplant/300/300', description: 'Filters formaldehyde and xylene', cost: 12 },
      { name: 'Peace Lily', image: 'https://picsum.photos/seed/peacelily/300/300', description: 'Removes mold spores', cost: 18 },
      { name: 'Boston Fern', image: 'https://picsum.photos/seed/bostonfern/300/300', description: 'Adds humidity to the air', cost: 20 },
      { name: 'Rubber Plant', image: 'https://picsum.photos/seed/rubberplant/300/300', description: 'Absorbs airborne toxins', cost: 17 },
      { name: 'Aloe Vera', image: 'https://picsum.photos/seed/aloevera/300/300', description: 'Purifies air and soothes burns', cost: 14 },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: 'https://picsum.photos/seed/lavender/300/300', description: 'Calming scent', cost: 20 },
      { name: 'Jasmine', image: 'https://picsum.photos/seed/jasmine/300/300', description: 'Sweet floral fragrance', cost: 18 },
      { name: 'Rosemary', image: 'https://picsum.photos/seed/rosemary/300/300', description: 'Fresh herbal aroma', cost: 15 },
      { name: 'Mint', image: 'https://picsum.photos/seed/mintplant/300/300', description: 'Refreshing and easy to grow', cost: 12 },
      { name: 'Lemon Balm', image: 'https://picsum.photos/seed/lemonbalm/300/300', description: 'Citrus scent that repels insects', cost: 14 },
      { name: 'Gardenia', image: 'https://picsum.photos/seed/gardenia/300/300', description: 'Rich, creamy blossoms', cost: 22 },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'ZZ Plant', image: 'https://picsum.photos/seed/zzplant/300/300', description: 'Thrives on neglect', cost: 25 },
      { name: 'Pothos', image: 'https://picsum.photos/seed/pothos/300/300', description: 'Grows in low light', cost: 10 },
      { name: 'Cast Iron Plant', image: 'https://picsum.photos/seed/castiron/300/300', description: 'Nearly indestructible', cost: 19 },
      { name: 'Jade Plant', image: 'https://picsum.photos/seed/jadeplant/300/300', description: 'Stores water in its leaves', cost: 13 },
      { name: 'Succulent Mix', image: 'https://picsum.photos/seed/succulent/300/300', description: 'Needs little watering', cost: 16 },
      { name: 'Money Tree', image: 'https://picsum.photos/seed/moneytree/300/300', description: 'Adapts to most indoor light', cost: 24 },
    ],
  },
];

const ProductList = ({ onHomeClick }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isInCart = name => cartItems.some(item => item.name === name);

  const handleAddToCart = plant => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      <nav className="navbar">
        <div>
          <a onClick={onHomeClick}>Home</a>
          <a onClick={() => setShowCart(false)}>Plants</a>
          <a onClick={() => setShowCart(true)}>Cart</a>
        </div>
        <div className="cart-icon" onClick={() => setShowCart(true)}>
          🛒<span className="cart-count">{totalItems}</span>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        plantsArray.map(group => (
          <section key={group.category}>
            <h2 className="category-title">{group.category}</h2>
            <div className="product-grid">
              {group.plants.map(plant => (
                <div className="product-card" key={plant.name}>
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p>{plant.description}</p>
                  <p><strong>${plant.cost}</strong></p>
                  <button
                    className="add-btn"
                    disabled={isInCart(plant.name)}
                    onClick={() => handleAddToCart(plant)}
                  >
                    {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
};

export default ProductList;