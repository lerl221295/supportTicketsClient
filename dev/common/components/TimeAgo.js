import React from 'react'
import TimeAgo from 'react-timeago'
import espStrings from 'react-timeago/lib/language-strings/es'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const formatter = buildFormatter(espStrings);

const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

export const getFullTime = date => {
	let jsDate = new Date(date);
	let dia = jsDate.getDate();
	let diaSemana = dias[jsDate.getDay()];
	let mes = meses[jsDate.getMonth()];
	let anio = jsDate.getFullYear();
	let {hora, time} = do {
		if(jsDate.getHours() == 0 ) ({hora: 12, time: 'am'});
		if(jsDate.getHours() == 12 ) ({hora: 12, time: 'pm'});
		if( jsDate.getHours() > 12 ) ({hora: jsDate.getHours() - 12, time: 'pm'});
		else ({hora: jsDate.getHours(), time: 'am'});
	}
	let horaFull = `${hora}:${("0" + jsDate.getMinutes() ).slice(-2)} ${time}`
	return `${diaSemana} ${dia} de ${mes} del ${anio} a las ${horaFull}`;
}

const Time = ({date, ...props}) => (
	<TimeAgo 
		date={date} 
		formatter={formatter} 
		title={getFullTime(date)}
		{...props}
	/>
)

export default Time