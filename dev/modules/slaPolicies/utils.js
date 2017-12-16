import _ from 'lodash';
export default ([...array], startIndex, endIndex, orderAttr = 'position') => {
	if (_.isUndefined(endIndex))
		endIndex = array.length - 1;
	let startLoopIndex = startIndex, endLoopIndex = endIndex;
	if (startIndex > endIndex) {
		startLoopIndex = endIndex;
		endLoopIndex = startIndex;
	}
	for (let i = startLoopIndex; i <= endLoopIndex; i++) {
		array[i] = {...array[i], [orderAttr]: i};
	}
	return array;
};