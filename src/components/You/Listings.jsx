import React, {Component} from 'react';
import back from '../../back.png';
import {IconContext} from "react-icons";
import {BsTrash} from 'react-icons/bs';
import {FiEdit2} from 'react-icons/fi';

export default class Listings extends Component{
    constructor(props){
        super(props)

        this.state = {
            products: []
        }
    }

    componentDidMount(){
        let temp = []

        this.props.products.forEach(el => {
            temp.push(el)
        })
        temp = temp.filter(x => x.user === "you")
        this.setState({products: temp})
    }

    render(){
        return(
            <React.Fragment>
                <div className="navbar" onClick={this.props.backCallback}>
                    <img src={back} alt=""/>
                    <p>account</p>
                </div>
                {this.state.products.map((product, index) => 
                    <div className="product" key={index}>
                        <div className="product-img">
                            <img alt="" src={product.img}/>
                        </div>

                        <div className="product-content">
                            <div className="product-title-price">
                                <p>{product.title}</p>
                                <p>${product.price}</p>
                            </div>
                            <div className="account-listings-icons">
                                <IconContext.Provider value={{className: 'account-icon icon'}}>
                                    <div onClick={() => this.props.editCallback(product)}>
                                        <FiEdit2/>
                                    </div>
                                </IconContext.Provider>
                                <IconContext.Provider value={{className: 'account-icon icon'}}>
                                    <div onClick={() => this.props.deleteCallback(product)}>
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