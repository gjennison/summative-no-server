import React, { Component } from "react";
import axios from "axios";
import {IconContext} from "react-icons";
import {TiTick} from 'react-icons/ti';
import {ImCross} from 'react-icons/im';

export default class Delete extends Component{
    delete = e => {
        axios.delete(`https://dry-river-04948.herokuapp.com/api/products/${this.props.product.id}`, {params: {}})
        console.log(this.props.product.id)
        console.log(this.props.product)
        this.props.callback();
        this.props.confirmDelete(this.props.product)
    }
    
    render(){
        return(
            <React.Fragment>
                <div className="delete modal" style={{display: this.props.displayDelete ? 'flex' : 'none'}}>
                    <div></div>
                    <div className="modal-content">
                        <h4>Are you sure you would like to delete</h4>
                        <div className="delete-options">
                            <IconContext.Provider value={{className: 'delete-icon'}}>
                                <div onClick={() => this.props.callback()}>
                                    <ImCross/>
                                </div>
                            </IconContext.Provider>
                            <IconContext.Provider value={{className: 'delete-icon'}}>
                                <div onClick={this.delete}>
                                    <TiTick/>
                                </div>
                            </IconContext.Provider>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}