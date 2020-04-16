import React, {Component} from 'react'

export default class ContextMenu extends Component {
    render() {
        return (
            <div ref={this.props.main} style={{
                width: '100vw',
                height: '100vh',
                position: 'fixed',
            }} onClick={this.props.onClose}>
                <div style={{
                    position: 'absolute',
                    top: this.props.y + 'px',
                    left: this.props.x + 'px',
                    backgroundColor: '#fff',
                    border: '1px solid black'
                }} id="ctx">
                    <ul className="flex column">
                        {this.props.children}
                    </ul>
                </div>
            </div>
        )
    }
}