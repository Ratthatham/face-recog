import React from "react";

function FaceRecognition({value}) {
    return(
        <div className="FaceRecognition">
            <div className="img br2">
                <img alt = '' src= {value} width='400px' height='auto'/>
                
            </div>

        </div>
    );
}

export default FaceRecognition;