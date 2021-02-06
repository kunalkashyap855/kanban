import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

// components
import Card from './card';

import styles from './column.module.css';

function Column({ id, title, list }) {
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
                            {list.map((item, index) => <Card item={item} index={index} />)}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default Column
