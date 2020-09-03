
const userReducer = (state = null, action) => {
    switch(action.type) {
        case 'ADD_USER':
            return action.data
        default:
            return state
    }
}

export const loginUser = (user) => {
    return {
        type: 'ADD_USER',
        data: user
    }
}

export default userReducer