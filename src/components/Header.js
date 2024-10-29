import React from 'react';
import './header.css';

export default ({black}) => {
    return(
            <header className={black ? 'black': ''}>
                <div className='header--logo'>
                    < a href='/'>
                        <img src="https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png?w=700&h=456"></img>
                    </a>
                </div>
                <div className="header--user">
                    <a href='/'>
                        <img src="https://i.pinimg.com/474x/0c/91/71/0c9171ce965fb4ec175c2b001516e754.jpg"></img>
                    </a>
                </div>
            </header>
    );
}