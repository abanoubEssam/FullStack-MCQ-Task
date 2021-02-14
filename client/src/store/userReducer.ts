import { UPDATE_USER_DISPATCH, USERNAME_DISPATCH } from '../actions/types'

const initialState = {
    user: {
        name: "",
        score: 0
    }
}

export const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case USERNAME_DISPATCH:
            return {
                ...state,
                user: action.payload
            };
        case UPDATE_USER_DISPATCH:
            return{
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}