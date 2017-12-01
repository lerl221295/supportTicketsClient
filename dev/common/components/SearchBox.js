import React, { Component } from 'react';
import { connect } from 'react-redux'
//import { change_text } from '../actions/search'
import TextField from 'material-ui/TextField'
import {white, blue500} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import Search from 'material-ui/svg-icons/action/search'
import Clear from 'material-ui/svg-icons/content/clear'
import { Grid, Row, Col } from 'react-flexbox-grid'

class SearchBox extends Component {
  state = {text: ''};
  
  search = () =>  this.props.search(this.state.text);

  clear = () => {
      if(this.state.text != '') this.props.search('');
      this.setState({text: ''});
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
      <Row center="md">
          <Col md={1}>
              <IconButton onClick={this.search}>
                  <Search color={white} />
              </IconButton>
          </Col>
          <Col md={10}>
              <TextField
                  //hintText="Search..."
                  underlineShow={false}
                  fullWidth={true}
                  style={styles.textField}
                  inputStyle={styles.inputStyle}
                  hintStyle={styles.hintStyle}
                  onKeyPress={e => { if(e.key == 'Enter') this.search() }}
                  onChange={e => this.setState({text: e.target.value})}
                  value={this.state.text}
              />
          </Col>
          <Col md={1}>
              <IconButton onClick={this.clear}>
                  <Clear color={white} />
              </IconButton>
          </Col>
      </Row>
    );
  }
}

export default /*connect(null, { change_text })(*/SearchBox/*);*/
