import React from "react";

function StatusPage({ status }: { status: React.ReactNode }) {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <h2 className="text-[36px] font-bold text-red-600">{status}</h2>
    </div>
  );
}

export default StatusPage;
