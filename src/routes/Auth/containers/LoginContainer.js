import { connect } from 'react-redux'
import { initiateLogin } from '../modules/login'
import Login from '../components/Login'

const mapStateToProps = (state) => {
  const { loginReducer } = state
  return {
    user: loginReducer.user
  }
}

const mapDispatchToProps = {
    initiateLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
