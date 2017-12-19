import React, { Component } from 'react'
import { Tabs, Tab } from "material-ui";
import {
	ActionBookmarkBorder as TypesIcon,
	ActionChromeReaderMode as CustomFieldsIcon,
	EditorLinearScale as StatesIcon
} from 'material-ui/svg-icons'
import { ServiceFail, Loading } from '../../../../common/components'
import Types from '../containers/Types'
import States from '../containers/States'
import CustomFields from '../containers/CustomFields'

const sortByposition = (a, b) => (a.position - b.position)

class Panel extends Component {
	setTypes = data => {
		this.props.setTypes(
			data.ticketMetadata.types.map(({__typename, ...rest}) => rest)
		);
	}

	setFields = data => {
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
	}

	setStates = data => {
		this.props.setStates(
			data.ticketMetadata.states.map(({__typename, ...rest}) => ({
				...rest,
				came_from: do {
					if(rest.came_from && rest.came_from.length)
						rest.came_from.map(({__typename, ...rest}) => rest)
					else null
				}
			}))
		);
	}

	componentWillReceiveProps = ({data}) => {
		if(data.ticketMetadata){
			this.setTypes(data);
			this.setFields(data);
			this.setStates(data);		
		}
	}

	render = () => {
		if(this.props.data.loading) return <Loading/>;
		return(
			<div>
				<Tabs>
					<Tab
						label={"Tipos de Ticket"}
						icon={<TypesIcon/>}
					>
						<Types/>
					</Tab>
					<Tab
						label={"Estados"}
						icon={<StatesIcon/>}
					>
						<States resetData={() => this.setStates(this.props.data)}/>
					</Tab>
					<Tab
						label={"Campos Personalizables"}
						icon={<CustomFieldsIcon/>}
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