'use client';
import React, { useRef, useState, useEffect } from "react";

export default function AccountPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load dynamic transactions from API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/farmer/myaccount/transaction");
        const data = await res.json();
        if (data.success) setTransactions(data.transactions);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  // Camera functions
  const startCamera = async () => {
    setErrorMessage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setScanning(true);
    } catch (err) {
      console.error(err);
      setErrorMessage("Unable to access camera.");
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
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0, 640, 480);
    setImageSrc(canvasRef.current.toDataURL("image/png"));
  };

  const handleScan = () => {
    if (!scanning) startCamera();
    else {
      captureImage();
      stopCamera();
    }
  };

  const deleteImage = () => setImageSrc(null);

  const sendImage = async () => {
    if (!imageSrc) return;
    try {
      setUploading(true);
      const res = await fetch("/api/farmer/myaccount/transaction", {
        method: "POST",
        body: JSON.stringify({ image: imageSrc }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) setTransactions(prev => [data.transaction, ...prev]);
      alert(data.success ? "Scan uploaded!" : data.message);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
      setImageSrc(null);
    }
  };

  const totalEarnings = transactions.reduce((acc, t) => acc + t.total, 0);
  const totalSold = transactions.reduce((acc, t) => acc + t.qty, 0);

  return (
    <main className="min-h-screen bg-blue-100 p-6">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-gray-600 text-lg">Total Earnings</h3>
            <p className="text-3xl font-bold">${totalEarnings}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-gray-600 text-lg">Total Products Sold</h3>
            <p className="text-3xl font-bold">{totalSold}</p>
          </div>
        </div>

        {/* Camera Scan */}
        <div className="p-4 border rounded-lg bg-white">
          <h2 className="text-lg font-semibold mb-2">Camera Scan</h2>
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          <video ref={videoRef} width="640" height="480" className="hidden" />
          <canvas ref={canvasRef} width="640" height="480" className="hidden" />

          <div className="mt-4 flex gap-2">
            <button
              onClick={handleScan}
              className={`px-4 py-2 rounded text-white ${scanning ? "bg-red-600" : "bg-blue-600"}`}
            >
              {scanning ? "Stop Scan" : "Start Scan"}
            </button>
            {imageSrc && (
              <>
                <button onClick={deleteImage} className="px-3 py-1 bg-red-500 text-white rounded">
                  Delete
                </button>
                <button
                  onClick={sendImage}
                  disabled={uploading}
                  className="px-3 py-1 bg-green-500 text-white rounded"
                >
                  {uploading ? "Sending..." : "Send Image"}
                </button>
              </>
            )}
          </div>
          {imageSrc && <img src={imageSrc} alt="Captured" className="mt-4 border w-[320px]" />}
        </div>

        {/* Transactions */}
        <h2 className="text-xl font-semibold">Your Transactions</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            {transactions.map(t => (
              <div key={t.id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between">
                <div>
                  <h3 className="font-semibold">{t.title}</h3>
                  <p className="text-sm text-gray-600">
                    Price: ${t.price} | Qty: {t.qty} | Date: {t.date}
                  </p>
                </div>
                <div className="text-green-500 font-semibold">${t.total}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

