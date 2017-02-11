import React, { PropTypes } from 'react'
import { ListGroupItem, Glyphicon } from 'react-bootstrap';
import { DIRECTION_IN, DIRECTION_OUT } from '../reducers/logs'

function getIcon(direction)
{
    if(direction == DIRECTION_IN) {
        return "arrow-right"
    }
    else if(direction == DIRECTION_OUT) {
        return "arrow-left"
    }
    else {
        return "minus"
    }
}

const Log = ({ direction, content }) => (
  <ListGroupItem><Glyphicon glyph={getIcon(direction)} />{' '}<span>{content}</span></ListGroupItem>
)

Log.propTypes = {
  direction: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired
}

export default Log