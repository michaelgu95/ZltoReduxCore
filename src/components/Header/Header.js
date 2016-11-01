import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div>
    <h1>Zlato Mobi Site</h1>
    <Link to='/categories' activeClassName='route--active'>
      Purchase
    </Link>
    {' · '}
    <Link to='/earn' activeClassName='route--active'>
      Earn
    </Link>
    {' · '}
    <Link to='/impact' activeClassName='route--active'>
      Impact
    </Link>
  </div>
)

export default Header
