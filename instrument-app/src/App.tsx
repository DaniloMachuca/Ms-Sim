import { useEffect, useState } from "react";

import airspeedImg from "./assets/airspeed.png";
import vsiImg from "./assets/vsi.png";
import needleImg from "./assets/needle.png";

function mapAirspeedToAngle(value: number) {
  const calibration = [
    { value: 0, angle: 0 },
    { value: 40, angle: 30 },
    { value: 60, angle: 71 },
    { value: 80, angle: 116 },
    { value: 100, angle: 161 },
    { value: 120, angle: 205 },
    { value: 160, angle: 269 },
    { value: 180, angle: 291 },
    { value: 200, angle: 318 },
  ];
  for (let i = 0; i < calibration.length - 1; i++) {
    const p1 = calibration[i];
    const p2 = calibration[i + 1];

    if (value >= p1.value && value <= p2.value) {
      const t = (value - p1.value) / (p2.value - p1.value);

      return p1.angle + t * (p2.angle - p1.angle);
    }
  }

  // fallback
  return calibration[0].angle;
}

function mapVSToAngle(value: number) {
  const vsiCalibration = [
    { value: -2000, angle: 97 },
    { value: -1000, angle: 190 },
    { value: -500, angle: 235 },
    { value: 0, angle: 270 },
    { value: 500, angle: 305 },
    { value: 1000, angle: 350 },
    { value: 2000, angle: 443 },
  ];
  const v = Math.max(-2000, Math.min(2000, value));

  for (let i = 0; i < vsiCalibration.length - 1; i++) {
    const p1 = vsiCalibration[i];
    const p2 = vsiCalibration[i + 1];

    if (v >= p1.value && v <= p2.value) {
      const t = (v - p1.value) / (p2.value - p1.value);

      return p1.angle + t * (p2.angle - p1.angle);
    }
  }
}

function App() {
  const [airspeed, setAirspeed] = useState(0);
  const [vs, setVS] = useState(0);

  useEffect(() => {
    window.electronAPI.onDataUpdate((data: any) => {
      setAirspeed(data.airspeed);
      setVS(data.vs);
    });
  }, []);

  const airspeedAngle = mapAirspeedToAngle(airspeed);
  const vsAngle = mapVSToAngle(vs);

  return (
    <>
      <div className="h-screen bg-[#181818] text-white flex flex-col">
        {/* HEADER */}
        <div className="p-6 border-b border-[#2a2a2a]">
          <h1 className="text-2xl font-semibold text-[#41A3A3]">
            MFSIM Flight Instruments
          </h1>
          <p className="text-sm text-gray-400">Danilo Machuca</p>
        </div>

        {/* CONTENT */}
        <div className="flex-1 flex items-center justify-center gap-12">
          {/* AIRSPEED CARD */}
          <div className="bg-[#232323] p-6 rounded-xl shadow-lg flex flex-col items-center">
            <h2 className="text-lg mb-4 text-gray-300">Airspeed</h2>

            {/* instrumento */}
            <div className="relative w-70 h-70">
              {/* imagens aqui */}

              <img src={airspeedImg} className="absolute w-full h-full" />

              <img
                src={needleImg}
                className="absolute w-full h-full origin-center transition-transform duration-75"
                style={{
                  transform: `rotate(${airspeedAngle}deg)`,
                }}
              />
            </div>

            <p className="mt-4 text-xl font-semibold">{airspeed} kt</p>
          </div>

          {/* VSI CARD */}
          <div className="bg-[#232323] p-6 rounded-xl shadow-lg flex flex-col items-center">
            <h2 className="text-lg mb-4 text-gray-300">Vertical Speed</h2>

            <div className="relative w-70 h-70">
              <img src={vsiImg} className="absolute w-full h-full" />

              <img
                src={needleImg}
                className="absolute w-full h-full origin-center transition-transform duration-75"
                style={{
                  transform: `rotate(${vsAngle}deg)`,
                }}
              />
            </div>

            <p className="mt-4 text-xl font-semibold">{vs} ft/min</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
