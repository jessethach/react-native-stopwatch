import formatTime from 'minutes-seconds-milliseconds';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: []
    };
  }

  startStopButton() {
    let style = this.state.running ? styles.stopButton : styles.startButton;

    return (
      <TouchableHighlight
        underlayColor="gray"
        onPress={this.handleStartPress}
        style={[styles.button, style]}
        >
        <Text>
          {this.state.running ? 'Stop' : 'Start'}
        </Text>
      </TouchableHighlight>
    )
  }

  lapButton() {
    let style = this.state.running ? styles.button : [styles.button, styles.lapButtonRestrict];

    return (
      <TouchableHighlight
        style={style}
        underlayColor="gray"
        onPress={this.handleLapPress}
        >
        <Text>
          Lap
        </Text>
      </TouchableHighlight>
    )
  }

  handleLapPress = () => {
    let lap = this.state.timeElapsed;

    this.setState({
      startTime: new Date(),
      laps: [...this.state.laps, lap]
    })
  }

  handleStartPress = () => {
    if (this.state.running) {
      clearInterval(this.interval);
      this.setState({ running: false });
      return
    }

    let startTime = new Date();
    this.setState({ startTime: new Date() })

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      });
    }, 30);

  }

  laps() {
    return this.state.laps.map((time, index) => {
      return (
        <View style={styles.lap}>
          <Text style={styles.lapText}>
            Lap # { index + 1 }
          </Text>
          <Text style={styles.lapText}>
            {formatTime(time)}
          </Text>
        </View>
      )
    })
  }

  // border(color) {
  //   return {
  //     borderColor: color,
  //     borderWidth: 4
  //   }
  // }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <View style={styles.timerWrapper}>
            <Text style={styles.timer}>
              {formatTime(this.state.timeElapsed)}
            </Text>
          </View>
          <View style={styles.buttonWrapper}>
            {this.startStopButton()}
            {this.lapButton()}
          </View>
        </View>

        <View style={styles.footer}>
            {this.laps()}
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1, // Fill the entire screen
    alignItems: 'stretch'
  },
  header: { // Yellow
    flex: 1
  },
  footer: { // Blue
    flex: 1
  },
  timerWrapper: { // Red
    flex: 5,// Takes up 5/8ths of the available space
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: { // Green
    flex: 3, // Takes up 3/8ths of the available space
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#00CC00'
  },
  stopButton: {
    borderColor: '#CC0000'
  },
  lapButtonRestrict: {
    backgroundColor: 'gray'
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('stopwatch', () => StopWatch);
