import React, {Component} from 'react';
import axios from 'axios';
import Listings from './Listings';
import Edit from './Edit';
import Delete from './Delete';
import YouHome from './YouHome';
import Account from './Account';
import ListNew from './ListNew';

export default class You extends Component{
    constructor(props){
        super(props)

        this.state = {
            currentState: "home",
            currentProduct: [],
            displayDelete: false,
            products: [],
        }
    }
    componentDidMount(){
        axios.get("https://dry-river-04948.herokuapp.com/api/products").then(res => {
            let temp = []
            res.data.forEach(el => {
                if(el.user ==='you')
                   temp.push(el)
            })
            this.setState({products: temp})
        })
    }

    editCallback = (product) => {
        let temp = []
        temp.push(product)
        this.setState({currentState: "edit", currentProduct: temp})
    }

    deleteCallback = (product) => {
        let temp = []
        temp.push(product)
        this.setState({currentProduct: temp, displayDelete: true})
    }

    closeDeleteModalCallback = e => {
        this.setState({displayDelete: false})
    }

    homeCallback = (state) => {
        this.setState({currentState: state})
    }

    backCallback = e => {
        this.setState({currentState: 'home'})
    }

    masterCallback = (state) => {
        this.props.masterCallback(state)
    }

    confirmDelete = (product) => {
        // let arrayIndex = this.state.products.indexOf(product);
        // let temp = this.state.products;

        // temp.splice(arrayIndex, 1);

        // this.setState({product: temp})



        let arrayIndex = this.props.products.indexOf(product);
        let temp = this.props.listings

        temp.splice(arrayIndex, 1)
        this.props.updateProducts(temp)
    }

    updateProduct = (product) => {
        this.props.updateProduct(product)
    }

    postProduct = (product) => {
        this.props.postProduct(product)
    }

    render(){
        let currentState;

        if(this.props.clicked){
            this.setState({currentState: 'home'});
            this.props.youClickedCallback();
        }

        if(this.state.currentState === "listings") currentState = <Listings updateProduct={this.updateProduct} products={this.props.listings} backCallback={this.backCallback} editCallback={this.editCallback} deleteCallback={this.deleteCallback}/>
        else if(this.state.currentState === "edit") currentState = <Edit updateProduct={this.updateProduct} backCallback={() => this.setState({currentState: 'listings'})} product={this.state.currentProduct[0]}/>
        else if(this.state.currentState === "account") currentState = <Account backCallback={this.backCallback}/>
        else if(this.state.currentState === "list-new") currentState = <ListNew products={this.props.listings} postProduct={this.postProduct} backCallback={this.backCallback}/>
        else currentState = <YouHome masterCallback={this.masterCallback} callback={this.homeCallback}/>
        return(
            <div>
                {currentState}
                <Delete product={this.state.currentProduct[0]} confirmDelete={this.confirmDelete} callback={this.closeDeleteModalCallback} displayDelete={this.state.displayDelete}/>
            </div>
        )
    }
}