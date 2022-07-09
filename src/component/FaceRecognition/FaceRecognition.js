import React from "react";
import '/Users/ratthathamsiridol/Documents/Fullstack Dev/face-rocog/src/component/FaceRecognition/FaceRecognition.css'

function FaceRecognition({value, box}) {
    return(
        <div className="FaceRecognition">
            <div className="img">
                <img id="inputimage" alt = '' src= {value} width='400px' height='auto' />
                <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
            
        </div>
    );
}

export default FaceRecognition;