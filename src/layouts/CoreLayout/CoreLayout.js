import React from 'react'
import { Link } from 'react-router';
import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'
// import Login from '../../routes/Auth/containers/LoginContainer'

export const CoreLayout = ({ children }) => (
  <div className='container text-center'>
    <Header />
    <div className='core-layout__viewport'>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
