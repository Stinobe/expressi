// NPM Packages
const express = require( 'express' ),
      request = require( 'supertest' );

// Custom Packages
const expressi = require( './../lib/exprssi' );

describe( 'Expressi - No static environment', () => {

  // Create Express instance
  const app = express();

  // Bind Expressi middleware
  app.use( expressi({
    baseDir: './test/mock'
  }) );

  it( 'should serve index-files on root', (done) => {
    request( app )
      .get( '/' )
      .expect( 200 )
      .expect( /Welcome/ )
      .expect( /footer/ )
      .end( done );
  });

  it( 'should serve the given file', (done) => {
    request( app )
      .get( '/projects.shtml' )
      .expect( 200 )
      .expect( /Projects/ )
      .expect( /footer/ )
      .end( done );
  });

});

describe( 'Expressi - With static environment', () => {

  // Create Express instance
  const app = express();

  app.use( express.static( './mock' ) );

  // Bind Expressi middleware
  app.use( expressi({
    baseDir: './test/mock'
  }) );

  it( 'should serve index-files on root', (done) => {
    request( app )
      .get( '/' )
      .expect( 200 )
      .expect( /Welcome/ )
      .expect( /footer/ )
      .end( done );
  });

  it( 'should serve the given file', (done) => {
    request( app )
      .get( '/projects.shtml' )
      .expect( 200 )
      .expect( /Projects/ )
      .expect( /footer/ )
      .end( done );
  });

});

describe( 'Expressi - With virtual path', () => {

  // Create Express instance
  const app = express();

  app.use( '/express/api', express.static( './mock' ) );

  // Bind Expressi middleware
  app.use( expressi({
    baseDir: './test/mock',
    virtual: '/expressi/api'
  }) );

  it( 'should serve index-files on root', (done) => {
    request( app )
      .get( '/expressi/api/' )
      .expect( 200 )
      .expect( /Welcome/ )
      .expect( /footer/ )
      .end( done );
  });

  it( 'should serve the given file', (done) => {
    request( app )
      .get( '/expressi/api/projects.shtml' )
      .expect( 200 )
      .expect( /Projects/ )
      .expect( /footer/ )
      .end( done );
  });

});
