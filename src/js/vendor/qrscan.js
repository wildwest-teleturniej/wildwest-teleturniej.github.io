const QRReader = {};

QRReader.active = false;
QRReader.webcam = null;
QRReader.canvas = null;
QRReader.ctx = null;
QRReader.decoder = null;

QRReader.setCanvas = () => {
  QRReader.canvas = document.createElement( "canvas" );
  QRReader.ctx = QRReader.canvas.getContext( "2d" );
};

QRReader.init = ( video, img, isiOS, showErrorMsg = ( err ) => {
  console.error( err );
  console.error( "Unable to open the camera, provide permission to access the camera" );
} ) => {
  const baseurl = "";
  let streaming = false;

	// Init Webcam + Canvas
  if ( !isiOS ) {
    QRReader.webcam = video;
  }	else {
    QRReader.webcam = img;
  }

  QRReader.setCanvas();
  QRReader.decoder = new Worker( `${ baseurl }decoder.min.js` );

  if ( !isiOS ) {
		// Resize webcam according to input
    QRReader.webcam.addEventListener( "play", ( ev ) => {
      if ( !streaming ) {
        setCanvasProperties();
        streaming = true;
      }
    }, false );
  }	else {
    setCanvasProperties();
  }

  function setCanvasProperties() {
    QRReader.canvas.width = window.innerWidth;
    QRReader.canvas.height = window.innerHeight;
  }

  function startCapture( constraints ) {
    navigator.mediaDevices.getUserMedia( constraints )
			.then( ( stream ) => {
        QRReader.webcam.srcObject = stream;
      } )
			.catch( ( err ) => {
        showErrorMsg( err );
      } );
  }

  if ( !isiOS ) {
    navigator.mediaDevices.enumerateDevices()
			.then( ( devices ) => {
        const device = devices.filter( ( device ) => {
        const deviceLabel = device.label.split( "," )[ 1 ];
        if ( device.kind == "videoinput" ) {
          return device;
        }
      } );

      if ( device.length > 1 ) {
        var constraints = {
          video: {
            mandatory: {
              sourceId: device[ 1 ].deviceId ? device[ 1 ].deviceId : null,
            },
          },
          audio: false,
        };

        startCapture( constraints );
      }	else if ( device.length ) {
        var constraints = {
          video: {
            mandatory: {
              sourceId: device[ 0 ].deviceId ? device[ 0 ].deviceId : null,
            },
          },
          audio: false,
        };

        startCapture( constraints );
      }	else {
        startCapture( { video: true } );
      }
    } )
		.catch( ( error ) => {
      showErrorMsg( err );
    } );
  }
};

/**
 * \brief QRReader Scan Action
 * Call this to start scanning for QR codes.
 *
 * \param A function(scan_result)
 */
QRReader.scan = function ( callback ) {
  QRReader.active = true;
  QRReader.setCanvas();
  function onDecoderMessage( event ) {
    if ( event.data.length > 0 ) {
      const qrid = event.data[ 0 ][ 2 ];
      QRReader.active = false;
      callback( qrid );
    }
    setTimeout( newDecoderFrame, 0 );
  }
  QRReader.decoder.onmessage = onDecoderMessage;

	// Start QR-decoder
  function newDecoderFrame() {
    if ( !QRReader.active ) return;
    try {
      QRReader.ctx.drawImage( QRReader.webcam, 0, 0,
				QRReader.canvas.width, QRReader.canvas.height );
      const imgData = QRReader.ctx.getImageData( 0, 0, QRReader.canvas.width,
				QRReader.canvas.height );

      if ( imgData.data ) {
        QRReader.decoder.postMessage( imgData );
      }
    } catch ( e ) {
			// Try-Catch to circumvent Firefox Bug #879717
      if ( e.name == "NS_ERROR_NOT_AVAILABLE" ) setTimeout( newDecoderFrame, 0 );
    }
  }
  newDecoderFrame();
};

QRReader.stop = () => {
  if ( QRReader.webcam.srcObject ) {
    QRReader.webcam.srcObject.getTracks().forEach( track => {
      track.stop();
    } )
  }

  QRReader.decoder.terminate();
}

module.exports = QRReader;
