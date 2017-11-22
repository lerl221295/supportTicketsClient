//import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import Panel from '../presentationals/Panel'
import Clients from '../../graphql/querys/clients.graphql'
import Organizations from '../../graphql/querys/organizations.graphql'

//const PanelWithSearch = connect((state) => ({search: state.search_text}))(Panel)
export default compose(
    graphql(Clients, {name: 'clients'}),
    graphql(Organizations, {name: 'organizations'})
)(Panel);