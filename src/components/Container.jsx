import React, {Component} from 'react';
import Home from './Home/Home';
import You from './You/You';
import Cart from './Cart/Cart';
import Favourites from './Favourites/Favourites';
import { HiOutlineHome } from 'react-icons/hi';
import { HiHome } from 'react-icons/hi';
import {AiOutlineHeart} from 'react-icons/ai';
import {AiFillHeart} from 'react-icons/ai';
import {IoCart} from 'react-icons/io5';
import {IoCartOutline} from 'react-icons/io5';
import {RiUser3Fill} from 'react-icons/ri';
import {RiUser3Line} from 'react-icons/ri';
import { IconContext } from "react-icons";

export default class Container extends Component{
    constructor(props){
        super(props)

        this.state = {
            screenState: "home",
            homeClicked: false,
            youClicked: false,
            cartClicked: false,
        }
    }
    
    youCallback = (state) => {
        this.setState({screenState: state})

        let allTabs = document.querySelectorAll('.tab')
        allTabs[3].classList.remove('active')
        allTabs[3].classList.add('inactive')

        if(state === 'favourites') {
            allTabs[1].classList.remove('inactive')
            allTabs[1].classList.add('active')
        }
        if(state === 'cart') {
            allTabs[2].classList.remove('inactive')
            allTabs[2].classList.add('active')
        }
    }

    changeState = (e, state) => {
        this.setState({screenState: state})

        let allTabs = document.querySelectorAll('.tab')

        let currentTab = document.querySelector('.' + state + '-tab')

        currentTab.classList.add('active')
        currentTab.classList.remove('inactive')

        allTabs.forEach(el => {
            if(el !== currentTab) {
                el.classList.remove('active')
                el.classList.add('inactive')
            }
        })

        if(state === "home") this.setState({homeClicked: true})
        else if(state === "cart") this.setState({cartClicked: true})
        else if(state === "you") this.setState({youClicked: true})
    }

    render(){
        let currentState;

        if(this.state.screenState === "home") currentState = <Home homeClickedCallback={() => this.setState({homeClicked: false})} clicked={this.state.homeClicked}/>
        else if(this.state.screenState === "you") currentState = <You youClickedCallback={() => this.setState({youClicked: false})} clicked={this.state.youClicked} masterCallback={this.youCallback}/>
        else if(this.state.screenState === "cart") currentState = <Cart cartClickedCallback={() => this.setState({cartClicked: false})} clicked={this.state.cartClicked}/>
        else currentState = <Favourites/>
        return(
            <React.Fragment>
                {currentState}
                <div className="tabs">
                    <div className="tab active home-tab" onClick={(e) => this.changeState(e, 'home')}>
                        <IconContext.Provider value={{className: 'icon-inactive'}}>
                            <div>
                                <HiOutlineHome />
                            </div>
                        </IconContext.Provider>
                        <IconContext.Provider value={{className: 'icon-active'}}>
                            <div>
                                <HiHome/>
                            </div>
                        </IconContext.Provider>
                        <p>Home</p>
                    </div>
                    <div className="tab inactive favourites-tab" onClick={(e) => this.changeState(e, "favourites")}>
                        <IconContext.Provider value={{className: 'icon-inactive'}}>
                            <div>
                                <AiOutlineHeart />
                            </div>
                        </IconContext.Provider>
                        <IconContext.Provider value={{className: 'icon-active'}}>
                            <div>
                                <AiFillHeart/>
                            </div>
                        </IconContext.Provider>
                        <p>Favourites</p>
                    </div>
                    <div className="tab inactive cart-tab" onClick={(e) => this.changeState(e, "cart")}>
                        <IconContext.Provider value={{className: 'icon-inactive'}}>
                            <div>
                                <IoCartOutline />
                            </div>
                        </IconContext.Provider>
                        <IconContext.Provider value={{className: 'icon-active'}}>
                            <div>
                                <IoCart/>
                            </div>
                        </IconContext.Provider>
                        <p>Cart</p>
                    </div>
                    <div className="tab inactive you-tab" onClick={(e) => this.changeState(e, "you")}>
                        <IconContext.Provider value={{className: 'icon-inactive'}}>
                            <div>
                                <RiUser3Line />
                            </div>
                        </IconContext.Provider>
                        <IconContext.Provider value={{className: 'icon-active'}}>
                            <div>
                                <RiUser3Fill/>
                            </div>
                        </IconContext.Provider>
                        <p>You</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}