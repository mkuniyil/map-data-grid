import { FC } from "react";

interface GridRowProps {
  name: string;
  place: string;
}
export const GridRow: FC<GridRowProps> = ({ name, place }) => {
  return (
    <div className="flex items-center gap-x-5 md:gap-x-8 px-2 md:px-6 bg-white border-b hover:bg-gray-50 ">
      <div className="flex-1 py-4 font-medium text-gray-900 ">{name}</div>
      <div className="flex-1 py-4">{place}</div>
    </div>
  );
};
