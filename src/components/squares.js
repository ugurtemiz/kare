import React, { Component } from 'react'
import { retrieveSquares } from '../helpers/data'
import Square from './square'

class Squares extends Component {

    constructor (props) {
        super(props);

        this.state = {
            squares : []
        } 
    }
    
    renderSquares() {
        var result = [];
        var array = this.state.squares;
        for (var key in array) {
            if (array.hasOwnProperty(key)) {
                result.push(
                    <Square key={key} name={array[key].name} />
                );
            }
        }  
        return result;
    }
    componentDidMount () {
        retrieveSquares( (squares) => {
            this.setState({ squares });
        });
    }

    render() {
        return (
            <div>
                { this.renderSquares() }
            </div>
        );
    }
}

export default Squares;