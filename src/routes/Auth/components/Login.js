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
      this.props.initiateLogin(values.idNumber, values.password);
    } else {
      this.setState({error: 'Please enter an email and password.'})
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.error === 'Invalid Username or Password') {
      this.setState({
        error: 'Invalid username or password.'
      })
    } else {
      this.setState({
        error: nextProps.user.error
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
  initiateLogin: React.PropTypes.func.isRequired
}

export default Login
