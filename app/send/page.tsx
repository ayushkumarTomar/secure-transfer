"use client";
import React, { ChangeEvent, MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import Peer, { DataConnection } from "peerjs";
import NavBar from "../components/NavBar";
import { Manrope } from "next/font/google";
import { LuSplitSquareVertical, LuUploadCloud } from "react-icons/lu";
import { GrConnect } from "react-icons/gr";
import { CgServer } from "react-icons/cg";
import { FaRegPaperPlane } from "react-icons/fa";
import toast from "react-hot-toast";
import Queue from "../components/Queue";
import configuration from "../config/config";

const manrope = Manrope({
  subsets: ['latin'],
  weight: ["400"]
});

interface QueueType {
  fileSize: number;
  name: string;
  progress: number;
}

const Page = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sendQueue, setSendQueue] = useState<QueueType[]>([]);
  const [recQueue, setRecQueue] = useState<QueueType[]>([]);
  const receivedChunks = useRef<any>({});
  const [chunkSize, setChunkSize] = useState<number>(1);
  const [connected, setConnected] = useState(false);
  const [peerCon, setPeerCon] = useState<DataConnection | null>(null);
  const [peerId, setPeerId] = useState("");
  const [remotePeerId, setRemotePeerId] = useState("");
  const connectionTextRef = useRef<HTMLButtonElement>(null);
  
  const [encryptionMode, setEncryptionMode] = useState<boolean>(false);
  const [encryptionKey, setEncryptionKey] = useState<Uint8Array>(); 
  const [encryptionIv, setEncryptionIv] = useState<Uint8Array>(); 
  
  const peer = useRef<Peer>()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(e.target.files);
    }
  };

  const setProgress = (fileName: string, type: "send" | "rec", progress: number , fileSize?:number) => {
    if (type === "send") {
      setSendQueue(prev => {
        const index = prev.findIndex(element => element.name === fileName);
        if (index === -1) return prev;
    
        const newQueue = [...prev];
        newQueue[index] = { ...newQueue[index], progress };
    
        return newQueue;
      });
    } else if (type === "rec") {
      setRecQueue(prev => {
        const index = prev.findIndex(element => element.name === fileName);
        if (index === -1) {
          return [...prev, { fileSize:fileSize||0, name: fileName, progress }];
        }

        const newQueue = [...prev];
        newQueue[index] = { ...newQueue[index], progress };
        return newQueue;
      });
    }
  };

  const generateRandomKey = () => {
    const key = crypto.getRandomValues(new Uint8Array(32));
    setEncryptionKey(key);
  };

  const generateRandomIv = () => {
    
    const iv = crypto.getRandomValues(new Uint8Array(12)); 

    setEncryptionIv(iv);
  };

 

  const encryptBlob = async (blob: Blob): Promise<Blob> => {
    if (!encryptionKey || !encryptionIv) {
      toast.error("Encryption key or IV is missing.");
      throw new Error("Encryption key or IV is missing.");
    }

    try {
      const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        encryptionKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt' , 'decrypt']
      );

      const arrayBuffer = await blob.arrayBuffer();
      const encryptedBuffer = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: encryptionIv },
        cryptoKey,
        arrayBuffer
      );

      return new Blob([encryptedBuffer]);
    } catch (error) {
      //@ts-ignore
      toast.error(`Encryption failed: ${error.message}`);
      throw error;
    }
  };

  const decryptBlob = async (chunk: any): Promise<Blob> => {
    if (!encryptionKey || !encryptionIv) {
      toast.error("Encryption key or IV is missing.");
      throw new Error("Encryption key or IV is missing.");
    }

  
    try {
      const blob = new Blob([chunk]);
  
      const arrayBuffer = await blob.arrayBuffer();
  
      const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        encryptionKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['decrypt']
      );
  
      const decryptedBuffer = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: encryptionIv },
        cryptoKey,
        arrayBuffer
      );
  
      return new Blob([decryptedBuffer]);
    } catch (error) {
      console.error("Decryption failed:", error);
      //@ts-ignore
      toast.error(`Decryption failed: ${error.message}`);
      throw error;
    }
  };
  

  const handleUpload = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!files) {
      return toast("Files not uploaded", {
        icon: "📂",
      });
    }

   setSendQueue(prev=> [...prev , ...Array.from(files).map(file => ({
        fileSize: file.size,
        name: file.name,
        progress: 0,
      }))])

    const CHUNK_SIZE = chunkSize * 1024 * 1024;

    for (let fIndex = 0; fIndex < files.length; fIndex++) {
      try {
        const file = files[fIndex];
        console.log("sending :", file.name);

        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
        for (let i = 0; i < totalChunks; i++) {
          const start = i * CHUNK_SIZE;
          const end = Math.min(start + CHUNK_SIZE, file.size);
          const chunk = file.slice(start, end);

          try {
            const encryptedChunk = encryptionMode ? await encryptBlob(chunk) : chunk;
            await new Promise<void>((resolve, reject) => {
              sendChunk(file.name, encryptedChunk, i, totalChunks , file.size);
              setProgress(file.name, 'send', Math.round(((i + 1) / totalChunks) * 100));
              resolve();
              console.log("sent chunk : " ,i); 
            });
          } catch (error) {
            console.error(error);
            toast('Failed to upload file.', {
              icon: '❌',
            });
            return;
          }
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setFiles(null);
  };

  const handleConnect = () => {
    if (!remotePeerId || connected) {
      if (connected) {
        peerCon?.close();
      }
      return;
    }
    const connect = peer.current?.connect(remotePeerId);
    if(connect)
    setPeerCon(connect);

    if (connectionTextRef.current) {
      connectionTextRef.current.innerText = "Connecting";
    }

  };

  const sendChunk = (fileName: string, chunk: Blob, index: number, totalChunks: number  , fileSize:number) => {
    if (peerCon) {
      peerCon.send({
        fileName,
        chunk,
        index,
        totalChunks,
        fileSize
      });
    } else {
      console.error("No peer connection available");
    }
  };


  const handleIncomingData = useCallback(async (data: any) => {
    const { fileName, chunk, index, totalChunks , fileSize } = data;
    console.log(`Recieving ${fileName} chunk ${index}`); 

    if (!receivedChunks.current[fileName]) {
      receivedChunks.current[fileName] = {
        chunks: new Array(totalChunks).fill(null),
        receivedCount: 0,
        totalChunks,
      };
    }

    receivedChunks.current[fileName].chunks[index] = encryptionMode? await decryptBlob(chunk) : chunk;
    receivedChunks.current[fileName].receivedCount += 1;

    const progress = Math.round((receivedChunks.current[fileName].receivedCount / totalChunks) * 100);
    setProgress(fileName, 'rec', progress , fileSize);

    if (receivedChunks.current[fileName].receivedCount === totalChunks) {
      await assembleFile(fileName);
    }
  } , [encryptionMode , encryptionIv , encryptionKey])

  const assembleFile = async (fileName: string) => {
    const fileData = receivedChunks.current[fileName].chunks;
    const blob = new Blob(fileData);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName; 
    link.style.display = 'none'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    delete receivedChunks.current[fileName];
  };



  useEffect(() => {
    // For reciever
    if (!peerCon) return;

    const handleOpen = () => {
      console.log("connected to:", remotePeerId);
      toast.success("Connected to Peer");
      if (connectionTextRef.current) {
        connectionTextRef.current.innerText = "Disconnect";
      }
      setConnected(true);
    };

    const handleClose = () => {
      toast.error("Peer disconnected");
      if (connectionTextRef.current) connectionTextRef.current.innerText = "Connect";
      setConnected(false);
    };

    const handleError = (error: any) => {
      toast.error(error.message);
      setConnected(false);
    };

    peerCon.on("open", handleOpen);
    peerCon.on("close", handleClose);
    peerCon.on("error", handleError);

    return () => {
      peerCon.off("open", handleOpen);
      peerCon.off("close", handleClose);
      peerCon.off("error", handleError);
    };
  }, [peerCon]);

    useEffect(()=>{
      if(!peerCon) return
      peerCon.on("data" , handleIncomingData)
      return ()=>{
        peerCon.off("data" , handleIncomingData)

      }
    } , [peerCon , encryptionIv , encryptionKey , encryptionMode])



  useEffect(() => {
    // for sender 
    peer.current = new Peer({
      config: configuration
    })
    if(!peer.current) return

    peer.current.on('open', (id) => {
      console.log('My ID is:', id);
      setPeerId(id);
    });

    peer.current.on("connection", (conn) => {
      toast.success("Received connection from peer");
      setPeerCon(conn);
      setRemotePeerId(conn.connectionId);

      if (connectionTextRef.current) {
        connectionTextRef.current.innerText = "Disconnect";
      }

      setConnected(true);
    });

    peer.current.on("close", () => {
      toast.error("Peer disconnected");
      setConnected(false);
      if (connectionTextRef.current) connectionTextRef.current.innerText = "Connect";
    });

    return () => {
      peer.current?.off('open');
      peer.current?.off("connection");
      peer.current?.off("close");
    };
  }, []);


  const handleEncryptionKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKey = new Uint8Array(Buffer.from(e.target.value, 'hex'));
    if (newKey.length === 32) { // Check length
      setEncryptionKey(newKey);
    } else {
      toast.error("Invalid key length.");
    }
  };
  
  const handleEncryptionIvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIv = new Uint8Array(Buffer.from(e.target.value, 'hex'));
    if (newIv.length === 12) { // Check length
      setEncryptionIv(newIv);
    } else {
      toast.error("Invalid IV length.");
    }
  };

  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <NavBar peerId={peerId} status={connected} />
      <div className="mt-3 sm:mt-5 p-4">
        <div className={`relative w-full mx-auto p-4 shadow-lg ${manrope.className}`}>
          <div className="relative font-lexend text-black text-2xl leading-9 mb-6">
            Send files peer to peer
          </div>
          <div className="flex flex-col space-y-4 mb-6">
            <div className="flex items-center border border-solid border-[#bdc1ca] rounded p-2 w-full sm:w-2/3 lg:w-1/2 mx-auto">
              <CgServer size={24} className="text-[#171a1f] mr-2" />
              <input
                type="text"
                value={remotePeerId}
                onChange={(e) => setRemotePeerId(e.target.value)}
                className="p-1 outline-none rounded w-full"
                placeholder="PeerID"
              />
              <button
                onClick={handleConnect}
                className="bg-[#6d31ed] rounded-md text-white text-sm leading-[22px] font-manrope flex items-center px-4 py-2 ml-2"
                ref={connectionTextRef}
              >
                <GrConnect size={20} className="w-4 h-4 mr-2" />
                Connect
              </button>
            </div>
            <div className="flex items-center border border-solid border-[#bdc1ca] rounded p-2 w-full sm:w-2/3 lg:w-1/2 mx-auto">
              <LuSplitSquareVertical size={40} className="text-[#171a1f] mr-2" />
              <div className="font-manrope text-[#171a1f] text-sm leading-[22px] mr-2">
                Chunk Size
              </div>
              <input
                type="number"
                value={chunkSize}
                className="p-1 outline-none rounded w-full"
                placeholder="Enter chunk size"
                onChange={(e) => setChunkSize(parseInt(e.target.value))}
              />
              <div className="font-manrope text-[#171a1f] text-sm leading-[22px] ml-2">
                in MBs
              </div>
            </div>
            <div className="flex items-center border border-solid border-[#bdc1ca] rounded p-2 w-full sm:w-2/3 lg:w-1/2 mx-auto">
              <div className="font-manrope text-[#171a1f] text-sm leading-[22px] mr-2">
                Encryption (Aes GCM)
              </div>
              <input
                type="checkbox"
                checked={encryptionMode}
                onChange={() => setEncryptionMode(prev => !prev)}
                className="mr-2"
              />
              Enable Encryption
            </div>
            {encryptionMode && (
              <div className="flex flex-col space-y-4 mb-6">
                <div className="flex items-center border border-solid border-[#bdc1ca] rounded p-2 w-full sm:w-2/3 lg:w-1/2 mx-auto">
                  <div className="font-manrope text-[#171a1f] text-sm leading-[22px] mr-2">
                    Encryption Key (32 bytes)
                  </div>
                  <input
                    type="text"
                    value={encryptionKey ? Buffer.from(encryptionKey).toString('hex') : ''}
                    onChange={handleEncryptionKeyChange}
                    className="p-1 outline-none rounded w-full"
                    placeholder="Enter encryption key"
                  />
                  <button
                    onClick={generateRandomKey}
                    className="bg-[#6d31ed] text-white text-sm px-4 py-2 ml-2 rounded"
                  >
                    Generate Key
                  </button>
                </div>
                <div className="flex items-center border border-solid border-[#bdc1ca] rounded p-2 w-full sm:w-2/3 lg:w-1/2 mx-auto">
                  <div className="font-manrope text-[#171a1f] text-sm leading-[22px] mr-2">
                    Encryption IV (12 bytes)
                  </div>
                  <input
                    type="text"
                    value={encryptionIv ? Buffer.from(encryptionIv).toString('hex') : ''}
                    onChange={handleEncryptionIvChange}
                    className="p-1 outline-none rounded w-full"
                    placeholder="Enter encryption IV"
                  />
                  <button
                    onClick={generateRandomIv}
                    className="bg-[#6d31ed] text-white text-sm px-4 py-2 ml-2 rounded"
                  >
                    Generate IV
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row sm:space-x-4 items-center justify-center">
            <label className="justify-center bg-[#6d31ed] rounded-md text-white text-sm leading-[22px] font-manrope flex items-center px-4 py-2 w-full sm:w-auto cursor-pointer mb-4 sm:mb-0">
              <LuUploadCloud size={30} className="w-4 h-4 mr-2" />
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              Upload Files
            </label>
            <button
              onClick={handleUpload}
              className="justify-center bg-[#6d31ed] rounded-md text-white text-sm leading-[22px] font-manrope flex items-center px-4 py-2 w-full sm:w-auto"
            >
              <FaRegPaperPlane className="w-4 h-4 mr-2" />
              Send
            </button>
          </div>
          {files && files.length > 0 && (
            <div className="text-center mt-4 font-manrope text-[#171a1f] text-sm">
              {files.length} file{files.length > 1 ? 's' : ''} uploaded
            </div>
          )}
        </div>
        <Queue sendQueue={sendQueue} receiveQueue={recQueue} />
      </div>
    </div>
  );
};

export default Page;
