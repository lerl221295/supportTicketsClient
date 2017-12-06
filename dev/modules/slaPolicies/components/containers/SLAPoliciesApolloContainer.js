import React from 'react'
import { graphql, compose } from 'react-apollo'
import SLAPoliciesContainer from './SLAPoliciesContainer'
import getSLAPolicies from '../../graphql/querys/slaPolicies.graphql'
import UpdateSLAPoliciesOrder from '../../graphql/mutations/updateSLAPoliciesOrder.graphql'
import UpdateSLAPolicy from '../../graphql/mutations/updateSLAPolicy.graphql'
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
						proxy.writeQuery({ query: getSLAPolicies,  data: { SLAPolicies: updateSLAPoliciesOrder} });
					}
					catch(e){
						// console.log(e);
					}
				}
			})
		})
	}),
	graphql(UpdateSLAPolicy, {
		props: ({ mutate }) => ({
			updatePolicy: (slapolicy) => mutate({
				variables: { slapolicy },
				update: (proxy, {data: { updateSLAPolicy } }) => {
					try {
						const data = proxy.readQuery({
							query: getSLAPolicies
						});
						let updatedPolicyIndex = _.findIndex(data.SLAPolicies, { 'id': updateSLAPolicy.id });
						data.SLAPolicies[updatedPolicyIndex] = updateSLAPolicy;
						proxy.writeQuery({ query: getSLAPolicies, data });
					}
					catch(e){
						// console.log(e);
					}
				}
			})
		})
	}),
	graphql(DeleteSLAPolicy, {
		props: ({ mutate, ...rest }) => ({
			deletePolicy: (id) => mutate({
				variables: { id },
				update: (proxy, {data: { deleteSLAPolicy } }) => {
					try {
						const data = proxy.readQuery({
							query: getSLAPolicies
						});
						let deletedPolicyIndex = _.findIndex(data.SLAPolicies, { 'id': id.id });
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
