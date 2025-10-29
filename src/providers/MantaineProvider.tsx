"use client";

import {
  ColorSchemeScript,
  MantineProvider as MantineProviderBase,
} from "@mantine/core";
import { theme } from "../theme/mantine";

export default function MantineProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MantineProviderBase theme={theme}>
      <ColorSchemeScript />
      {children}
    </MantineProviderBase>
  );
}
