import React from 'react'
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List'
import LinearProgress from 'material-ui/LinearProgress'
import TimeAgo from '../TimeAgo'

import IconButton from 'material-ui/IconButton';
import Agent from 'material-ui/svg-icons/action/account-circle'

import { selectStateIcon, selectTipoIcon } from './Icons'
import Loading from '../loadingFirst'

const TitleTicket = (ticket) => {
  let cliente = do {
    if(ticket.cliente) 
      `${ticket.cliente.nombre} ${ticket.cliente.apellido}`;
    else "Cliente";
  }
  return(
    <span>
      {`${cliente} : ${ticket.titulo} - `}
      <TimeAgo date={ticket.interacciones[0].timestamp}/>
    </span> 
  )
}

const TicketsList = ({tickets, loading, push}) => {
  var cargarndo = do {
    if (loading) { <LinearProgress mode="indeterminate" /> }
    else { "" }
  }

  return (
    <List>
      {cargarndo}
      { 
        do {
          if(loading) "";
          else tickets.map((ticket, index) => (
              <span key={index}>
                {/*falta mostrar la prioridad (con un icono de color preferiblemente)*/}
                <ListItem 
                  leftIcon={selectTipoIcon(ticket)}
                  rightIcon={selectStateIcon(ticket)}
                  insetChildren={true} 
                  primaryText={TitleTicket(ticket)}
                  secondaryTextLines={2} 
                  secondaryText={ticket.interacciones[0].text}
                  onClick={ e => push(`/tickets/${ticket._id}`) }
                />
                <Divider inset={true} />
              </span>
            )
          )
        }

      }
    </List>     
  )
}

export default  Loading(TicketsList);