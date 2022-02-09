import React from "react";
import axios from "axios";
import editSvg from "../../assets/img/edit.svg";
import "./Tasks.scss";
import AddTaskForm from "./AddTaskForm";

const Tasks = ({ list, onEditTitle }) => {
  const editTitle = () => {
    const newTitle = window.prompt("название списка", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);

      axios
        .patch("http://localhost:3001/lists/" + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert("Не удалось обновить название списка");
        });
    }
  }; // Функция для редактирования категорий (передаём ID объекта в App.js для добавления в стейт и изменяет объект на сервере с помощью Axios)

  return (
    <div className="tasks">
      <h2 className="tasks__title">
        {list.name}
        <img onClick={editTitle} src={editSvg} alt="Edit icon" />
      </h2>

      <div className="tasks__items">
        {!list.tasks.length && <h2>Задачи отсутствуют</h2>}

        {list.tasks.map((task) => (
          <div key={task.id} className="tasks__items-row">
            <div className="checkbox">
              <input id={`task-${task.id}`} type="checkbox" />
              <label htmlFor={`task-${task.id}`}>
                <svg // в input id="check" передается в htmlFor="check", таким образом нажимая на инпут изменяються label
                  width="11"
                  height="8"
                  viewBox="0 0 11 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                    stroke="#000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>
            </div>

            <input value={task.text} />
          </div>
        ))}

        <AddTaskForm />
      </div>
    </div>
  );
};

export default Tasks;
