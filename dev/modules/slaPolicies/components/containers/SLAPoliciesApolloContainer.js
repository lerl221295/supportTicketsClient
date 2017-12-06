import React from 'react'
import { graphql, compose } from 'react-apollo'
import SLAPoliciesContainer from './SLAPoliciesContainer'
import getSLAPolicies from '../../graphql/querys/slaPolicies.graphql'
import UpdateSLAPoliciesOrder from '../../graphql/mutations/updateSLAPoliciesOrder.graphql'
import {connect} from "react-redux"
import { openAlert } from '../../../../common/actions/alert'

const ApolloPoliciesContainer = compose(
	graphql(getSLAPolicies),
	graphql(UpdateSLAPoliciesOrder, {
		props: ({ mutate }) => ({
			saveNewOrder: (slapolicies) => mutate({
				variables: { slapolicies },
				update: (proxy, {data: { updateSLAPoliciesOrder } }) => {
					try {
						proxy.writeQuery({ query: getSLAPolicies,  data: { SLAPolicies: updateSLAPoliciesOrder} });
					}
					catch(e){
						// console.log(e);
					}
				}
			})
		})
	}),
	connect(null, { openAlert })
)(SLAPoliciesContainer);

export default () => <ApolloPoliciesContainer/>
