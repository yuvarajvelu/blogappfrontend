
const notificationReducer = (state = null, action) => {
    switch(action.type) {
        case 'NOTIFY': 
            return action.message
        case 'CLEAR':   
            return null
        default:
            return state
    }
}
let timeOut
export const notify = (message) => {
    return dispatch => {
        dispatch({
            type: 'NOTIFY',
            message
        })

        if(timeOut) {
            clearTimeout(timeOut)
        }
        timeOut = setTimeout(() => {
            dispatch({
                type: 'CLEAR'
            })
        },5000)
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR'
    }
}

export default notificationReducer