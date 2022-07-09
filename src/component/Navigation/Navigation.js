import React from "react";

function Navagation({onRouteChange}) {
    return(
        <nav className = 'Navigation'>
            <p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer ">Sign Out</p>
        </nav>
            

    )
}

export default Navagation;