import React, { Component } from 'react'
// React Flexbox Grid
import {Row, Col} from "react-flexbox-grid"
// Material UI
import {List, ListItem, Divider, FlatButton, Paper} from "material-ui";
import {ContentAddCircleOutline as Add} from 'material-ui/svg-icons'
//  Presentationals Components
import Item from './ItemListConditions'

const styles = {
	paper: {
		padding: '1rem'
	},
	title: {
		fontSize: '1.3rem',
		fontWeight: '500',
		marginBottom: '1.5rem'
	},
	alertType: {
		fontWeight: '400'
	}
};

export default class RenderConditions extends Component {
	
	/*componentWillReceiveProps = ({fields}) => {
		console.log('nextProps----', fields);
	}*/
	
	render = () => {
		let { fields, searchData, ticketsFields } = this.props;
		return (
			<Paper style={styles.paper}>
				<Row center={"xs"}>
					<Col xs={12}>
						<h1 style={styles.title}>Condiciones</h1>
					</Col>
					<Col xs={12}>
						<List>
							{fields.map((conditionName, i) => {
									return (
										<div key={i}>
											<ListItem
												containerElement={
													<Item
														conditionName={conditionName}
														ticketsFields={ticketsFields}
														conditionedField={fields.get(i).conditioned_field}
														searchData={searchData}
														changeField={
															(key) => {
																fields.remove(i);
																fields.insert(i, {
																	conditioned_field: _.find(ticketsFields, {key})
																});
															}
														}
														remove={() => fields.remove(i)}
													/>
												}
											/>
											<Divider />
										</div>
									)
								}
							)}
							<FlatButton
								label="Agregar nueva condición..."
								primary={true}
								icon={ <Add /> }
								onClick={() => fields.push({conditioned_field: {}})}
							/>
						</List>
					</Col>
				</Row>
			</Paper>
		);
	};
}

// ({ fields, searchData, ticketMetadata }) =>