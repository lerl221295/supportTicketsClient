import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Row, Col } from 'react-flexbox-grid'
import { List, ListItem, Subheader, Divider } from 'material-ui'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { ContentDeleteSweep as Delete } from "material-ui/svg-icons"
import { deleteOption, setOptions } from '../../../actions/customFields'
import Theme from '../../../../../theme-default'
import Drawable from '../../../../../common/components/Drawable'

const SelectOptionsList = (props) => {
	const {
		options,
		deleteOption,
		onDragEnd,
		getItemStyle
	} = props;

	return(
		<List style={{display: do {
					if(options.length) null;
					else "none";
				}}}>
					<Subheader>Opciones</Subheader>
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId="droppableOptions">
							{(provided, snapshot) => (
								<div
									ref={provided.innerRef}
								>
									{options.map(({key, label}, i) => (
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
															rightIcon={
																<Delete 
																	hoverColor={Theme.palette.accent1Color}
																	onClick={() => deleteOption({ key })} 
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
};

export default compose(
	connect(
		({ticketFields: {customFields: {modals: {selectField: {options}}} } }) => ({
			options,
			itemsName: 'options'
		}),
		{ deleteOption, setItems: setOptions }
	),
	Drawable	
)(SelectOptionsList)