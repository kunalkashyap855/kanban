import React from "react";
import { v4 as uuidv4 } from "uuid";

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: {
        id: "",
        content: "",
      },
    };
    this.handleInput = this.handleInput.bind(this);
    this.addItemChild = this.addItemChild.bind(this);
  }
  addItemChild = (e) => {
    e.preventDefault();
    if (this.state.currentItem.id !== "") {
      const revampedItem = [...this.props.initialList, this.state.currentItem];
      const revampedColumn = {
        ...this.props.columns,
        [Object.keys(this.props.columns).filter(
          (key) => this.props.columns[key].name === "Not Started"
        )]: {
          name: "Not Started",
          items: revampedItem,
        },
      };
      this.props.addItem(revampedItem, revampedColumn);
      this.setState({
        currentItem: {
          id: "",
          content: "",
        },
      });
    } else {
      alert("Please enter a valid task");
    }
  };

  handleInput = (e) => {
    this.setState({
      currentItem: {
        id: uuidv4(),
        content: e.target.value,
      },
    });
  };
  render() {
    return (
      <div>
        <form
          style={{ textAlign: "center" }}
          id="to-do-form"
          onSubmit={(e) => this.addItemChild(e)}
        >
          <input
            type="text"
            placeholder="Enter task"
            value={this.state.currentItem.content}
            onChange={(e) => this.handleInput(e)}
            style={{
              "border-radius": "10px",
              "box-shadow": "0 0 5px #d8d8d8",
              "margin-top": "10px",
              "margin-bottom": "10px",
              padding: "15px",
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
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default AddItem;
