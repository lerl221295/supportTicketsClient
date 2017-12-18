import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Row, Col } from 'react-flexbox-grid'
import { List, ListItem, Subheader, Divider } from 'material-ui'
import { ContentDeleteSweep as Delete } from "material-ui/svg-icons"
import { deleteOption } from '../../../actions/customFields'
import Theme from '../../../../../theme-default'

const SelectOptionsList = (props) => {
	const {
		options,
		deleteOption
	} = props;

	if(!options.length) return <Subheader>Agregue Opciones</Subheader>

	return(
		<List>
			<Subheader>Opciones</Subheader>
			{options.map(({key, label}, i) => (
				<div key={key}>
					<ListItem 
						primaryText={label}
						secondaryText={`key: ${key}`}
						rightIcon={
							<Delete 
								hoverColor={Theme.palette.accent1Color}
								onClick={() => deleteOption({ key })} 
							/>
						}
					/>			
					<Divider/>
				</div>
			))}
		</List>
	)
};

export default connect(
	({ticketFields: {customFields: {modals: {selectField: {options}}} } }) => ({
		options
	}),
	{ deleteOption }
)(SelectOptionsList)