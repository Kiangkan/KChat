import React from 'react';
import MomentAgo from './../../MomentAgo';
import './style.css';

export default class Message extends React.Component {
    isMe = this.props.sender === this.props.selfID
    render() {
        return (
            <div className={`msgInner${this.isMe ? " self" : ""}`}>
                {!this.isMe &&
                <span className="userImage">
                    <img src={this.props.senderImg} alt={this.props.chaingName}/>
                </span>}
                <div className="message">
                    <p>{this.props.value}</p>
                </div>
                <MomentAgo
                    date={{
                        year: this.props.date.year,
                        month: this.props.date.month,
                        date: this.props.date.date,
                        day: this.props.date.day,
                        hour: this.props.date.hour,
                        minute: this.props.date.minute,
                    }}
                    className="itemBirth"
                />
            </div>
        )
    }
}