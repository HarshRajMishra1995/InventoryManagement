import React from "react";

function StatsCard({ title, value }) {
  return (
    <div className="bg-green-800 text-white p-4 rounded-lg w-1/4">
      <h3 className="text-xl">{title}</h3>
      <p className="text-3xl">{value}</p>
    </div>
  );
}

export default StatsCard;
