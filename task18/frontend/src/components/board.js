import React, { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

const statuses = ["todo", "in-progress", "done"];

function Board() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then(res => setTasks(res.data));
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const updatedTasks = tasks.map(task =>
      task._id === result.draggableId
        ? { ...task, status: result.destination.droppableId }
        : task
    );
    setTasks(updatedTasks);
    axios.put(http://localhost:5000/tasks/${result.draggableId}, {
      status: result.destination.droppableId,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", justifyContent: "space-around", padding: "20px" }}>
        {statuses.map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ width: "30%", background: "#f4f4f4", padding: "10px", borderRadius: "5px" }}
              >
                <h3>{status.toUpperCase()}</h3>
                {tasks
                  .filter((task) => task.status === status)
                  .map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}

export default Board;