import React from "react";
import cookImg from "./start.jpg";
import sleepingCook from "./sleeping.jpg";
import signinCook from "./signin.jpg";
import "./Logo.css"

const Logo = ({route, isSignedIn}) => {

return (
    <div className="logo ma4 mt0 tc grow dib bw2 shadow-5">
        {isSignedIn === true
        ?<img src={cookImg} alt=""></img> 
        : (route === "register"
        ? <img src={sleepingCook} alt=""></img>
        : <img src={signinCook} alt=""></img>
        )
        }
    </div>
)
}

export default Logo;