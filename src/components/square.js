import React, { Component } from 'react';
import { updateQuantity } from '../helpers/data'

import Paper from 'material-ui/Paper';
import Ripples from 'react-ripples'
import {deepOrange500} from 'material-ui/styles/colors'


const style = {
  height: 100,
  width: 100,
  margin: 20,
  backgroundColor: deepOrange500,
  textAlign: 'center',
  display: 'inline-block',
};

class Square extends Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        console.log(this.props.name)
        console.log(this.props.quantity)

        updateQuantity(this.props.name, this.props.quantity, () => {
            console.log("Yeeey");
        } );
    }

    render() {
        return (
            <Ripples onClick={this.handleClick}>
                <Paper style={style} zDepth={3}>
                    {this.props.name}
                </Paper>
            </Ripples>
        );
    }
}

export default Square;