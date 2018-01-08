import React from 'react'
// React Apollo
import { graphql, compose } from 'react-apollo'
// Containers
import SLAPoliciesContainer from './ListContainer'
// Graphql Querys
import { GetDispatchers } from '../../../graphql/querys'
// Graphql Mutations
import { DeleteDispatcher } from '../../../graphql/mutations'
// React Redux
import {connect} from 'react-redux'
//React Router Redux
import { push } from 'react-router-redux'
// Redux Actions
import { openAlert } from '../../../../../../common/actions/alert'
// Lodash
import _ from 'lodash'

export default compose(
	connect(null, { openAlert, push }),
	graphql(GetDispatchers),
	graphql(DeleteDispatcher, {
		props: ({ mutate }) => {
			return({
				deleteDispatcher: (id) => mutate({
					variables: { id },
					update: (proxy, {data: { deleteDispatcher: { id } } }) => {
						try {
							const data = proxy.readQuery({
								query: GetDispatchers
							});
							proxy.writeQuery({
								query: GetDispatchers,
								data: {
									dispatchers: _.filter(data.dispatchers, dispatcher => dispatcher.id !== id)
								}
							});
						}
						catch(e){
							// console.log(e);
						}
					}
				})
			})
		}
	})
)(SLAPoliciesContainer);
