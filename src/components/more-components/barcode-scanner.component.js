import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import Quagga from "quagga";
import ScanItem from "./scanner.component";
import "../component-css/barcode-scanner.component.css";

function BarcodeScanner() {
  const webcamRef = useRef(null);
  const [scannedCode, setScannedCode] = useState("");
  const [rescan, setRescan] = useState(true);

  useEffect(() => {
    const initQuagga = async () => {
      try {
        Quagga.init(
          {
            inputStream: {
              name: "Live",
              type: "LiveStream",
              target: webcamRef.current.video,
              constraints: {
                width: 840,
                height: 680,
                facingMode: "environment",
              },
            },
            decoder: {
              readers: ["ean_reader"],
            },
          },
          (err) => {
            if (err) {
              console.error("Quagga init error:", err);
              return;
            }
            Quagga.start();
          }
        );
      } catch (error) {
        console.error("Quagga initialization error:", error);
      }
    };

    if (rescan) {
      initQuagga();

      Quagga.onDetected(handleDetect);
    }

    return () => {
      Quagga.offDetected(handleDetect);
      Quagga.stop();
    };
  }, [rescan]);

  const handleDetect = (data) => {
    setScannedCode(data.codeResult.code);
    setRescan(false);
  };

  const handleRescan = () => {
    setScannedCode("");
    setRescan(true);
  };

  return (
    <div className="scanner-container">
      <div className="webcam-container">
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      </div>
      <ScanItem scannedCode={scannedCode} handleRescan={handleRescan} />
    </div>
  );
}

export default BarcodeScanner;
