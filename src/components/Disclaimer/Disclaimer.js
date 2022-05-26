import React from "react";
import "./Disclaimer.css";

class Disclaimer extends React.Component {
    constructor() {
        super();
        this.state = {
            hidden: true
        }
    }
    showDisclaimer = () => {
        this.setState({hidden : false})
    }
    render() {
        return (
            <div className="disclaimer">
                { this.state.hidden === true 
                ? <button onClick={this.showDisclaimer}
                className="f4 link dim br3 ph3 pv2 mb2 dib white bg-dark-green"
                >Disclaimer</button>        
                : <p className="f4 ph3 pv2 mb2 dark-green">Really I can't tell a cat from a house. I see food everywhere!</p>                  
      } 
      </div> )
    }
}

export default Disclaimer;