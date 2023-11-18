import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import './NavBar.css'

const NavBar = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">AboutMe</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;
