import React, { Component } from 'react'
import { Tabs, Tab } from "material-ui";
import Person from 'material-ui/svg-icons/social/person'
import Organization from 'material-ui/svg-icons/communication/business'
import { ServiceFail, Loading } from '../../../../common/components'
import Types from '../containers/Types'
import States from '../containers/States'
import CustomFields from '../containers/CustomFields'

const sortByposition = (a, b) => (a.position - b.position)

class Panel extends Component {
	componentWillReceiveProps = ({data}) => {
		if(data.ticketMetadata){
			this.props.setTypes(
				data.ticketMetadata.types.map(({__typename, ...rest}) => rest)
			);		
			this.props.setFields(
				data.ticketMetadata.custom_fields.map(({__typename, ...rest}) => {
					if(rest.type !== "SELECT") return rest;
					return ({
						...rest,
						options: rest.options.map(({__typename, ...rest}) => rest)
							.sort(sortByposition)
					})
				}).sort(sortByposition)
			);
			this.props.setStates(
				data.ticketMetadata.states.map(({__typename, ...rest}) => ({
					...rest,
					came_from: do {
						if(rest.came_from && rest.came_from.length)
							rest.came_from.map(({__typename, ...rest}) => rest)
						else null
					}
				}))
			)
		}
	}

	render = () => {
		if(this.props.data.loading) return <Loading/>;
		return(
			<div>
				<Tabs>
					<Tab
						label={"Tipos de Ticket"}
						icon={<Person/>}
					>
						<Types/>
					</Tab>
					<Tab
						label={"Estados"}
						icon={<Organization/>}
					>
						<States/>
					</Tab>
					<Tab
						label={"Campos Personalizables"}
						icon={<Organization/>}
					>
						<CustomFields/>
					</Tab>
				</Tabs>
			</div>
		)
		if (this.props.data.error) return <ServiceFail />;
	}
}

export default Panel