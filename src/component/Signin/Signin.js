import React, { useState } from "react";

function Signin({onRouteChange}) {
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');

    function onEmailChange(event){
        console.log("Email", signInEmail);
        setSignInEmail(event.target.value);
    }

    function onPasswordChange(event){
        console.log("password", signInPassword);
        setSignInPassword(event.target.value);
    }

    function onSubmitSignIn(){
        //เชื่อม Front-Back End Signin
        fetch("http://localhost:3000/signin", {
            method : 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        })
            .then(response => response.json())
            .then(data => {
                if(data === "success"){
                    onRouteChange('home');
                }
            })
        console.log("Signin Completed" ,signInEmail);
    }

    return(
        <div className = 'Signin'>
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
                <main className="pa4 black-80 ">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0 center">Sign In</legend>
                            <div className="mt3">
                                <label 
                                className="db fw6 lh-copy f6" 
                                htmlFor="email-address">Email
                                </label>
                                <input 
                                onChange= {onEmailChange} 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                />
                            </div>
                            <div className="mv3">
                                <label 
                                className="db fw6 lh-copy f6" 
                                htmlFor="password">Password
                                </label>
                                <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                onChange={onPasswordChange} 
                                id="password"
                                />
                                
                            </div>
                        </fieldset>
                        <div className="">
                            <input 
                            onClick={onSubmitSignIn} 
                            className="b br3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in"
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p  onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>  
            </article>
        </div>


    )
}

export default Signin;