import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            todos: [],
            isLoading: false
        }
    }

    getStyle = () => {
        return {
            textAlign: 'left',
            background: '#F4F4F4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
        }
    };

    getTextStyle = () => {
        return {
            textDecoration: this.props.todo.completed ? 'line-through' : 'none',
            color: this.props.todo.completed ? '#808080' : '#000'
        }
    };

    render() {
        const { id, title, completed } = this.props.todo;
        return (
            <div style={ this.getStyle() } >
                <p>
                    <input type="checkbox" onChange={ this.props.markComplete.bind(this, id ) }
                           checked={ completed ? 'checked': '' }/>{' '} &nbsp;&nbsp;&nbsp;&nbsp;
                    <span style={ this.getTextStyle() } onClick={ this.props.markComplete.bind(this, id )}>{title}</span>
                    <button onClick={this.props.delTodo.bind(this, id)} style={{ float: 'right' }}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                    <button onClick={this.props.editTodo.bind(this, id)} style={{ float: 'right' }}>
                        <i className="fa fa-edit" aria-hidden="true"></i>
                    </button>
                </p>
            </div> );
    }
}

// PropTypes contraints
TodoItem.PropTypes = {
    todos: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
    //,editTodo: PropTypes.func.isRequired
}

export default TodoItem;