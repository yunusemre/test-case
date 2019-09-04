import React from 'react'
import PropTypes from 'prop-types'

class Toast extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  render() {
    let classes = this.props.visible ? 'visible toast' : 'toast'
    return (
      <div className={classes}>
        <p>{this.props.message}</p>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props.visible)
    if (this.props.visible !== nextProps.visible) {
      this.setState({
        visible: nextProps.visible
      })
    }
  }
}

Toast.propTypes = {
  visible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
}

Toast.defaulProps = {
  visible: false,
  message: ""
}


export default Toast