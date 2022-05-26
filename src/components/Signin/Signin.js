import React from "react";
import "./Signin.css";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail : "",
      signInPassword: "",
      errorSignin: false,
      errorMessage: ""
    }
  }
  onEmailChange = (event) => {
this.setState({signInEmail: event.target.value})
  }
  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }
  onSubmitSignin = () => {
    if(!this.state.signInEmail.trim().length ||
    !this.state.signInPassword.trim().length)
    {
      this.setState({errorSignin: true,
        errorMessage: "Please fill out all fields of the form"})
    } 
    else {
    fetch("http://localhost:3000/signin", {
      method: "post",
      headers: { 'Content-Type' : "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json())
    .then(user => {
     // console.log(user)
      if(user.id) {
        this.props.loadUser(user)
         this.props.onRouteChange('home');
      }
      else {
        this.setState({
          errorSignin : true,
          errorMessage : "Email or password are not correct. Have you registered yet?"
        })
      }
    })
    .catch(err => {
      this.setState({
        errorSignin: true,
        errorMessage: err
      })
    })
  }
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <div>
      {this.state.errorSignin 
? <p className="error-msg"> {this.state.errorMessage}</p>
: "" }
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
  <section className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f2 fw6 ph0 mh0 center">Sign In</legend>
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
      <input onClick={this.onSubmitSignin}
      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
       type="button"
        value="Sign in" />
    </div>
    <div className="lh-copy mt3">
      <p onClick={() => onRouteChange('register')}
       className="f6 link dim black db pointer">Register</p>
    </div>
  </section>
</main>
</article>





</div>
    )
}
}


export default Signin;