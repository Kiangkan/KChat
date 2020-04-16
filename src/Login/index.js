import React,{Component} from 'react'
import './style.css'
import firebase from '../firebase'
import 'firebase/auth'

const auth = firebase.auth()

export default class Login extends Component {
    googleUser() {
        auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    }
    facebookUser() {
        auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    }
    render() {
        return (
            <>
            <button
                className="gg btn"
                type="button"
                children="Log in with google"
                onClick={this.googleUser}
            />
            <button
                className="fb btn"
                type="button"
                children="Log in with facebook"
                onClick={this.facebookUser}
            />
            </>
        )
    }
}