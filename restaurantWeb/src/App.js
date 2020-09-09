import React from 'react';
import { Routes, Route } from 'react-router'

import firebase, { FirebaseContext } from './firebase';
import Orders from './components/pages/Orders'
import Menu from './components/pages/Menu'
import NewPlate from './components/pages/NewPlate'
import Sidebar from './components/ui/Sidebar'
import PastOrders from './components/pages/PastOrders';

function App() {
  return (
    <FirebaseContext.Provider
      value={{ firebase }}
    >
      <div className="md: flex min-h-screen">
        <Sidebar />

        <div className="md:w-3/5 xl:w-4/5 p-6">
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/pastorders" element={<PastOrders />} />
            <Route path="/newplate" element={<NewPlate />} />

          </Routes>
        </div>

      </div>
    </FirebaseContext.Provider>
  );
}

export default App;
