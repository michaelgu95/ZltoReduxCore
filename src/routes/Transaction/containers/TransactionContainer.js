import { connect } from 'react-redux'
import { fetchTransaction } from '../modules/transaction'
import Transaction from '../components/Transaction'

const mapStateToProps = (state) => {
  const { transactionReducer } = state
  return {
    transaction: transactionReducer.transactionResponse
  }
}

const mapDispatchToProps = {
    fetchTransaction
}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction)
