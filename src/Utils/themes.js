import { neutral, statusDefaultTheme } from "./colors";
import { primaryFont, typeScale } from "./typography";

export const defaultTheme = {
  primaryFont,
  typeScale,
  status: statusDefaultTheme,

  headerBackgroundColor: neutral[900], //
  headerTextColor: neutral[100], //

  gridBackgroundColorGradStart: neutral[900],
  gridBackgroundColorGradEnd: neutral[300],

  cardBackgroundColor: neutral[100], //
  cardBackgroundColorHover: neutral[200], //

  cardHeaderBackground: neutral[400], //
  cardTextSecondaryAncillary: neutral[600], //
  cardHeaderTextAncillary: neutral[200], //

  cardTextPrimary: neutral[900], //
};
