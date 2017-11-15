import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import Panel from '../components/clients/Panel'
import ApolloClientes from '../graphQL/querys/clientes.graphql'

const PanelWithSearch = connect((state) => ({search: state.search_text}))(Panel)
export default graphql(ApolloClientes)(PanelWithSearch)

