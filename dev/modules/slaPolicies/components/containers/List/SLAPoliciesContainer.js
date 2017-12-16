import React, { Component } from 'react'
//React Router Redux
import { push } from 'react-router-redux'
// React Redux
import { connect } from 'react-redux'
// Presentationals Components
import PanelPolicies from '../../presentationals/List/PoliciesPanelList'
// Default Theme
import theme from '../../../../../theme-default'
// Common Utils
import getItemStyle from '../../../../../common/utils/getItemDraggableStyle'
import orderPoliciesByPosition from '../../../../../common/utils/orderArrayByProp'

@connect(null, { push })
class Panel extends Component {
	
	state = {
		SLAPolicies: [],
		prevSLAPolicies: [],
		reorder: false
	};
	
	componentWillReceiveProps = ({data: { SLAPolicies }}) => {
		this.setState({
			SLAPolicies
		});
	};
	
	reorderPolicies = ([...list], startIndex, endIndex) => {
		const [removed] = list.splice(startIndex, 1);
		list.splice(endIndex, 0, removed);
		return orderPoliciesByPosition(list, startIndex, endIndex);
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
	
	handleToggleChange = (id) => (e, active) => {
		this.props.updatePolicy({id, active})
			.then(response => {
				let change = do {
					if (active) 'activada';
					else 'desactivada';
				};
				this.props.openAlert(`Política SLA ${change} con éxito`);
			})
	};
	
	deletePolicy = (id) => (e) => {
		this.props.deletePolicy(id)
			.then(({data: {deleteSLAPolicy: {name}}}) => {
				this.props.openAlert(`Política SLA ${name} eliminada con éxito`);
			})
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
			deletePolicy={this.deletePolicy}
			handleToggleChange={this.handleToggleChange}
			push={this.props.push}
		/>
	)
}

export default Panel;