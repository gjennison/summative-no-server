import React, {Component} from 'react';
import {IconContext} from "react-icons";
import {BsTrash} from 'react-icons/bs';

export default class Favourites extends Component{
    constructor(props){
        super(props)

        this.state = {
            products: [],
        }
    }

    componentDidMount(){
        let temp = []

        this.props.listings.forEach(el => {
            if(el.favourites === 'true') el.isFavourite = true;
            else el.isFavourite = false;
            temp.push(el)
        })
        this.setState({products: temp})
    }

    addToCart(product){
        product.cart = "true"
        this.props.updateProduct(product)
    }

    detailsCallback(e, product){
        if(e.target.classList.contains('product-title-price') || e.target.parentElement.classList.contains('product-title-price') || e.target.classList.contains('product-content') )
            this.props.detailsCallback(product)
    }

    remove(product){
        product.favourites="false"
        this.props.updateProduct(product)

        for (let index = 0; index < this.state.products.length; index++) {
            const element = this.state.products[index];
            if(element.id === product.id){
                let spliceIndex = this.state.products.indexOf(element)
                let temp = this.state.products
                temp.splice(spliceIndex, 1)
                this.setState({products: temp})
            }
        }
    }

    render(){
        return(
            <React.Fragment>
                <h2 className="secondary">Favourites</h2>
                {this.state.products.filter(x => x.favourites === "true").map((product, index) => 
                    <div className="product" key={index}>

                        <div className="product-img">
                            <img alt="" src={product.img}/>
                        </div>

                        <div className="product-content" onClick={(e) => this.detailsCallback(e, product)}>
                            <div className="product-title-price">
                                <p>{product.title}</p>
                                <p>${product.price}</p>
                            </div>
                            <div className="product-details-buy">
                                <IconContext.Provider value={{className: 'cart-icon icon'}}>
                                    <div onClick={() => this.remove(product)}>
                                        <BsTrash/>
                                    </div>
                                </IconContext.Provider>
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        )
    }
}