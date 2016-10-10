import React, { Component } from 'react'
import { Link } from 'react-router';
import functional from 'react-functional'

export const Categories = (props) => (
  <ul style={{ margin: '0 auto' }} >
    {props.categories.map(cat => <Link to={`/partners/${cat.id}`}><li className='btn btn-default'>{cat.name}{' '}</li></Link>)}
  </ul>
)

Categories.componentWillMount = (props) => {
  props.fetchCategories()
}

Categories.propTypes = {
  categories: React.PropTypes.array,
  fetchCategories: React.PropTypes.func.isRequired
}

export default functional(Categories)
