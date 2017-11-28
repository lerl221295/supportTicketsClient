import React from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import { push } from 'react-router-redux'
import Panel from '../presentationals/Panel'
import Clients from '../../graphql/querys/clients.graphql'
import Organizations from '../../graphql/querys/organizations.graphql'

const limitForPage = 7;

const PanelContainer = compose(
    graphql(Clients, {name: 'clients'}),
    graphql(Organizations, {name: 'organizations'}),
    connect(null, { push })
)(Panel);

export default () => <PanelContainer limit={limitForPage}/>
