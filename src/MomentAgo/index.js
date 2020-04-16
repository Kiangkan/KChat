import React, {Component} from 'react';

class MomentAgo extends Component {
    constructor(props) {
        super(props)
        this.state = {display:null}
        const date = this.props.date
        var now,year,month,dates,hour,minute,display,hoursAgo,minuteAgo,
        monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        dayList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        this.update = setInterval(() => {
            now = new Date()
            year = now.getFullYear() - date.year
            month = now.getMonth() - date.month
            dates = now.getDate() - date.date
            hour = now.getHours() - date.hour
            minute = now.getMinutes() - date.minute
            hoursAgo = Math.floor((hour*60+minute)/60)
            minuteAgo = (hour*60+minute)%60
            year > 0 ? 
                display = `${date.year} ${monthList[date.month]} ${date.date}`
            :
                month > 0 ?
                    display = `${monthList[date.month]} ${date.date} ${dayList[date.day]}`
                :
                    dates > 0 ?
                        display = `${date.date} ${dayList[date.day]} ${date.hour > 12 ? `${date.hour/2}:${date.minute}PM`:`${date.hour}:${date.minute}AM`}`
                    :
                        hoursAgo > 0 ?
                            display = `${hoursAgo}:${String(minuteAgo).length === 1 ? '0' + minuteAgo : minuteAgo} hours ago`
                        :
                            display = `${minuteAgo === 0 ? 'Just Now' : minuteAgo + ' minutes ago'}`
            this.setState({display:display})
        }, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.update)
    }
    render() {
        return (
            <div className={'moment ' + this.props.className}>
                <span>{this.state.display}</span>
            </div>
        )
    }
}

export default MomentAgo