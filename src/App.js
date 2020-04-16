import React,{Component} from 'react'
import SignInUI from './SigninUI'
import Reports from './Reports'
import firebase from './firebase'
import ContextMenu from './contextmenu'
import html2canvas from 'html2canvas'
import 'firebase/auth'
import Loading from './Loading'
import './App.css'
import 'firebase/firestore'
import Chat from './Chat'

const auth=firebase.auth(),firestore=firebase.firestore()

class App extends Component {
    constructor(props) {
        super(props)
        auth.onAuthStateChanged(user =>
            user ?
            firestore.collection('users').doc(user.uid).set({
                uid: user.uid,
                name: user.displayName,
                photo: user.photoURL,
                email: user.email,
                emailVerified: user.emailVerified,
                keyword: user.displayName.toLowerCase()
            })
            .then(() => this.setState({App:true}))
            .catch(err => console.log(err))
            :
            this.setState({App: null})
        );
        window.oncontextmenu = e => {
            this.setState({
                contextmenu: true,
                contextmenuX: e.clientX,
                contextmenuY: e.clientY
            })
            return false
        }
    }
    state = {
        App: false
    }
    SignOut = () => auth.signOut().then(() =>this.setState({App:null}))
    Report = () => {
        auth.currentUser !== null && 
        html2canvas(document.body, {
            width: window.innerWidth,
            height: window.innerHeight
        }).then(canvas => {
            let src = canvas.toDataURL('image/jpeg');
            canvas.toBlob(blob => this.setState({blobImage: blob}))
            this.setState({report:true,reportImg:src,contextmenu:false})
        })
    }
    closeCTX = () =>
        this.setState({contextmenu:false})
    closeReport = () =>
        this.setState({report:false})
    render() {
        return(
            <>
            {this.state.report &&
                <Reports
                    onClose={this.closeReport}
                    fromUser={auth.currentUser.uid}
                    imageSrc={this.state.reportImg}
                    bgColor="rgba(0,0,0,0.5)"
                    imageBlob={this.state.blobImage}
                />
            }
            {this.state.contextmenu &&
                <ContextMenu onClose={this.closeCTX} x={this.state.contextmenuX} y={this.state.contextmenuY}>
                    <li onClick={this.Report}>report</li>
                </ContextMenu>
            }
            {this.state.App === true ?
                <Chat signOut={this.SignOut}/>
            :
                this.state.App === null ?
                    <SignInUI />
                :
                    this.state.App === false ?
                        <Loading children="Connecting" />
                    : null
            }
            </>
        )
    }
}

export default App