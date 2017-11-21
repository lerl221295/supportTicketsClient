// import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import Panel from '../presentationals/Panel'
import Agents from '../../graphql/querys/agents.graphql'

// const PanelWithSearch = connect((state) => ({search: state.search_text}))(Panel)
export default graphql(Agents)(Panel)

