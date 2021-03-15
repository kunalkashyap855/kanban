import React from 'react';

import styles from './header.module.css';
import Logo from '../static/logo.png';
import Button from "react-bootstrap/Button";
function HeaderNavbar() {
    return (
        <div className={styles.nav}>
            <div className={styles.nav__brand}>
                <img className={styles.nav__brand__logo} src={Logo} alt="Kanban" />
                <h1 className={styles.nav__brand__name}>kanban</h1>
            </div>
            <div>
                {window.location.href !== 'http://localhost:3000/signin' ? <Button style={{margin: '10px'}} href='/signin'>Signin</Button> : <Button style={{margin: '10px'}} href='/signup'>Signup</Button>}
            
            
            </div>
            
            {/* <h2 style={{"color": "GrayText"}}>OpenSource</h2> */}
        </div>
    )
}

export default HeaderNavbar;
