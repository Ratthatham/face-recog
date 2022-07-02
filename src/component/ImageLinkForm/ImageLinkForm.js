import React from "react";
import './ImageLinkForm.css'


function ImageLinkForm({onClick, value, onChange}) {
    return(
        <div className="ImageLinkForm">
            <p className = 'header f3'>
                {'This magic Brain will detect face in your pictures.'}
            </p>
            <div className="type">
                <div className="typeIn pa4 br3 shadow-5">
                    <input 
                    className="f4 pa2 w-70 center ma3" 
                    type='tex' 
                    value = {value}
                    onChange={onChange}
                    />
                    
                    <button 
                    className="w-30 grow f4 link ph3 pv2 br3 dib white bg-light-purple" 
                    onClick={onClick}>detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;