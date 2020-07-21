import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addTodo } from './actions'
import classnames from 'classnames'
import PropTypes from 'prop-types'


const AddTodo = (props) => {
    const { dispatch } = props;
    let [state, setState] = useState({ text: props.text || '' });

    const handleSubmit = e => {
        const text = e.target.value.trim()
        if (e.which === 13) {
            props.onSave(text)
            if (props.newTodo) {
                setState({ text: '' })
            }
        }
    }

    const handleChange = e => {
        setState({ text: e.target.value })
    }

    const handleBlur = e => {
        if (!props.newTodo) {
            props.onSave(e.target.value)
        }
    }

    return (
        <input className={
            classnames({
                edit: props.editing,
                'new-todo': props.newTodo
            })}
            type="text"
            placeholder={props.placeholder}
            autoFocus={true}
            value={state.text}
            onBlur={handleBlur}
            onChange={handleChange}
            onKeyDown={handleSubmit} />
    )
}
AddTodo.propTypes = {
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    editing: PropTypes.bool,
    newTodo: PropTypes.bool
}


const Header = ({ addTodo }) => {
    const onSave = (text) => {
        if (text.length !== 0) {
            addTodo(text)
        }
    };
    return (
        <header className="header">
            <h1>todos</h1>
            <AddTodo
                newTodo
                onSave={onSave}
                placeholder="What needs to be done?"
            />
        </header>
    )
}
Header.propTypes = {
    addTodo: PropTypes.func.isRequired
}


// if not defined mapDispatchToProps, then the component would have a dispatch prop
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(TodoList)
export default connect(null, { addTodo })(Header)
