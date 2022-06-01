import { userConstants } from "./constants";

export const addUsers = (user) => {
    return async (dispatch) => {
        dispatch({ type: `${userConstants.ADD_USERS}` , payload :user });
    }
}

export const addMessage= (message) => {
    return async dispatch => {
            dispatch({
                type: userConstants.ADD_MESSAGE,
                payload: message
            })
    }
}

export const deleteMessage = (index) => {
    return async dispatch => {
        dispatch({
            type: userConstants.DELETE_MESSAGE,
            payload:index
        })
    }
}

export const updateMessage = (status,index) => {
    return async dispatch => {
      dispatch({
          type :userConstants.UPDATE_MESSAGE,
          payload : {status,index}
      })

    }
}