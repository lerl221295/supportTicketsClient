import React from 'react'
import {
	Toolbar,
	ToolbarGroup,
	ToolbarSeparator,
	ToolbarTitle,
	RaisedButton,
	IconButton,
	MenuItem,
	IconMenu
} from 'material-ui'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'

export default props => (
	<Toolbar style={{marginLeft: "0.6rem"}}>
        <ToolbarGroup>
          	<ToolbarSeparator />
          	<RaisedButton label="Mostrar actividades" primary={true} />
          	<IconMenu
            	iconButtonElement={
              		<IconButton touch={true}>
                		<NavigationExpandMoreIcon />
              		</IconButton>
            	}
          	>
            	<MenuItem primaryText="Ejecutar escenarios" />
            	<MenuItem primaryText="Solucionar" />
          	</IconMenu>
        </ToolbarGroup>
    </Toolbar>
)