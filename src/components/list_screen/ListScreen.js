import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';

export class ListScreen extends Component {
    getListName() {
        if (this.props.todoList) {
            let name = this.props.todoList.name;
            return this.props.todoList.name;
        }
        else
            return "";
    }
    getListOwner() {
        if (this.props.todoList) {
            let owner = this.props.todoList.owner;
            return this.props.todoList.owner;
        }
    }
    textFieldChanged(){

    }
    render() {
        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash />
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input 
                            value={this.getListName()}
                            onChange = {this.props.nameChange}
                            type="text" 
                            name="name"
                            id="list_name_textfield" />
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            value={this.getListOwner()}
                            onChange = {this.props.nameChange}
                            type="text" 
                            name="owner"
                            id="list_owner_textfield" 
                            />
                    </div>
                </div>
                <ListItemsTable todoList={this.props.todoList} 
                    moveUp = {this.props.moveUp}
                    moveDown = {this.props.moveDown}
                    deleteItem = {this.props.deleteItem}/>
                <div className = 'list_item_add_card'>
                    <img src = 'images/icons/AddItem.png' width="50" height="50"
                    onClick = {this.props.addListItem}
                    />
                </div>
            </div>
        )
    }
}

export default ListScreen
