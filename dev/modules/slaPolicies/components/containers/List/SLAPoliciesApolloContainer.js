import React from 'react'
import { graphql, compose } from 'react-apollo'
import SLAPoliciesContainer from './List/SLAPoliciesContainer'
import getSLAPolicies from '../../graphql/querys/slaPolicies.graphql'
import UpdateSLAPoliciesOrder from '../../graphql/mutations/updateSLAPoliciesOrder.graphql'
import ActiveSLAPolicy from '../../graphql/mutations/activeSLAPolicy.graphql'
import DeleteSLAPolicy from '../../graphql/mutations/deleteSLAPolicy.graphql'
import {connect} from "react-redux"
import { openAlert } from '../../../../common/actions/alert'
import _ from 'lodash'
import {orderPoliciesByPosition} from "../../utils";

const ApolloPoliciesContainer = compose(
	graphql(getSLAPolicies),
	graphql(UpdateSLAPoliciesOrder, {
		props: ({ mutate }) => ({
			saveNewOrder: (slapolicies) => mutate({
				variables: { slapolicies },
				update: (proxy, {data: { updateSLAPoliciesOrder } }) => {
					try {
						const data = proxy.readQuery({
							query: getSLAPolicies
						});
						data.SLAPolicies = data.SLAPolicies.map(policy => {
							const updatedPolicyIndex = _.findIndex(updateSLAPoliciesOrder, ['id', policy.id]);
							return ({
								...policy, ...updateSLAPoliciesOrder[updatedPolicyIndex]
							})
						});
						data.SLAPolicies = _.orderBy(data.SLAPolicies, ['position'], ['asc']);
						proxy.writeQuery({ query: getSLAPolicies,  data });
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
			updatePolicy: (slapolicy) => mutate({
				variables: { slapolicy },
				update: (proxy, {data: { updateSLAPolicy } }) => {
					try {
						const data = proxy.readQuery({
							query: getSLAPolicies
						});
						let updatedPolicyIndex = _.findIndex(data.SLAPolicies, { 'id': updateSLAPolicy.id });
						data.SLAPolicies[updatedPolicyIndex] = {...data.SLAPolicies[updatedPolicyIndex], ...updateSLAPolicy};
						proxy.writeQuery({ query: getSLAPolicies, data });
						const data2 = proxy.readQuery({
							query: getSLAPolicies
						});
						// console.log('data2', data2);
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
							query: getSLAPolicies
						});
						let deletedPolicyIndex = _.findIndex(data.SLAPolicies, { 'id': deleteSLAPolicy.id });
						data.SLAPolicies.splice(deletedPolicyIndex, 1);
						proxy.writeQuery({ query: getSLAPolicies, data: { SLAPolicies: orderPoliciesByPosition(data.SLAPolicies, deletedPolicyIndex)} });
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
