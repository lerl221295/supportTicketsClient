import React from 'react'

const InputWithIcon = ({Icon, Input, ...props, children}) => (
	/*considerar cambiarlo a usar el sistema de rejillas a ver que tal luce*/
	<div style={{position: 'relative', display: 'inline-block'}}>
		<Icon style={{position: 'absolute', left: 0, top: 35}} color="skyBlue"/>
		<Input {...props} style={{textIndent: 25}} >
			{children}
		</Input>
	</div>
)

export default InputWithIcon