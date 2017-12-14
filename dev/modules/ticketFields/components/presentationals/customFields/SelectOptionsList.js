import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexbox-grid'
import { List, ListItem, Subheader, Divider } from 'material-ui'
import { ContentDeleteSweep as Delete } from "material-ui/svg-icons"
import { deleteOption } from '../../../actions/customFields'
import Theme from '../../../../../theme-default'

const SelectOptionsList = ({options, deleteOption}) => {
	return(
		<Row top="xs">
			<Col xs={12}>
				<List style={{display: do {
					if(options.length) null;
					else "none";
				}}}>
					<Subheader>Opciones</Subheader>
					{
						options.map(({key, label}, i) => (
							<div key={i}>
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
						))
					}
				</List>
			</Col>
		</Row>
	)
};

export default connect(
	({ticketFields: {customFields: {modals: {selectField: {options}}} } }) => ({
		options
	}),
	{ deleteOption }
)(SelectOptionsList)