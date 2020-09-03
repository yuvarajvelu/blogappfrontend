import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({message}) => {    
    if(message === null) {
        return null;
    } else {
        return (
            <div>
                {message.search(/Wrong/) !== -1 && <Alert variant = 'danger'>{message}</Alert>}
                {message.search(/Wrong/) === -1 && <Alert variant = 'success'>{message}</Alert>}
            </div>
        )
    }
}

export default Notification