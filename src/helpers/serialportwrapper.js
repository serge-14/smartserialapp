import { listSerialPorts, receiveSerialPorts, setError, updateConnectionStatus } from '../actions'

export class SerialPortWrapper
{
    constructor(serialport)
    {
        this.serialport = serialport;
        this.baudRate = 9600;
        this.activePort = null;
    }

    connect(port)
    {
        const _this = this;

        return function (dispatch) {

            dispatch(updateConnectionStatus('connecting'))

            _this.activePort = new _this.serialport(port.pnpId, {
                baudRate: _this.baudRate
            });

            _this.activePort.on('open', function() {
                dispatch(updateConnectionStatus('connected'))
            });

            _this.activePort.on('error', function(err) {
                _this.disconnect()(dispatch);
                dispatch(setError(err))
            })
        }
    }

    disconnect()
    {
        const _this = this;

        return function (dispatch) {

            if(_this.activePort === null)
            {
                return;
            }

            dispatch(updateConnectionStatus('disconnected'))

            return new Promise((resolve, reject) => 
            {
                if(_this.activePort.isOpen())
                {
                    _this.activePort.close()
                }
                _this.activePort = null

                resolve()
            })
        }
    }

    list()
    {
        const serialport = this.serialport;

        return function (dispatch)
        {
            dispatch(listSerialPorts())

            return new Promise((resolve, reject) =>
            {
                serialport.list((err, ports) =>
                {
                    if(err !== null)
                    {
                        dispatch(receiveSerialPorts([]))
                        dispatch(setError(err))
                        reject(err)
                    }
                    else
                    {
                        dispatch(receiveSerialPorts(ports))
                        resolve();
                    }
                })
            })
        }
    }
}