import { connect } from 'react-redux'
import { fetchItems, initiateTransaction } from '../modules/items'
import Items from '../components/Items'

const mapStateToProps = (state) => {
  const { itemsReducer } = state
  return {
    items: itemsReducer.items
  }
}

const mapDispatchToProps = {
    fetchItems,
    initiateTransaction
}

export default connect(mapStateToProps, mapDispatchToProps)(Items)
