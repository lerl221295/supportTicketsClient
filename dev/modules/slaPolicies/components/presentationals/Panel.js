import React, { Component } from 'react'
import { Col, Row } from "react-flexbox-grid";
import {
	FlatButton, FloatingActionButton, LinearProgress, List, Paper
} from "material-ui";
import { AvPlaylistAdd as New } from "material-ui/svg-icons"
import { WrappedSubheader, FormButtonGroup } from '../../../../common/components'
import PolicyItemList from './PolicyItemList'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import theme from '../../../../theme-default'
import _ from 'lodash'

class Panel extends Component {
	
	render = () => {
		let { loading, SLAPolicies } = this.props;
		
		if (loading) return <LinearProgress mode="indeterminate" />;
		
		let {customSLAPolicies, defaultSLAPolicy} = {
			customSLAPolicies: _.slice(SLAPolicies, 0, -1),
			defaultSLAPolicy: _.last(SLAPolicies)
		};
		
		return (
			<Row center={"xs"}>
				<Col xs={8}>
					<Row start={"xs"}>
						<Col xs={12}>
							<Paper style={{paddingBottom: '1rem'}}>
								<WrappedSubheader>
									<Row middle={"xs"}>
										<Col xs={9}>
											Políticas de SLA
										</Col>
										<Col xs={2}>
											<Row center={"xs"}>
												{
													do {
														if (!this.props.reorder)
															<FlatButton
																label="Reordenar"
																style={{color: theme.palette.alternateTextColor}}
																onClick={this.props.handleReorderAction}
															/>
													}
												}
											</Row>
										</Col>
										<Col xs>
											<Row end={"xs"}>
												<FloatingActionButton mini={true} zDepth={0} style={{marginBottom:'0.5rem'}} href={"sla/new"}>
													<New />
												</FloatingActionButton>
											</Row>
										</Col>
									</Row>
								</WrappedSubheader>
								<List>
									<DragDropContext onDragEnd={this.props.onDragEnd}>
										<Droppable droppableId="droppable" isDropDisabled={!this.props.reorder}>
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
												>
													{customSLAPolicies.map((policy, i) => (
														<Draggable key={policy.id} draggableId={policy.id}>
															{(provided, snapshot) => (
																<div>
																	<div
																		ref={provided.innerRef}
																		style={this.props.getItemStyle(
																			provided.draggableStyle,
																			snapshot.isDragging
																		)}
																		{...provided.dragHandleProps}
																	>
																		<PolicyItemList
																			{...policy}
																			handleToggleChange={this.props.handleToggleChange}
																			deletePolicy={this.props.deletePolicy}
																			reorder={this.props.reorder}
																		/>
																	</div>
																	{provided.placeholder}
																</div>
															)}
														</Draggable>
													))}
													{provided.placeholder}
												</div>
											)}
										</Droppable>
									</DragDropContext>
									<PolicyItemList {...defaultSLAPolicy} reorder={this.props.reorder} />
								</List>
								{
									do {
										if (this.props.reorder) (
											<FormButtonGroup send={this.props.saveReorder} cancel={this.props.cancelReorder}/>
										)
									}
								}
							</Paper>
						</Col>
					</Row>
				</Col>
			</Row>
		);
	}
}

export default Panel;