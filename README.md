# ojo

A pretty GUI for managing [ARK: Survival Evolved](http://store.steampowered.com/app/346110/) dedicated servers.

***

### Warning
ojo is very, very early alpha software and might break at any time. Also, make sure you secure your ARK server with a good password.

### Prerequisites
First, you'll need to install and run [arkWatcher](https://github.com/samjhill/arkWatcher) and then configure its [index.js](https://github.com/samjhill/arkWatcher/blob/master/index.js) file, line 19:

```js
res.header("Access-Control-Allow-Origin", "http://your-server:80");
```

to accept incoming requests from ojo. 


## Quick Start

Install Node.js and then:

```sh
$ git clone git://github.com/samjhill/ojo
$ cd ojo
$ sudo npm -g install grunt-cli karma bower
$ npm install
$ bower install
$ grunt watch
```

Then, modify [app.js](https://github.com/samjhill/ojo/blob/v0.3.2-release/src/app/app.js#L45-L46) lines 45 and 46 to point to your running arkWatcher API.


Finally, open `file:///path/to/ojo/build/index.html` in your browser. If all went well, you should see something like this!
![Image of ojo](http://i.imgur.com/r2welXI.png)

You'll most likely want to run ojo as a service indefinitely like a website, so I'd recommend using [http-server](https://github.com/indexzero/http-server) to serve up the build folder.

## Future Work
 - Put server information in the login page so others can connect to the server easily
 - Have a pre-populated command section so that users don't have to look up admin commands
 - Prompt the user to update if the system needs to update
 - Include more of the information from arkWatcher's other endpoints
 - Include angular-animate for pretty fades on the gauges and pretty transitions

