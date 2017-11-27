// import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
import { graphql } from 'react-apollo'
import Activities from '../../graphql/querys/activities.graphql'
import Dashboard from '../presentationals/Dashboard'

// export default (Dashboard);
export default graphql(Activities)(Dashboard);
// export default connect(null, { push })(TimeLineWithData)
