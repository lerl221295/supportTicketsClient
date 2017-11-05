import React, { Component } from 'react'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'

import TimeAgo from './TimeAgo'
import Agent from 'material-ui/svg-icons/action/account-circle'
import Client from 'material-ui/svg-icons/action/face'
import Avatar from 'material-ui/Avatar'
import LinearProgress from 'material-ui/LinearProgress'
import ServiceFail from './ServiceFail'
import newInteracciones from '../graphQL/subscriptions/newInteracciones.graphql'

class TimeLine extends Component {
  componentWillMount = () => {
    let { subscribeToMore } = this.props.data;
    subscribeToMore({
      document: newInteracciones,
      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData.data) return prev;
        const newInteraccion = subscriptionData.data.newInteracciones;
        return Object.assign({}, prev, {
          ultimasInteracciones: [newInteraccion, ...prev.ultimasInteracciones],
        });
      }
    })
  }

  render = () => {
    let {data: {error, loading, ultimasInteracciones}, push} = this.props
    if(error) return <ServiceFail />;
    if(loading) return <LinearProgress mode="indeterminate" />; 

    return (
      <List>
        {ultimasInteracciones.map((event, index) => {
            
            let {Icon, nombre} = do {
              if(event.emisor == "cliente")
                ({
                  Icon: Client, 
                  nombre: do {
                    if(event.ticket.cliente)
                      `${event.ticket.cliente.nombre} ${event.ticket.cliente.apellido}`;
                    else
                      "(No Disponible)";
                  }
                });
              else if(event.emisor == "tecnico")
                ({
                  Icon: Agent, 
                  nombre: do {
                    if(event.ticket.tecnico)
                      `${event.ticket.tecnico.nombre} ${event.ticket.tecnico.apellido}`;
                    else
                      "(No Disponible)";
                  }
                });
              else
                ({
                  Icon: Agent, 
                  nombre: ""
                });
            }
            
            let mensaje = do {
              if(event.tipo == "actividad")
                `El ${event.emisor} ${nombre} ${event.text}`;
              else
                `El ${event.emisor} ${nombre} envio el mensaje: "${event.text}"`; 
            }

            let secondary = <span> <TimeAgo date={event.timestamp}/> en el ticket #{event.ticket._id} </span>
            
            return (
              <span key={index}>
                <ListItem insetChildren={true} 
                  primaryText={mensaje} 
                  secondaryText={secondary}
                  leftAvatar={<Avatar icon={<Icon />} />}
                  onClick={e => push(`tickets/${event.ticket._id}`)}
                />
                <Divider inset={true} />
              </span>
            )
          }
        )}
      </List>
      
    )
  }
}

export default TimeLine