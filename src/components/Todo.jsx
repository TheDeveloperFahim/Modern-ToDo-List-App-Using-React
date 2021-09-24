import todo from "../img/to-do-list.png";
import { useState, useEffect } from "react";

// Get all items from local storage
function getItems() {
  const list = localStorage.getItem("lists");

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
}

export default function ToDo() {
  const [inputData, setInputData] = useState();
  const [items, setItems] = useState(getItems());

  // Add item to todo list
  function addItems() {
    if (!inputData) {
      alert("You can't add empty value");
    } else {
      setItems([...items, inputData]);
      setInputData("");
    }
  }

  // Delete item from todo list
  function deleteItems(id) {
    const deleteTask = items.filter((elem, index) => {
      return index !== id;
    });
    setItems(deleteTask);
  }

  // Remove all item from todo list
  const removeAll = () => setItems([]);

  // Add items to local storage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todo} alt="logo" />
            <figcaption>add your task</figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              placeholder="Enter Your Task"
              onChange={(e) => setInputData(e.target.value)}
              value={inputData}
            />
            <i className="bi bi-plus-lg add-btn" onClick={addItems} />
          </div>

          <div className="showItems">
            {items.map((element, index) => {
              return (
                <div className="eachItem" key={index}>
                  <h3>{element}</h3>
                  <i
                    className="bi bi-trash delete-btn"
                    onClick={() => deleteItems(index)}
                  />
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="remove all"
              onClick={removeAll}
            >
              <span>check lists</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
