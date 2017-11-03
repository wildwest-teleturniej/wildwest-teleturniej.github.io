import React from 'react'

function openQRCamera(node) {
  var reader = new FileReader();
  reader.onload = function() {
    node.value = "";
    qrcode.callback = function(res) {
      if(res instanceof Error) {
        alert("No QR code found. Please make sure the QR code is within the camera's frame and try again.");
      } else {
        node.parentNode.previousElementSibling.value = res;
      }
    };
    qrcode.decode(reader.result);
  };
  reader.readAsDataURL(node.files[0]);
}

function showQRIntro() {
  return confirm("Use your camera to take a picture of a QR code, pls.");
}

const QRCodeReader = () => (
  <div>
  <h1>Zeskanuj Kod z plakatu!</h1>
    <label className='qrcode-text-btn'>
      <input type='file' accept="image/*" capture='environment' onClick={showQRIntro} onChange={openQRCamera} tabIndex={-1}/>
    </label>
  </div>
)

export default QRCodeReader
