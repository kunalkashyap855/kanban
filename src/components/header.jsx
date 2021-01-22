import React from 'react';

import styles from './header.module.css';
import Logo from '../static/logo.png';

function Header() {
    return (
        <div className={styles.nav}>
            <div className={styles.nav__brand}>
                <img className={styles.nav__brand__logo} src={Logo} alt="Kanban" />
                <h1 className={styles.nav__brand__name}>kanban</h1>
            </div>
            <h2 style={{"color": "GrayText"}}>OpenSource</h2>
        </div>
    )
}

export default Header;
