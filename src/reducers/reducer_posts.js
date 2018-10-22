import _ from "lodash";
import { FETCH_POSTS, FETCH_POST, DELETE_POST, UPDATE_POST } from "../actions";

export default function(state = {}, action) {
	switch (action.type) {
		case UPDATE_POST:
			return _.merge(state, action.payload);
		case DELETE_POST:
			return _.omit(state, action.payload);
		case FETCH_POSTS:
			return _.mapKeys(action.payload.data, "_id");
		case FETCH_POST:
			const post = action.payload.data;
			const newState = { ...state };
			newState[post._id] = post;
			return newState;
		default:
			return state;
	}
}
