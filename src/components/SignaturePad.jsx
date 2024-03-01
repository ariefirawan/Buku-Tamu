import React, { useState } from "react";
import SignatureCanvas from 'react-signature-canvas';

import './signature.css'

function SignaturePad({ setSign }) {
    return (
        <div>
            <label>Tanda Tangan</label>
            <div className="containerPad">
                <SignatureCanvas
                    canvasProps={{ width: 280, height: 150 }}
                    ref={data => setSign(data)}
                />
            </div>
        </div>
    )
}
export default SignaturePad;