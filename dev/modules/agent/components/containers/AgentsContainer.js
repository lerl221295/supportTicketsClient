// import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import Panel from '../presentationals/Panel'
import Agents from '../../graphql/querys/agents.graphql'
import Suppliers from '../../graphql/querys/suppliers.graphql'
import Groups from '../../graphql/querys/groups.graphql'

// const PanelWithSearch = connect((state) => ({search: state.search_text}))(Panel)
export default compose(
	graphql(Agents, {name: 'agents'}),
	graphql(Suppliers, {name: 'suppliers'}),
	graphql(Groups, {name: 'groups'})
)(Panel)

