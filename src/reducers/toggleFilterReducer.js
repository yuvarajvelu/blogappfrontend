
const toggleFilterReducer = ( state = false, action) => {
    switch(action.type) {
        case 'COLLAPSE':
            return !action.data
        default:
            return state
    }
}

export const toggleChange = (visible) => {
    return {
        type: 'COLLAPSE',
        data: visible
    }
}

export default toggleFilterReducer