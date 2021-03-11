import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./card.module.css";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import { FormControl } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//     margin: {
//       margin: theme.spacing(1),
//     },
//     extendedIcon: {
//       marginRight: theme.spacing(1),
//     },
//   }));
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    textAlign: "center"
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Card({ item, index,setEdited,columnCode }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [editButtonShow, setEditButtonShow] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editedItem, setEditedItem] = useState(item)

  const mouseEnter = () => {
    setEditButtonShow(true);
  };

  const mouseLeave = () => {
    setEditButtonShow(false);
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const editButtonClicked = (e, id) => {
    handleOpen();
  };

  const handleInput = (e) => {
    setEditedItem({
        id: item.id,
        content: e.target.value
    })
  };

  const editFormSubmit = (e) => {
      e.preventDefault();
      console.log(editedItem);
      setEdited(editedItem,columnCode);
      handleClose();


  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Edit your task</h2>
     <form onSubmit = {(e) => editFormSubmit(e)}>
     <input
            type="text"
            placeholder={item.content}
            value={editedItem.content}
            onChange={(e) => handleInput(e)}
            style={{
              "border-radius": "10px",
              "box-shadow": "0 0 5px #d8d8d8",
              "margin-top": "10px",
              "margin-bottom": "10px",
              "padding": "15px",
              "background-color": "white",
              "font-weight": "500",
            }}
          ></input>
          <br />
          <button
            style={{
              padding: "10px 20px 10px 20px",
              "background-color": "cadetblue",
              border: "none",
              "border-radius": "10px",
              color: "#ffffff",
            }}
            type="submit"
          >
            Submit
          </button>

     </form>

    </div>
  );

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <>
          <div
            className={styles.card}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onMouseEnter={(e) => mouseEnter()}
            onMouseLeave={(e) => mouseLeave()}
          >
            {item.content}
            {editButtonShow ? (
              <IconButton
                aria-label="delete"
                onClick={(e) => editButtonClicked(e, item.id)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            ) : null}
          </div>
          <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </>
      )}
    </Draggable>
  );
}

export default Card;
