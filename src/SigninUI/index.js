import React,{Component} from 'react'
import firebase from '../firebase'
import * as firebaseui from 'firebaseui'
import logo from '../logo512.png'
import 'firebase/auth'
import './style.css'

export default class SignInUI extends Component {
    constructor(props) {
        super(props)
        this.ui = new firebaseui.auth.AuthUI(firebase.auth())
        
    }
    componentDidMount() {
        this.ui.start('#authContainer', {
            signInSuccessUrl: '/',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            ],
        });
    }
    render() {
        return (
            <div id="authContainer">
                <div id="logo" style={{
                    width:'100%'
                }}>
                    <img style={{
                        width:200,
                        height:200,
                        display:'block',
                        margin: 'auto'
                    }} src={logo} alt="logo" />
                </div>
            </div>
        )
    }
}