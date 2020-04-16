import React from 'react'

export default class Modal extends React.Component {
    render() {
        return (
                <div style={{
                    width: '100vw',
                    height: '100vh',
                    position: 'fixed',
                    top: this.props.y + 'px', left: this.props.x + 'px',
                    backgroundColor: this.props.bgColor,
                }} className="outerModal">
                    <div style={{
                        backgroundColor: '#000000',
                        padding: '10px',
                        position: 'absolute',
                        top:'50%',left:'50%',
                        transform: 'translate(-50%, -50%)'
                    }} className="modalContainer">
                        {this.props.children}
                    </div>
                </div>
        )
    }
    static defualtProps = {
        y: 0,x: 0,
    }
}