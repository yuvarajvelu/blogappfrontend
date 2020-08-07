import React from 'react'

const Notification = ({message}) => {
    const notificationOkStyle = {
        color: 'green',
        borderStyle : 'solid',
        borderRadius : 5,
        padding : 10,
        fontSize : 20,
        background: 'lightgrey'
    }
    const notificationErrorStyle = {
        color: 'red',
        borderStyle : 'solid',
        borderRadius : 5,
        padding : 10,
        fontSize : 20,
        background: 'lightgrey'
    }
    
    if(message === null) {
        return null;
    } else {
        return (
            <div style = {message.search(/Wrong/) !== -1 ?notificationErrorStyle: notificationOkStyle}>
                {message}
            </div>
        )
    }
}

export default Notification