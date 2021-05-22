import React, { Component } from "react";

export default class Shipping extends Component{
    constructor(props){
        super(props)

        this.state = {
            selected: "",
            cost: 0,
        }
    }

    onValueChange = e => {
        this.setState({selected: e.target.value})
    }

    changeToStandard = e => {
        document.querySelectorAll('.card input')[0].checked = true
        this.setState({cost: 3, selected: "standard"})
    }

    changeToOvernight = e => {
        document.querySelectorAll('.card input')[1].checked = true
        this.setState({cost: 4.5, selected: "overnight"})
    }
    
    changeToSignature = e => {
        document.querySelectorAll('.card input')[2].checked = true
        this.setState({cost: 2.5, selected: "signature required"})
    }

    continue = e => {
        let data = {selected: this.state.selected, cost: this.state.cost}
        this.props.continue(data)
    }

    render(){
        return(
            <div className="container cart">
                <p><strong>Shipping Options</strong></p>
                <div className="card" onClick={this.changeToStandard}>
                    <input type="radio" onChange={this.onValueChange} value="Standard" name="shipping"/>
                    <div className="card-content">
                        <p className="card-heading">Standard (with tracking)</p>
                        <p>$3.00 - shipped through Courier Post. 3-5 business days</p>
                    </div>
                </div>
                <div className="card" onClick={this.changeToOvernight}>
                    <input type="radio" onChange={this.onValueChange} value="Overnight" name="shipping"/>
                    <div className="card-content">
                        <p className="card-heading">Overnight (with tracking)</p>
                        <p>$4.50 - shipped through Courier Post.</p>
                    </div>
                </div>
                <div className="card" onClick={this.changeToSignature}>
                    <input type="radio" onChange={this.onValueChange} value="Signature Required" name="shipping"/>
                    <div className="card-content">
                        <p className="card-heading">Signature Required</p>
                        <p>$2.50 - Choose this option for deliveries that you don't want left unattended</p>
                    </div>
                </div>

                <div className="cart-continue">
                    <button onClick={this.continue}>continue</button>
                </div>
            </div>
        )
    }
}