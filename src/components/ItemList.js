import React from 'react'
import PropTypes from 'prop-types'
import Item from './Item'

const ItemList = ({ arr, onRemove, plus, minus }) => (
  arr.length === 0 ? <div className="alert alert-info">You do not have any data</div> : arr.map(res => <Item key={res.id} {...res} up={() => plus(res.id)} down={() => minus(res.id)} remove={() => onRemove(res)} />)
)

ItemList.defaultProps = {
  arr: [],
  onRemove: () => { },
  plus: () => { },
  minus: () => { }
}

ItemList.propTypes = {
  arr: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
  plus: PropTypes.func.isRequired,
  minus: PropTypes.func.isRequired,
};

export default ItemList;