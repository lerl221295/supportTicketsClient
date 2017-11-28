import _ from 'lodash'
import { lightGreenA700, lightBlue400, amber600, redA700 } from 'material-ui/styles/colors'

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

export const getPriorityText = (priority_value) =>
	 _.find(PRIORITIES, priority => priority.value === priority_value).text;

export const getPriorityColor = (priority_value) =>
	 _.find(PRIORITIES, priority => priority.value === priority_value).color;

export const getDueByText = (due_value) =>
	 _.find(PRIORITIES, due => due.value === due_value).text;