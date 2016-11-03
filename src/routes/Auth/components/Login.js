import React, { Component } from 'react'
import { Link } from 'react-router'
import LoginModal from '../../../components/Modals/LoginModal'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    }
  }
  handleSubmit(values) {
    if (values.idNumber && values.password) {
      this.props.loginUser(values.idNumber, values.password, this.props.location.query.redirect);
    } else {
      this.setState({error: 'Please enter an email and password.'})
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.statusText && nextProps.statusText.includes('Authentication Error')) {
      this.setState({
        error: 'Invalid username or password.'
      })
    } 
  }
  render() {
    return (
      <div>
        <LoginModal onSubmit={this.handleSubmit.bind(this)} />
        {this.state.error ? <h3>{this.state.error}</h3> : null}
      </div>
    )
  }
}

Login.propTypes = {
  user: React.PropTypes.object,
  loginUser: React.PropTypes.func.isRequired,
  token: React.PropTypes.string,
  userId: React.PropTypes.number,
  // isAuthenticated: React.PropTypes.bool,
  // isAuthenticating: React.PropTypes.bool,
  statusText: React.PropTypes.string
}

export default Login
