
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import firebase from "firebase/app"
import Header from "./static/header";
import Login from "./views/login";
import Logout from "./views/logout";
import Orders from "./views/orders";
import SingleOrder from "./views/single_order";

import firebaseConfig from "../firebaseConfig";
import  "firebase/auth"
firebase.initializeApp(firebaseConfig)


class Home extends React.Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <Router>
                <React.Fragment>
                    <div className="body">
                        <Header />
                        <div className="views">
                            <div className="row">
                                <Route render={() => <Login />} exact path="/login">    
                                </Route>
                                <Route render={() => <Logout /> } exact path="/logout">    
                                </Route>
                                <Route render={() => <Orders /> } exact path="/orders">    
                                </Route>
                                <Route render={() => <SingleOrder /> } exact path="/orders/:orderId">    
                                </Route>
                                
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            </Router>
        )
    }
}

export default Home;
