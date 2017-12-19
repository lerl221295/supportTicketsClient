import React from 'react';
import { capitalize } from '../utils/functions'
import WrappedLink from './WrappedLink'

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
							if (bearer.__typename == 'Agent') ({name: 'agente', route: '/admin/agents/'})
							else
							if (bearer.__typename == 'Supplier') ({name: 'proveedor', route: '/admin/agents/suppliers/'})
							else ({name: 'grupo', route: '/admin/agents/groups/'})
						};
						return (
							<li key={i}>
								Asignó el ticket al {bearer_type.name} <WrappedLink to={{pathname: `${bearer_type.route}${bearer.id}`}}>{bearer.name}</WrappedLink>
							</li>
						)
					}
				}))
			}
		</ul>
	
	
	);
};

export default ActionsList;
