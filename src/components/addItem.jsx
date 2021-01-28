import React, {useState} from 'react';
import styles from './addItem.module.css';

function AddItem({handleAddItem, handleNewTaskInput}) {
     
    const [input] = useState('')

    const handleSubmit = (e) =>{
        e.preventDefault()
        handleAddItem(input)
        document.getElementById("addNewTaskForm").reset()
    }

    const handleInputChange = (e) => {
        e.preventDefault()
        handleNewTaskInput(e.target.value)
    }

    return (
        <div className={styles.container}>
            <form id="addNewTaskForm" onSubmit={handleSubmit}>   
                <textarea placeholder="Create new task" onChange={handleInputChange} className={styles.textarea} required></textarea>
                <button type="submit" className={styles.btn}>Add to board</button>
            </form>
        </div>
    )
}

export default AddItem
