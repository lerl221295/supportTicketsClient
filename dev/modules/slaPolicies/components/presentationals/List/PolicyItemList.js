import React from 'react';
// MAterial UI
import {Divider, IconButton, ListItem, Toggle} from "material-ui";
// Material Icons
import { ActionDelete as Delete, ActionOpenWith as Order } from "material-ui/svg-icons";
// React Router
import { Link } from 'react-router'
// Lodash
import _ from 'lodash'

export default class PolicyItemList extends React.Component {
	
	shouldComponentUpdate = (nextProps, nextState) => {
		// console.log('igualiiiitos---', _.isEqual(this.props, nextProps))
		if (_.isEqual(this.props, nextProps))
			return false;
		return true
	};
	
	render = () => {
		let { id, name, description, active, by_default, reorder, handleToggleChange, deletePolicy } = this.props;
		return (
			<div>
				<ListItem
					primaryText={<Link to={`/admin/sla/${id}`}>{name}</Link>}
					secondaryText={description}
					leftCheckbox={
						do {
							if (!reorder) {
								<Toggle toggled={active}
								        disabled={by_default}
								        onToggle={ do { if (handleToggleChange) handleToggleChange(id) } }
								/>;
							}
						}
					}
					leftIcon={
						do {
							if (reorder) {<Order />;}
						}
					}
					rightIconButton={
						do {
							if (!by_default && !reorder) {
								<IconButton
									tooltip="Eliminar política"
									disabled={by_default}
									onClick={
										do { if (deletePolicy) deletePolicy(id) }
									}
								>
									<Delete />
								</IconButton>;
							}
						}
					}
					disabled={by_default}
					style={{
						opacity: do { if (by_default && reorder) '0.4' },
						cursor: do { if (reorder && !by_default) '-webkit-grab' }
					}}
				/>
				<Divider />
			</div>
		)
	}
}
