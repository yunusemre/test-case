import React from 'react'
import PropTypes from 'prop-types'
import Item from './Item'

const ItemList = ({ arr, onRemove, Up, Down }) => (
  arr.map(res => <Item key={res.id} {...res} up={() => Up(res.id)} down={() => Down(res.id)} remove={() => onRemove(res)} />)
)

ItemList.propTypes = {
  arr: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
  Up: PropTypes.func.isRequired,
  Down: PropTypes.func.isRequired,
};

export default ItemList;