import { useState } from "react";

function App() {
  const [airspeed, setAirspeed] = useState(0);
  const [vs, setVs] = useState(0);

  const writeData = (a: number, v: number) => {
    window.electronAPI.writeData(a, v);
  };

  const updateAirspeed = (val: number) => {
    setAirspeed(val);
    writeData(val, vs);
  };

  const updateVS = (val: number) => {
    setVs(val);
    writeData(airspeed, val);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#181818] text-[#E5E5E5]">
      <div className="w-[520px] space-y-10">
        <h1 className="text-3xl font-bold text-center text-[#41A3A3]">
          Telemetry Control
        </h1>

        {/* AIRSPEED */}
        <div className="bg-[#232323] border border-[#3A3A3A] p-6 rounded-xl">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[#A3A3A3]">Airspeed</span>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                max={200}
                value={airspeed}
                className="w-20 bg-[#181818] border border-[#3A3A3A] rounded px-2 py-1 text-right"
                onChange={(e) => {
                  updateAirspeed(Number(e.target.value));
                }}
              />

              <span className="text-[#41A3A3]">kt</span>
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={200}
            value={airspeed}
            className="w-full accent-[#41A3A3]"
            onChange={(e) => {
              updateAirspeed(Number(e.target.value));
            }}
          />
        </div>

        {/* VS */}
        <div className="bg-[#232323] border border-[#3A3A3A] p-6 rounded-xl">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[#A3A3A3]">Vertical Speed</span>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min={-2000}
                max={2000}
                value={vs}
                className="w-24 bg-[#181818] border border-[#3A3A3A] rounded px-2 py-1 text-right"
                onChange={(e) => {
                  updateVS(Number(e.target.value));
                }}
              />

              <span className="text-[#41A3A3]">ft/min</span>
            </div>
          </div>

          <input
            type="range"
            min={-2000}
            max={2000}
            value={vs}
            className="w-full accent-[#41A3A3]"
            onChange={(e) => {
              updateVS(Number(e.target.value));
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
