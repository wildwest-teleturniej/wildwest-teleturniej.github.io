import React from 'react'
import { withRouter } from 'react-router-dom'

function openQRCamera(e, h) {
  const node = e.target
  const reader = new FileReader();
  reader.onload = function() {
    node.value = "";
    qrcode.callback = function(res) {
      if(res instanceof Error) {
        alert("No QR code found. Please make sure the QR code is within the camera's frame and try again.");
      } else {
        h.push(`/question?questionIndex=${res}`)
      }
    };
    qrcode.decode(reader.result);
  };
  reader.readAsDataURL(node.files[0]);
}

const QRCodeReader = ({history}) =>
  <div>
  <h1>Zeskanuj Kod z plakatu!</h1>
    <label className='qrcode-text-btn'>
      <input type='file' accept="image/*" capture='environment' onChange={e=>openQRCamera(e,history)} tabIndex={-1}/>
    </label>
  </div>


export default withRouter(QRCodeReader)
