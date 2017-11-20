import React, { Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import { withApollo } from 'react-apollo'
import GetTickets from '../../graphQL/querys/tickets.graphql'
import Recibido from 'material-ui/svg-icons/action/receipt'
import Done from 'material-ui/svg-icons/action/done-all'
import Business from 'material-ui/svg-icons/places/business-center'
import TimerOff from 'material-ui/svg-icons/image/timer-off'
import ServiceFail from '../ServiceFail'
import List from './List'

import filter from '../../utils/filter'

const filterTickets = (tickets=[], estado) => (
  /*uso el includes para contemplar cerrado.ok y cerrado.bad como el mismo estado*/
  tickets.filter(ticket =>  ticket.estado.includes(estado) )
)

@withApollo
class TicketsTabs extends Component {
  state = {data : {error: false, tickets: [], loading: true} };

  componentWillMount = async () => {
    try {
      let tickets = await this.props.client.query({
        query: GetTickets,
        fetchPolicy: 'network-only', // skip the cache
      });
      this.setState({data : tickets.data});
    }
    catch(error){
      this.setState({data: {error: true}});
    }
  }

  render = () => {
    if(this.state.data.error) return <ServiceFail />;
    
    let keys = ['titulo', 'prioridad', 'cliente.nombre', 'cliente.apellido', 'tipo',
      'tecnico.nombre', 'tecnico.apellido'];
    let filteredBySearch = filter(keys, this.state.data.tickets, this.props.search)
    
    return (
      <Tabs>
        <Tab
          icon={<Recibido/>}
          label="ABIERTOS" >
          <List 
            tickets={filterTickets(filteredBySearch, "abierto")} 
            loading={this.state.data.loading}
            push={this.props.push}
          />
        </Tab>
        <Tab
          icon={<Business />}
          label="EN PROCESO" >
          <List 
            tickets={filterTickets(filteredBySearch, "proceso")} 
            loading={this.state.data.loading}
            push={this.props.push}
          />
        </Tab>
        <Tab
          icon={<TimerOff />}
          label="ESPERANDO" >
          <List 
            tickets={filterTickets(filteredBySearch, "esperando")}
            loading={this.state.data.loading}
            push={this.props.push}
          />
        </Tab>
        <Tab
          icon={<Done />}
          label="CULMINADOS" >
          <List 
            tickets={filterTickets(filteredBySearch, "cerrado")} 
            loading={this.state.data.loading}
            push={this.props.push}
          />
        </Tab>
      </Tabs>
    )
  }
}

export default TicketsTabs;