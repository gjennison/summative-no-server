import React, { Component } from "react";

export default class Address extends Component{
    constructor(props){
        super(props)

        this.state = {
        }
    }

    render(){
        return(
            <div className="container cart">
                <p><strong>Current Address</strong></p>
                <div className="card">
                    <input checked type="radio"/>
                    <div className="card-content">
                        <p className="card-heading">Jane Doe</p>
                        <p>123 Jeffer Drive, Riccarton</p>
                        <p>Christchurch 8041</p>
                        <p>New Zealand</p>
                    </div>
                </div>

                <div className="cart-continue">
                    <button onClick={this.props.continue}>continue</button>
                </div>
            </div>
        )
    }
}