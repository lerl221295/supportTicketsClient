import React from 'react'
import {Col, Row} from "react-flexbox-grid"
import {Paper} from "material-ui"
import ListHeader from './ListHeader'
import List from './List'

export default ({push, deleteDispatcher, data: { dispatchers, loading }}) => {
	// console.log('dispatchers---', dispatchers);
	return (
		<Row center={"xs"}>
			<Col xs={8}>
				<Row start={"xs"}>
					<Col xs={12}>
						<Paper style={{paddingBottom: '1rem'}}>
							<ListHeader
								push={ push }
							/>
							<List
								dispatchers={dispatchers}
								deleteDispatcher={deleteDispatcher}
								loading={loading}
							/>
						</Paper>
					</Col>
				</Row>
			</Col>
		</Row>
	)
}