import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'
import { graphql, compose } from 'react-apollo'
import { goBack } from 'react-router-redux'

import { WEEK_DAYS } from '../../../../common/utils/consts'
import GetBusinessHours from '../../graphql/querys/businessHours.graphql';
import UpdateBusinessHours from '../../graphql/mutations/updateBusinessHours.graphql'
import { FormButtonGroup } from '../../../../common/components'
import { openAlert } from '../../../../common/actions/alert'

const updateApolloCache = ({ mode, holidays, working_days, week_days, horary }) => (proxy, {data: {updateBusinessHours} }) => {
	try {
		const data = proxy.readQuery({ query: GetBusinessHours });
	    //console.log('old data', data);
	    
	    /*sin necesitar el response*/
	    let newData = {...data};
	    newData.businessHours.mode = mode;
	    newData.businessHours.holidays = holidays.map(holiday => ({
	    	__typename: 'Holiday',
	    	...holiday
	    }));
	    if(mode === "CUSTOMIZED"){
	    	delete newData.businessHours.week_days;
	    	delete newData.businessHours.horary;
	    	newData.businessHours.__typename = 'Customized';
	    	//console.log(working_days);
	    	newData.businessHours.working_days = working_days.map(day => ({
	    		__typename: 'WorkingDay',
	    		...day, //{day, workeable}
	    		horary: do {
	    			if(!day.workeable) null;
	    			else ({
		    			__typename: 'Horary',
		    			start: {
							__typename: 'HourAndMinutes',
							...day.horary.start//{hour, minutes}
		    			},
		    			end: {
		    				__typename: 'HourAndMinutes',
		    				...day.horary.end//{hour, minutes}
		    			}
		    		})
	    		}//
	    	}));
	    }
	    else if(mode === "SAME_FOR_DAYS"){
	    	delete newData.businessHours.working_days;
	    	newData.businessHours.__typename = 'SameForDays';
	    	newData.businessHours.week_days = week_days;
	    	newData.businessHours.horary = {
    			__typename: 'Horary',
    			start: {
					__typename: 'HourAndMinutes',
					...horary.start//{hour, minutes}
    			},
    			end: {
    				__typename: 'HourAndMinutes',
    				...horary.end//{hour, minutes}
    			}
    		}
	    }
	    else {
	    	newData.businessHours.__typename = 'TwentyFourSeven';
	    	delete newData.businessHours.week_days;
	    	delete newData.businessHours.horary;
			delete newData.businessHours.working_days;
	    }

	    /*con el response (usar en produccion)*/
	    //const newData = { businessHours: updateBusinessHours }

	    //console.log('new data', newData); 
	    proxy.writeQuery({ query: GetBusinessHours, data: {...newData} });
	    //console.log("leyendola:", proxy.readQuery({ query: GetBusinessHours }));
	}
	catch(e){
		console.log(e);
	}
}

const calculateHorary = (week_day, working_days) => {
	const workeable = working_days[week_day] || false;
	return({
		workeable,
		horary: do {
			if(!workeable) null;
			else ({
				start: {
					hour: working_days[`${week_day}_start`].getHours(),
					minutes: working_days[`${week_day}_start`].getMinutes()
				},
				end: {
					hour: working_days[`${week_day}_end`].getHours(),
					minutes: working_days[`${week_day}_end`].getMinutes()
				}
			})
		}
	})
}

const apolloContainer = graphql(UpdateBusinessHours, {
	props: ({mutate}) => ({
		update: ({mode, holidays, working_days}) => {
			let businessHours = { mode, holidays };
			if(mode === "CUSTOMIZED"){
				/*workingDayInput*/
				businessHours.working_days = WEEK_DAYS.map(day => ({
					day: day.value,
					...calculateHorary(day.value, working_days)
				}))
			}
			else if(mode === "SAME_FOR_DAYS"){
				businessHours.week_days = working_days.week_days;
				businessHours.horary = {
					start: {
						hour: working_days[`horary_start`].getHours(),
						minutes: working_days[`horary_start`].getMinutes()
					},
					end: {
						hour: working_days[`horary_end`].getHours(),
						minutes: working_days[`horary_end`].getMinutes()
					}
				}
			}
			return mutate({
				variables: { businessHours },
				update: updateApolloCache(businessHours)
			});
		}
	})
})

const reduxContainer = connect( (state) => ({
	mode: getFormValues('businessHours')(state).mode,
	working_days: getFormValues('workingDays')(state),
	holidays: state.businessHours.holidays
}), { openAlert, goBack });

@compose(
	apolloContainer,
	reduxContainer
)
class Buttons extends Component {
	
	/*recibe props pero jamas re-renderiza el component por las nuevas props*/
	shouldComponentUpdate = nextProps => false ;

	send = () => {
		const { mode, working_days, holidays } = this.props;
		this.props.update({ mode, working_days, holidays })
			.then(({data}) => this.props.openAlert("Horario Habil Actualizado Exitosamente"))
	}

	render = () => (
		<FormButtonGroup 
			cancel={this.props.goBack} 
			send={this.send}
		/>
	)
}

export default Buttons;