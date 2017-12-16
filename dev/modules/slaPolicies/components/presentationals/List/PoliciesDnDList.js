import React from 'react'
// Material UI
import { List } from 'material-ui'
// React Beautiful DnD
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
// Presentationals Components
import PolicyItemList from './PolicyItemList'

export default ({ onDragEnd, reorder, handleToggleChange, deletePolicy, customSLAPolicies, defaultSLAPolicy, getItemStyle }) => (
	<List>
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="droppable" isDropDisabled={!reorder}>
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
											style={getItemStyle(
												provided.draggableStyle,
												snapshot.isDragging
											)}
											{...provided.dragHandleProps}
										>
											<PolicyItemList
												{...policy}
												handleToggleChange={handleToggleChange}
												deletePolicy={deletePolicy}
												reorder={reorder}
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
		<PolicyItemList {...defaultSLAPolicy} reorder={reorder} />
	</List>
)