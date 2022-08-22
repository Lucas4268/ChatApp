import { ChatContextState } from "./ChatContext"

export const chatReducer = ( state: ChatContextState, action: any ): ChatContextState => {
    switch (action.type) {
        case 'set-users':
            return {
                ...state,
                users: action.payload
            }

        case 'set-messages':
            return {
                ...state,
                messages: action.payload
            }

        case 'new-message': {
            const { uid, message } = action.payload;
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [ uid ]: (state?.messages[uid])
                                ? message._id.split('-')[0] === 'messageTemp'
                                    ? [ message, ...state.messages[uid] ]
                                    : [ message, ...state.messages[uid].filter(m => m._id.split('-')[0] !== 'messageTemp') ]
                                : [ message ]
                }
            }}

        case 'message-received': {
            const { uid, messageId } = action.payload 
            const messages = state.messages[uid]
            const index = state.messages[uid].findIndex(m => m._id === messageId)
            const [messageReceived] = messages.splice(index, 1)
            messageReceived.received = true

            return {
                ...state,
                messages: {
                    ...state.messages,
                    // [ uid ]: [ {...state.messages[uid].find(m => m._id === messageId), received: true}, ...state.messages[uid] ]
                    [ uid ]: [ messageReceived ,...messages ]
                }
            }
        }

        default:
            return {
                ...state
            }
    }
}