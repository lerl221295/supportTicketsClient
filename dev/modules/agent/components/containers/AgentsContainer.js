import React from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import { push } from 'react-router-redux'
import Panel from '../presentationals/Panel'
import Agents from '../../graphql/querys/agents.graphql'
import Suppliers from '../../graphql/querys/suppliers.graphql'
import Groups from '../../graphql/querys/groups.graphql'

const limitForPage = 7;

const PanelContainer = compose(
	graphql(Agents, {name: 'agents'}),
	graphql(Suppliers, {name: 'suppliers'}),
	graphql(Groups, {name: 'groups'}),
    connect(null, { push })
)(Panel);

export default props => <PanelContainer {...props} limit={limitForPage} />