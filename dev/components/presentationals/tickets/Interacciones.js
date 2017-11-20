import React from 'react'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import TimeAgo from '../TimeAgo'

import Agent from 'material-ui/svg-icons/action/account-circle'
import Client from 'material-ui/svg-icons/action/face'
import Avatar from 'material-ui/Avatar'
import {blue500} from 'material-ui/styles/colors'

const Interacciones = ({ interacciones, verActividades, tecnico, cliente }) => {

	return (
		<List>
			{
				interacciones.map((interaccion, i) => {
					let agente = do {
						if(interaccion.emisor == 'admin') "Admin";
						else tecnico
					}
				
					let ver = do {
						if(!verActividades && interaccion.tipo == "actividad")
							"none";
						else "inline";
					}
					let color = do {
						if ( interaccion.tipo == "actividad" ) blue500;
						else null;
					}
					return (
						<span key={i} style={{display: ver}}>
							{
								do {
									if(interaccion.emisor == "cliente")
										<ListItem insetChildren={true} 
				              				primaryText={`${cliente}: ${interaccion.text}`} 
				             				secondaryText={<TimeAgo date={interaccion.timestamp}/>}
		            						leftAvatar={<Avatar backgroundColor={color} icon={<Client />} />}
		            					/>;
		            				else
		            					<ListItem insetChildren={true} 
				              				primaryText={`${agente}: ${interaccion.text}`} 
				             				secondaryText={<TimeAgo date={interaccion.timestamp}/>}
		            						rightAvatar={<Avatar backgroundColor={color} icon={<Agent />} />}
		            					/>;

								}
							}
	           				<Divider inset={true} />
	          			</span>
					)
				})


			}
		</List>
	)
}

export default Interacciones