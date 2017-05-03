# Expressi
(SSI) Server Side Includes middleware for Express.

After some issues with virtual paths I've decided to create my own SSI middleware for [Express](http://expressjs.com/).

## Install
```
$ npm i exprssi --save
```

## Configuration
In this section I'll explain 3 possible ways to implement this middleware. Most of it is basically the same. The difference is in the [Express](http://expressjs.com/) setup.

### Working on the root
In this case we'll be working on the root of our project, nothing fancy.
```
// Load NMP Packages
const express = require( 'express' ),
      exprSSI = require( 'exprssi' );

// Create the Express instance
const app = express();

// Bind Exprssi middleware
app.use( exprSSI({
  baseDir: 'path/to/your/ssi/files'
}));
```

### Working with a static directory
Here we're telling [Express](http://expressjs.com/) that we'll be serving our file from a static directory. In this case we'll call the static directory ```public```.
```
// Load NMP Packages
const express = require( 'express' ),
      exprSSI = require( 'exprssi' );

// Create the Express instance
const app = express();

// Setup static directory
app.use( express.static( './public' ) );

// Bind Exprssi middleware
app.use( exprSSI({
  baseDir: 'path/to/your/ssi/files'
}));
```

### Working with virtual paths
This is where I encouterd my problem with existing SSI middlewares. So let's quickly fix this. We'll rout calls to ```exprssi/api``` to the directory ```public```.
```
// Load NMP Packages
const express = require( 'express' ),
      exprSSI = require( 'exprssi' );

// Create the Express instance
const app = express();

// Setup static directory
app.use( '/express/api', express.static( './public' ) );

// Bind Exprssi middleware
app.use( exprSSI({
  baseDir: 'path/to/your/ssi/files',
  virtual: '/expressi/api'
}));
```
> Note: It might be interesting to store the path ```/express/api``` in a variable.

## Options

Option | Description | Default
-------|-------------|--------
baseDir | Path to your shtml files | '.'
ext | The extension you wish to target | '.shtml'
payload | Content you would like to send when compiling | ''
virtual | The virtual path you're using | ```false```
