import React from "react";
import {withRouter} from "react-router-dom"
import { makeRequest, getUser} from "../../utilities/index";


class SingleOrder extends React.Component{
    constructor(props){
        super(props)
        let today = new Date();
        this.state = {order:null, errorMessage:'', orderTitle:'', orderBookingDate:`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`, showForm:false};
        this.showUpdateForm = this.showUpdateForm.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    async handleInput(event){
        this.setState({[event.target.id]:event.target.value})
    }

    showUpdateForm(event){
        let orderTitle = this.state.order.title;
        let orderBookingDate = new Date(this.state.order.bookingDate) || new Date();

        orderBookingDate = `${orderBookingDate.getFullYear()}-${orderBookingDate.getMonth()+1}-${orderBookingDate.getDate()}`
        console.log("date is", orderBookingDate)
        this.setState({showForm:true, orderTitle, orderBookingDate})
    }

    async submitForm(event){
        event.preventDefault();
        if(event.target.checkValidity() == false){
            alert("Please input the correct data into the form");
            return;
        }

        let user = getUser();
        if(Boolean(user) == false){
            alert("Please log in to update this order ");
            window.location.href = "http://localhost:3000/login"
        }

        let url = `http://localhost:80/orders/${this.props.match.params.orderId}`;
        let method = 'put';

        let data = {
            title: this.state.orderTitle, 
            bookingDate: this.state.orderBookingDate,
        }
        
        let headers = {userId:user, userIdToken: window.localStorage.getItem('userIdToken')}
        let order = await makeRequest(url, method, headers, {}, data);
        
        if(order.status > 299){
            this.setState({errorMessage:order.data.errors[0]['reason']});
            return null;
        }

        window.location.reload();
        
    }

    async componentDidMount(){
        let user = getUser();
        
        if(Boolean(user) == false){
            alert("Please log in to access this order");
            window.location.href = "http://localhost:3000/login"
        }

        let url = `http://localhost:80/orders/${this.props.match.params.orderId}`;
        let method = 'get';
        
        let headers = {userId:user, userIdToken: window.localStorage.getItem('userIdToken')}
        let order = await makeRequest(url, method, headers, {}, null);
        console.log("response is", order.data);
        if(order.status > 299){
            this.setState({errorMessage:order.data.errors[0]['reason']});
            return null;
        }

        this.setState({order:order.data.data.order, errorMessage:''});
    }

 
    render(){
        let response = null;

        let updateForm = (
            <div className="col-6" >
                <div className="card BoxShadow" >
                    <div className="card__details " >
                        <p className="card__title" > Update your order </p>
                        <p className="card__description">
                            {this.state.errorMessage}
                        </p>
                        <form onSubmit={this.submitForm}>
                            <div className="row">
                                <label>
                                    Title
                                    <input className="text-input" id="orderTitle" type="text" value={this.state.orderTitle} onChange={this.handleInput}></input>
                                </label>
                            </div>
                            <div className="row">
                                <label>
                                    Booking Date
                                    <input className="text-input" id="orderBookingDate" type="date" value={this.state.orderBookingDate} onChange={this.handleInput}></input>
                                </label>
                            </div>
                            <div className="card__meta">
                                <div style={{display:'flex'}}>
                                    <button className="button BoxShadow"  id="submitButton">
                                        Update
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )

        if(this.state.order){
            response = (
                <div className="col-6" key={this.state.order['id']}>
                    <div className="card BoxShadow" >
                        <div className="card__details " >
                            <p className="card__title" > Title: <span id="title">{this.state.order.title}</span> </p>
                            <p><span className="card__source-name" style={{color:"rgb(100,100,100)"}}>Booking date: <span id="bookingDate">{this.state.order['bookingDate'] && ( new Date(this.state.order.bookingDate)).toLocaleDateString()}</span></span> </p>
                            <div style={{display:'flex'}}>
                                <button onClick={this.showUpdateForm} className = "button BoxShadow" variant="contained" data-state="edit" color="primary">Edit</button>
                            </div>
                        </div>
                        <div className="card__details " >
                            <p className="card__title" > Customer </p>
                            <p><span className="card__source-name" style={{color:"rgb(100,100,100)"}}>Name: {this.state.order['customer'] && this.state.order.customer['name']}</span> </p>
                            <p><span className="card__source-name" style={{color:"rgb(100,100,100)"}}>Email: {this.state.order['customer'] && this.state.order.customer['email']}</span> </p>
                            <p><span className="card__source-name" style={{color:"rgb(100,100,100)"}}>Phone: {this.state.order['customer'] && this.state.order.customer['phone']}</span> </p>
                        </div>
                        <div className="card__details " >
                            <p className="card__title" > Address </p>
                            <p><span className="card__source-name" style={{color:"rgb(100,100,100)"}}>Country: {this.state.order['address'] && this.state.order.address['country']}</span> </p>
                            <p><span className="card__source-name" style={{color:"rgb(100,100,100)"}}>City: {this.state.order['address'] && this.state.order.address['city']}</span> </p>
                            <p><span className="card__source-name" style={{color:"rgb(100,100,100)"}}>Zip: {this.state.order['address'] && this.state.order.address['zip']}</span> </p>
                            <p><span className="card__source-name" style={{color:"rgb(100,100,100)"}}>Street: {this.state.order['address'] && this.state.order.address['street']}</span> </p>
                        </div>
                    </div>
                </div>
            )
        }

        let message = null;

        if(this.state.errorMessage ){
            message = (
            <div className="col-12">
                <div className="card BoxShadow" >
                    <div className="card__details " >
                        <p className="card__title" style={{'color': this.state.errorMessage ? 'red' : 'green'}}>Message from shop </p>
                        <p className="card__description">
                            {this.state.errorMessage }
                        </p>
                    </div>
                </div>
            </div>)
        }

        
        return (

            <React.Fragment>
                <div className="col-12">
                    <h1>Order</h1>
                </div>
                {message}
                {response}
                {this.state.showForm ? updateForm : null}
                
            </React.Fragment>
        );
    }
}





export default withRouter(SingleOrder);
