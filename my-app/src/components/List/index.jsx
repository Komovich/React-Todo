import React from "react";
import classNames from "classnames";
import "./List.scss";

function List({ items, onClick }) {

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
        </li>
      ))}
    </ul>
  );
}

export default List;
