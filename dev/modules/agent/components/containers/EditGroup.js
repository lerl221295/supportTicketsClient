import { graphql } from 'react-apollo'
//import { connect } from 'react-redux'
import ModalForm from '../presentationals/groups/ModalForm'
import UpdateGroup from '../../graphql/mutations/updateGroup.graphql'
import Groups from '../../graphql/querys/groups.graphql'

export default graphql(UpdateGroup, {
	props: ({ mutate, ownProps: {limit} }) => ({
		submit: (group) => mutate({
			variables: { group },
			update: (proxy, {data: {updateGroup} }) => {
				/*sin el try catch esto se va a la puta x( (no entiendo aun porque)
				https://github.com/apollographql/apollo-group/issues/2051*/
				try {
					const data = proxy.readQuery({
						query: Groups
					});
					data.groups.nodes.map(group => {
						if(group.id !== updateGroup.id) return group;
						return updateGroup;
					});
					proxy.writeQuery({ query: Groups, data });
				}
				catch(e){
					//console.log(e);
				}
			}
		})
	})
})(ModalForm)
