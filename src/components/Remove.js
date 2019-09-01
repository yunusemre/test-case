import React from 'react'

const Remove = ({ name, cancel, ok }) => (
  <div className={`modal fade show`} style={{ display: 'block' }}>
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-body">
          <p className="text-center">Emin misiniz?</p>
          <hr />
          <h3 className="text-center">{name}</h3>
          <hr />
          <div className="text-center">
            <button className="btn btn-primary" onClick={ok}>OK</button>
            <button className="btn btn-default" onClick={cancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
)


export default Remove