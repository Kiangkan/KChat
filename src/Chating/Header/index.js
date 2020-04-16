import React,{Component} from 'react'
import './style.css'

export default class Header extends Component {
    render() {
        return (
            <header id="chatingheader">
                <button
                    className="back"
                    type="button"
                    onClick={this.props.goBack}
                    children={this.props.children}
                />
                <div className="header">
                    <img src={this.props.image} alt={this.props.name} />
                    <br />
                    <span>{this.props.name}</span>
                </div>
            </header>
        )
    }
}