import React, {Component} from 'react';
import Listings from './Listings'
import ViewDetails from './ViewDetails';

export default class Home extends Component{
    constructor(props){
        super(props)

        this.state = {
            detailsData: [],
            buyData: [],
            whichState: 'home',
        }
    }

    detailsCallback = (listingData) => {
        let temp = []
        temp.push(listingData)
        this.setState({detailsData: temp, whichState: 'details'})
    }

    buyCallback = (productData) => {
        let temp = []
        temp.push(productData)
        this.setState({buyData: temp, whichState: 'buy'})
    }

    goBack = e => {
        this.setState({whichState: 'home'})
    }

    render(){
        let currentState;

        if(this.props.clicked){
            this.setState({whichState: 'home'})
            this.props.homeClickedCallback();
        }

        if(this.state.whichState === 'details'){
            currentState = <ViewDetails title="home" product={this.state.detailsData[0]} callBACK={this.goBack} buyCallback={this.buyCallback}/>
        }
        else{
            currentState = <Listings detailsCallback={this.detailsCallback} buyCallback={this.buyCallback}/>
        }
        return(
            <React.Fragment>
                <div>
                    {currentState}
                </div>
            </React.Fragment>
        )
    }
}