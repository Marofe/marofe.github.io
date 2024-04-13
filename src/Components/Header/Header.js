import React from 'react';
const Header = (props) => {
    return <header className="fix">
        {props.children}
    </header>
}
export default Header;