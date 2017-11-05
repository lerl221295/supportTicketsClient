import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import Panel from '../components/tecnicos/Panel'
import ApolloTecnicos from '../graphQL/querys/tecnicos.graphql'

const PanelWithSearch = connect((state) => ({search: state.search_text}))(Panel)
export default graphql(ApolloTecnicos)(PanelWithSearch)

