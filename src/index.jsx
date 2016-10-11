import React from 'react'
import style from './index.css'

export default class PullDown extends React.Component{

  constructor(props) {

    super(props)
    this.state = {
      offset: 0,
      pulling: false
    }

    this.__container = null
    this.__lastPageY = 0
    this.__threshold = 0

  }

  componentDidMount() {

    this.__container = document.querySelector(this.props.container) || this.refs.content.parentNode
    this.__threshold = this.props.threshold || 200
    this.__sensitivity = this.props.sensitivity || .4

  }

  render() {

    return (
      <div
        ref="content"
        className={style['pulldown']}
        onTouchStart={(e) => this.handleTouchStart(e)}
        onTouchMove={(e) => this.handleTouchMove(e)}
        onTouchEnd={(e) => this.handleTouchEnd(e)}
        style={{
          minHeight: this.props.minHeight || '100%', 
          WebkitTransition: this.state.pulling ? 'none' : 'transform .3s',
          WebkitTransform: 'translateZ(0) translateY(' + this.state.offset / (1 / this.__sensitivity) + 'px)',
          transition: this.state.pulling ? 'none' : 'transform .3s',
          transform: 'translateZ(0)  translateY(' + this.state.offset / (1 / this.__sensitivity) + 'px)'
        }}
        >
          <div className={style['pulldown-tip']}>{this.props.tip}</div>
          {this.props.children}
        </div>
    )

  }

  handlePullCancel() {

    typeof this.props.onPullCancel === 'function' && this.props.onPullCancel()

  }

  handlePullDown() {

    typeof this.props.onPullDown === 'function' && this.props.onPullDown()

  }

  handleTouchStart(e) {

    if (this.__container.scrollTop > 0) {
      return
    }

    this.__lastPageY = e.touches[0].pageY
    this.setState({
      pulling: true
    })

  }

  handleTouchEnd() {

    if (this.__container.scrollTop > 0) {
      return
    }

    if (this.state.offset < this.__threshold) {
      this.handlePullCancel()
    } else {
      this.handlePullDown()
    }

    this.setState({
      pulling: false,
      offset: 0
    })

  }

  handleTouchMove(e) {

    if (this.__container.scrollTop > 0) {
      return
    }

    let offset = e.touches[0].pageY - this.__lastPageY
    offset < 0 && (offset = 0)
    offset > this.__threshold && (offset = this.__threshold)
    offset > 0 &&  e.preventDefault()

    this.setState({ offset })

  }

}