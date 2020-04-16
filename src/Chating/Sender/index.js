import React,{Component} from 'react'
import './style.css'
import firebase from '../../firebase'
import 'firebase/database'

const db = firebase.database()

class Sender extends Component {
    state = {disableSend:true,inputStyle:{width:'100%'}}
    text = React.createRef()
    sendUpdate = () =>
        this.text.current.innerHTML ?
            this.setState({
                disableSend:false,
                inputStyle:{width:'80%'},
                sendBtnStyle:{width:'20%'}
            })
        :
            this.setState({
                disableSend:true,
                inputStyle:{width:'100%'},
                sendBtnStyle:{width:0,padding:0,border:0}

            })
    onSend = () => {
        let now=new Date(),key
            db.ref(`Messages-Data/${this.props.sendKey}`).once('value', keys => {
                keys.val() ? key=keys.val().length : key=0
                db.ref(`Messages-Data/${this.props.sendKey}/${key}`).update({
                    value: this.text.current.innerText,
                    type: 'text',
                    date: {
                        year: now.getFullYear(),
                        month: now.getMonth(),
                        date: now.getDate(),
                        day: now.getDay(),
                        hour: now.getHours(),
                        minute: now.getMinutes(),
                        second: now.getSeconds()
                    },
                    sender: this.props.selfID,
                    seen: false
                }).then(() => {
                    this.text.current.innerHTML = null
                    this.sendUpdate(this.text)
                })
            })
    }
    render() {
        return this.props.sendKey &&
            <div id="sender">
                <div style={this.state.inputStyle} className="items texting">
                    <div
                        ref={this.text}
                        contentEditable
                        placeholder="text here"
                        id="textItem"
                        onInput={this.sendUpdate}
                    >
                    </div>
                </div>
                <input
                    style={this.state.sendBtnStyle}
                    id="sendBtn"
                    type="button"
                    value="Send"
                    onClick={this.onSend}
                    disable={`${this.state.disableSend}`}
                />
                <div className="items coming">
                    <p>Coming soon</p>
                </div>
            </div>
    }
}

export default Sender