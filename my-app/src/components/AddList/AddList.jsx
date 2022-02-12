import React, { useEffect, useState } from "react";
import List from "../List";
import Badge from "../Badge";
import closeSvg from "../../assets/img/close.svg";
import axios from "axios";
import "./AddList.scss";

const AddList = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false); // для скрывания окна
  const [selectedColor, selectColor] = useState(3); // хранение выбранного цвета
  const [inputValue, setInputValue] = useState(""); // хранение введенного значения
  const [isLoading, setIsLoading] = useState(true); // флаг отпработки асинхронного запроса

  useEffect(() => {
    if (Array.isArray(colors)) {
      selectColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setVisiblePopup(false);
    selectColor(colors[0].id);
    setInputValue("");
  }; // функция для закрытия окна

  const addList = () => {
    if (!inputValue) {
      alert("Введите название списка");
      return;
    }
    setIsLoading(true);
    axios
      .post("http://localhost:3001/lists", {
        name: inputValue,
        color: selectedColor,
      })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === selectedColor)[0].name;
        const listObj = { ...data, color: { name: color } };
        onAdd(listObj);
        onClose();
      })
      .catch(() => {
        alert('Ошибка при добавлении списка')
      })
      .finally(() => {
        setIsLoading(false);
      })
  }; // Добавление категории, передача нового объекта на сервер и получение сформированного объекта, после этого передача данных в компонент App.js

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
          {
            className: "list__add-button",
            icon: (
              <svg
                width="10"
                height="10"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: "Добавить список",
          },
        ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <img
            className="add-list__popup-close-btn"
            src={closeSvg}
            alt=""
            onClick={onClose}
          />
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Название списка"
          />
          <div className="add-list__popup-colors">
            {colors.map((color) => (
              <Badge
                click={() => selectColor(color.id)}
                className={selectedColor === color.id && "active"}
                key={color.id}
                color={color.name}
              />
            ))}
          </div>

          <button disabled={isLoading} className="button" onClick={addList}>
            {isLoading ? "Добавление" : "Добавить список"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddList;
