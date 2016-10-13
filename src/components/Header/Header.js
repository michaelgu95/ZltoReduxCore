import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div>
    <h1>Zlato Mobi Site</h1>
    <IndexLink to='/' activeClassName='route--active'>
      Home
    </IndexLink>
    {' · '}
    <Link to='/categories' activeClassName='route--active'>
      Categories
    </Link>
    {' · '}
    <Link to='/impact' activeClassName='route--active'>
      Impact
    </Link>
  </div>
)

export default Header
