import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from "@mantine/core";
import { AiOutlineMoon, AiOutlineSun } from "react-icons/ai";
import cx from "clsx";
import classes from "./index.module.css";

export function ColorSchemesSwitcher() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
    >
      <AiOutlineSun className={cx(classes.icon, classes.light)} />
      <AiOutlineMoon className={cx(classes.icon, classes.dark)} />
    </ActionIcon>
  );
}
