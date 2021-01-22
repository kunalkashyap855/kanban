import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

// components
import Column from './column';

import styles from './board.module.css';

function Board() {
    const [notStartedList, setNotStartedList] = useState(
        [
            {'id': uuidv4(), 'content': 'This is a draggable card'},
            {'id': uuidv4(), 'content': 'This is another draggable card'},
            {'id': uuidv4(), 'content': 'Guess what? This is a draggable too!'},
        ]
    )

    const [columns, setColumns] = useState(
            {
                [uuidv4()]: {
                name: "Not Started",
                items: notStartedList
                },
                [uuidv4()]: {
                name: "In Progress",
                items: []
                },
                [uuidv4()]: {
                name: "In Review",
                items: []
                },
                [uuidv4()]: {
                name: "Completed",
                items: []
                }
            }
        )

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
            });
        }
    }

    return (
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
            <div className={styles.board}>
                {
                    Object.entries(columns).map(([columnId, col], index) => <Column key={columnId} id={columnId} title={col.name} list={col.items} />)
                }
            </div>
        </DragDropContext>
    )
}

export default Board;
