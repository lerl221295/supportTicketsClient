export const orderPoliciesByPosition = ([...policies], startIndex, endIndex) => {
	if (!endIndex) endIndex = policies.length - 1;
	let startLoopIndex = startIndex, endLoopIndex = endIndex;
	if (startIndex > endIndex) {
		startLoopIndex = endIndex;
		endLoopIndex = startIndex;
	}
	for (let i = startLoopIndex; i <= endLoopIndex; i++) {
		policies[i] = {...policies[i], position: i};
	}
	return policies;
};