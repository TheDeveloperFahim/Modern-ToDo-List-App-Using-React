import { useState, useEffect } from "react";
import todo from "../img/to-do-list.png";

// Get item from local storage
function getLocalItems() {
  const list = localStorage.getItem("lists");

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
}

export default function Demo() {
  const [inputData, setInputData] = useState();
  const [items, setItems] = useState(getLocalItems());

  // Add items function
  function addItem() {
    if (!inputData) {
      alert("You can't add empty value");
    } else {
      setItems([...items, inputData]);
      setInputData("");
    }
  }

  // delete items function
  function deleteItem(id) {
    const deleteItem = items.filter((elem, index) => {
      return index !== id;
    });
    setItems(deleteItem);
  }

  // remove all items function
  const removeAll = () => setItems([]);

  // add item to local storage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  });

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
              placeholder="Add your task ..."
              onChange={(e) => setInputData(e.target.value)}
              value={inputData}
            />
            <i className="bi bi-plus-lg add-btn" onClick={addItem} />
          </div>

          <div className="showItems">
            {items.map((element, index) => {
              return (
                <div className="eachItem" key={index}>
                  <h3>{element}</h3>
                  <i
                    className="bi bi-trash deleteBtn"
                    onClick={() => deleteItem(index)}
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
