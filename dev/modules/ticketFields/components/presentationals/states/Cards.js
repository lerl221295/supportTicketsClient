import React from 'react'
import { Paper, Subheader, Avatar, IconButton } from 'material-ui'
import { Row, Col } from 'react-flexbox-grid'
import { 
	ContentDeleteSweep as Delete,
	ContentAdd as Add,
	ImageTimer as Timer,
	ImageTimerOff as TimerOff,
	ContentArchive as Archive,
	EditorModeEdit as Edit
} from "material-ui/svg-icons";
import Theme from '../../../../../theme-default'
import { grey600 } from 'material-ui/styles/colors'

const StatesCards = ({states, deleteState, openModal}) => {
	return(
		<Row style={{display: do {
			if(states.length) null;
			else "none";
		}}}>
			<Subheader>Estados del Ticket</Subheader>
			{
				states.map((state, i) => (
					<Col xs={3} key={i}>
						<Paper 
							style={{padding: "1rem", height: "5rem", cursor: "pointer", marginBottom: "1rem"}} 
							onClick={() => openModal(state)}
						>
							<Row>
								<Col xs={3}>
									<Avatar icon={do {
											if(state.stage === "END") (<Archive/>);
											else if(state.sla_paused) (<TimerOff/>);
											else (<Timer/>);
										}}
									/>
								</Col>
								<Col xs={6}>
									<strong style={{color: Theme.palette.primary2Color}}>
										{state.label}
									</strong>
									<br/>
									<span>
										{`key: ${state.key}`}
									</span>
								</Col>
								<Col xs={3}>
									{do {
										if(state.key === "new" || state.key === "resolved") (
											<IconButton tooltip="Estado Indispensable" style={{cursor: "not-allowed"}}>
												<Delete 
													color={grey600}
													onClick={(e) => e.stopPropagation()}
												/>
											</IconButton>
										)
										else (
											<IconButton tooltip="Eliminar Estado">
												<Delete 
													hoverColor={Theme.palette.accent1Color}
													onClick={(e) => {
														e.stopPropagation();
														deleteState(state);
													}}
												/>
											</IconButton>
										)
									}}
								</Col>
							</Row>
						</Paper>
					</Col>
				))
			}
			<Col xs={3}>
					<Paper 
						zDepth={5}
						style={{padding: "1rem", height: "5rem", cursor: "pointer", marginBottom: "1rem"}} 
						onClick={() => openModal()}
					>
					<Row middle="xs">
						<Col xs={3}>
							<Avatar icon={<Add/>} />
						</Col>
						<Col xs={9}>
							<strong style={{color: Theme.palette.accent1Color}}>
								Agregar Estado
							</strong>
						</Col>
					</Row>
					</Paper>
			</Col>
		</Row>
	)
}

export default StatesCards
