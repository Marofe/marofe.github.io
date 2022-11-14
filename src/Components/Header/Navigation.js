import React from 'react';
const Navigation = () => {
    return <div className="divnav">
    <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/tutorials">Tutorials</a></li>
            <li><a href="/notes">Notes</a></li>
            <li><a href="/publications">Publications</a></li>
            <li><img className="brazilFlag" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/2000px-Flag_of_Brazil.svg.png" alt="Brazil's flag"/></li>
          </ul>
        </nav>
        </div>
}
export default Navigation;