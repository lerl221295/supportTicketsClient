import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import { Paper, FlatButton, FloatingActionButton, ToolbarSeparator, Dialog } from 'material-ui'
import { ContentSave as Save } from 'material-ui/svg-icons'
import StateForm from '../../containers/StateForm'
//import StatesList from './List'
import StatesCards from './Cards'
import StatesChart from './StatesChart'

import { FormButtonGroup } from '../../../../../common/components'

export default (props) => {
	const {states, deleteState, update, modal, closeModal, openModal, goBack, resetData} = props;
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
			{/*<Row middle="xs">
				<Col xs={7}>
					<StatesList 
						states={states} 
						openModal={openModal} 
						deleteState={deleteState}
					/>
					<Row center="xs">
					    <FlatButton
					    	label="Restablecer Estados"
					    	onClick={() => resetData()}
					    	secondary
					    />
						<FlatButton
					    	label="Aregar Estado"
					    	onClick={() => openModal()}
					    	primary
					    />
					</Row>
				</Col>
				<Col xs={1}>
					<ToolbarSeparator style={{height: '36vh'}}/>
				</Col>
				<Col xs={4}>
					<StatesChart/>
				</Col>
			</Row>*/}
			<Row>
				<Col xs={12}>
					<StatesChart/>
				</Col>
				<Col xs={12}>
					<StatesCards
						states={states} 
						openModal={openModal} 
						deleteState={deleteState}
					/>
				</Col>
			</Row>
		    <FormButtonGroup
				cancel={resetData}
				send={update}
				//style={{marginTop: "-1rem"}}
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