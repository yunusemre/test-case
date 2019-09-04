import React from 'react'
import PropTypes from 'prop-types'

class Toast extends React.Component {
  render() {
    const { visible, type, message } = this.props;
    let classes = visible ? 'show' : '';
    return <div id="toaster">
      {
        visible && <div className={`toaster ${classes} ${type}`}>{message}</div>
      }
    </div>


  }
}

Toast.propTypes = {
  visible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

Toast.defaulProps = {
  visible: false,
  message: "",
  type: "alert-success"
}


export default Toast