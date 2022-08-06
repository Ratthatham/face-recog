import React, {useState} from 'react';
import Navigation from './component/Navigation/Navigation';
import Logo from './component/Logo/Logo';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
import Rank from './component/Rank/Rank';
import FaceRecognition from './component/FaceRecognition/FaceRecognition';
import Signin from './component/Signin/Signin';
import Register from './component/Register/Register';
import './App.css';

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

function App() {
  //set state เพื่ออับเดทค่า
  const [input, setInput] = useState('');
  const [box, setData] = useState({});
  const [route, setRoute] = useState('signin');
  const [user, setUser] = useState(initialState);
  
  //ฟังชั่นอับเดทค่าที่พิมพ์
  function onChange(event){
    setInput(event.target.value);
    // console.log('Set input : '+ event.target.value);
    // console.log('Input : '+ Input);  
  }
  
  //ฟังชั่นClick
  function onButtonClick(){  
    // console.log('click');
    faceDetection(input);
    // console.log(data);
  }

  //ฟังชั่นคำนวณกรอบพื้นที่ของใบหน้า
  function calculateFaceLocation(result){
    const clarify = JSON.parse(result).outputs[0].data.regions[0].region_info.bounding_box;
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
  
  function displayFaceBox(box) {
    setData(box);
  }


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
    // console.log(IMAGE_URL);
    
    
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
    .then(result => {
      if(result){
        fetch('http://localhost:3000/image',{
          method : 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              id: user.user.id
          })
        })
          .then(result => result.json())
          .then(count => {
            setUser(Object.assign(user, {user:{entries:count}})) //ติดปัญหาตรงนี้ 
          })
          .catch(console.log())
      }
      displayFaceBox(calculateFaceLocation(result))
    })
    .catch(error => console.log('error', error));
    
  }

  function onRouteChange(route){
    if(route === 'signin'){
      setInput('')
    }
    setRoute(route)
  }

  function loadUser(data){
    setUser({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }
    })
  }

  return (
    <div className="App">
      {route==='home'
          ? <div>
              <Navigation onRouteChange={onRouteChange}/>
              <Logo/>
              <Rank userName = {user.user.name} userEntries = {user.user.entries}/>
              <ImageLinkForm 
                value= {input} 
                onClick= {onButtonClick} 
                onChange= {onChange} 
              />
              <FaceRecognition 
              value = {input}
              box= {box}
              />
            </div>
            : (
              route === 'signin'
              ?<Signin loadUser = {loadUser} onRouteChange = {onRouteChange}/>
              :<Register loadUser={loadUser} onRouteChange={onRouteChange}/>
              )
      }
    </div>
  );
}

export default App;
