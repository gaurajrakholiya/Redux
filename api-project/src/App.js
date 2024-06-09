import React from 'react';

import './App.css';
import { Products } from './features/products/Products';
import { Cart } from './features/cart/Cart';

function App() {
  return (
    <div className="App">
      
      {/* <button onClick={()=>setShowCart(!showCart)}>Cart [ {items.length} ]</button>
          {showCart ? <Cart></Cart> : } */}
          <Cart></Cart>
          <Products></Products>
    </div>
  );
}

export default App;
