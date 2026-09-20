import { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  if (showProductList) {
    return <ProductList onHomeClick={() => setShowProductList(false)} />;
  }

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Paradise Nursery</h1>
        <p>Where Green Meets Serenity</p>
        <button className="get-started-btn" onClick={() => setShowProductList(true)}>
          Get Started
        </button>
      </div>
      <div className="about-us-container">
        <AboutUs />
      </div>
    </div>
  );
}

export default App;