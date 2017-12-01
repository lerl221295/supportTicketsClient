import React, { Component } from 'react';
import { connect } from 'react-redux'
//import { change_text } from '../actions/search'
import TextField from 'material-ui/TextField'
import {white, blue500} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import Search from 'material-ui/svg-icons/action/search'
import Clear from 'material-ui/svg-icons/content/clear'
import { Grid, Row, Col } from 'react-flexbox-grid'
import theme from '../../theme-default'

class SearchBox extends Component {
	state = {text: ''};
	
	search = () =>  this.props.search(this.state.text);
	
	clear = () => {
		if(this.state.text != '') this.props.search('');
		this.setState({text: ''});
	}
	
	render = () => {
		const searchStyle = {
			margin: '0.5rem 1rem',
			boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
			backgroundColor: '#fff'
		};
		
		return (
      <Row center="md" style={searchStyle}>
        <Col md={1}>
          <IconButton onClick={this.search}>
            <Search color={theme.palette.accent1Color} />
          </IconButton>
        </Col>
        <Col md={10}>
          <TextField
            hintText="Search..."
            underlineShow={false}
            fullWidth={true}
            onKeyPress={e => { if(e.key == 'Enter') this.search() }}
            onChange={e => this.setState({text: e.target.value})}
            value={this.state.text}
          />
        </Col>
        <Col md={1}>
          <IconButton onClick={this.clear}>
            <Clear color={theme.palette.accent1Color} />
          </IconButton>
        </Col>
      </Row>
		);
	}
}

export default /*connect(null, { change_text })(*/SearchBox/*);*/
