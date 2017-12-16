import React  from 'react'
// React Flexbox Grid
import { Col, Row } from "react-flexbox-grid";
// Material UI
import { LinearProgress, Paper } from "material-ui";
// Presentationals Components
import PoliciesDnDList from './PoliciesDnDList'
import PoliciesListHeader from './PoliciesListHeader'
// Common Components
import { FormButtonGroup } from '../../../../../common/components'
// Lodash
import _ from 'lodash'

export default ({ loading, SLAPolicies, push, onDragEnd, reorder, handleToggleChange,
	                handleReorderAction, deletePolicy, getItemStyle, saveReorder, cancelReorder }) => {
	
	if (loading) return (<LinearProgress mode="indeterminate" />);
	
	let { customSLAPolicies, defaultSLAPolicy } = {
		customSLAPolicies: _.slice(SLAPolicies, 0, -1),
		defaultSLAPolicy: _.last(SLAPolicies)
	};
	
	return (
		<Row center={"xs"}>
			<Col xs={8}>
				<Row start={"xs"}>
					<Col xs={12}>
						<Paper style={{paddingBottom: '1rem'}}>
							<PoliciesListHeader
								reorder={ reorder }
								handleReorderAction={ handleReorderAction }
								push={ push }
							/>
							<PoliciesDnDList
								onDragEnd={ onDragEnd }
								reorder={ reorder }
								handleToggleChange={ handleToggleChange }
								deletePolicy={ deletePolicy }
								customSLAPolicies={ customSLAPolicies }
								defaultSLAPolicy={ defaultSLAPolicy }
								getItemStyle={ getItemStyle }
							/>
							{
								do {
									if (reorder) (
										<FormButtonGroup send={saveReorder} cancel={cancelReorder}/>
									)
								}
							}
						</Paper>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};