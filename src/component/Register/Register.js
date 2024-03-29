import React, {useState} from "react";

function Register({onRouteChange, loadUser}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    function onEmailChange(event){
        setEmail(event.target.value);
    }

    function onNameChange(event){
        setName(event.target.value);
    }
    
    function onPasswordChange(event){
        setPassword(event.target.value);
    }

    function onSubmitRegister(){
        //เชื่อม Front-Back End Signin
        fetch("http://localhost:3000/register", {
            method : 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password,
                name: name
            })
        })
            .then(response => response.json())
            .then(user => {
                if(user.id){
                    loadUser(user.id);
                    onRouteChange('signin');
                }
            })
        console.log("Register Completed");
    }


    return(
        <div className = 'Register'>
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
                <main className="pa4 black-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0 center">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="Name">Name</label>
                            <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="Name" 
                            name="Name"  
                            id="Name"
                            onChange={onNameChange}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address"
                            onChange={onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"
                            onChange={onPasswordChange}
                            />
                        </div>
                        </fieldset>
                        <div className="">
                            <input 
                            onClick={onSubmitRegister}  
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib br3" 
                            type="submit" 
                            value="Register"
                            />
                        </div>
                        
                    </div>
                </main>  
            </article>
        </div>


    )
}

export default Register;