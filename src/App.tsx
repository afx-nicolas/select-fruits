import React, { useState } from 'react';

import './App.css';
import FruitList from './components/FruitList/FruitList';

import MainForm from './components/MainForm/MainForm';

import { OptionsTypes } from './utils/Options';

export default function App() {
  const [fruitsBag, setFruitsBag] = useState<OptionsTypes[]>([]);

  const handleBagAdd = (addedFruits: OptionsTypes[]) => {
    const filteredBagFruits = addedFruits.filter(
      (fruit) => !fruitsBag.includes(fruit)
    );
    setFruitsBag([...fruitsBag, ...filteredBagFruits]);
  };

  const handleBagClear = () => setFruitsBag([]);

  return (
    <div className="App">
      <MainForm fruitsBag={fruitsBag} onSendFruitsToBag={handleBagAdd} />
      <FruitList fruitsBag={fruitsBag} onCleanFruitsBag={handleBagClear} />
    </div>
  );
}
