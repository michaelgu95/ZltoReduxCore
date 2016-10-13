import React, { Component } from 'react'
import { Link } from 'react-router';
import functional from 'react-functional'

export const Items = (props) => (
  <ul style={{ margin: '0 auto' }} >
    {props.items.map(item => <Link to={`/transaction/${item.id}`}><li className='btn btn-default'><h1>{item.name}</h1><p>{`${item.zlato_amount} Zlato`}</p><p>{`${item.count} Available`}</p></li></Link>)}
  </ul>
)

Items.componentWillMount = (props) => {
  props.fetchItems(props.params.partnerId)
}

Items.propTypes = {
  items: React.PropTypes.array,
  fetchItems: React.PropTypes.func.isRequired
}

export default functional(Items)
