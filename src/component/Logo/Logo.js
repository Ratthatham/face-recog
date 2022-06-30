import React from "react";
import Tilt from "react-tilt";
import barista from './barista.png'
import './Logo.css'

function Logo() {
    return(
        <div className = 'Logo'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3"> 
                    <img className="LogoPicture" style={{paddingTop:'5px'}} alt="barista" src={barista}/> 
                </div>
            </Tilt>
            
        </div>

    )
}

export default Logo;