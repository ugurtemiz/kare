import React, { Component } from 'react';

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
    
    render() {
        return (
            <Ripples>
                <Paper style={style} zDepth={3}>
                    {this.props.name}
                </Paper>
            </Ripples>
        );
    }
}

export default Square;