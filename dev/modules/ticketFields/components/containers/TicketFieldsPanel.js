import { graphql } from 'react-apollo'
import Panel from '../presentationals/Panel'
import Metadata from '../../graphql/querys/ticketMetadata.graphql'

export default graphql(Metadata)(Panel);

