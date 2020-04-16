import React,{Component} from 'react'
import firebase from './../firebase'
import 'firebase/firestore'
import 'firebase/auth'
import './style.css'

const firestore=firebase.firestore(),auth=firebase.auth()

export default class FindUsers extends Component {
    state = {users:[]}
    onChange = e => 
        e.target.value &&
            firestore.collection('users')
            .where('keyword', '==', e.target.value.toLowerCase())
            .get().then(data =>
                    !data.empty ?
                        data.forEach(users =>
                            users.id !== auth.currentUser.uid &&
                            this.setState({users:[users.data()]})
                        )
                    :
                            this.setState({users:[]})
            )
    render() {
        return (
            <div id="findUsers">
                <input
                    id="typeToFind"
                    type="text"
                    placeholder="@username"
                    onChange={this.onChange}
                />
                {this.state.users.map((val,keys) =>
                    <div key={keys} id="allUsersFinded">
                        <div onClick={this.props.onClick} data-uid={val.uid} className="usersFind">
                            <img
                                src={val.photo}
                                alt={val.name}
                            />
                            <p>{val.name}</p>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}