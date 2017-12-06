import React from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Divider, Subheader } from 'material-ui'

const Holidays = ({holidays}) => {
	return(
		<List>
			<Subheader>Dias Festivos</Subheader>
			{
				holidays.map(({name, day, month}, i) => (
					<div key={i}>
						<ListItem>
							{`${name} ${day}/${month}`}
						</ListItem>
						<Divider/>
					</div>
				))
			}
		</List>
	)
}

export default connect( ({businessHours: {holidays} }) => ({holidays}))(Holidays)