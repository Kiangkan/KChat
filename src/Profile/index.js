import React,{Component} from 'react';
import Modal from '../Modal';
import './style.css'

export default class Profile extends Component {
    render() {
        return this.props.open ?
                <Modal onClose={this.props.onClose}>
                    {this.props.children}
                    <div id="selfprofile">
                        <div className="profile">
                            <img src={this.props.image} alt={this.props.name} />
                            <p className="selfName">{this.props.name}</p><br />
                            <input
                                type="text"
                                disabled
                                defaultValue={this.props.uid}
                            />
                        </div>
                    </div>
                    <button onClick={this.props.signOut} children="Sign Out"/>
                </Modal>
            :
                null
    }
}