import { connect } from 'react-redux'
import { fetchPartners } from '../modules/partners'
import Partners from '../components/Partners'

const mapStateToProps = (state) => {
  const { partnersReducer } = state
  return {
    partners: partnersReducer.partners
  }
}

const mapDispatchToProps = {
    fetchPartners
}

export default connect(mapStateToProps, mapDispatchToProps)(Partners)
