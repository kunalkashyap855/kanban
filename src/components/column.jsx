import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

// components
import Card from './card';

import styles from './column.module.css';

function Column({ id, title, list,setEditedBoard }) {
    const setEdited = (editedItem,columnKey) => {
        var index;
         list.findIndex(function (entry, i) { 
            if (entry.id == editedItem.id) { 
                index = i; 
                return true; 
            } 
        }); 
    var editedList = list;
    editedList[index] = editedItem;
   setEditedBoard(columnKey,editedList)
    
}


    return (
        <div className={styles.column}>
            <div className={styles.column__title} style={{ color: title === "Not Started" ? 'gray' : title === "In Progress" ? 'royalblue' : title === "In Review" ? 'orange' : 'limegreen'}}>
                {title}
            </div>
            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <div className={styles.column__cardArea}
                        ref={provided.innerRef}
                        style={{ backgroundColor: snapshot.isDraggingOver ? 'rgba(255, 69, 0, 0.1)' : 'white' }}
                        {...provided.droppableProps}>
                            {list.map((item, index) => <Card setEdited={setEdited} columnCode={id} key={item.id} item={item} index={index} />)}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default Column
