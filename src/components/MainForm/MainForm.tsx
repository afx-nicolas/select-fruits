import React, { useState } from 'react';

import './MainForm.css';

import { Options, OptionsTypes } from '../../utils/Options';

interface MainFormProps {
  onSendFruitsToBag: (addedFruits: OptionsTypes[]) => void;
  fruitsBag: OptionsTypes[];
}

export default function MainForm({
  fruitsBag,
  onSendFruitsToBag,
}: MainFormProps) {
  const [selected, setSelected] = useState<OptionsTypes | ''>('');
  const [selectedFruits, setSelectedFruits] = useState<OptionsTypes[]>([]);

  const sendFruitsButtonValidation =
    selectedFruits.length < 2 && fruitsBag.length < 2;

  const onSelectFruit = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelected(e.target.value as OptionsTypes);

  const handleFruitAdd = () => {
    if (selected !== '') {
      const isFruitSelected = selectedFruits.find(
        (fruit) => fruit === selected
      );
      !isFruitSelected && setSelectedFruits([...selectedFruits, selected]);
      setSelected('');
    }
  };

  const handleFruitRemove = (fruit: string) => {
    const filteredSelectedFruits = selectedFruits.filter((el) => el !== fruit);
    setSelectedFruits(filteredSelectedFruits);
  };

  const handleSendFruits = () => {
    onSendFruitsToBag(selectedFruits);
    setSelectedFruits([]);
  };

  return (
    <div className="MainForm">
      <h1>Bem vindo à Feira de frutas</h1>
      <div className="FruitSelect-wrapper">
        <div className="FruitSelect">
          <label htmlFor="fruits">
            Escolha suas frutas preferidas:
            <span style={{ color: '#FF4848' }}>*</span>
          </label>
          <div className="actions">
            <select
              name="fruits"
              id="fruits"
              value={selected}
              onChange={onSelectFruit}
            >
              <option disabled value="">
                Selecione...
              </option>
              {Object.entries(Options).map(([value, text]) => {
                const isAlredySelected = selectedFruits.includes(
                  value as OptionsTypes
                );
                const isAlredyInBag = fruitsBag.includes(value as OptionsTypes);
                return (
                  <option
                    key={value}
                    value={value}
                    disabled={isAlredySelected || isAlredyInBag ? true : false}
                  >
                    {text}
                  </option>
                );
              })}
            </select>
            <button
              type="button"
              id="add"
              disabled={!selected}
              onClick={handleFruitAdd}
            >
              +
            </button>
          </div>
        </div>
        <div className="SelectedFruits">
          {selectedFruits.map((fruit) => (
            <div key={`selected_${fruit}`} className="SelectedFruit">
              <select disabled className="fruit" name="fruit">
                <option value={fruit}>{Options[fruit as OptionsTypes]}</option>
              </select>
              <button
                type="button"
                className="remove"
                onClick={() => handleFruitRemove(fruit)}
              >
                +
              </button>
            </div>
          ))}
        </div>
      </div>
      <button
        id="SendFruitsToBag"
        type="button"
        disabled={sendFruitsButtonValidation}
        title={sendFruitsButtonValidation ? 'Adicione ao menos 2 frutas' : ''}
        onClick={handleSendFruits}
      >
        Enviar frutas para a sacola
      </button>
    </div>
  );
}
