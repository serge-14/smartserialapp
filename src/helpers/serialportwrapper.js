import { listSerialPorts, receiveSerialPorts, setError, updateConnectionStatus, updateLogStatus, addLog } from '../actions'

export class SerialPortWrapper
{
    constructor(serialport, dispatch)
    {
        this.serialport = serialport;
        this.dispatch = dispatch;

        this.baudRate = 9600;
        this.activePort = null;
    }

    connect(port)
    {
        this.dispatch(updateConnectionStatus('connecting'))

        this.activePort = this.serialport.create(port.comName, {
            baudRate: this.baudRate,
            parser: this.serialport.parser
        });

        this.activePort.on('open', () => {
            this.dispatch(updateConnectionStatus('connected'))
        });

        this.activePort.on('data', data => {
            this.dispatch(addLog(0, 0, data))
        })

        this.activePort.on('error', err => {
            this.disconnect();
            this.dispatch(setError(err))
        })
    }

    disconnect()
    {
        if(this.activePort === null)
        {
            return;
        }

        this.dispatch(updateConnectionStatus('disconnected'))

        if(this.activePort.isOpen())
        {
            this.activePort.close()
        }
        this.activePort = null
    }

    write(content, callback)
    {
        if(this.activePort && this.activePort.isOpen())
        {
            this.activePort.write(content + '\r\n', () => this.activePort.drain(callback));
        }
    }

    list()
    {
        this.dispatch(listSerialPorts())

        return new Promise((resolve, reject) => 
        {
            this.serialport.list((err, ports) =>
            {
                if(err !== null)
                {
                    this.dispatch(receiveSerialPorts([]))
                    this.dispatch(setError(err))

                    reject(err)
                }
                else
                {
                    this.dispatch(receiveSerialPorts(ports))
                    
                    resolve()
                }
            })
        });
    }
}