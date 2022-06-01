import { userConstants } from "../actions/constants"

const intiState = {
    users: [],
    conversations: [],
    lastMessage: []
}

export default (state = intiState, action) => {

    switch (action.type) {
        case `${userConstants.ADD_USERS}`:
            state = {
                ...state,
                users: [action.payload, ...state.users]
            }
            break;
        case `${userConstants.ADD_MESSAGE}`: {
            let updatelastMessage = state.lastMessage;
            let index = state.lastMessage.findIndex((item) => item.uid === action.payload.uid);
            if (index !== -1) {
                updatelastMessage[index] = action.payload
            } else {
                updatelastMessage.push(action.payload)
            }

            let currentUser = state.users.find(user => user.uid === action.payload.uid);
            let otherUser = state.users.filter(user => user.uid !== action.payload.uid)


            state = {
                ...state,
                conversations: [...state.conversations, action.payload],
                lastMessage: updatelastMessage,
                users:[currentUser, ...otherUser]
            }
        }
            break;
        case `${userConstants.DELETE_MESSAGE}`: {
            const remainConversation = state.conversations.filter((item, index) => index !== action.payload)
            state = {
                ...state,
                conversations: remainConversation
            }
        }
            break;
        case `${userConstants.UPDATE_MESSAGE}`: {
            let toUpdateConversation = state.conversations;
            let currentIndex = action.payload.index;

            toUpdateConversation[currentIndex].starMark = action.payload.status

            state = {
                ...state,
                conversations: toUpdateConversation
            }
        }
            break;
    }


    return state;

}