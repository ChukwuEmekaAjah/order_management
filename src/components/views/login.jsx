import firebase from "firebase/app";
import React from "react";
import  "firebase/auth"


class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {password:'', email:''}
        this.handleInput = this.handleInput.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }


    async handleInput(event){
        this.setState({[event.target.id]:event.target.value})
    }

    async submitForm(event){
        event.preventDefault();

        if(event.target.checkValidity == false){
            this.setState({errorMessage:'Please input a valid email and password'});
            return null;
        }

        let response;
        try{
            response = await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        } catch(exc){
            console.log("error is", exc);
            this.setState({errorMessage:"Invalid email and password"})
        }
        
        window.localStorage.setItem("user", firebase.auth().currentUser.uid);
        window.localStorage.setItem("userIdToken", (await firebase.auth().currentUser.getIdToken()).toString())
        window.location.href = "http://localhost:3000/orders";
        
        return null;
    }
 
    render(){
        
        return (

            <React.Fragment>
                <div className="col-6" >
                    <div className="card BoxShadow" >
                        <div className="card__details " >
                            <p className="card__title" > Log in to your account </p>
                            <p className="card__description">
                                {this.state.errorMessage}
                            </p>
                            <form onSubmit={this.submitForm}>
                                <div className="row">
                                    <label>
                                        Email
                                        <input className="text-input"  id="email" type="email" value={this.state.email} onChange={this.handleInput}></input>
                                    </label>
                                </div>
                                <div className="row">
                                    <label>
                                        Password
                                        <input className="text-input" id="password" type="password" value={this.state.password} onChange={this.handleInput}></input>
                                    </label>
                                </div>
                                <div className="card__meta">
                                    <div style={{display:'flex'}}>
                                        <button className="button BoxShadow"  id="submitButton">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}





export default Login;
