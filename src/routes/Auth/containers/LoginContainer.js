import { connect } from 'react-redux'
import { loginUser } from '../modules/login'
import Login from '../components/Login'

const mapStateToProps = (state) => {
  const { authReducer } = state
  return {
    userId: authReducer.userId
  }
}

const mapDispatchToProps = {
    loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
