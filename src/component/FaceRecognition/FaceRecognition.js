import React from "react";

function FaceRecognition({imageUrl}) {
    return(
        <div className="FaceRecognition">
            <img alt = 'img' src= {imageUrl} />
            
        </div>
    );
}

export default FaceRecognition;