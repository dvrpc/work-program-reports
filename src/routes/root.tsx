import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="flex flex-col items-center bg-gray-100 print:bg-transparent">
      <div className="relative">
        <div className="m-8 w-full max-w-[950px] border-2 bg-white p-16 shadow-md print:m-0 print:max-w-full print:border-0 print:p-0 print:shadow-none">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
