import React, { Component } from "react";
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

    updateProduct = (product) => {
        this.props.updateProduct(product)
    }

    render(){
        let state;

        if(this.props.clicked){
            this.setState({state: 'listings'});
            this.props.cartClickedCallback();
        }
        
        if(this.state.state === 'listings') state = <Listings updateProduct={this.updateProduct} detailsCallback={this.detailsCallback}  products={this.props.products} buyNowPage={this.buyNowPage}/>;
        else if (this.state.state === 'details') state = <ViewDetails updateProduct={this.updateProduct} title="cart" callBACK={this.callBACK} product={this.state.detailsData[0]}/>
        else state = <Buy backCallback={this.callBACK} products={this.state.products}/>
        return(
            <div>
                {state}
            </div>
        )
    }
}