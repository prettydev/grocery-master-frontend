import React, { useState, useEffect } from "react";
import { Tooltip } from "antd";

export const TooltipWrapper = ({ children, condition }) => {
  return condition ? (
    children
  ) : (
    <Tooltip title={"Login, please"} color={"pink"}>
      {children}
    </Tooltip>
  );
};
