import React from "react";
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";

import {
  BrightnessHigh as LightThemeIcon,
  Brightness2 as DarkThemeIcon
} from "@material-ui/icons";
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
  IconButton
} from "@material-ui/core";

type Dark = E.Left<"dark">;
type Light = E.Right<"light">;

type ThemeType = E.Either<"dark", "light">;

interface ThemeContext {
  themeType: ThemeType;
  toggleThemeType: () => void;
}
export const ThemeContext = React.createContext<ThemeContext>({
  themeType: E.left("dark"),
  toggleThemeType: () => {}
});

const ToggleThemeButton = () => {
  const { themeType, toggleThemeType } = React.useContext(ThemeContext);

  return (
    <IconButton onClick={toggleThemeType}>
      {pipe(
        themeType,
        E.fold(
          () => <LightThemeIcon />,
          () => <DarkThemeIcon />
        )
      )}
    </IconButton>
  );
};

const getThemeTypeValue: (T: ThemeType) => "dark" | "light" = themeState =>
  pipe(
    themeState,
    E.fold(
      () => "dark",
      () => "light"
    )
  );

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [themeState, setThemeState] = React.useState<ThemeType>(E.left("dark"));

  const toggleThemeType = () => {
    setThemeState(prevState =>
      pipe(prevState, E.fold(() => E.right('light'), () => E.left('dark')))
    );
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#1565c0"
      },
      secondary: {
        main: "#ffca28"
      },
      type: getThemeTypeValue(themeState)
    },
    shape: {
      borderRadius: 0
    }
  });

  const contextBag = {
    themeType: themeState,
    toggleThemeType
  };

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeContext.Provider value={contextBag}>
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
};

export { ToggleThemeButton };
export default ThemeProvider;
