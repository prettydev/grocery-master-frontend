import React from "react";
import { Button } from "antd";

import { useMapState } from "../../context/store";
import { TooltipWrapper } from "../../wrappers/TooltipWrapper";

export const SButton = ({
  loading = false,
  disabled = false,
  ghost = false,
  title,
  proc,
}: {
  loading?: boolean;
  disabled?: boolean;
  ghost?: boolean;
  title;
  proc;
}) => {
  const {
    mapState: { user },
  } = useMapState();

  return (
    <TooltipWrapper condition={user}>
      <Button
        block
        onClick={proc}
        loading={loading}
        disabled={disabled}
        type={"primary"}
        ghost={ghost}
        className="rounded-md font-bold"
      >
        {title}
      </Button>
    </TooltipWrapper>
  );
};
