import { connect } from 'react-redux'
import LogContainer from '../components/logcontainer'

const mapStateToProps = (state) => ({
  logs: state.logs
})

const Logs = connect(
  mapStateToProps
)(LogContainer)

export default Logs