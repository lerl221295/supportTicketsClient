import React from 'react'
import {
	Toolbar,
	ToolbarGroup,
	ToolbarSeparator,
	ToolbarTitle,
	RaisedButton,
	IconButton,
	MenuItem,
	IconMenu,
	Toggle
} from 'material-ui'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'

export default ({showActivities, toggleActivities}) => (
	<Toolbar style={{marginLeft: "0.6rem"}}>
        <ToolbarGroup>
          	<ToolbarSeparator />
          	<Toggle label="Actividades" toggled={showActivities} onToggle={() => toggleActivities()} />
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