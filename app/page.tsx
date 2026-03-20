import { Inter } from "next/font/google";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

type DimensionFieldProps = {
  label: string;
  value: string;
};

function DimensionField({ label, value }: DimensionFieldProps) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="flex items-center gap-4">
        <div className="w-[84px] shrink-0 text-sm font-medium leading-5 text-black">
          {label}
        </div>
        <div className="flex min-w-0 flex-1 items-center rounded-[6px] border border-[#CBD5E1] bg-white py-2 pl-3 pr-14">
          <div className="text-sm font-normal leading-5 text-[#0F172A]">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
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
              <DimensionField label="Width" value="100%" />
              <DimensionField label="Max. width" value="300px" />
              <DimensionField label="Heigh" value="25px" />
              <DimensionField label="Max. height" value="none" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
