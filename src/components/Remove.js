import React from 'react'
import PropTypes from 'prop-types'

const Remove = ({ name, cancel, accept }) => (
  <div className={name !== null ? `modal show fade db` : `modal`} >
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-body">
          <p className="text-center">Aşağıda seçili olan linki sileceksiniz. Emin misiniz?</p>
          <hr />
          <h3 className="text-center">{name}</h3>
          <hr />
          <div className="text-center">
            <button className="btn btn-primary" onClick={accept}>OK</button>
            <button className="btn btn-default" onClick={cancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

Remove.defaultProps = {
  name: '',
  cancel: () => { },
  accept: () => { },
}

Remove.prototype = {
  name: PropTypes.string.isRequired,
  cancel: PropTypes.func.isRequired,
  accept: PropTypes.func.isRequired,
}


export default Remove