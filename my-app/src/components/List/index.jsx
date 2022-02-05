import React from "react";
import classNames from "classnames";
import "./List.scss";
import removeSvg from "../../assets/img/remove.svg";

function List({ items, onClick, isRemovable, onRemove }) {
  console.log('1', items);
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
              <i className={`badge badge--${item.color.name}`}></i> // если icon есть отображаем его, если нет то color
            )}
          </i>
          <span onClick={onClick}> {item.name}</span> 
          {isRemovable && (<img onClick={onRemove} className="list__remove-icon" src={removeSvg} alt="Remove icon" /> )}
        </li>  
      ))}
    </ul>
  );
}

export default List;
