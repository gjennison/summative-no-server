import React, { Component } from "react";
import axios from 'axios';
import Listings from './Listings';
import Buy from './Buy';
import ViewDetails from '../Home/ViewDetails';

export default class Cart extends Component{
    constructor(props){
        super(props)

        this.state = {
            state: "listings",
            detailsData: [],
            products: []
        }
    }
    
    buyNowPage = e => {
        this.setState({state: 'buy'})
    }
    
    detailsCallback = (listingData) => {
        let temp = []
        temp.push(listingData)
        this.setState({detailsData: temp, state: 'details'})
    }

    callBACK = e => {
        this.setState({state: 'listings'})
    }

    componentDidMount(){
        axios.get("https://dry-river-04948.herokuapp.com/api/products").then(res => {
            let temp = []
            res.data.forEach(el => {
                temp.push(el)
            })
            temp = temp.filter(x => x.cart === "true")
            this.setState({products: temp})
        })
    }

    render(){
        let state;

        if(this.props.clicked){
            this.setState({state: 'listings'});
            this.props.cartClickedCallback();
        }
        
        if(this.state.state === 'listings') state = <Listings detailsCallback={this.detailsCallback}  products={this.state.products} buyNowPage={this.buyNowPage}/>;
        else if (this.state.state === 'details') state = <ViewDetails title="cart" callBACK={this.callBACK} product={this.state.detailsData[0]}/>
        else state = <Buy backCallback={this.callBACK} products={this.state.products}/>
        return(
            <div>
                {state}
            </div>
        )
    }
}