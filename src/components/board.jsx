import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import AddItem from './addItem';

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

    const [newTask, setNewTask] = useState('')

    const [columns, setColumns] = useState(
            {
                notStarted: {
                    id: uuidv4(),
                    name: "Not Started",
                    items: notStartedList
                },
                inProgress: {
                    id: uuidv4(),
                    name: "In Progress",
                    items: []
                },
                inReview: {
                    id: uuidv4(),
                    name: "In Review",
                    items: []
                },
                completed: {
                    id: uuidv4(),
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
            
            // if destination column is not 'not started', remove item from notstartedlist
            if(destColumn.name !== 'Not Started'){
                // when item moved, remove from not started list
                setNotStartedList(notStartedList.filter(task => task.id !== removed.id))
            }
           
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


    // Update list of not started items when new task is added
    useEffect(() => {
        setColumns({
            ...columns, 
            notStarted: {
                ...columns.notStarted,
                items: notStartedList
            }})
    }, [notStartedList])

    // Create a new task object
    const handleNewTaskInput = (taskContent) => {
        setNewTask({
            'id': uuidv4(),
            'content': taskContent
        })
    }

    // Add new task to list of not started items
    const handleAddItem = () => {
        setNotStartedList(notStartedList => [...notStartedList, newTask])
    }

    return (
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
            <div className={styles.overallContainer}>
                <div className={styles.sidebar}>
                    <AddItem handleAddItem={handleAddItem} handleNewTaskInput={handleNewTaskInput}></AddItem>
                </div>
                <div className={styles.board}>
                    {
                        Object.entries(columns).map(([columnId, col], index) => 
                        <Column key={columnId} id={columnId} title={col.name} list={col.items} 
                        />)
                    }
                </div>
            </div>
        </DragDropContext>
    )
}

export default Board;
