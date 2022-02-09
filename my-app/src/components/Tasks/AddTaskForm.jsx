import React, { useState } from "react";
import addSvg from "../../assets/img/add.svg";

const AddTaskForm = () => {
  const [visibleForm, setFormVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const toggleFormVisible = () => {
    setFormVisible(!visibleForm);
    setInputValue('');
  };

  const addTask = () => {
    // ....
    toggleFormVisible();
  }

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div onClick={toggleFormVisible} className="tasks__form-new">
          <img src={addSvg} alt="add icon" />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
            className="field"
            type="text"
            placeholder="Текст задачи"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button onClick={addTask} className="button">Добавить задачу</button>

          <button onClick={toggleFormVisible} className="button button--grey">
            Отмена
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
