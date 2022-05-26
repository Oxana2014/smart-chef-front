import "./ImageLinkForm.css"
import Disclaimer from "../Disclaimer/Disclaimer";

const ImageLinkForm = ({onInputChange, onButtonSubmit, answer}) => {
    return (
        <div>
          
            <Disclaimer />
         {answer === "empty" 
         ? <p className="error-message">Please enter a picture address</p>
         : <p></p>
         }
            <div className="center ">
                <div className=" center pa4 br3 shadow-5 form">
                <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange} />
                <button onClick={onButtonSubmit}
                 className="w-30 grow link ph3 pv2 dib white bg-green f4" type="button">Detect</button>
            
             </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;