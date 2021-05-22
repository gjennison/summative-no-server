import React, {Component} from 'react';
import axios from 'axios';
import {IconContext} from "react-icons";
import {BsTrash} from 'react-icons/bs';

export default class Listings extends Component{
    constructor(props){
        super(props)

        this.state = {
            products: [{
                title: "hey"
            }],
        }
    }

    componentDidMount(){
        axios.get("https://dry-river-04948.herokuapp.com/api/products").then(res => {
            let temp = []
            res.data.forEach(el => {
                if(el.cart === 'true') temp.push(el)
            })
            this.setState({products: temp})
        })
    }

    remove(product){
        axios.put(`https://dry-river-04948.herokuapp.com/api/products/${product.id}`,
        `cart=false`)

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
    
    detailsCallback(e, product){
        if(e.target.classList.contains('product-title-price') || e.target.parentElement.classList.contains('product-title-price') || e.target.classList.contains('product-content') )
            this.props.detailsCallback(product)
    }

    render(){
        return(
            <React.Fragment>
                <h2 className="secondary">Cart</h2>
                {this.state.products.map((product, index) => 
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
                <button className="cart-buy-now" onClick={this.props.buyNowPage}>buy now</button>
            </React.Fragment>
        )
    }
}