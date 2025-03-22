import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Buscar from './components/Buscar';
import Debitos from './components/Debitos';
import PagamentoPix from './components/PagamentoPix';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buscar" element={<Buscar />} />
        <Route path="/debitos" element={<Debitos />} />
        <Route path="/pagamento-pix" element={<PagamentoPix />} />
      </Routes>
    </div>
  );
}

export default App;