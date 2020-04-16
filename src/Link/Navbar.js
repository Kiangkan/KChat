import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = props => 
    <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/about">About</Link>
        </li>
        <li>
            <Link to="/topics">Topics</Link>
        </li>
        <li>
            <Link to="apps">Apps</Link>
        </li>
    </ul>

export default Navbar