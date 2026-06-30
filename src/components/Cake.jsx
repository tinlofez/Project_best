import { useEffect, useState } from "react";
import "../assets/css/cake.css";
import { CakeSVG, confetti } from "../assets";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Cake() {
  // You may want to tweak these audio codes more to your liking.
  const [candlesBlownOut, setCandlesBlownOut] = useState(false);
  const [micPermissionGranted, setMicPermissionGranted] = useState(false);

  useEffect(() => {
    let audioContext;
    let analyser;
    let dataArray;
    let blowStartTime = null;

    async function initBlowDetection() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioContext = new (window.AudioContext || window.AudioContext)();
        analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);

        analyser.fftSize = 512;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        source.connect(analyser);

        detectBlow();
      } catch (error) {
        console.error("Microphone access denied:", error);
      }
    }

    function detectBlow() {
      if (!analyser || !dataArray) return;
      analyser.getByteFrequencyData(dataArray);
      const lowFrequencyValues = dataArray.slice(0, 15);
      const averageLowFrequency =
        lowFrequencyValues.reduce((sum, value) => sum + value, 0) /
        lowFrequencyValues.length;

      const blowThreshold = 100; // Moderate threshold
      const requiredDuration = 1500; // 1. 5 sec blow required

      if (averageLowFrequency > blowThreshold) {
        if (!blowStartTime) {
          blowStartTime = performance.now();
        } else if (performance.now() - blowStartTime > requiredDuration) {
          setCandlesBlownOut(true);
        }
      } else {
        if (blowStartTime && performance.now() - blowStartTime > 200) {
          blowStartTime = null;
        }
      }

      requestAnimationFrame(detectBlow);
    }

    initBlowDetection();
    setMicPermissionGranted(true);

    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  return (
    <>
      <div className="bg-black/80 h-screen w-screen flex items-center justify-center overflow-hidden relative">
        {candlesBlownOut && (
          <div
            className="absolute inset-0 bg-cover bg-center z-50"
            style={{
              backgroundImage: `url(${confetti})`,
            }}
          />
        )}
        <motion.div
          className="absolute inset-x-0 top-10 z-50 flex flex-col items-center gap-4 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: candlesBlownOut ? 1 : 0, y: candlesBlownOut ? 0 : 20 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {candlesBlownOut ? (
            <>
              <svg width="800" height="240" viewBox="0 0 400 240">
                <defs>
                  <path
                    id="curve"
                    d="M50,150 Q200,50 350,150"
                    fill="transparent"
                    stroke="white"
                  />
                  <path
                    id="curve2"
                    d="M50,180 Q200,100 350,180"
                    fill="transparent"
                    stroke="white"
                  />
                </defs>
                <text fontSize="40" fill="white" textAnchor="middle">
                  <textPath href="#curve" startOffset="50%">
                    Happy Birthday!
                  </textPath>
                </text>
                <text fontSize="30" fill="white" textAnchor="middle">
                  <textPath href="#curve2" startOffset="50%">
                    Angel
                  </textPath>
                </text>
              </svg>
              <Link to="/present">
                <p className="px-7 py-3 bg-customBlue text-white rounded-full hover:bg-blue-600 font-medium text-base text-center">
                  Next Page
                </p>
              </Link>
            </>
          ) : (
            <div className="text-center text-white max-w-[90%]">
              <p className="text-xl font-semibold mb-2">Tiup lilinnya untuk lanjut ke halaman berikutnya.</p>
              <p className="text-sm opacity-80">Izinkan akses mikrofon jika diminta, lalu hembuskan cukup lama sampai lilin padam.</p>
            </div>
          )}
        </motion.div>
        <div className="relative z-10">
          <div className="absolute -top-48 left-1/2 transform -translate-x-1/2">
            <div className="candle">
              {!candlesBlownOut && (
                <div>
                  <div className="absolute -top-[200px] text-gray-200 text-3xl">
                    <motion.div
                      animate={{ opacity: [0, 0.25, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 8,
                      }}
                      className="block -translate-x-[60px] translate-y-[105px] -rotate-[30deg] text-gray-200 text-xl "
                    >
                      blow
                    </motion.div>
                    <motion.div
                      animate={{ opacity: [0, 0.25, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 9,
                      }}
                      className="block translate-x-10 translate-y-[80px] rotate-[30deg] text-gray-200 text-xl"
                    >
                      blow
                    </motion.div>
                  </div>
                  <div>
                    <div className="flame"></div>
                    <div className="flame"></div>
                    <div className="flame"></div>
                    <div className="flame"></div>
                    <div className="flame"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <CakeSVG />
        </div>
      </div>
    </>
  );
}

export default Cake;
