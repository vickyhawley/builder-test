"use client";

import { useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

type DimensionFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function DimensionField({ label, value, onChange }: DimensionFieldProps) {
  return (
    <label className="flex w-full items-center gap-4">
      <span className="w-[84px] shrink-0 text-sm font-medium leading-5 text-black">
        {label}
      </span>
      <span className="flex min-w-0 flex-1 items-center rounded-[6px] border border-[#CBD5E1] bg-white py-2 pl-3 pr-14">
        <input
          aria-label={label}
          className="w-full border-0 bg-transparent p-0 text-sm font-normal leading-5 text-[#0F172A] outline-none placeholder:text-[#0F172A]"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          type="text"
        />
      </span>
    </label>
  );
}

export default function Home() {
  const [width, setWidth] = useState("100%");
  const [maxWidth, setMaxWidth] = useState("300px");
  const [height, setHeight] = useState("25px");
  const [maxHeight, setMaxHeight] = useState("none");

  return (
    <main className={`${inter.className} min-h-screen bg-white px-4 py-8 text-black`}>
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full items-center justify-center">
        <section className="w-full max-w-[320px] rounded-[6px] border border-[#E2E8F0] bg-white p-[17px] shadow-[0_4px_6px_0_rgba(0,0,0,0.09)]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-base font-medium leading-4 text-black">
                Dimensions
              </h1>
              <p className="w-full max-w-[286px] text-sm font-normal leading-5 text-[#94A3B8]">
                Set the dimensions for the layer.
              </p>
            </div>

            <div className="flex flex-col gap-[9px]">
              <DimensionField label="Width" value={width} onChange={setWidth} />
              <DimensionField
                label="Max. width"
                value={maxWidth}
                onChange={setMaxWidth}
              />
              <DimensionField label="Heigh" value={height} onChange={setHeight} />
              <DimensionField
                label="Max. height"
                value={maxHeight}
                onChange={setMaxHeight}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
