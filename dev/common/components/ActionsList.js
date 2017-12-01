import React from 'react';
import { capitalize } from '../utils/functions'
import {Link} from "react-router";

const ActionsList = ({actions}) => {
	return (
		<ul>
			{
				(actions.map(({type, prop_name, new_value, bearer}, i) => {
					if (type == 'UPDATE') return (
						<li key={i}>{capitalize(prop_name)} cambió a {new_value}</li>
					);
					else {
						let bearer_type = do {
							if (bearer == 'Agent') ({name: 'agente', route: '/agents/'})
							else
							if (bearer == 'Supplier') ({name: 'proveedor', route: '/agents/suppliers/'})
							else ({name: 'grupo', route: '/agents/groups/'})
						};
						return (
							<li key={i}>
								Asignó el ticket al {bearer_type.name} <Link to={{pathname: `${bearer_type.route}${bearer.id}`}}>{bearer.name}</Link>
							</li>
						)
					}
				}))
			}
		</ul>
	
	
	);
};

export default ActionsList;
