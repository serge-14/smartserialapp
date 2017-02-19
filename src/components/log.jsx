import React, { PropTypes } from 'react'
import { ListGroupItem, Glyphicon, Badge } from 'react-bootstrap';
import { DIRECTION_IN, DIRECTION_OUT, DIRECTION_ERROR, LOG_STATUS_NONE, LOG_STATUS_SENT, LOG_STATUS_ERROR } from '../reducers/logs'

function getIcon(direction)
{
    if(direction == DIRECTION_IN) {
        return "arrow-right"
    }
    else if(direction == DIRECTION_OUT) {
        return "arrow-left"
    }
    else if(direction == DIRECTION_ERROR) {
        return "ban-circle"
    }
    else {
        return "minus"
    }
}

function getStyle(direction)
{
    if(direction == DIRECTION_ERROR) {
        return "danger"
    }
    else {
        return null
    }
}

const Log = ({ direction, content, status }) => (
    <ListGroupItem bsStyle={getStyle(direction)}>
        <Glyphicon glyph={getIcon(direction)}/>{' '}<span>{content}</span>
        { status != LOG_STATUS_NONE &&
            <Badge><Glyphicon glyph='ok'/></Badge>
        }
    </ListGroupItem>
)

Log.propTypes = {
  direction: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired
}

export default Log