import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import { Paper, FlatButton, FloatingActionButton, ToolbarSeparator, Dialog } from 'material-ui'
import { ContentSave as Save } from 'material-ui/svg-icons'
import StateForm from '../../containers/StateForm'
import StatesList from './List'
import StatesChart from './StatesChart'

export default (props) => {
	const {states, deleteState, update, modal, closeModal, openModal} = props;
	let initialValues = {};
	if(modal.editing) initialValues = {
		...modal.editing,
		came_from: do {
			if(!modal.editing.came_from) null;
			else modal.editing.came_from.map(({key}) => key);
		}
	};
	return(
		<Paper style={{padding: "2rem"}}>
			<Row middle="xs">
				<Col xs={7}>
					<StatesList states={states} openModal={openModal} deleteState={deleteState}/>
					<FlatButton
				    	label="Aregar"
				    	fullWidth
				    	onClick={() => openModal()}
				    	primary
				    />
				</Col>
				<Col xs={1}>
					<ToolbarSeparator style={{height: '36vh'}}/>
				</Col>
				<Col xs={4}>
					<StatesChart/>
				</Col>
			</Row>
			{/*<FloatingActionButton className="fab" > 
		    	<Save />
		    </FloatingActionButton>*/}
		    <FlatButton
		    	label="Guardar"
		    	fullWidth
		    	onClick={update}
		    	primary
		    />
		    <Dialog
		        title={getTitle(modal.editing)}
		        open={modal.open}
		        onRequestClose={closeModal}
		        autoScrollBodyContent={true}
		        contentStyle={{ width: '35%'}}
		    >
		    	<StateForm initialValues={initialValues} />
		    </Dialog>
		</Paper>
	)
}

const getTitle = (editing) => do {
	if(!editing) "Nuevo Estado";
	else `Editando el estado "${editing.label}"`;
}