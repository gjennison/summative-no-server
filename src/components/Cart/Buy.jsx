import React, { Component } from "react";
import Address from "./Buy/Address";
import Shipping from "./Buy/Shipping";
import Payment from "./Buy/Payment";
import back from '../../back.png';

export default class Buy extends Component{
    constructor(props){
        super(props)

        this.state = {
            cartPage: 0,
            productsCost: 0,
            shippingCost: 0,
            totalCost: 0,
            shippingType: "courier",
        }
    }

    componentDidMount(){
        let cost = 0;
        this.props.products.forEach(product => {
            cost += parseInt(product.price);
        });

        this.setState({productsCost: cost.toFixed(2)})
    }

    continue = (data) => {
        let total = (parseInt(this.state.productsCost)+data.cost).toFixed(2)
        this.setState({ cartPage: this.state.cartPage+1,
                        shippingType: data.selected,
                        shippingCost: data.cost.toFixed(2),
                        totalCost: total
                        })
    }

    nextPage = e => {
        this.setState({cartPage: this.state.cartPage + 1})
    }

    gotoPage(page){
        this.setState({cartPage: page})
    }

    render(){
        let currentPage, shippingHasProgressed, paymentHasProgressed;

        if(this.state.cartPage === 0) {
            currentPage = <Address continue={this.nextPage}/>
            shippingHasProgressed = false;
            paymentHasProgressed = false;
        }
        else if(this.state.cartPage === 1) {
            currentPage = <Shipping continue={this.continue}/>
            shippingHasProgressed = true;
        }
        else if(this.state.cartPage === 2) {
            currentPage = <Payment productsCost={this.state.productsCost} 
        shippingCost={this.state.shippingCost} shippingType={this.state.shippingType} totalCost={this.state.totalCost}/>
            shippingHasProgressed = true;
            paymentHasProgressed = true;
        }

        return(
            <div>
                <div className="navbar" onClick={this.props.backCallback}>
                    <img src={back} alt=""/>
                    <p>cart</p>
                </div>
                <div className="progress-bubbles">
                    <div onClick={() => this.gotoPage(0)} className="bubble bubbleProgressed">
                        <div><span>&nbsp;1&nbsp;</span></div>
                        <p className="greyheading">Address</p>
                    </div>
                    <div onClick={() => this.gotoPage(1)} className={`bubble ${shippingHasProgressed ? "bubbleProgressed" : "bubbleNotProgressed"}`}>
                        <div><span>&nbsp;2&nbsp;</span></div>
                        <p className="greyheading">Shipping</p>
                    </div>
                    <div onClick={() => this.gotoPage(2)} className={`bubble ${paymentHasProgressed ? "bubbleProgressed" : "bubbleNotProgressed"}`}>
                        <div><span>&nbsp;3&nbsp;</span></div>
                        <p className="greyheading">Payment</p>
                    </div>
                </div>
                {currentPage}
            </div>
        )
    }
}