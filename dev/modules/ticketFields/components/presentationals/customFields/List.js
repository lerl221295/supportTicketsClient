import React from 'react'
import { List, ListItem, Divider, Subheader, FontIcon } from 'material-ui'
import { ContentDeleteSweep as Delete } from "material-ui/svg-icons";
import FieldTypeIcon from './FieldIcon'
import Theme from '../../../../../theme-default'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const CustomFieldsList = (props) => {
	const {
		custom_fields,
		deleteField,
		onDragEnd,
		getItemStyle
	} = props;

	return(
		<List style={{display: do {
			if(custom_fields.length) null;
			else "none";
		}}}>
			<Subheader>Campos Personalizables del Ticket (Arrastre para ordenar)</Subheader>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="droppableFields">
					{(provided, snapshot) => (
						<div
							ref={provided.innerRef}
						>
							{custom_fields.map(({key, label, type}) => (
								<Draggable key={key} draggableId={key}>
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
												<ListItem 
													primaryText={label}
													secondaryText={`key: ${key}`}
													leftIcon={ <FieldTypeIcon type={type} /> }
													rightIcon={
														<Delete 
															hoverColor={Theme.palette.accent1Color}
															onClick={() => deleteField({ key })} 
														/>
													}
												/>			
												<Divider/>
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
		</List>
	)
}

export default CustomFieldsList