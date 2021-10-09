import React, { useState } from 'react';
import AppState from './context/AppState';
import Layout from './components/Layout';
import Listing from './pages/Listing';
import Sidebar from './components/Sidebar';

const App = () => {
  const [showCart, setShowCart] = useState(false);

  return (
    <AppState>
      <Layout setShowCart={setShowCart}>
        <Listing setShowCart={setShowCart} />
        {showCart && <Sidebar showCart={showCart} setShowCart={setShowCart} />}
      </Layout>
    </AppState>
  );
};

export default App;
