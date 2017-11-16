//import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import Panel from '../components/clients/Panel'
import Clients from '../graphQL/querys/clients.graphql'

//const PanelWithSearch = connect((state) => ({search: state.search_text}))(Panel)
export default graphql(Clients)(Panel);


