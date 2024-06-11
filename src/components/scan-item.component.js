import React from "react";

import "./component-css/create-user.component.css";
import BarcodeScanner from "./more-components/barcode-scanner.component";

function ScanItem() {
  return (
    <div>
      <BarcodeScanner />
    </div>
  );
}

export default ScanItem;
