import React from "react";

class Register  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registeredName: "",
      registeredEmail: "",
      registeredPassword: "",
      error: ""
    }
  }
  onNameChange = (event) => {
    this.setState({registeredName: event.target.value})
  }
  onEmailChange = (event) => {
    this.setState({registeredEmail: event.target.value})
  }
  onPasswordChange = (event) => {
    this.setState({registeredPassword: event.target.value})
  }
  onRegisterSubmit = () => {
    if(!this.state.registeredName.trim().length ||
     !this.state.registeredEmail.trim().length || !this.state.registeredPassword.trim().length) {
this.setState({error: "Please fill out all fields of the form"})
    } else {
   fetch("http://localhost:3000/register", {
     method: "post",
     headers: {'Content-Type': "application/json"},
     body: JSON.stringify({ 
      name: this.state.registeredName,
      email: this.state.registeredEmail,
      password: this.state.registeredPassword
     })
   })
   .then(response => response.json())
   .then(user => {
     if(user.id) {
      this.props.loadUser(user);
      this.props.onRouteChange('home')
     }
     else {
      this.setState({error: "Unable to register"});
     }
   })
   .catch(err => {
     this.setState({error: err});
   })
  }
  }

  render() {
    return (
     <div>
       <p className="error-message">{this.state.error}</p>
     
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
  <section className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f2 fw6 ph0 mh0 center">Register</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
        <input onChange={this.onNameChange}
         className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
      </div>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input onChange={this.onEmailChange}
         className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input onChange={this.onPasswordChange}
         className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
      </div>
     
    </fieldset>
    <div className="">
      <input onClick={this.onRegisterSubmit}
      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
       type="button"
        value="Register" />
    </div>
   
  </section>
</main>
</article>
</div>
    )
}
}

export default Register;