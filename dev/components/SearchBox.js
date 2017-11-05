import React, { Component } from 'react';
import { connect } from 'react-redux'
import { change_text } from '../actions/search'
import TextField from 'material-ui/TextField'
import {white, blue500} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import Search from 'material-ui/svg-icons/action/search'
import Clear from 'material-ui/svg-icons/content/clear'

class SearchBox extends Component {
  state = {text: ''};
  
  search = () =>  this.props.change_text(this.state.text);

  clear = () => {
    this.setState({text: ''});
    this.props.change_text('');
  }

  render = () => {
    const styles = {
      iconButton: {
        float: 'left',
        paddingTop: 17
      },
      textField: {
        color: white,
        backgroundColor: blue500,
        borderRadius: 2,
        height: 35
      },
      inputStyle: {
        color: white,
        paddingLeft: 5
      },
      hintStyle: {
        height: 16,
        paddingLeft: 5,
        color: white
      }
    };

    return (
      <div>
        <IconButton style={styles.iconButton} onClick={this.search}>
          <Search color={white} />
        </IconButton>
        <IconButton style={{float: 'right', paddingTop: 17 }} onClick={this.clear}>
          <Clear color={white} />
        </IconButton>
        <TextField
          hintText="Search..."
          underlineShow={false}
          fullWidth={true}
          style={styles.textField}
          inputStyle={styles.inputStyle}
          hintStyle={styles.hintStyle}
          onKeyPress={e => { if(e.key == 'Enter') this.search() }}
          onChange={e => this.setState({text: e.target.value})}
          value={this.state.text}
        />
        
      </div>
    );
  }
}

export default connect(null, { change_text })(SearchBox);
