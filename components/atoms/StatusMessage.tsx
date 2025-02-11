import React from "react";
import { useAppSelector } from "@/store/hooks";
import { Typography } from "@mui/material";

const StatusMessage = () => {
  const { loading, errorMessage, successMessage } = useAppSelector(
    (state) => state.auth
  );
  console.log({ errorMessage });
  return (
    <div>
      {loading && <Typography>Loading...</Typography>}

      {/* Display error message */}
      {errorMessage && (
        <Typography style={{ color: "red" }}>Error: {errorMessage}</Typography>
      )}

      {/* Display success message */}
      {successMessage && (
        <Typography style={{ color: "green" }}>
          Success: {successMessage}
        </Typography>
      )}
    </div>
  );
};

export default StatusMessage;
