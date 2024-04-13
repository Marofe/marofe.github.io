import React from 'react';
const Bottom = (props) => {
    let d=new Date();
    let year=d.getFullYear();
return <div className="bottom">
     {year} - &copy; Copyright - All rights reserved.
</div>
}
export default Bottom;