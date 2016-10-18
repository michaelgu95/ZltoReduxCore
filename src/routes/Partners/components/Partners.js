import React, { Component } from 'react'
import { Link } from 'react-router';
import functional from 'react-functional'

export const Partners = (props) => (
  <ul style={{ margin: '0 auto' }} >
    {props.partners.map(p => 
      <Link to={`/items/${p.id}`}>
        <li className='btn btn-default'>{p.name}{' '}</li>
      </Link>)}
  </ul>
)

Partners.componentWillMount = (props) => {
  props.fetchPartners(props.params.categoryId)
}

Partners.propTypes = {
  partners: React.PropTypes.array,
  fetchPartners: React.PropTypes.func.isRequired
}

export default functional(Partners)
