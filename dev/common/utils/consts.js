import _ from 'lodash'
import { lightGreenA700, lightBlue400, amber600, redA700 } from 'material-ui/styles/colors'

export const STAGES = [
	{value: "PREPARATION", text: "Preparacion"},
	{value: "PROGRESS", text: "Progreso"},
	{value: "END", text: "Final"}
];

export const PRIORITIES = [
	{value: "LOW", text: "Baja", color: lightGreenA700},
	{value: "MEDIUM", text: "Media", color: lightBlue400},
	{value: "HIGH", text: "Alta", color: amber600},
	{value: "URGENT", text: "Urgente", color: redA700}
];

export const DUE_BY = [
	{value: "OVERDUE", text: "Atrasado"},
	{value: "TODAY", text: "Hoy"},
	{value: "TOMORROW", text: "Mañana"}
];

export const CHANELS = [
	{value: "PORTAL", text: "Portal", src: "/images/sources/PORTAL"},
	{value: "EMAIL", text: "Email", src: "/images/sources/EMAIL"},
	{value: "FACEBOOK", text: "Facebook", src: "/images/sources/FACEBOOK"},
	{value: "TWITTER", text: "Twitter", src: "/images/sources/TWITTER"}
];

export const WEEK_DAYS = [
	{value: "MONDAY", text: "Lunes"},
	{value: "TUESDAY", text: "Martes"},
	{value: "WEDNESDAY", text: "Miercoles"},
	{value: "THURSDAY", text: "Jueves"},
	{value: "FRIDAY", text: "Viernes"},
	{value: "SATURDAY", text: "Sabado"},
	{value: "SUNDAY", text: "Domingo"}
];

export const UNITY_TIME = [
	{
		label:'Minutos',
		value:'MINUTES'
	},
	{
		label:'Horas',
		value:'HOURS'
	},
	{
		label:'Días',
		value:'DAYS'
	},
	{
		label:'Meses',
		value:'MONTHS'
	},
];

export const OPERATIONALS_HOURS = [
	{
		label:'Horas calendario',
		value:'CALENDAR'
	},
	{
		label:'Horas laborales',
		value:'BUSINESS'
	}
];

export const TIMES_BEFORE = [
	{
		label: '8 horas antes',
		value: 8
	},
	{
		label: '4 horas antes',
		value: 4
	},
	{
		label: '2 horas antes',
		value: 2
	},
	{
		label: '1 horas antes',
		value: 1
	},
	{
		label: '30 horas antes',
		value: 0.5
	},
];
export const TIMES_AFTER = [
	{
		label: 'Inmediatamente',
		value: 0
	},
	{
		label: '30 minutos después',
		value: 0.5
	},
	{
		label: '1 hora después',
		value: 1
	},
	{
		label: '2 horas después',
		value: 2
	},
	{
		label: '4 horas después',
		value: 4
	},
	{
		label: '8 horas después',
		value: 8
	},
	{
		label: '12 horas después',
		value: 12
	},
	{
		label: '1 día después',
		value: 24
	},
	{
		label: '2 días después',
		value: 48
	},
	{
		label: '3 días después',
		value: 72
	},
	{
		label: '1 semana después',
		value: 168
	},
];

export const getPriorityText = (priority_value) =>
	 _.find(PRIORITIES, priority => priority.value === priority_value).text;

export const getPriorityColor = (priority_value) =>
	 _.find(PRIORITIES, priority => priority.value === priority_value).color;

export const getDueByText = (due_value) =>
	 _.find(DUE_BY, due => due.value === due_value).text;

export const getSourceText = (source_value) =>
	 _.find(CHANELS, ({value}) => value === source_value).text;