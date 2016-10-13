import React, { Component } from 'react'
import { Link } from 'react-router';
import functional from 'react-functional'

export const Transaction = (props) => (
  <ul style={{ margin: '0 auto' }} >
    <h1>Transaction Page</h1>
    <button className='btn btn-default'>Purchase</button>
    <button className='btn btn-default'>Cancel</button>
  </ul>
)

Transaction.componentWillMount = (props) => {
  props.fetchTransaction(props.params.partnerId)
}

Transaction.propTypes = {
  transactionResponse: React.PropTypes.object,
  fetchTransaction: React.PropTypes.func.isRequired
}

export default functional(Transaction)
