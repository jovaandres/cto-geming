// @ts-ignore
function SocketIO(this: any, socketio: any = null) {
  // @ts-ignore
  if (SocketIO.instance) { // @ts-ignore
    return SocketIO.instance;
  } else if (socketio == null)
    throw Error("Socket should be instantiated first.");
  // @ts-ignore
  SocketIO.instance = this;
  this.io = socketio;
  this.ns = {};
  this.registerNamespace = (namespace: string | number) => {
    this.ns[namespace] = this.io.of(`/${namespace}`);
  }
  this.getNamespace = (namespace: string, registerIfNotExist = true) => {
    if (namespace in this.ns) {
      return this.ns[namespace];
    } else if (registerIfNotExist) {
      this.registerNamespace(namespace);
      return this.ns[namespace];
    }
    return null;
  }
}

export = SocketIO;
