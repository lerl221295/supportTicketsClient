import React from 'react'

import IconButton from 'material-ui/IconButton';
/*iconos para el status del ticket*/
import Check from 'material-ui/svg-icons/action/check-circle'
import Bad from 'material-ui/svg-icons/action/highlight-off'
import TimerOff from 'material-ui/svg-icons/image/timer-off'
import Llave from 'material-ui/svg-icons/action/build'
import Llegando from 'material-ui/svg-icons/action/trending-down'
/*iconos para el tipo del ticket*/
import Exclamacion from 'material-ui/svg-icons/notification/priority-high'
import Help from 'material-ui/svg-icons/action/help-outline'
import Bug from 'material-ui/svg-icons/action/bug-report'

const wrapperIcon = (Icon, tooltip, position) => (
  <IconButton 
    touch
    tooltip={tooltip}
    tooltipPosition={position}
  >
    {Icon}
  </IconButton>  
)

export const selectStateIcon = (ticket, withTooltip = true) => {
  /*elejir el icono adecuado para el ticket en base al estado, prioridad, etc..*/
  let Icon = do {
    if(ticket.estado.includes(".ok")) Check;
    else if (ticket.estado.includes(".bad")) Bad;
    else if (ticket.estado.includes("abierto")) Llegando;
    else if (ticket.estado.includes("proceso")) Llave;
    else if (ticket.estado.includes("esperando")) TimerOff;
    else <span/> ;
  }

  let tecnico = do {
    if(!ticket.tecnico){
      if(ticket.estado != "abierto") "Responsable: No Disponible!";
      else "Sin tecnico responsable";
    }
    else `Responsable: ${ticket.tecnico.nombre} ${ticket.tecnico.apellido}`; 
  }

  let tooltip = tecnico;

  /*let tooltip = do {
    if (ticket.tecnico) 
      (`Responsable: ${ticket.tecnico.nombre} ${ticket.tecnico.apellido}`);
    else "Sin tecnico responsable";
  }*/
  
  if(!withTooltip) return <Icon hoverColor="LightBlue"/>
  return(wrapperIcon( <Icon hoverColor="LightBlue"/> , tooltip, 'bottom-left'))
}

export const selectColorPrior = (ticket) => (
	do {
	    if(ticket.prioridad == 'baja') "green";
	    else if (ticket.prioridad == 'media') "blue";
	    else if (ticket.prioridad == 'alta') "orange";
	    else "red";
	  }
)

export const selectTipoIcon = (ticket, color = selectColorPrior(ticket), withTooltip = true ) => {
  /*elejir el icono adecuado para el ticket en base al estado, prioridad, etc..*/

  let Icon = do {
    if(ticket.tipo === 'solicitud') Exclamacion;
    else if (ticket.tipo === 'pregunta') Help;
    else Bug;
  }

  if(!withTooltip) return <Icon color={color}/>

  let tooltip = `${ticket.tipo} - prioridad ${ticket.prioridad}`
  return(wrapperIcon( <Icon color={color}/> , tooltip, 'bottom-right'))
}

