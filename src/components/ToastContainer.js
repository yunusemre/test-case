import React from 'react'
import PropTypes from 'prop-types'

class Toast extends React.Component {
  render() {
    let classes = this.props.visible ? 'visible toaster' : 'toaster'
    return (
      <div className={classes}>
        <p>{this.props.message}</p>
      </div>
    )
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