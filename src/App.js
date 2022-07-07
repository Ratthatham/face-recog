import React, {useState} from 'react';
import Navigation from './component/Navigation/Navigation';
import Logo from './component/Logo/Logo';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
import Rank from './component/Rank/Rank';
import FaceRecognition from './component/FaceRecognition/FaceRecognition';
import './App.css';


function App() {
  //set state เพื่ออับเดทค่า
  const [input, setInput] = useState('');
  const [data, setData] = useState({});
  
  //ฟังชั่นอับเดทค่าที่พิมพ์
  function onChange(event){
    setInput(event.target.value);
    console.log('Set input : '+ event.target.value);
    // console.log('Input : '+ Input);  
  }
  
  //ฟังชั่นClick
  function onButtonClick(){  
    console.log('click');
    faceDetection(input);
    console.log(data.bottomRow);
    
  }

  //ฟังชั่นคำนวณกรอบพื้นที่ของใบหน้า
  function calculateFaceLocation(data){
    const clarify = JSON.parse(data).outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol : clarify.left_col * width,
      topRow : clarify.top_row * height,
      rightCol : width-(clarify.right_col * width),
      bottomRow : height-(clarify.bottom_row * height)
    }   
  }
  
  // displayFaceBox = (box) => {

  // } // กำลังจะสร้างกรอบสี่เหลี่ยมบนใบหน้า

  //ฟังชั่นเชื่อม API
  function faceDetection (input) {
    const USER_ID = 'earth_04739';
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '23b0e7e8e92f4eb6bb85b0f09e9d24b0';
    const APP_ID = 'face_recog';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '45fb9a671625463fa646c3523a3087d5';
    // Change this to whatever image URL you want to process
    const IMAGE_URL = input;
    console.log(IMAGE_URL);
    
    
    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////
    
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
            }
          }
        }
      ]
    });
    
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };
    
    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id
    
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    .then(response => response.text())
    .then(result => setData(calculateFaceLocation(result)))
    .catch(error => console.log('error', error));
    
  }

  return (
    <div className="App">
      <Navigation/>
      <Logo/>
      <Rank/>
      <ImageLinkForm 
        value= {input} 
        onClick= {onButtonClick} 
        onChange= {onChange} 
      />
      <FaceRecognition value = {input}/>
    </div>
  );
}

export default App;
