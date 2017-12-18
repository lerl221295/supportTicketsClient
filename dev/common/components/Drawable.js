import React, { Component } from 'react'
import hexToRgbA from '../utils/hexToRgbA'
import Theme from '../../theme-default'

export default WrappedComponent => class Drawable extends Component {
	reorderItems = (startIndex, endIndex) => {
		const result = Array.from(this.props[this.props.itemsName]);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result.map((item, i) => ({
			...item,
			position: i+1
		}))
	};

	onDragEnd = ({source, destination}) => {
		// dropped outside the list
		if (!destination) {
			return;
		}

		const { setItems } = this.props;
		const items = this.reorderItems(source.index, destination.index);
		
		setItems(items);
	};

	getItemStyle = (draggableStyle, isDragging) => {
		// console.log('draggableStyle', draggableStyle);
		return ({
			// some basic styles to make the items look a bit nicer
			userSelect: 'none',
			// change background colour if dragging
			backgroundColor: do {
				if (isDragging) hexToRgbA(Theme.palette.primary1Color, 0.5);
				else ''
			},
			// styles we need to apply on draggables
			...draggableStyle,
		});
	}

	render = () => (
		<WrappedComponent 
			{...this.props}
			onDragEnd={this.onDragEnd}
			getItemStyle={this.getItemStyle}
		/>
	)

}