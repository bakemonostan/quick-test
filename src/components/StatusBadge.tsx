"use client";

import { statusConfig } from "@/contents/statusbadgeConfig";
import { StatusBadgeProps } from "@/types/global";
import { Flex, Badge, Text } from "@mantine/core";
import React from "react";

const defaultConfig = {
  color: "gray.2",
  dotColor: "bg-gray-400",
  textColor: "gray.9",
  label: "Unknown",
};

export default function StatusBadge({
  status,
  label,
  size = "lg",
}: StatusBadgeProps) {
  const config = status ? statusConfig[status] || defaultConfig : defaultConfig;

  return (
    <Badge
      color={config.color}
      size={size}
      radius="sm">
      <Flex
        align="center"
        gap={4}>
        <div className={`rounded-full size-2 ${config.dotColor}`} />
        <Text
          c={config.textColor}
          fw={500}
          size="xs">
          {label || config.label}
        </Text>
      </Flex>
    </Badge>
  );
}
