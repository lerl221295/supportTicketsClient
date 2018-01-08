import React from 'react'
// Material UI
import { List, LinearProgress } from 'material-ui'
// Presentationals Components
import ItemList from './ItemList'

export default ({ deleteDispatcher, dispatchers, loading }) => {
	if (loading)
		return <LinearProgress mode="indeterminate" />;
	return (
		<List>
			{
				dispatchers.map((dispatcher, i) => (
					<ItemList
						key={i}
						{...dispatcher}
						deleteDispatcher={deleteDispatcher}
					/>
				))
			}
		</List>
	)
}