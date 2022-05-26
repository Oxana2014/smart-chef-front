import React, {Component} from "react";
import Navigation from './components/Navigation/Navigation';
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FoodImage from "./components/FoodImage/FoodImage";
import Answer from "./components/Answer/Answer";
import 'tachyons';
import './App.css';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import particleOptions from './utility/particleOptions';
import fireworkOptions from "./utility/fireworkOptions";
import Advertisment from "./components/Advertisment/Advertisment";


  const particlesInit = async (main) => {
  //  console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };
   const particlesLoaded = (container) => {
  //  console.log(container);
  };

  const initialState = {
      input: '',
      imageUrl: '',
      route: 'signin',
      isSignedIn: false,
      options: particleOptions,
      concepts: [],
      answer: "no",
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ""
      }
  }
class App extends Component {
constructor() {
  super();
  this.state = initialState;
}

//to check connection to backend
// componentDidMount() {
//   fetch('http://localhost:3000')
//   .then(response => response.json())
//   .then(console.log)
// }

onInputChange = (event) => {
  this.setState({ input: event.target.value,
    answer: "no"
  })
}

loadUser = (data) => {
  this.setState( {user: {
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined
  }
  })
}

onButtonSubmit = async () => { 
  console.log(this.state.input)
  if(this.state.input.trim().length) {
  try {
 this.setState({imageUrl: this.state.input})
 const responseAPI = await fetch("http://localhost:3000/imageurl", {
   method: "post",
   headers: { 'Content-type' : 'application/json'},
   body: JSON.stringify({
     input: this.state.input
   })
 })

const data = await responseAPI.json();
if(data && data.concepts && data.concepts.length) {
    this.setState({ concepts: data.concepts, answer: "success", options: fireworkOptions});
  try {
    const backendResponse = await   fetch("http://localhost:3000/image", {
        method: "put",
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify({
          id: this.state.user.id
        })
      })
      if(backendResponse) {
        const count = await backendResponse.json();
        this.setState(Object.assign(this.state.user, {entries: count}))
       
      }
  }
  catch (e) { console.log(e)}
} else {
  this.setState({ concepts: [], answer: "fail"});
}
}
catch (e) { console.log(e);
  this.setState({ concepts: [], answer: "error"})
}
  } else {
    this.setState({ concepts: [], answer: "empty"})
  }
}

onRouteChange = (route) => {
  if(route === "signout") {
    this.setState(initialState)
  } else if(route === 'home') {
    this.setState({isSignedIn: true})
  }
  this.setState({route: route})
}

render() {
 let {isSignedIn, imageUrl, route} = this.state;
  return (
    <div className="App">
    <Particles className='particles'
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={this.state.options} 
    />
   <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
    <Logo route={this.state.route} isSignedIn={this.state.isSignedIn} />
   {route === 'home'
   ? <div>  
   <Rank name={this.state.user.name} entries={this.state.user.entries}/>
  <ImageLinkForm 
   onInputChange={this.onInputChange}
    onButtonSubmit={this.onButtonSubmit}
    answer={this.state.answer}/>
    <FoodImage imageUrl={imageUrl} />
   <Answer answer={this.state.answer} concepts={this.state.concepts}/> 
  </div>
  :   (
    route === 'register'
    ? <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />  
   : <div>
      <Advertisment />
    <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} /> 
    </div> 
  )
  }
    </div>
  );
}
}

export default App;
