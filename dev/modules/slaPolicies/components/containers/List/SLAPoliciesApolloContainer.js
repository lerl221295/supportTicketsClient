import React from 'react'
// React Apollo
import { graphql, compose } from 'react-apollo'
// Containers
import SLAPoliciesContainer from './../List/SLAPoliciesContainer'
// Graphql Querys
import { GetSLAPolicies } from '../../../graphql/querys'
// Graphql Mutations
import { UpdateSLAPoliciesOrder, ActiveSLAPolicy, DeleteSLAPolicy } from '../../../graphql/mutations'
// React Redux
import {connect} from 'react-redux'
// Redux Actions
import { openAlert } from '../../../../../common/actions/alert'
// Lodash
import _ from 'lodash'
// Utils
import orderPoliciesByPosition from '../../../../../common/utils/orderArrayByProp'

export default compose(
	graphql(GetSLAPolicies),
	graphql(UpdateSLAPoliciesOrder, {
		props: ({ mutate }) => ({
			saveNewOrder: (slapolicies) => mutate({
				variables: { slapolicies },
				update: (proxy, {data: { updateSLAPoliciesOrder } }) => {
					try {
						const data = proxy.readQuery({
							query: GetSLAPolicies
						});
						data.SLAPolicies = data.SLAPolicies.map(policy => {
							const updatedPolicyIndex = _.findIndex(updateSLAPoliciesOrder, ['id', policy.id]);
							return ({
								...policy, ...updateSLAPoliciesOrder[updatedPolicyIndex]
							})
						});
						data.SLAPolicies = _.orderBy(data.SLAPolicies, ['position'], ['asc']);
						proxy.writeQuery({ query: GetSLAPolicies,  data });
					}
					catch(e){
						// console.log(e);
					}
				}
			})
		})
	}),
	graphql(ActiveSLAPolicy, {
		props: ({ mutate }) => ({
			activePolicy: (slapolicy) => mutate({
				variables: { slapolicy },
				update: (proxy, {data: { updateSLAPolicy } }) => {
					try {
						const data = proxy.readQuery({
							query: GetSLAPolicies
						});
						let updatedPolicyIndex = _.findIndex(data.SLAPolicies, { 'id': updateSLAPolicy.id });
						data.SLAPolicies[updatedPolicyIndex] = {...data.SLAPolicies[updatedPolicyIndex], ...updateSLAPolicy};
						proxy.writeQuery({ query: GetSLAPolicies, data });
					}
					catch(e){
						// console.log(e);
					}
				}
			})
		})
	}),
	graphql(DeleteSLAPolicy, {
		props: ({ mutate }) => ({
			deletePolicy: (id) => mutate({
				variables: { id },
				update: (proxy, {data: { deleteSLAPolicy } }) => {
					try {
						const data = proxy.readQuery({
							query: GetSLAPolicies
						});
						let deletedPolicyIndex = _.findIndex(data.SLAPolicies, { 'id': deleteSLAPolicy.id });
						data.SLAPolicies.splice(deletedPolicyIndex, 1);
						proxy.writeQuery({ query: GetSLAPolicies, data: { SLAPolicies: orderPoliciesByPosition(data.SLAPolicies, deletedPolicyIndex)} });
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
