import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'

import Form from './Form'

import { toast } from 'react-toastify'
import { withApollo } from 'react-apollo'
import GetClient from '../../../graphql/querys/client.graphql'
import GetOrganizationsNames from '../../../graphql/querys/organizationsNames.graphql'

const initialState = {
  name: "",
  lastname: "",
  phones: "",
  email: "",
  face_base64: null,
  avatar_filename: "Seleccione una imagen ...",
  address: "",
  organization_id: null,
  about: "",
  organization: null
}

@withApollo
class ModalForm extends Component {
  state = initialState;

	componentWillReceiveProps = async (nextProps) => {
		//cuando el modal de edicion se presenta en pantalla
		if(nextProps.edit && (!this.props.open && nextProps.open)){ //si es el formulario en edicion
			var client = await nextProps.client.query({
				query: GetClient,
				fetchPolicy: 'network-only',
				variables: {id: nextProps.edit}
			}).then(response => {
				let {__typename, ...client} = response.data.client;
				return client;
			});
			this.setState({
				...client,
        phones: client.phones.join(', ')
			});
		}
	};

  cleanForm = () => this.setState(initialState);

  send = event => {
    event.preventDefault();
    let client = this.state;
    client.phones = client.phones.replace(/\s/g, '').split(',');
    client.organization_id = client.organization.id;
    delete client.organization;
    delete client.avatar_filename;
    this.props.close();
    this.props.submit({...client, id: this.props.edit})
      .then(response => {
        if(this.props.edit) this.props.notificate("Cliente actualizado con exito!");
        else this.props.notificate("Cliente guardado con exito!");
        this.cleanForm()
      })
  };

  searchOrganizations = (search_text) => (
    this.props.client.query({
      query: GetOrganizationsNames,
      variables: {search_text}
    })
    .then( ({data: {organizations}} ) => ({options: organizations.nodes}))
  )

  changeImage = ({target: { files: [file] } }) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => this.setState({ face_base64: reader.result, avatar_filename: file.name });
  }

  handleChange = e =>  this.setState( { [e.target.name]: e.target.value } );

  handleSelectChange = select_name => (e, i, value) => this.setState({ [select_name]: value } );

  handleReactSelectChange = (name) => (selectValue) => this.setState({[name] : selectValue});

  render = () => (
    <div>
      <Dialog
        title={this.props.title}
        open={this.props.open}
        onRequestClose={this.props.close}
        autoScrollBodyContent={true}
        titleClassName="center-align"
      >
        <Form {...this.state}
          //id={this.props.edit}
          close={this.props.close}
          handleChange={this.handleChange}
          clean={this.cleanForm}
          send={this.send}
          changeImage={this.changeImage}
          handleSelectChange={this.handleSelectChange}
          handleReactSelectChange={this.handleReactSelectChange}
          searchOrganizations={this.searchOrganizations}
        />
      </Dialog>
    </div>
  )
}


export default ModalForm