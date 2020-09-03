import { createStore, combineReducers, applyMiddleware } from 'redux'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import toggleFilterReducer from './reducers/toggleFilterReducer'

const reducer = combineReducers({
    blogs: blogsReducer,
    notify: notificationReducer,
    user: userReducer,
    filter: toggleFilterReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store