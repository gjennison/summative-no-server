import React, { Component } from "react";
import Listings from "./Listings";
import ViewDetails from "../Home/ViewDetails";

export default class Favourites extends Component{
    constructor(props){
        super(props)

        this.state = {
            detailsData: [],
            whichState: 'listings',
        }
    }

    detailsCallback = (listingData) => {
        let temp = []
        temp.push(listingData)
        this.setState({detailsData: temp, whichState: 'details'})
    }
    
    callBACK = e => {
        this.setState({whichState: 'listings'})
    }

    render(){
        let state;

        if(this.state.whichState === 'listings') state = <Listings detailsCallback={this.detailsCallback}/>
        else state = <ViewDetails title="favourites" callBACK={this.callBACK} product={this.state.detailsData[0]}/>
        return(
            <div>
                {state}
            </div>
        )
    }
}