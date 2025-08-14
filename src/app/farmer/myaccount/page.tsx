'use client';

import React, { useRef, useState } from 'react';

export default function CameraScannerWithTransactions() {
  // Camera scanner refs and states
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanning, setScanning] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Transactions data
  const transactions = [
    { title: 'Maize (Corn)', price: 250, qty: 4, date: '2024-06-01', total: 1000 },
    { title: 'Tomatoes', price: 180, qty: 2, date: '2024-06-03', total: 360 },
    { title: 'Cassava', price: 120, qty: 5, date: '2024-06-05', total: 600 },
    { title: 'Yam', price: 200, qty: 2, date: '2024-06-07', total: 400 },
  ];

  const totalEarnings = transactions.reduce((acc, curr) => acc + curr.total, 0);
  const totalSold = transactions.reduce((acc, curr) => acc + curr.qty, 0);

  // Camera functions
  const startCamera = async () => {
    setErrorMessage(null);
    try {
      const permissionStatus = await navigator.permissions.query({ name: 'camera' as PermissionName });
      if (permissionStatus.state === 'denied') {
        setErrorMessage('Camera access is blocked. Please allow access in browser settings.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setScanning(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setErrorMessage('Unable to access the camera. Please check your browser permissions.');
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    setScanning(false);
  };

  const captureImage = () => {
    if (!canvasRef.current || !videoRef.current) return;
    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    context.drawImage(videoRef.current, 0, 0, 640, 480);
    const dataUrl = canvasRef.current.toDataURL('image/png');
    setImageSrc(dataUrl);
  };

  const handleScan = () => {
    if (!scanning) {
      startCamera();
    } else {
      captureImage();
      stopCamera();
    }
  };

  const deleteImage = () => {
    setImageSrc(null);
  };

  return (
     <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
    <div className="full-h-screen bg-[#c9cdf1] p-6 max-w-4xl mx-auto space-y-10">
        {/* Transactions Section */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-gray-600 text-lg">Total Earnings</h3>
            <p className="text-3xl font-bold text-black">${totalEarnings.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-gray-600 text-lg">Total Products Sold</h3>
            <p className="text-3xl font-bold text-black">{totalSold}</p>
          </div>
        </div>
      {/* Camera Scanner Section */}
      <div className="p-4 border rounded-lg bg-white">
        <h2 className="text-lg font-semibold mb-2">Camera Scan</h2>

        {errorMessage && (
          <p className="text-red-600 font-medium mb-2">{errorMessage}</p>
        )}

        <video ref={videoRef} width="640" height="480" className="hidden" />

        <canvas ref={canvasRef} width="640" height="480" className="hidden" />

        <div className="mt-4">
          <button
            onClick={handleScan}
            className={`px-4 py-2 font-semibold rounded-lg transition duration-200 ${
              scanning ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {scanning ? 'Stop Scan' : 'Start Scan'}
          </button>
        </div>

        {imageSrc && (
          <div className="mt-4">
            <p className="mb-1 font-medium">Captured Image:</p>
            <img src={imageSrc} alt="Captured" className="border w-[320px]" />
            <button
              onClick={deleteImage}
              className="mt-2 px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md"
            >
              Delete Image
            </button>
            <button
              onClick={deleteImage}
              className="mt-2 px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded-md"
            >
              send image
            </button>
          </div>
        )}
      </div>

     

        <h2 className="text-xl font-semibold mb-4">Your Transactions</h2>
        <div className="space-y-4">
          {transactions.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600">
                  Price: ${item.price} &nbsp;&nbsp; Qty: {item.qty} &nbsp;&nbsp; Date: {item.date}
                </p>
              </div>
              <div className="text-green-500 text-lg font-semibold">${item.total}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </main>
  );
}
