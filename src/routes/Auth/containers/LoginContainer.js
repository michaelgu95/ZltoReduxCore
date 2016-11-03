import { connect } from 'react-redux'
import { loginUser } from '../modules/login'
import Login from '../components/Login'

const mapStateToProps = (state) => {
  const { authReducer } = state
  return {
    token: authReducer.token,
    userId: authReducer.userId,
    // isAuthenticated: authReducer.isAuthenticated,
    // isAuthenticating: authReducer.isAuthenticating,
    statusText: authReducer.statusText
  }
}

const mapDispatchToProps = {
    loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
