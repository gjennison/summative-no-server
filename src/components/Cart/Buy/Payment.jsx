import React, { Component } from "react";
import Modal from "./Modal";

export default class Payment extends Component{
    constructor(props){
        super(props)

        this.state = {
            showModal: false,
        }
    }

    showModal = e => {
        this.setState({showModal: true})
    }

    closeModal = e => {
        this.setState({showModal: false})
    }

    render(){
        let modal;

        if(this.state.showModal) modal = <Modal modalClose={this.closeModal}/>

        return(
            <div className="payment container">
                <div className="payment-details">
                    <div className="detail">
                        <p className="subheading">Card Number</p>
                        <input type="text"/>
                    </div>
                    <div className="detail">
                        <p className="subheading">Name on Card</p>
                        <input type="text"/>
                    </div>
                    <div className="detail">
                        <p className="subheading">Expiry Date</p>
                        <div className="expiry">
                            <select name="" id="">
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                                <option value="06">06</option>
                                <option value="07">07</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                            <select name="" id="">
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                            </select>
                        </div>
                    </div>
                    <div className="detail">
                        <p className="subheading">CVC</p>
                        <input type="text"/>
                    </div>
                </div>

                <hr/>

                <div className="payment-amount subheading-heavy">
                    <div className="amount">
                        <p>Item(s)</p>
                        <p>${this.props.productsCost}</p>
                    </div>

                    <div className="amount">
                        <div className="amount-left">
                            <p>Shipping</p>
                            <p className="subheading">{this.props.shippingType}</p>
                        </div>
                        <p>${this.props.shippingCost}</p>
                    </div>

                    <div className="amount bold">
                        <p>Total</p>
                        <p>${this.props.totalCost}</p>
                    </div>
                </div>

                <button onClick={this.showModal}>place order</button>
                {modal}
            </div>
        )
    }
}