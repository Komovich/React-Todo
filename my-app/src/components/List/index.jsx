import React from "react";
import classNames from "classnames";
import "./List.scss";
import removeSvg from "../../assets/img/remove.svg";
import axios from "axios";

function List({ items, onClick, isRemovable, onRemove }) {
  const removeList = (item) => {
    console.log(item);
    if (window.confirm("Вы действительно хотите удалить список?")) {
      axios.delete('http://localhost:3001/lists/' + item).then(() => {
        onRemove(item);
      });
    }
  };

  return (
    <ul className="list">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, { active: item.active })} // если item.active true, отрабатывает className=active
        >
          <i>
            {item.icon ? (
              item.icon
            ) : (
              <i className={`badge badge--${item.color}`}></i> // если icon есть отображаем его, если нет то color
            )}
          </i>
          <span onClick={onClick}> {item.name}</span>
          {isRemovable && (
            <img
              onClick={() => removeList(item.id)}
              className="list__remove-icon"
              src={removeSvg}
              alt="Remove icon"
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default List;
