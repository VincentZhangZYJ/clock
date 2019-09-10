import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaultCountStyles from './index.module.scss';

class CountDown extends Component {
    static propTypes = {
        secs: PropTypes.number,
        title: PropTypes.string,
        styles: PropTypes.object,
    };

    static defaultProps = {
        secs: 0,
        title: 'Time Left',
        styles: defaultCountStyles,
    };

    state = {
        hours: '00',
        minutes: '00',
        seconds: '00',
        totalSecs: this.props.secs,
    };

    convertHMS(value) {
        const sec = parseInt(value, 10);
        let hours   = Math.floor(sec / 3600);
        let minutes = Math.floor((sec - (hours * 3600)) / 60);
        let seconds = sec - (hours * 3600) - (minutes * 60);
        // add 0 if value < 10
        if (hours   < 10) {hours = '0'+hours;}
        if (minutes < 10) {minutes = '0'+minutes;}
        if (seconds < 10) {seconds = '0'+seconds;}
        return {
            hours,
            minutes,
            seconds,
            totalSecs: value,
        }
    }

    calculateCountDown = (secs) => {
        if(secs - 1 < 0) return false;
        return this.convertHMS(secs - 1);
    };

    count = () => {
        const time = this.calculateCountDown(this.state.totalSecs);
        time ? this.setState(time) : this.stop();
    }

    stop = () => {
        clearInterval(this.interval);
    }

    componentDidMount() {
        this.count()
        this.interval = setInterval(() => {
            this.count()
        }, 1000);
    }

    componentWillUnmount() {
        this.stop();
    }

    render(){

        const {hours, minutes, seconds} = this.state;
        const { styles, title } = this.props;

        return (
            <div className={styles.count__container}>
                <div className={styles.count__content}>
                    <div className={styles.count__title}>
                        {title}
                    </div>
                    <div className={styles.count__section}>
                        <div className={styles.count__time}>
                            <strong>{hours}</strong>
                            <span>Hours</span>
                        </div>
                        <div className={styles.count__time}>
                            <strong>{minutes}</strong>
                            <span>Mins</span>
                        </div>
                        <div className={styles.count__time}>
                            <strong>{seconds}</strong>
                            <span>Secs</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CountDown;