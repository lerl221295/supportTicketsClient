import React, { Component } from 'react'
import { Tabs, Tab } from "material-ui";
import Person from 'material-ui/svg-icons/social/person'
import Organization from 'material-ui/svg-icons/communication/business'
import { ServiceFail, Loading } from '../../../../common/components'
import Types from '../containers/Types'
import Status from '../containers/Status'
import CustomFields from '../containers/CustomFields'

class Panel extends Component {
	componentWillReceiveProps = ({data}) => {
		if(data.ticketMetadata)
			this.props.setTypes(
				data.ticketMetadata.types.map(({key, label}) => ({key, label}))
			);		
	}

	render = () => {
		if(this.props.data.loading) return <Loading/>;
		const { status, custom_fields } = this.props.data.ticketMetadata;
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
						label={"Status"}
						icon={<Organization/>}
					>
						<Status
							status={status}
						/>
					</Tab>
					<Tab
						label={"Campos Personalizables"}
						icon={<Organization/>}
					>
						<CustomFields
							custom_fields={custom_fields}
						/>
					</Tab>
				</Tabs>
			</div>
		)
		if (this.props.data.error) return <ServiceFail />;
	}
}

export default Panel