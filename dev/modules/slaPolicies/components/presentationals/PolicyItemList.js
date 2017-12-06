import React from 'react';
import {Divider, IconButton, ListItem, Toggle} from "material-ui";
import { ActionDelete as Delete, ActionOpenWith as Order } from "material-ui/svg-icons";

export default (props) => {
	let { id, name, description, active, by_default, reorder, handleToggleChange, deletePolicy } = props;
	// console.log('props---', props)
	return (
		<div>
			<ListItem
				primaryText={<a href="/">{name}</a>}
				secondaryText={description}
				leftCheckbox={
					do {
						if (!reorder)
							<Toggle defaultToggled={active}
							        disabled={by_default}
							        onToggle={
							        	do {
							        		if (handleToggleChange) handleToggleChange(id);
									        else null;
								        }
							        }
							/>;
						else null
					}
				}
				leftIcon={
					do {
						if (reorder) <Order style={{cursor: 'move'}}/>
						else null
					}
				}
				rightIconButton={
					do {
						if (!by_default && !reorder) (
							<IconButton
								tooltip="Eliminar política"
								disabled={by_default}
								onClick={
									do {
										if (deletePolicy) deletePolicy(id);
										else null;
									}
								}
							>
								<Delete />
							</IconButton>
						)
						else null
					}
				}
				disabled={by_default}
				style={{opacity: do { if(by_default && reorder) '0.4'; else ''; }}}
			/>
			<Divider />
		</div>
	)
}
