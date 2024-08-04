import { FC, useEffect, useState } from "react";
import { BsGridFill } from "react-icons/bs";
import { TileQueryFeature } from "../types";
import { GridRow } from "./GridRow";

interface GridDataProps {
  localeApiResults: Array<TileQueryFeature>;
}

export const DataGrid: FC<GridDataProps> = ({ localeApiResults }) => {
  const [displayGrid, setDisplayGrid] = useState<boolean>(
    window.innerWidth > 768
  );

  const handleResize = () => setDisplayGrid(window.innerWidth > 768);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {displayGrid && (
        <div className="absolute md:relative w-full max-h-[40vh] overflow-x-auto sm:rounded-lg bg-slate-100 bottom-0 md:shadow-md md:drop-shadow-sm md:rounded-lg">
          <div className="w-full min-h-80 text-sm text-left rtl:text-right text-gray-500">
            <div className="flex gap-x-5 md:gap-x-8 px-2 md:px-6 items-center h-10 text-xs sticky top-0 font-bold text-gray-700 uppercase bg-slate-100  drop-shadow-sm">
              <div className="flex-1 py-4">Name</div>
              <div className="flex-1 py-4">Place</div>
            </div>
            <div>
              {localeApiResults.map((item: TileQueryFeature) => (
                <GridRow
                  key={`${item.center[0]}-${item.center[1]}`}
                  name={item.place_name}
                  place={item.place_name}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <div
        className="absolute bottom-5 right-5 md:hidden"
        onClick={() => setDisplayGrid((prev: boolean) => !prev)}
      >
        <BsGridFill size={25} />
      </div>
    </>
  );
};
