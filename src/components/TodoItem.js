import React, { useState } from 'react';
import styles from "./TodoItem.module.css";
import { FaTrash } from "react-icons/fa";

const TodoItem = (props) => {
  const completedStyle = {
    fontStyle: "italic",
    color: "#595959",
    opacity: 0.4,
    textDecoration: "line-through",
  }
  const [state, setEditing] = useState({editing: false,});
  const { completed, id, title } = props.todo;

  const handleEditing = () => {
    setEditing({
      editing: true,
    })
  }

  let viewMode = {}
  let editMode = {}

  if (state.editing) {
    viewMode.display = "none"
  } else {
    editMode.display = "none"
  }

  const handleUpdatedDone = event => {
    if (event.key === "Enter") {
      setEditing({ editing: false })
    }
  }
  return (
    <li className={styles.item}>
      <div onDoubleClick={handleEditing} style={viewMode}>
        <input type="checkbox" className={styles.checkbox} checked={completed} onChange={() => props.handleChangeProps(id)}/>
        <button onClick={() => props.deleteTodoProps(id)}>
          <FaTrash />
        </button>
        <span style={completed ? completedStyle : null}>
          {title}
        </span>
      </div>
      <input type="text" style={editMode} className={styles.textInput} value={title} onChange={e => { props.setUpdate(e.target.value, id) }} onKeyDown={handleUpdatedDone} />
    </li>
  );
}

export default TodoItem;