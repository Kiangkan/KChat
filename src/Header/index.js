import React,{Component} from 'react'
import Profile from '../Profile'
import './style.css'
import logo from '../logo512.png'

export default class MainHeader extends Component {
    state = {openProfile:false}
    openProfile = () =>
        this.setState({openProfile: !this.state.openProfile})
    render() {
        return (
            <header id="header">
                <div id="logo">
                    <img src={logo} alt="KChat" />
                </div>
                <div id="yourSelf" onClick={this.openProfile}>
                    <img src={this.props.image} alt={this.props.name} />
                </div>
                <Profile
                    open={this.state.openProfile}
                    image={this.props.image}
                    name={this.props.name}
                    uid={this.props.uid}
                    signOut={this.props.signOut}
                >
                    <div style={{
                    paddingBottom: 10,
                    borderBottom: '1px solid black',
                    textAlign: 'right'
                }}>
                        <button
                            className="close"
                            children="&times;"
                            title="Close"
                            onClick={this.openProfile}
                        />
                    </div>
                </Profile>
            </header>
        )
    }
}