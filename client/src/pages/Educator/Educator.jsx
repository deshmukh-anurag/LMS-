import React from "react";
import { Outlet } from "react-router-dom";

const Educator = () => (
  <div>
    <h1>Educator Area</h1>
    <Outlet />
  </div>
);

export default Educator;