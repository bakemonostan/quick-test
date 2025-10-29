import { Alert, Text } from "@mantine/core";
import React from "react";

interface props {
  message: string;
}

export default function ErrorState({ message }: props) {
  return (
    <div className="flex items-center justify-center h-full">
      {" "}
      <Alert
        color="teal"
        variant="filled"
        className="my-4">
        <Text>{message}</Text>
      </Alert>
    </div>
  );
}
