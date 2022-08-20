import React from "react";

export default function Loading({ label }) {
  return (
    <>
      <div>Loading</div>
      <div>{label !== undefined ? label : "default loading"}</div>
    </>
  );
}
