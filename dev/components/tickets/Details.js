import React, { Component } from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import { withApollo } from 'react-apollo'
import ModalAsignTecnico from './ModalTecnico'
import Interacciones from './Interacciones'
import GetTecnicos from '../../graphQL/querys/tecnicos.graphql'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Avatar from 'material-ui/Avatar'
import Info from 'material-ui/svg-icons/action/info'
import Agent from 'material-ui/svg-icons/action/account-circle'
import Chip from 'material-ui/Chip'
import {getFullTime} from '../TimeAgo'
import { selectStateIcon, selectTipoIcon, selectColorPrior } from './Icons'
import LinearProgress from 'material-ui/LinearProgress'
import Checkbox from 'material-ui/Checkbox'
import Visibility from 'material-ui/svg-icons/action/visibility'
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off'

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

@withApollo
class TicketDetails extends Component {
	state = {tecnicos: [], modalOpen : false, mostrarActividades: false, tecnicosFail : false}; /*para el select de tecnico*/

	openModal = event => this.setState({ modalOpen : true });
	closeModal = event => this.setState({ modalOpen : false });

	componentWillReceiveProps = async (props) => {
		/*cuando la data del ticket llegue, se deben buscar los tecnicos para
		posteriormente poder asignar un tecnico al ticket si aplica*/
		if(!props.data.loading && !props.data.error){
			if(!props.data.ticket.tecnico){
				/*si llego la data y es un ticket sin tecnico asignado*/

				/*si el tecnico del ticket no se cargo porque el ms esta caido (porque
				el ticket.estado != abierto), no debo pedir los demas tecnicos*/
				if(props.data.ticket.estado == "abierto"){
					try {
						let {data : { tecnicos } } = await props.client.query({ query : GetTecnicos });
						this.setState({tecnicos});
					}
					catch(error){
						this.setState({ tecnicosFail: true });
					}
				}
			}
		}
	};

	updateActividades = () => {
		this.setState( ({mostrarActividades}) => 
			({
				mostrarActividades: !mostrarActividades
			})
		)
	}

	propiedades = (ticket) => (
		<Row>
		 	<Col xs={12}>
		    	<Row center="xs">
		     		<Col xs={7}> <div style={styles.wrapper}>
		      			<Chip style={styles.chip}>
				          	<Avatar color="#444" icon={selectStateIcon(ticket, false)} />
				          	{
				          		do{
				          			if(ticket.estado === "cerrado.ok") "finalizado";
				          			else if(ticket.estado === "cerrado.bad") "cerrado";
				          			else ticket.estado;
				          		}
				          	}
				        </Chip>
				        <Chip style={styles.chip}>
				          	<Avatar color="#444" icon={selectTipoIcon(ticket, null, false)} />
				          	{ticket.tipo}
				        </Chip>
				        <Chip style={styles.chip}>
				          	<Avatar
				          		color={selectColorPrior(ticket)} 
				          		icon={ <Info/> } 
				          	/>
				          	{ticket.prioridad}
				        </Chip>
				        {
				        	do{
				        		if(ticket.tecnico)
				        			<Chip style={styles.chip}>
							          	<Avatar
							          		icon={ <Agent/> } 
							          	/>
							          	{`${ticket.tecnico.nombre} ${ticket.tecnico.apellido}`}
							        </Chip>
							    else if (ticket.estado == "abierto" && !this.state.tecnicosFail)
							    	<Chip style={styles.chip} onClick={this.openModal}>
							          	<Avatar
							          		color='red'
							          		icon={ <Agent/> } 
							          	/>
							          	{"Seleccione el tecnico"}
							        </Chip>
							    else
							    	<Chip style={styles.chip}>
							          	<Avatar
							          		color='red'
							          		icon={ <Agent/> } 
							          	/>
							          	{"Tecnico No Disponible"}
							        </Chip>
				        	}
				        }
				        
		      		</div> </Col>
		      		<Col xs={1}>
		      			<Checkbox
				          	checkedIcon={<Visibility />}
				          	uncheckedIcon={<VisibilityOff />}
				          	onCheck={this.updateActividades}
				          	label="actividades"
				        />
		      		</Col>
		    	</Row>
		  	</Col>
		</Row>
	)

	render = () => {
		let { ticket, loading, error } = this.props.data;
		if(error) return <h1> ta fallando la consulta </h1>
		if(loading) return <LinearProgress mode="indeterminate" />;
		let [firstInteraccion, ...interacciones] = ticket.interacciones;
		
		let tecnico = do {
			if(ticket.tecnico)
				(`${ticket.tecnico.nombre} ${ticket.tecnico.apellido}`);
			else if(ticket.estado != "abierto")
				"Tecnico";
			else "";
		}

		let cliente = do {
	    	if(ticket.cliente) 
	      		`${ticket.cliente.nombre} ${ticket.cliente.apellido}`;
	    	else "Cliente";
	  	}

		return (
			<Grid fluid>
				{this.propiedades(ticket)}
				<br/>
				<Card>
				    <CardHeader
				      	title={`${cliente} : ${ticket.titulo}`}
				      	subtitle={`
				      		${firstInteraccion.text}
				      		${getFullTime(firstInteraccion.timestamp)} 
				      	`}
				    />
				    <CardText >
				      	<Divider/>
				      	<Interacciones 
				      		interacciones={interacciones} 
				      		verActividades={this.state.mostrarActividades} 
				      		tecnico={tecnico}
				      		cliente={cliente}
				      	/>
				    </CardText>
				</Card>
				<ModalAsignTecnico 
					open={this.state.modalOpen}
					close={this.closeModal}
					ticket={parseInt(this.props.routeParams.id)}
					tecnicos={this.state.tecnicos}
					refetch={this.props.data.refetch}
				/>
			</Grid>
		)

	}
}

export default TicketDetails