export const login = user => ( localStorage.setItem('user', JSON.stringify(user)) );

export const getUser = () => ( JSON.parse(localStorage.getItem('user')) );


export const logout = () => {
	/*container.replaceRequestHeaders('Authorization', '' );*/
	localStorage.setItem('user',null)
}
