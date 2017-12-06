import React, { Component } from 'react'
import theme from '../../../../theme-default'
import PanelPolicies from '../presentationals/Panel'

const hexToRgbA = (hex, opacity = 1) => {
	let c;
	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
		c= hex.substring(1).split('');
		if(c.length== 3){
			c= [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		c= '0x'+c.join('');
		return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+`,${opacity})`;
	}
	throw new Error('Bad Hex');
};

const getItemStyle = (draggableStyle, isDragging) => {
	// console.log('draggableStyle', draggableStyle);
	return ({
		// some basic styles to make the items look a bit nicer
		userSelect: 'none',
		// change background colour if dragging
		backgroundColor: do {
			if (isDragging) hexToRgbA(theme.palette.primary1Color, 0.5);
			else ''
		},
		// styles we need to apply on draggables
		...draggableStyle,
	});
};

class Panel extends Component {
	
	state = {
		SLAPolicies: [],
		prevSLAPolicies: [],
		reorder: false
	};
	
	componentWillReceiveProps = ({data: { SLAPolicies }}) => {
		/*if (!this.state.SLAPolicies.length) {
			this.setState({
				SLAPolicies
			});
		}*/
		this.setState({
			SLAPolicies
		});
	};
	
	reorderPolicies = (list, startIndex, endIndex) => {
		const result = [...list];
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		let startLoopIndex = startIndex, endLoopIndex = endIndex;
		if (startIndex > endIndex) {
			startLoopIndex = endIndex;
			endLoopIndex = startIndex;
		}
		for (let i = startLoopIndex; i <= endLoopIndex; i++) {
			result[i] = {...result[i], position: i};
		}
		return result;
	};
	
	onDragEnd = ({source, destination}) => {
		// dropped outside the list
		if (!destination) {
			return;
		}
		
		const SLAPolicies = this.reorderPolicies(
			this.state.SLAPolicies,
			source.index,
			destination.index
		);
		
		this.setState({
			SLAPolicies
		});
	};
	
	handleReorderAction = () => {
		let prevSLAPolicies = do {
			if (!this.state.reorder) [...this.state.SLAPolicies];
			else [];
		};
		
		this.setState({
			reorder: !this.state.reorder,
			prevSLAPolicies
		});
		
	};
	
	saveReorder = () => {
		let orderedSLAPolicies = this.state.SLAPolicies.map(
			({id, position}) => ({
				id,
				position
			})
		);
		
		this.props.saveNewOrder(orderedSLAPolicies)
			.then(response => {
				this.props.openAlert("Orden de políticas SLA actualizado con éxito!");
				this.handleReorderAction();
			})
	};
	
	cancelReorder = () => {
		this.setState({
			SLAPolicies: this.state.prevSLAPolicies
		});
		this.handleReorderAction();
	};
	
	render = () => (
		<PanelPolicies
			{...this.state}
			loading={this.props.data.loading}
			saveNewOrder={this.props.saveNewOrder}
			handleReorderAction={this.handleReorderAction}
			onDragEnd={this.onDragEnd}
			getItemStyle={getItemStyle}
			saveReorder={this.saveReorder}
			cancelReorder={this.cancelReorder}
		/>
	)
}

export default Panel;