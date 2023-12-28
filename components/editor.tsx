'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import html2canvas from 'html2canvas';
import { Rnd } from 'react-rnd';

export function Editor() {
  const [uploadedImage, setUploadedImage] = useState<string | ArrayBuffer | null>(null);
  const [size, setSize] = useState({ width: 200, height: 200 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [downloadedImage, setDownloadedImage] = useState(false);

  const onDragStop = (_e: any, d: any) => {
    setPosition({ x: d.x, y: d.y });
  };

  const onResizeStop = (_e: any, _direction: any, ref: any, _delta: any, position: any) => {
    setSize({
      width: ref.offsetWidth,
      height: ref.offsetHeight
    });
    setPosition(position);
  };

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    setDownloadedImage(true);
    const captureElement = document.getElementById("capture-area") as HTMLElement;
    html2canvas(captureElement).then(canvas => {
      const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      const link = document.createElement('a');
      link.download = 'youwifhat.png';
      link.href = image;
      link.click();
    });
  };

  const handleReset = () => {
    setUploadedImage(null)
    setDownloadedImage(false)
    setSize({ width: 200, height: 200 });
    setPosition({ x: 0, y: 0 });
  }

  return (
    <div className="pb-44">
      {!uploadedImage ? (
        <div className="flex justify-center w-full p-20">
          <div className="flex flex-col items-center space-y-10">
            <Image src={'/dogwifhat.png'} alt="dogwifhat" width={240} height={240} />
            <div className="flex flex-col items-center space-y-5">
              <h1 className="text-6xl font-bold">dogwifhat.me</h1>
              <h2 className="font-medium">Add a hat to your PFP and raid to Valhalla</h2>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-20 flex justify-center mx-auto">
          <div id="capture-area" style={{ position: 'relative' }}>
            <Image src={uploadedImage as string} alt="Photo" width={440} height={440} onDragStart={e => e.preventDefault()} />
            <Rnd
              size={{ width: size.width, height: size.height }}
              position={{ x: position.x, y: position.y }}
              onDragStop={onDragStop}
              onResizeStop={onResizeStop}
              aspectRatio={1}
            >
              <Image src={"/hat.png"} alt="Hat" width={size.width} height={size.height} onDragStart={e => e.preventDefault()} />
            </Rnd>
          </div>
        </div>
      )}
      {!uploadedImage ? (
        <div className="flex justify-center w-full ml-14">
          <input type="file" onChange={handleImageUpload} accept="image/*" />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex justify-center space-x-12 mt-12">
            <button className="bg-white text-black rounded-full p-4" onClick={handleReset}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path d="M6.215 2.67a15 15 0 0 0-1.049 3.726c-.049.335.215.485.479.586l.094.035m0 0A8 8 0 1 1 4.25 14m1.489-6.983a15 15 0 0 0 3.476.85" />
              </svg>
            </button>
            <button className="bg-white text-black rounded-full p-4" onClick={handleDownload}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path d="M3 15a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5M9 12.188a15 15 0 0 0 2.556 2.655c.13.104.287.157.444.157m3-2.812a14.998 14.998 0 0 1-2.556 2.655A.704.704 0 0 1 12 15m0 0V4" />
              </svg>
            </button>
          </div>
          {downloadedImage && (
            <div className="mt-14 flex flex-col items-center space-y-4">
              <p className="-rotate-6 font-bold text-xl text-center">Don&apos;t forget to donate some <span className="text-lime-400">$wif</span> mfer!!</p>
              <p className="-rotate-6 font-bold text-xl text-center">Solana wallet <span role="img" aria-label="point down emoji">👇</span></p>
              <p className="-rotate-6 font-bold text-xl text-center"><span className="text-rose-300">8vw2AEXnbXufWaQyF7WMEFAjd9cyfm6tbxJPvHwxj255</span></p>
              <p className="-rotate-6 font-bold text-xl text-center">Made by <a href="https://x.com/0xPegasus" target="_blank" className="text-blue-400 hover:text-blue-500 hover:underline">@0xPegasus</a></p>
              <p className="pt-16 font-bold text-xl text-center">Let&apos;s fucking gooo!!!! <span role="img" aria-label="dog with hat">🐶👒</span></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
