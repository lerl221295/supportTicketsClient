import _ from 'lodash';
export const orderPoliciesByPosition = ([...policies], startIndex, endIndex) => {
	if (_.isUndefined(endIndex))
		endIndex = policies.length - 1;
	let startLoopIndex = startIndex, endLoopIndex = endIndex;
	if (startIndex > endIndex) {
		startLoopIndex = endIndex;
		endLoopIndex = startIndex;
	}
	for (let i = startLoopIndex; i <= endLoopIndex; i++) {
		policies[i] = {...policies[i], position: i};
	}
	// console.log('policiesOrdered---', policies);
	// console.log('startIndex---', startIndex, 'endIndex---', endIndex);
	return policies;
};