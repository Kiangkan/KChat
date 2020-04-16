import React,{Component} from 'react';
import Messages from '../Messages';
import UserFind from '../UserFind';
import Heading from '../Header';
import Chating from '../Chating';
import firebase from '../firebase';
import 'firebase/firestore';
import 'firebase/auth'
import 'firebase/database'

const fs=firebase.firestore(),auth=firebase.auth(),db=firebase.database()

export default class Chat extends Component {
    constructor(props) {
        super(props)
        this.refLtsData = React.createRef()
        fs.collection('users').doc(auth.currentUser.uid).collection('connected')
        .onSnapshot(data => {
            data.forEach(val => {
                this.databaseRef = db.ref(`Messages-Data/${val.id}`)
                this.databaseRef.limitToLast(1).on('value', data => {
                        let oldState=this.state.lastMessages,ltsOld
                    if (data.val() !== null)
                        //ltsNew=data.val()[Object.keys(data.val())]
                        oldState.length > 0 ?
                            oldState.forEach((old,key) => {
                                ltsOld = old[Object.keys(old)]
                                if (ltsOld.sender === data.val()[Object.keys(data.val())].sender) {
                                    oldState[key] = data.val()
                                    this.setState({lastMessages:oldState})
                                }
                                else {
                                    oldState.push(data.val())
                                    this.setState({lastMessages:oldState})
                                }
                            })
                        :
                            this.setState({lastMessages:[data.val()]})
                })
            })
            data.forEach(val => {
                [val.data()].forEach(val =>
                    fs.collection('users').doc(val.user)
                    .onSnapshot(userData => {
                        let data = this.state.messages
                        if (userData.data())
                            data.push(userData.data())
                            this.setState({messages:data})
                    })
                )
            })
        })
    }
    state = {
        chating: false,
        messages:[],
        lastMessages: []
    }
    onClick = e => {
        let here = e.currentTarget.dataset.uid
        this.setState({
            chating: true,
            chatingId: here,
            chatingImg: e.currentTarget.querySelector('img').src,
            chatingName: e.currentTarget.querySelector('p').innerText
        })
    }
    onClose = () => {
        this.setState({chating:false})
    }
    render() {
        return this.state.chating ?
            <Chating
                close={this.onClose}
                chatingId={this.state.chatingId}
                selfId={auth.currentUser.uid}
                chatingImg={this.state.chatingImg}
                chatingName={this.state.chatingName}
            />
        :
            <>
                <Heading
                    image={auth.currentUser.photoURL}
                    name={auth.currentUser.displayName}
                    uid={auth.currentUser.uid}
                    signOut={this.props.signOut}
                />
                <UserFind
                    onClick={this.onClick}
                />
                <Messages
                    lastMessages={this.state.lastMessages}
                    onClick={this.onClick}
                    value={this.state.messages}
                    ltsData={this.refLtsData}
                />
            </>
    }
}
/*
                
*/