import React from 'react';

import './FruitList.css';

import { Options, OptionsTypes } from '../../utils/Options';

interface FruitListProps {
  fruitsBag: OptionsTypes[];
  onCleanFruitsBag: () => void;
}

export default function FruitList({
  fruitsBag,
  onCleanFruitsBag,
}: FruitListProps) {
  return (
    <div className="FruitList">
      <h2>Minha Sacola de Frutas</h2>
      <div className="horizontalRow" />
      {fruitsBag.length ? (
        <ul>
          {fruitsBag.map((fruit) => (
            <li key={fruit}>{Options[fruit]}</li>
          ))}
        </ul>
      ) : (
        <div>
          <h3>Sem items na sacola</h3>
        </div>
      )}
      <button
        type="button"
        id="ClearFruitBag"
        disabled={!fruitsBag.length}
        onClick={onCleanFruitsBag}
        title={!fruitsBag.length ? 'A sacola já está vázia' : ''}
      >
        Limpar Sacola
      </button>
    </div>
  );
}
