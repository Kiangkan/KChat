import React,{Component} from 'react'
import Message from './Message'
import Header from './Header'
import Sender from './Sender'
import firebase from '../firebase'
import 'firebase/firestore'
import 'firebase/database'
import './style.css'

const fs=firebase.firestore(),db=firebase.database()

export default class Chating extends Component {
    state = {connectKey:null,messages:[]}
    constructor(props) {
        super(props)
        this.main = React.createRef()
        this.getConnect = fs.collection("users").doc(this.props.selfId).collection('connected')
    }
    componentDidUpdate() {
        this.main.current.scrollTo(0, this.main.current.scrollHeight) //update height
    }
    componentDidMount() {
        this.setState({updateState:true})
        this.getConnect.where('user', '==', this.props.chatingId).get()
        .then(val => {
            if (val.empty) {
                this.getConnect.add({
                    user: this.props.chatingId
                })
                .then(connkey =>
                    fs.collection("users").doc(this.props.chatingId).collection('connected')
                    .doc(connkey.id).set({
                        user: this.props.selfId
                    })
                    .then(() => {
                        this.setState({connectKey:connkey.id})
                    })
                )
            } else {
                db.ref(`Messages-Data/${val.docs[0].id}`)
                .on('value', data => {
                    if(this.state.updateState) {
                        if (data.val()) {
                            this.setState({messages:data.val()})
                            let last = data.val()[data.val().length-1]
                            last.sender !== this.props.selfId &&
                            db.ref(`Messages-Data/${val.docs[0].id}`)
                            .update({[data.val().length-1]:{...last,seen:true}})
                        }
                    }
                })
                this.setState({connectKey:val.docs[0].id})
            }
                //
        })
        .catch(err => console.log(err))
    }
    componentWillUnmount() {
        this.setState({updateState:false})
    }
    render() {
        return (
            <div ref={this.main} id="chating">
                <Header
                    goBack={this.props.close}
                    children="Back"
                    name={this.props.chatingName}
                    image={this.props.chatingImg}
                />
                <div className="clear"/>
            {this.state.messages.map((data,keys) =>
                <Message
                    senderImg={this.props.chatingImg}
                    senderName={this.props.ChatingName}
                    key={keys}
                    selfID={this.props.selfId}
                    sender={data.sender}
                    value= {data.value}
                    date={data.date}
                />
            )}
                <Sender
                    sendKey={this.state.connectKey}
                    selfID={this.props.selfId}
                />
            </div>
        )
    }
}