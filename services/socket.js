function SocketIO (socketio=null){
  if (SocketIO.instance)
    return SocketIO.instance;
  else
  if(socketio == null)
    throw Error("Socket should be instantiated first.");
  SocketIO.instance = this;
  this.io = socketio;
  this.ns = {};
  this.registerNamespace = (namespace) => {
    this.ns[namespace] = this.io.of(`/${namespace}`);
  }
  this.getNamespace = (namespace, registerIfNotExist=true) => {
    if(namespace in this.ns){
      return this.ns[namespace];
    } else if(registerIfNotExist) {
      this.registerNamespace(namespace);
      return this.ns[namespace];
    }
    return null;
  }
}

module.exports = SocketIO;
