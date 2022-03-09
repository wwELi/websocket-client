import Websocket from 'websocket';

function log(target, name, descriptor) {
    var oldValue = descriptor.value;
  
    descriptor.value = function() {
      console.log(`Calling ${name} with`, arguments);
      return oldValue.apply(this, arguments);
    };
  
    return descriptor;
  }
  

export default class Ws {

    wsUri = null;
    client = null;

    constructor(url, { onopen, onmessage, onclose, onerror }) {

        console.log(url);

        if (!/^ws:\/\/[^]+/.test(url)) {
            throw new TypeError(`${this.wsUri} not is invaild`);
        }

        this.wsUri = url;
        this.onopen = onopen;
        this.onmessage = onmessage;
        this.onclose = onclose;
        this.onerror = onerror;
    }

    @log
    connect() {
        const { onmessage, wsUri } = this;
        const client = Websocket.w3cwebsocket(wsUri, 'echo-protocol');


        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });

        client.onmessage = onmessage || (() => {});
        client.onerror = err => {
            this.reject();
            console.error(err);
        };


        client.onopen = () => {
            console.log('WebSocket Client Connected');

            if (client.readyState === client.OPEN) {

                console.log('WebSocket Client Connected Success');
                this.resolve();
            }
        };

        this.client = client;

    }

    async send(data) {
        await this.promise;
        this.client.send(data);
    }

    async close() {
        await this.promise;
        this.client.close();
    }
}