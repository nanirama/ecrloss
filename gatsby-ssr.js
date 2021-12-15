import React from "react";

export const wrapPageElement = ({ element, props }) => {
  return <div {...props}>{element}</div>;
};