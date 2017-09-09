import React from 'react';
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

const PaperGroup = () => (
  <div>
      <Ripples>
        <Paper style={style} zDepth={3} />
      </Ripples>
      <Ripples>
        <Paper style={style} zDepth={3} />
      </Ripples>
      <Ripples>
        <Paper style={style} zDepth={3} />
      </Ripples>
      <Ripples>
        <Paper style={style} zDepth={3} />
      </Ripples>
      <Ripples>
        <Paper style={style} zDepth={3} />
      </Ripples>
      <Ripples>
        <Paper style={style} zDepth={3} />
      </Ripples>
      <Ripples>
        <Paper style={style} zDepth={3} />
      </Ripples>
  </div>
);

export default PaperGroup;