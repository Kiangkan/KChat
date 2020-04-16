import React,{Component} from 'react'
import './style.css'

export default class Messages extends Component {
    state = {
        lastSendItem: this.props.lastMessages,
        users: this.props.value
    }
    static getDerivedStateFromProps(props, oldState) {
        return {
            lastSendItem: props.lastMessages,
            users: props.value
        }
    }
    render() {
        return (
            <React.Fragment>
                {this.state.users.map((data,keys) =>
                    <div
                        key={keys}
                        className="users"
                        onClick={this.props.onClick}
                        data-uid={data.uid}
                    >
                        <div className="usersImg">
                            <img alt={data.name} src={data.photo} />
                        </div>
                        <div className="usersData">
                            <p className="usersName">{data.name}</p>
                            {/*<p className="latestUmsg">
                                <small ref={this.props.ltsData}>{
                                this.state.lastSendItem.length > 0 &&
                                    Object.entries(this.state.lastSendItem[keys]).map(val =>
                                        val[1].sender === data.uid ?
                                            val[1].seen ?
                                                <span key={keys}>
                                                    {data.name} : {val[1].value}
                                                </span>
                                            :
                                                <b key={keys}>{data.name} : {val[1].value}</b>
                                        :
                                            <span key={keys}>you : {val[1].value}</span>
                                    )
                            }</small>
                            </p>*/}
                        </div>
                    </div>
                )}
            </React.Fragment>
        )
    }
}

