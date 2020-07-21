import React from 'react'
import PropTypes from 'prop-types'
import { VisibilityFilters, setVisibilityFilter } from './actions'
import { connect } from 'react-redux'

const Link = ({ active, children, onClick }) => (
    <button
        onClick={onClick}
        disabled={active}
        style={{
            marginLeft: '4px',
        }}
    >
        {children}
    </button>
)
Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
    active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
})

const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link)



const Footer = () => (
    <div>
        <span>Show: </span>
        <FilterLink filter={VisibilityFilters.SHOW_ALL}>
            All
    </FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
            Active
    </FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
            Completed
    </FilterLink>
    </div>
)

export default Footer
