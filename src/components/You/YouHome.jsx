import React, { Component } from "react";
import { IconContext } from "react-icons";
import {IoCartOutline} from 'react-icons/io5';
import {AiOutlineHeart} from 'react-icons/ai';
import {RiUser3Line} from 'react-icons/ri';
import {AiFillTag} from 'react-icons/ai';
import logo from '../../logo.png';

export default class YouHome extends Component{
    constructor(props){
        super(props)

        this.state = {
            
        }
    }
    render(){
        return(
            <div className="YouHome container">
                <div className="group">
                    <h2><img alt="" src={logo}/>Hi, Anna!</h2>
                </div>
                <div className="group">
                    <p className="subheading bold">My Account</p>
                    <div className="link" onClick={() => this.props.callback('account')}>
                        <IconContext.Provider value={{className: 'you-icons'}}>
                            <div>
                                <RiUser3Line />
                            </div>
                        </IconContext.Provider>
                        Account Details
                    </div>
                </div>
                <div className="group">
                    <p className="subheading bold"><strong>Buying</strong></p>
                    <div className="link" onClick={() => this.props.masterCallback('favourites')}>
                        <IconContext.Provider value={{className: 'you-icons'}}>
                            <div>
                                <AiOutlineHeart />
                            </div>
                        </IconContext.Provider>
                        Favourites
                    </div>
                    <div className="link" onClick={() => this.props.masterCallback('cart')}>
                        <IconContext.Provider value={{className: 'you-icons'}}>
                            <div>
                                <IoCartOutline />
                            </div>
                        </IconContext.Provider>
                        Shopping Cart
                    </div>
                </div>
                <div className="group">
                    <p className="subheading bold"><strong>Selling</strong></p>
                    <div className="link" onClick={() => this.props.callback('listings')}>
                        <IconContext.Provider value={{className: 'you-icons'}}>
                            <div>
                                <AiFillTag />
                            </div>
                        </IconContext.Provider>
                        Listed Items
                    </div>
                    <button onClick={() => this.props.callback('list-new')}>List a new item</button>
                </div>
            </div>
        )
    }
}