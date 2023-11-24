import React from "react";
interface LoadingProps {}
const Loading = (props: LoadingProps) => {
  return (
    <div className="w-full mx-auto mb-12 px-4">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className={`h-2 bg-gray-200 rounded w-3/4`}></div>
          <div className="space-y-2">
            <div className={`h-2 bg-gray-200 rounded`}></div>
            <div className={`h-2 bg-gray-200 rounded w-5/6`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
