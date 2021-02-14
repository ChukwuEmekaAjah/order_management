import React from "react";
import { Link } from "react-router-dom";
import {getUser} from "../../utilities/index";
class Header extends React.Component{

    constructor(props){
        super(props);
        this.state = {user:null}
        this.make_active = this.make_active.bind(this);
    }

    componentDidMount(){
        let user = getUser();

        if(user){
            this.setState({user:user});
        }
    }

    make_active(event){
        var nav_links = document.getElementsByClassName("nav__link");
        for(var i = 0; i < nav_links.length; i++){
            nav_links[i].classList.remove('active');
        }
        event.currentTarget.classList.add('active');
    }

    render(){
        let authViews = (
            this.state.user ? (
            <Link onClickCapture={this.make_active} className="nav__link" to="/logout">
                <span className="nav__item">
                    Signout
                </span>
            </Link>) : 
            (<Link onClickCapture={this.make_active} className="nav__link" to="/login">
                <span className="nav__item">
                    Signin
                </span>
            </Link>) )
         return (
            <>
                <nav className="navigation">
                    <div className="user__icon">
                        <Link onClickCapture={this.make_active} className="nav__link" to="/"> 
                            <span className="nav__item">
                                Home
                            </span>
                        </Link>
                    </div>
                    <div className="nav__routes">
                        <Link onClickCapture={this.make_active} className="nav__link" to="/orders">
                            <span className="nav__item">
                                Orders
                            </span>
                        </Link>
                        {authViews}
                    </div>
                    <div className="box">

                    </div>
                </nav>
            </>
        );
    }
}



export default Header;
