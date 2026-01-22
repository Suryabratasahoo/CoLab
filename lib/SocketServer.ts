import {Server as IOServer} from "socket.io"

export type SocketServer=IOServer &{
    initialized?:boolean
}

declare global{
    var io:SocketServer | undefined
}

export {}