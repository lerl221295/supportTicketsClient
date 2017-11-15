/*funcion para filtrar una coleccion de objetos, dados los keys, la coleccion
y el texto para filtrar
pdta: esta ping ya debe existir pero que coño haha*/

const filter = (keys, data = [], text="") => {
 	text = text.toLowerCase();
 	return (
	 	data.filter(objeto => {
	 		for(let key of keys){
	 			let subKeys = key.split(".");
				let objValue = objeto;
				for(let subKey of subKeys) {
					/*para claves anidadas. ejemplo: ticket.tecnico.nombre*/
					if ( subKey in objValue )
						objValue = objValue[subKey];
					else break;
				}
				if(typeof objValue == "string"){
	 				objValue = objValue.toLowerCase();
	 				if(objValue.includes(text) || text.includes(objValue)) return true;
	 			}
	 		}
	 		return false;
	 	})
	)
 }

 export default filter