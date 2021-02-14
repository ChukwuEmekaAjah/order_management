import React from "react";
import { makeRequest, getQueryParams, getUser} from "../../utilities/index";


class Orders extends React.Component{
    constructor(props){
        super(props)
        this.state = {page:0, orders:[], errorMessage:''};
    }

    async componentDidMount(){
        let user = getUser();

        if(Boolean(user) == false){
            alert("Please log in to access orders");
            window.location.href = "http://localhost:3000/login"
        }

        let url = 'http://localhost:80/orders';
        let method = 'get';
        let queryParams = getQueryParams();
        let query = {page:(Number(queryParams.page) > 0 && Number(queryParams.page)) || 1}
        
        let headers = {userId:user, userIdToken: window.localStorage.getItem('userIdToken')}
        let orders = await makeRequest(url, method, headers, query, null);
        
        if(orders.status > 299){
            this.setState({errorMessage:orders.data.errors[0]['reason']});
            return null;
        }

        console.log("did we reach here?", orders.data)
        this.setState({orders:orders.data.data.orders, page:query.page, errorMessage:''});
    }

   
 
    render(){
        let response = null;

        if(this.state.orders.length == 0 && this.state.page == 1){
            response = (
                <div className="col-6">
                    <div className="card BoxShadow" >
                        <div className="card__details " >
                            <p className="card__title" style={{'color':'red'}}> Empty shop orders </p>
                            <p className="card__description">
                                There are no orders in the shop
                            </p>
                        </div>
                    </div>
                </div>
            )
        } else if(this.state.orders.length == 0 && this.state.page > 1){
            response = (
                <div className="col-6">
                    <div className="card BoxShadow" >
                        <div className="card__details " >
                            <p className="card__title" style={{'color':'red'}}> Empty shop orders</p>
                            <p className="card__description">
                                There are no more orders in the shop, go back.
                            </p>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            response = [];

            for(let index = 0; index < this.state.orders.length; index++){
                response.push(
                    (<div className="col-6" key={this.state.orders[index]['id']}>
                        <div className="card BoxShadow" >
                            <div className="card__details " >
                                <p className="card__title" > {this.state.orders[index].title} </p>
                                <p><span className="card__source-name" style={{color:"rgb(100,100,100)"}}>{this.state.orders[index]['bookingDate'] && ( new Date(this.state.orders[index].bookingDate)).toLocaleDateString()}</span> </p>
                            </div>
                            <div className="card__meta">
                                <div style={{display:'flex'}}>
                                    <a href={`/orders/${this.state.orders[index].id}`}>
                                        <button className = "button BoxShadow"  id={this.state.orders[index].id} variant="contained" color="primary">
                                        View
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>)
                )
            }
        }

        let message = null;

        if(this.state.errorMessage || this.state.successMessage){
            message = (
            <div className="col-12">
                <div className="card BoxShadow" >
                    <div className="card__details " >
                        <p className="card__title" style={{'color': this.state.errorMessage ? 'red' : 'green'}}>Message from shop </p>
                        <p className="card__description">
                            {this.state.errorMessage || this.state.successMessage}
                        </p>
                    </div>
                </div>
            </div>)
        }

        let pagination = (
            <div className="col-12">
                <div className="card BoxShadow" >
                    <div className="card__meta">
                        <div style={{display:'flex', width:'100%', justifyContent:'space-between'}}>
                            <a href={`/orders?page=${this.state.page - 1}`}>
                            <button className = "button BoxShadow" disabled={[0,1].includes(this.state.page) ? true : false} data-type='previous' onClickCapture={this.updatePage} variant="contained" color="primary">
                                Previous
                            </button>
                            </a>
                            <a href={`/orders?page=${this.state.page + 1}`}>
                            <button className = "button BoxShadow" disabled={this.state.orders.length == 0 ? true : false} data-type='next' onClickCapture={this.updatePage} variant="contained" color="primary">
                                Next
                            </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )

        return (

            <React.Fragment>
                <div className="col-12">
                    <h1>Orders</h1>
                </div>
                {message}
                {response}
                {pagination}
            </React.Fragment>
        );
    }
}





export default Orders;
