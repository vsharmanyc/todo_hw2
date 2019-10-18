import React, { Component } from 'react'

export class ListItemCard extends Component {
    render() {
        return (
            <div className='list_item_card'>
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                <div className= {this.props.listItem.completed ? ('list_item_card_completed') : ('list_item_card_not_completed')}>
                    {this.props.listItem.completed ?
                    (<strong>Completed</strong>) : (<strong>Pending</strong>)}
                </div>

                <div className="list_item_card_toolbar">
                    <img id="move_up" src="images/icons/MoveUp.png" onClick={this.props.moveUp.bind(this, this.props.listItem.key)}></img>
                    <img id="move_down" src="images/icons/MoveDown.png" onClick={this.props.moveDown.bind(this, this.props.listItem.key)}></img>
                    <img id="delete_item" src="images/icons/Close.png" onClick={this.props.deleteItem.bind(this, this.props.listItem.key)}></img>
                </div>
            </div>







        )
    }
}

export default ListItemCard
