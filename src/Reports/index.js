import React,{Component} from 'react'
import Modal from '../Modal'
import firebase from '../firebase'
import 'firebase/storage'
import 'firebase/firestore'

const storage = firebase.storage(),firestore = firebase.firestore()

export default class Report extends Component {
    text = React.createRef()
    send = () => {
        firestore.collection('reports').add({
            report: this.text.current.value,
            user: this.props.fromUser,
        }).then(key =>
            storage.ref().child(`reports/${key.id}.jpeg`).put(this.props.imageBlob).then(file =>
                firestore.collection('reports').doc(key.id).update({
                    locatReport: file.metadata.name
                }).then(() => this.setState({msgClass:'success',msg:'your report sended'}))
            )
        )
        .catch(() => this.setState({msgClass:'fail',msg:'fail to send your report'}))
    }
    state = {
        msg: null,
        msgClass: null
    }
    render() {
        return (
            <Modal x={this.props.x} y={this.props.y} bgColor={this.props.bgColor}>
                <div style={{
                    paddingBottom: 10,
                    borderBottom: '1px solid black',
                    textAlign: 'right',
                    zIndex: 1
                }}>
                    <button
                        className="close"
                        children="&times;"
                        title="Close"
                        onClick={this.props.onClose}
                    />
                </div>
                <div>
                    <img src={this.props.imageSrc} alt={this.props.fromUser}/>
                </div>
                <div>
                    <input
                        type="text"
                        style={{
                            width: '80%'
                        }}
                        ref={this.text}
                        placeholder='type something wrong'
                    />
                    <input
                        type="button"
                        value="send"
                        style={{
                            width: '20%'
                        }}
                        onClick={this.send}
                    />
                </div>
                {this.state.msg !== null && <p className={this.state.msgClass}>{this.state.msg}</p>}
            </Modal>
        )
    }
}