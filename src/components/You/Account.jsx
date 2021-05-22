import React, { Component } from "react";
import {IconContext} from "react-icons";
import {AiFillStar} from 'react-icons/ai';
import smile from '../../smile.png';
import face from '../../face.png';
import frown from '../../frown.png';
import profile from '../../profile.png';
import back from '../../back.png';

export default class Account extends Component{
    render(){
        return(
            <React.Fragment>
                <div className="navbar" onClick={this.props.backCallback}>
                    <img src={back} alt=""/>
                    <p>account</p>
                </div>
                <div className="account-header-img">
                    <img src={profile} alt=""/>
                </div>
                <div className="account container">
                    <div className="account-heading">
                        <h4 className="subheading">anna_lynn89</h4>
                        <p>
                            <div>
                            Seller Rating 4.6 &nbsp;
                            </div>
                        <IconContext.Provider value={{color: '#F0CE69'}}>
                            <div>
                                <AiFillStar />
                            </div>
                        </IconContext.Provider>
                        </p>
                    </div>

                    <hr/>

                    <div className="account-section">
                        <p className="greyheading">Name</p>
                        <p>Jane Doe</p>

                        <p className="greyheading">Location</p>
                        <p>Christchurch</p>

                    </div>

                    <p className="account-section subheading"><strong>Seller Reviews</strong></p>

                    <hr/>

                    <div className="account-section">
                        <p><img alt="" src={smile}/> 4 positive</p>
                        <p><img alt="" src={face} /> 1 neutral</p>
                        <p><img alt="" src={frown} /> 0 negative</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}