import React, { Component } from 'react'
import { SpeedDial, BubbleList, BubbleListItem } from 'react-speed-dial';

class WrappedSpeedDial extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isSpeedDialOpen: false
		}
	}
	
	closeSpeedDial = () => {
		this.setState({
			isSpeedDialOpen: !this.state.isSpeedDialOpen
		});
	};
	
	handleChangeSpeedDial = (itemClick) => (e) => {
		this.closeSpeedDial();
		itemClick(e);
	};
	
	render () {
		let {items} = this.props;
		return (
			<SpeedDial
				style={{zIndex: 1}}
				hasBackdrop={false}
				closeOnScrollUp={true}
				isOpen={this.state.isSpeedDialOpen}
				onChange={this.closeSpeedDial}
			>
				<BubbleList>
					{items.map(({itemClick, ...item}, index) => {
						return <BubbleListItem onClick={this.handleChangeSpeedDial(itemClick)} key={index} {...item} />;
					})}
				</BubbleList>
			</SpeedDial>
		);
	}
}

export default WrappedSpeedDial