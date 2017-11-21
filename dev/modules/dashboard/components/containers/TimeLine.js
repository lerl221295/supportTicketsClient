import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { graphql } from 'react-apollo'
import Interacciones from '../graphQL/querys/interacciones.graphql'
import TimeLine from '../presentationals/TimeLine'

const TimeLineWithData = graphql(Interacciones)(TimeLine)
export default connect(null, { push })(TimeLineWithData)