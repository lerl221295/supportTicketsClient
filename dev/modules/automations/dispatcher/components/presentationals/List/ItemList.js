import React from 'react';
// MAterial UI
import {Divider, IconButton, ListItem, Toggle} from "material-ui";
// Material Icons
import { ActionDelete as Delete, ActionOpenWith as Order } from "material-ui/svg-icons";
// React Router
import { Link } from 'react-router'
// Lodash
import _ from 'lodash'

export default class ItemList extends React.Component {
	
	shouldComponentUpdate = (nextProps, nextState) => {
		// console.log('igualiiiitos---', _.isEqual(this.props, nextProps))
		if (_.isEqual(this.props, nextProps))
			return false;
		return true
	};
	
	render = () => {
		let { id, name, description, deleteDispatcher } = this.props;
		return (
			<div>
				<ListItem
					primaryText={<Link to={`/admin/automations/dispatchers/${id}`}>{name}</Link>}
					secondaryText={description}
					rightIconButton={
						<IconButton
							tooltip="Eliminar despachador"
							onClick={ deleteDispatcher(id) }
						>
							<Delete />
						</IconButton>
					}
				/>
				<Divider />
			</div>
		)
	}
}
