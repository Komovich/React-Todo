import React, { useState } from "react";
import List from "../List";
import Badge from "../Badge";
import closeSvg from "../../assets/img/close.svg"
import "./AddList.scss";

const AddList = ({ colors }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, selectColor] = useState(colors[0].id);

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
          <img className="add-list__popup-close-btn" src={closeSvg} alt="" onClick={() => setVisiblePopup(false)} />
          <input className="field" type="text" placeholder="Название списка" />
          <div className="add-list__popup-colors">
            {colors.map((color) => (
              <Badge click={() => selectColor(color.id)} className={selectedColor === color.id && "active"} key={color.id} color={color.name} />
            ))}
            
          </div>
          
          <button className="button">Добавить</button>
        </div>
      )}
    </div>
  );
};

export default AddList;
