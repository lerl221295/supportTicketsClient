import { ADD_ALERT, SET_ALERTS, DELETE_ALERT } from '../actions'

/*Lo correcto seria manejar cada subestado de businessHours en distintos reducers (archivos separados),
pero ya que este modulo usa reduxForm para los otros estados y redux solo para los alerts,
trabajare el subestado de alerts en este archivo*/

const initialState = [
	{
		"type": "SLA_VIOLATION",
		"motive": "RESPONSE",
		"time": 52,
		"message": "Consequatur architecto nisi qui possimus. Est omnis quas et ad impedit. Quam voluptates corporis. Voluptatum vero magni blanditiis cum aut accusamus et.",
		"to": [
			{
				"id": "2040710b-8309-4043-8318-71028177c3a6"
			},
			{
				"id": "6d16b526-9072-4f20-86b0-0c9be8e66ee4"
			}
		]
	},
	{
		"type": "REMINDER",
		"motive": "RESPONSE",
		"time": 6,
		"message": "Cumque nostrum aut quibusdam. Ipsa quos rerum veniam voluptatem ratione. Voluptatem voluptatem ut consequatur sapiente autem deleniti quis. Ipsum voluptas totam officia eos voluptatem assumenda. Deserunt dignissimos asperiores qui corrupti vero dolores sint possimus.",
		"to": [
			{
				"id": "4457391d-525b-4a37-b922-2b25f03a36ce"
			},
			{
				"id": "83038f6d-ab24-418a-85ad-eb301f88c3ad"
			}
		]
	},
	{
		"type": "SLA_VIOLATION",
		"motive": "RESPONSE",
		"time": 135,
		"message": "Exercitationem dolore sed similique dolor praesentium harum. Eum aut et accusamus eveniet. Fugit rerum fugit suscipit voluptatibus voluptatem quis.",
		"to": [
			{
				"id": "33522b40-2ee1-4698-97fb-8dd60fafa674"
			},
			{
				"id": "d6f71781-0b39-4c1f-9bd8-981cf5e104af"
			}
		]
	},
	{
		"type": "SLA_VIOLATION",
		"motive": "RESPONSE",
		"time": 26,
		"message": "Et numquam ea officiis eaque laudantium voluptates. Illo quae accusamus in. Rerum eos eligendi ducimus similique eum voluptatem laudantium.",
		"to": [
			{
				"id": "9d949b93-418f-4232-8a0c-2e48abeff645"
			},
			{
				"id": "45554d05-68b3-4842-b061-f0113501418c"
			}
		]
	},
	{
		"type": "SLA_VIOLATION",
		"motive": "RESOLUTION",
		"time": 69,
		"message": "Sit amet sed. Tempora harum iure similique adipisci quo eos nulla ex. Quo cum dolor.",
		"to": [
			{
				"id": "77e6ad44-b33c-4dac-b203-227e402c79d8"
			},
			{
				"id": "2fa8ecc8-d794-48d0-b459-53dcc24fbcdc"
			}
		]
	},
	{
		"type": "REMINDER",
		"motive": "RESOLUTION",
		"time": 96,
		"message": "Et et qui sed praesentium. Eum magni veritatis voluptatem ducimus. Blanditiis architecto omnis quos adipisci ducimus qui quia magni.",
		"to": [
			{
				"id": "c6856fec-ab6b-461c-bab1-9ce2fc79abdd"
			},
			{
				"id": "24e7f394-0936-43d3-ac98-09f6e0432039"
			}
		]
	}
];

export default (state = initialState, {type, payload}) => {
	switch (type) {
		case SET_ALERTS : return([...state, ...payload.alerts]);
		case ADD_ALERT : return([ ...state, {...payload.alert} ]);
		case DELETE_ALERT:
			/*solo debe haber un alert del mismo tipo y motivo con el mismo tiempo*/
			let newAlerts = [...state].filter(alert => (
				alert.type !== payload.type &&
				alert.motive !== payload.motive &&
				alert.time !== payload.time
			));
			return([...newAlerts]);
	}
	return state;
}