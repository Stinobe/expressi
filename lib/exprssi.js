'use strict';

// NPM Packages
const SSI      = require( 'node-ssi' ),
      path     = require( 'path' ),
      fs       = require( 'fs' ),
      defaults = require( 'defaults' );

// Create configurable middleware
module.exports = function( opts ) {

  // Merge given configuration with default options
  opts = defaults( opts, {
    baseDir: '.',
    ext: '.shtml',
    virtual: false
  });

  // Create node-ssi instance
  const ssi = new SSI( opts );

  // Middleware implementation
  return (req, res, next) => {

    // If a virtual path is set remove it from the request
    let requestUri = ( opts.virtual ) ? req.originalUrl.replace( opts.virtual, '' ) : req.originalUrl;

    // Build the filepath
    let filePath = ( requestUri !== '/' ) ? path.join( opts.baseDir, requestUri).split('?')[0].split('#')[0] : path.join( opts.baseDir, '/index.shtml' );

    // Check if the file exists, otherwise continue
    fs.exists( filePath, (exists) => {
      if( exists && path.extname( filePath ) === opts.ext ) {

        // If the file exists, all that's left to do is compile it
        ssi.compileFile( filePath, (e, content) => {
          if( e ) {
            return next( e );
          }

          res.end( content );
        });
      } else {
        next();
      }
    });

  };

};
