import hexToRgbA from './hexToRgbA'
import theme from '../../theme-default'

export default (draggableStyle, isDragging) => {
	// console.log('draggableStyle', draggableStyle);
	return ({
		// some basic styles to make the items look a bit nicer
		userSelect: 'none',
		// change background colour if dragging
		backgroundColor: do {
			if (isDragging) hexToRgbA(theme.palette.primary1Color, 0.5);
			else ''
		},
		// styles we need to apply on draggable
		...draggableStyle,
	});
};