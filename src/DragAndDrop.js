import React, { useState } from "react";
import "./DragAndDrop.css";

const DragAndDrop = () => {
  const [itemsContainer, setItemsContainer] = useState([
    [
      { id: 1, content: "Item 1" },
      { id: 2, content: "Item 2" },
      { id: 3, content: "Item 3" },
    ],
    [
      { id: 4, content: "Item 4" },
      { id: 5, content: "Item 5" },
      { id: 6, content: "Item 6" },
    ],
    [
      { id: 7, content: "Item 7" },
      { id: 8, content: "Item 8" },
      { id: 9, content: "Item 9" },
      { id: 10, content: "Item 10" },
    ],
  ]);
  const [selectedItem, setSelectedItem] = useState([-1, -1, null]); // [column Index, row Index, Dragged Item]

  const handleDragStart = (item, itemIndex, columnIndex) => {
    setSelectedItem([columnIndex, itemIndex, item]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index, columnIndex) => {
    const newItems = [...itemsContainer];
    newItems[selectedItem[0]].splice(selectedItem[1], 1);
    newItems[columnIndex] = [
      ...newItems[columnIndex].slice(0, index),
      selectedItem[2],
      ...newItems[columnIndex].slice(index),
    ];
    setItemsContainer(newItems);
    setSelectedItem(null);
  };

  const handleDropEnd = (columnIndex) => {
    const newItems = [...itemsContainer];
    newItems[selectedItem[0]].splice(selectedItem[1], 1);
    newItems[columnIndex].push(selectedItem[2]);
    console.log(newItems);
    setItemsContainer(newItems);
    setSelectedItem(null);
  };

  return (
    <div className="container-list">
      {itemsContainer.map((items, columnIndex) => (
        <div className="container" key={columnIndex}>
          {items.map((item, itemIndex) => (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item, itemIndex, columnIndex)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(itemIndex, columnIndex)}
              className="draggable-item"
            >
              {item.content}
            </div>
          ))}
          <div
            className="dropzone"
            onDragOver={handleDragOver}
            onDrop={() => handleDropEnd(columnIndex)}
          />
        </div>
      ))}
    </div>
  );
};

export default DragAndDrop;
