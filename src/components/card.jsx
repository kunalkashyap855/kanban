import React from 'react'
import { Draggable } from'react-beautiful-dnd';

import styles from './card.module.css';

function Card({ item, index }) {
    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided, snapshot) => (
                <div
                    className={styles.card}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    >
                        {item.content}
                </div>
            )}
        </Draggable>
    )
}

export default Card
