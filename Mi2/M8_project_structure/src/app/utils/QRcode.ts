import QRCode from 'qrcode';
import jsQR from "jsqr";
import Jimp from "jimp";



const createQRcode = async(text:string) =>{
    // encryppt the text with secure password hash before creating the QR image, after decode the QR image, angain decode the hash to get real data
    const QRCodeImage = await QRCode.toDataURL(text);
    return QRCodeImage;
}
const decodeQRcode = async (QRImageData: string) => {
    const image = await Jimp.read(Buffer.from(QRImageData, 'base64'));
  
    // Convert Buffer to Uint8Array
    // const uint8ArrayData = new Uint8Array(image.bitmap.data.buffer);
    
    // const code = jsQR(uint8ArrayData, image.bitmap.width, image.bitmap.height);

    // Get the image data
    const imageData = {
        data: new Uint8ClampedArray(image.bitmap.data),
        width: image.bitmap.width,
        height: image.bitmap.height,
    };
     // Use jsQR to decode the QR code
     const decodedQR = jsQR(imageData.data, imageData.width, imageData.height);
     if (!decodedQR) {
         throw new Error('QR code not found in the image.');
     }
  
    // console.log(decodedQR);
  
    return decodedQR;
  };


export const QRCodeUtils = {
    createQRcode,
    decodeQRcode,
}


/*
Frontend Code to scan QR code and API verification
"use client"
import React, { useEffect, useRef, useState } from 'react';

const QRScannerWithBackend = () => {
  const videoRef = useRef(null);
  const [qrCode, setQrCode] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);


  useEffect(() => {
    const startScanner = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 380, height: 320 } });
        videoRef.current.srcObject = stream;

        const track = stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(track);

        const scanQRCode = async () => {
          if (!isProcessing) {
            setIsProcessing(true);

            const bitmap = await imageCapture.grabFrame();
            const canvas = document.createElement('canvas');
            canvas.width = bitmap.width;
            canvas.height = bitmap.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            decodeQRCode(imageData);



            setIsProcessing(false);
          }
            // call scanQRCode continuously
            //   requestAnimationFrame(scanQRCode);

            // Schedule the next execution of scanQRCode after 5 seconds
            setTimeout(scanQRCode, 20*1000);

        };

        scanQRCode();
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    startScanner();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const decodeQRCode = async (imageData) => {
    console.log("TO API go",imageData);
    localQRdecoder(imageData)
    try {
        const token = "auth token"
      const response = await fetch('http://localhost:5000/api/v1/users/me/qr-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(imageData),   // facing body too large issue. solve it later
      });

      if (response.ok) {
        const result = await response.json();
        console.log({result});
        setQrCode(result.decodedData);
      } else {
        console.error('Error decoding QR code on the server');
      }
    } catch (error) {
      console.error('Error decoding QR code:', error);
    }
  };


  const localQRdecoder = (imageData) => {
    // Use jsqr library to detect QR code
    // You may need to adjust this part based on your specific use case
    // Install jsqr library: npm install jsqr
    const jsQR = require('jsqr');
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    if (code?.data) {
      console.log("Loal Decoded  =",JSON.parse(code.data));
    }
   
  return code ? code.data : null;
};

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline muted></video>
      {qrCode && (
        <div>
          <p>Scanned QR Code: {qrCode}</p>
        </div>
      )}
    </div>
  );
};

export default QRScannerWithBackend;

*/