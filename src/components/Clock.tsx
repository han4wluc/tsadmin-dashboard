import React from 'react'

export default class Clock extends React.Component<any, any> {

  interval: any

  componentWillMount() {
    this.setState({
      count: 1
    })
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        count: this.state.count + 1
      })
    }, 1000)
    console.warn('clock mount')
  }

  componentWillUnmount() {
      clearInterval(this.interval)
      console.warn('clock unmount')
  }

  render() {
    return (
        <div>
            count: {this.state.count}
        </div>
    )
  }
}
