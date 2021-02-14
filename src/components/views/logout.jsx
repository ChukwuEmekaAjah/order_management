import firebase from "firebase/app";
import React from "react";
import  "firebase/auth"


class Logout extends React.Component{
    
    componentDidMount (){
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("userIdToken")
        firebase.auth().signOut().then(function(){
            console.log("Successfully signed out");
            
            window.location.href = '/login'
        }).catch(function(err){
            console.log("Error signing out", err);
            alert("Problem signing you out");
            
        })
    }

    render(){
        return (
            <React.Fragment>
                <div className="col-6">
                    <div className="card BoxShadow" >
                        <div className="card__details " >
                            <p className="card__title" style={{'color':'red'}}> Successfully logged you out</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}





export default Logout;
