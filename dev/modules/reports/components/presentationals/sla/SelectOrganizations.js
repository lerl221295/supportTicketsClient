import React from 'react'
import { withApollo } from 'react-apollo'
import { Field, reduxForm } from 'redux-form'
import { DatePicker } from 'redux-form-material-ui'
import { Row, Col } from 'react-flexbox-grid'
import {
	renderSelectReactField
} from '../../../../../common/components/ReduxFormComponents'
import GetOrganizations from '../../../graphql/querys/organizationsNames.graphql'

const ApolloContainer = withApollo(({client: apolloClient, ...rest}) => {
	const searchOrganizations = (search_text) => (
		apolloClient.query({
			query: GetOrganizations,
			variables: {search_text}
		})
		.then( ({data} ) => ({options: data.organizations.nodes}))
	);
	return <Organizations searchOrganizations={searchOrganizations} {...rest}/>
});

const Organizations = reduxForm({form: 'reportSlaOrganizations'})(({searchOrganizations}) => (
	<Row>
		<Col xs={12}>
			<Field
				name="organizations"
				component={renderSelectReactField}
				label="Organizaciones"
				placeholder="Seleccione las organizaciones"
				loadOptions={searchOrganizations}
				multi
			/>
		</Col>
	</Row>
))

export default ApolloContainer