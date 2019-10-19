import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    render() {
        return (
            <div>
                <div id="todo_item" >
                <h3 id="item_heading">Item</h3>
                <div id="item_form_container">
                    <div id="item_description_prompt" className="item_prompt" >Description:</div>
                    <input id="item_description_textfield" className="item_input" type="input" name = "description" defaultValue = {this.props.dictionary.description}  
                    onChange = {this.props.addInfo}/>
                    <div id="item_assigned_to_prompt" className="item_prompt">Assigned To:</div>
                    <input id="item_assigned_to_textfield" className="item_input" type="input" name = "assignedTo" defaultValue = {this.props.dictionary.assigned}  
                    onChange = {this.props.addInfo}/>
                    <div id="item_due_date_prompt" className="item_prompt">Due Date:</div>
                    <input id="item_due_date_picker" className="item_input" type="date" name = "date" defaultValue = {this.props.dictionary.date}
                    onChange = {this.props.addInfo} />
                    <div id="item_completed_prompt" className="item_prompt">Completed:</div>
                    <input id="item_completed_checkbox" className="item_input" type="checkbox" name = "completed" defaultValue = {this.props.dictionary.completed}
                    onChange = {this.props.addInfo}/>
                </div>
                <button id="item_form_submit_button" className="item_button"
                    onClick= {this.props.submit}
                >Submit</button>
                <button id="item_form_cancel_button" className="item_button"
                    onClick = {this.props.cancel}
                >Cancel</button>
                </div>
            </div>
        )
    }
}

ItemScreen.propTypes = {
    currentScreen: PropTypes.string.isRequired,
    todoItem: PropTypes.object.isRequired
}

export default ItemScreen