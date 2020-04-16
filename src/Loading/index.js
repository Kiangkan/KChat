import React,{Component} from 'react'
import logo from '../logo512.png'

export default class Loading extends Component {
    state ={
        dot: ''
    }
    componentDidMount() {
        let val = ''
        this.dotChange = setInterval(() => {

            if (this.state.dot.length === 3) {
                this.setState({dot:''})
                val = ''
            } else {
                this.setState({dot: val += '.'})
            }
        }, 300)
    }
    componentWillUnmount() {
        clearInterval(this.dotChange)
    }
    render() {
        return (
            <div id="loading">
                <div className="loading">
                    <img src={logo} alt="logo"/>
                    <p>{this.props.children}{this.state.dot}</p>
                </div>
            </div>
        )
    }
}