import React, {Component} from 'react';
import axios from 'axios';
import search from '../../search.png';
import logo from '../../logo.png';
import { IconContext } from "react-icons";
import {AiOutlineHeart} from 'react-icons/ai';
import {AiFillHeart} from 'react-icons/ai';

export default class Home extends Component{
    constructor(props){
        super(props)

        this.state = {
            products: [],
            search: "",
        }
    }

    componentDidMount(){
        axios.get("https://dry-river-04948.herokuapp.com/api/products").then(res => {
            let temp = []
            res.data.forEach(el => {
                if(el.favourites === 'true') el.isFavourite = true;
                else el.isFavourite = false;
                temp.push(el)
            })
            this.setState({products: temp})
        })
    }

    search = e => {
        this.setState({search: e.target.value})
    }

    addToCart(product){
        axios.put(`https://dry-river-04948.herokuapp.com/api/products/${product.id}`,
        `cart=true`)
    }

    addToFavourites(e, product){
        axios.put(`https://dry-river-04948.herokuapp.com/api/products/${product.id}`,
        `favourites=true`)
        let productContainer = e.target;
        while(!productContainer.classList.contains('product-img')){
            productContainer = productContainer.parentElement
        }
        if(productContainer.classList.contains('notFavourite')){
            productContainer.classList.add('favourite')
            productContainer.classList.remove('notFavourite')
        }
    }

    removeFromFavourites(e, product){
        axios.put(`https://dry-river-04948.herokuapp.com/api/products/${product.id}`,
        `favourites=true`)
        let productContainer = e.target.parentElement.parentElement.parentElement
        if(productContainer.classList.contains('product-img')){
            if(productContainer.classList.contains('favourite')){
                productContainer.classList.remove('favourite')
                productContainer.classList.add('notFavourite')
            }
        }
    }

    render(){
        let displayRecommend = true;

        if(this.state.search !== "") displayRecommend = false;
        return(
            <div className="listings home">
                <div className="home-header">
                    <img src={logo} alt=""/>
                    <h2>Shoppable</h2>
                </div>
                <div className="search">
                    <img src={search} alt=""/>
                    <input className="" type="text" placeholder="search" value={this.state.search} onChange={this.search}/>
                </div>
                <p className="subheading" style={{display: displayRecommend ? 'block' : 'none'}}><strong>Recommended for you</strong></p>
                {this.state.products.filter(product => (product.title).toLowerCase().includes((this.state.search).toLowerCase())).map((product, index) => 
                    <div className="product" key={index}>
                        <div className={`product-img ${product.isFavourite ? "favourite": "notFavourite"}`}>
                            <img alt="" src={product.img}/>
                            <IconContext.Provider value={{className: 'icon icon-notFavourite'}}>
                            <div onClick={(e) => this.addToFavourites(e, product)}>
                                <AiOutlineHeart />
                            </div>
                            </IconContext.Provider>
                            <IconContext.Provider value={{className: 'icon icon-favourite'}}>
                                <div onClick={(e) => this.removeFromFavourites(e, product)}>
                                    <AiFillHeart/>
                                </div>
                            </IconContext.Provider>
                        </div>
                        <div className="product-content" onClick={() => this.props.detailsCallback(product)}>
                            <div className="product-title-price">
                                <p>{product.title}</p>
                                <p className="price">${product.price}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}