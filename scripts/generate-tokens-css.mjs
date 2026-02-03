import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd());
const TOKENS_PATH = path.join(ROOT, "src/tokens/tokens-core.json");
const OUT_DIR = path.join(ROOT, "src/generated");
const OUT_PATH = path.join(OUT_DIR, "tokens.css");

/**
 * tokens-core.json is a Tokens Studio export.
 * We generate a Tailwind v4-compatible CSS theme file:
 * - @theme inline: registers tokens as Tailwind utilities
 * - :root: light-mode values
 * - .dark: dark-mode overrides
 */

function kebab(s) {
  return String(s)
    .trim()
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/\s+/g, "-")
    .replace(/\//g, "-")
    .replace(/_/g, "-")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function flattenTokens(obj, prefix = [], out = new Map()) {
  if (!obj || typeof obj !== "object") return out;

  // Tokens Studio token leaf
  if (Object.prototype.hasOwnProperty.call(obj, "value") && Object.prototype.hasOwnProperty.call(obj, "type")) {
    out.set(prefix.join("."), obj);
    return out;
  }

  for (const key of Object.keys(obj)) {
    flattenTokens(obj[key], prefix.concat(key), out);
  }

  return out;
}

function isRef(v) {
  return typeof v === "string" && /^\{.+\}$/.test(v.trim());
}

function refPath(v) {
  return v.trim().slice(1, -1);
}

function resolveValue(token, index, stack = []) {
  if (!token) throw new Error("resolveValue: token is undefined");
  const v = token.value;

  if (!isRef(v)) return v;

  const ref = refPath(v);
  if (stack.includes(ref)) {
    throw new Error(`Circular token reference: ${stack.join(" -> ")} -> ${ref}`);
  }

  const target = index.get(ref);
  if (!target) {
    throw new Error(`Unresolved token reference: ${ref}`);
  }

  return resolveValue(target, index, stack.concat(ref));
}

function cssVarLine(name, value, comment) {
  const c = comment ? ` /* ${comment} */` : "";
  return `  --${name}: ${value};${c}`;
}

const raw = fs.readFileSync(TOKENS_PATH, "utf8");
const tokens = JSON.parse(raw);

// Build a global index for resolving {Refs}
const index = new Map();
flattenTokens(tokens["_Primitives/Style"], [], index);
// The set "1" holds both color modes with semantic mappings.
flattenTokens(tokens["1"], [], index);

const primColors = tokens["_Primitives/Style"].Colors;

function paletteVars(paletteName, paletteObj, { stripModeSuffix = true } = {}) {
  const lines = [];
  const prefix = stripModeSuffix
    ? kebab(paletteName).replace(/-light-mode$/g, "").replace(/-dark-mode(-alpha)?$/g, "")
    : kebab(paletteName);

  for (const shade of Object.keys(paletteObj)) {
    const t = paletteObj[shade];
    if (!t || typeof t !== "object" || !("value" in t)) continue;
    const value = resolveValue(t, index);
    lines.push(cssVarLine(`${prefix}-${kebab(shade)}`, value));
  }

  return lines;
}

function mustGetColor(palette, shade) {
  const p = primColors[palette];
  if (!p) throw new Error(`Missing palette: ${palette}`);
  const t = p[String(shade)];
  if (!t) throw new Error(`Missing shade ${shade} in palette ${palette}`);
  const value = resolveValue(t, index);
  return value;
}

function mustGetRadius(radiusName) {
  // Radius tokens are in primitives: under "Spacing" or elsewhere; search by suffix.
  // In this export, radii are under tokens["_Primitives/Style"].Spacing? We'll fall back to global index search.
  const targetKey = Array.from(index.keys()).find((k) => k.toLowerCase().endsWith(`.${radiusName.toLowerCase()}`));
  if (!targetKey) throw new Error(`Missing radius token: ${radiusName}`);
  const t = index.get(targetKey);
  return resolveValue(t, index);
}

// Radii: prefer explicit primitives if present; otherwise keep current defaults.
const radiusDefaults = {
  radius: "0.5rem",
  "radius-sm": "0.25rem",
  "radius-md": "0.5rem",
  "radius-lg": "0.75rem",
  "radius-xl": "1rem",
  "radius-2xl": "1.5rem",
  "radius-3xl": "2rem",
  "radius-4xl": "2.5rem",
};

function radiusValue(tokenName, fallback) {
  try {
    // Tokens Studio export contains keys like "radius-md" under some group; we just attempt lookup.
    return mustGetRadius(tokenName);
  } catch {
    return fallback;
  }
}

const lightRoot = [];
// shadcn semantic vars (light)
lightRoot.push(cssVarLine("background", mustGetColor("Base", "white"), "Base.white"));
lightRoot.push(cssVarLine("foreground", mustGetColor("Gray (light mode)", 900), "Gray.900"));
lightRoot.push(cssVarLine("card", mustGetColor("Base", "white"), "Base.white"));
lightRoot.push(cssVarLine("card-foreground", mustGetColor("Gray (light mode)", 900), "Gray.900"));
lightRoot.push(cssVarLine("popover", mustGetColor("Base", "white"), "Base.white"));
lightRoot.push(cssVarLine("popover-foreground", mustGetColor("Gray (light mode)", 900), "Gray.900"));
lightRoot.push(cssVarLine("primary", mustGetColor("Brand", 600), "Brand.600"));
lightRoot.push(cssVarLine("primary-foreground", mustGetColor("Base", "white"), "Base.white"));
lightRoot.push(cssVarLine("secondary", mustGetColor("Gray (light mode)", 50), "Gray.50"));
lightRoot.push(cssVarLine("secondary-foreground", mustGetColor("Gray (light mode)", 700), "Gray.700"));
lightRoot.push(cssVarLine("muted", mustGetColor("Gray (light mode)", 100), "Gray.100"));
lightRoot.push(cssVarLine("muted-foreground", mustGetColor("Gray (light mode)", 600), "Gray.600"));
lightRoot.push(cssVarLine("accent", mustGetColor("Brand", 50), "Brand.50"));
lightRoot.push(cssVarLine("accent-foreground", mustGetColor("Brand", 700), "Brand.700"));
lightRoot.push(cssVarLine("destructive", mustGetColor("Error", 600), "Error.600"));
lightRoot.push(cssVarLine("border", mustGetColor("Gray (light mode)", 300), "Gray.300"));
lightRoot.push(cssVarLine("input", mustGetColor("Gray (light mode)", 300), "Gray.300"));
lightRoot.push(cssVarLine("ring", mustGetColor("Brand", 500), "Brand.500"));

// charts (light)
lightRoot.push(cssVarLine("chart-1", mustGetColor("Brand", 600), "Brand.600"));
lightRoot.push(cssVarLine("chart-2", mustGetColor("Blue", 600), "Blue.600"));
lightRoot.push(cssVarLine("chart-3", mustGetColor("Success", 600), "Success.600"));
lightRoot.push(cssVarLine("chart-4", mustGetColor("Warning", 600), "Warning.600"));
lightRoot.push(cssVarLine("chart-5", mustGetColor("Error", 600), "Error.600"));

// sidebar (light)
lightRoot.push(cssVarLine("sidebar", mustGetColor("Base", "white")));
lightRoot.push(cssVarLine("sidebar-foreground", mustGetColor("Gray (light mode)", 900)));
lightRoot.push(cssVarLine("sidebar-primary", mustGetColor("Brand", 600), "Brand.600"));
lightRoot.push(cssVarLine("sidebar-primary-foreground", mustGetColor("Base", "white")));
lightRoot.push(cssVarLine("sidebar-accent", mustGetColor("Gray (light mode)", 50), "Gray.50"));
lightRoot.push(cssVarLine("sidebar-accent-foreground", mustGetColor("Gray (light mode)", 900), "Gray.900"));
lightRoot.push(cssVarLine("sidebar-border", mustGetColor("Gray (light mode)", 200), "Gray.200"));
lightRoot.push(cssVarLine("sidebar-ring", mustGetColor("Brand", 500), "Brand.500"));

// palettes (light)
const includePalettes = ["Brand", "Error", "Warning", "Success", "Blue", "Orange", "Gray (light mode)"];
for (const pal of includePalettes) {
  lightRoot.push("");
  lightRoot.push(...paletteVars(pal, primColors[pal]));
}

const darkRoot = [];
// shadcn semantic vars (dark) — matches previous hand-coded values
// Note: foreground swap uses Gray (dark mode)
darkRoot.push(cssVarLine("background", mustGetColor("Gray (dark mode)", 900), "Gray dark.900"));
darkRoot.push(cssVarLine("foreground", mustGetColor("Gray (dark mode)", 50), "Gray dark.50"));
darkRoot.push(cssVarLine("card", mustGetColor("Gray (dark mode)", 800), "Gray dark.800"));
darkRoot.push(cssVarLine("card-foreground", mustGetColor("Gray (dark mode)", 50), "Gray dark.50"));
darkRoot.push(cssVarLine("popover", mustGetColor("Gray (dark mode)", 800), "Gray dark.800"));
darkRoot.push(cssVarLine("popover-foreground", mustGetColor("Gray (dark mode)", 50), "Gray dark.50"));
darkRoot.push(cssVarLine("primary", mustGetColor("Brand", 500), "Brand.500"));
darkRoot.push(cssVarLine("primary-foreground", mustGetColor("Base", "white")));
darkRoot.push(cssVarLine("secondary", mustGetColor("Gray (dark mode)", 800), "Gray dark.800"));
darkRoot.push(cssVarLine("secondary-foreground", mustGetColor("Gray (dark mode)", 200), "Gray dark.200"));
darkRoot.push(cssVarLine("muted", mustGetColor("Gray (dark mode)", 800), "Gray dark.800"));
darkRoot.push(cssVarLine("muted-foreground", mustGetColor("Gray (dark mode)", 400), "Gray dark.400"));
darkRoot.push(cssVarLine("accent", mustGetColor("Gray (dark mode)", 800), "Gray dark.800"));
darkRoot.push(cssVarLine("accent-foreground", mustGetColor("Gray (dark mode)", 200), "Gray dark.200"));
darkRoot.push(cssVarLine("destructive", mustGetColor("Error", 500), "Error.500"));
darkRoot.push(cssVarLine("border", mustGetColor("Gray (dark mode)", 700), "Gray dark.700"));
darkRoot.push(cssVarLine("input", mustGetColor("Gray (dark mode)", 700), "Gray dark.700"));
darkRoot.push(cssVarLine("ring", mustGetColor("Brand", 500), "Brand.500"));

// charts (dark)
darkRoot.push(cssVarLine("chart-1", mustGetColor("Brand", 400), "Brand.400"));
darkRoot.push(cssVarLine("chart-2", mustGetColor("Blue", 400), "Blue.400"));
darkRoot.push(cssVarLine("chart-3", mustGetColor("Success", 400), "Success.400"));
darkRoot.push(cssVarLine("chart-4", mustGetColor("Warning", 400), "Warning.400"));
darkRoot.push(cssVarLine("chart-5", mustGetColor("Error", 400), "Error.400"));

// sidebar (dark)
darkRoot.push(cssVarLine("sidebar", mustGetColor("Gray (dark mode)", 900), "Gray dark.900"));
darkRoot.push(cssVarLine("sidebar-foreground", mustGetColor("Gray (dark mode)", 50), "Gray dark.50"));
darkRoot.push(cssVarLine("sidebar-primary", mustGetColor("Brand", 500), "Brand.500"));
darkRoot.push(cssVarLine("sidebar-primary-foreground", mustGetColor("Base", "white")));
darkRoot.push(cssVarLine("sidebar-accent", mustGetColor("Gray (dark mode)", 800), "Gray dark.800"));
darkRoot.push(cssVarLine("sidebar-accent-foreground", mustGetColor("Gray (dark mode)", 200), "Gray dark.200"));
darkRoot.push(cssVarLine("sidebar-border", mustGetColor("Gray (dark mode)", 700), "Gray dark.700"));
darkRoot.push(cssVarLine("sidebar-ring", mustGetColor("Brand", 500), "Brand.500"));

// gray palette override (dark)
darkRoot.push("");
darkRoot.push(...paletteVars("Gray (dark mode)", primColors["Gray (dark mode)"]));

const themeInline = [];
// Font
themeInline.push(cssVarLine("font-sans", '"Inter", ui-sans-serif, system-ui, sans-serif'));

// Radius
for (const [k, fallback] of Object.entries(radiusDefaults)) {
  themeInline.push(cssVarLine(k, radiusValue(k, fallback)));
}

// shadcn core mapping (required by shadcn ui components)
const shadcnMap = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "border",
  "input",
  "ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
];
for (const key of shadcnMap) {
  themeInline.push(cssVarLine(`color-${key}`, `var(--${key})`));
}

// palette mapping to tailwind utilities (bg-brand-600, etc.)
function mapPalette(prefix, shades) {
  for (const s of shades) {
    themeInline.push(cssVarLine(`color-${prefix}-${s}`, `var(--${prefix}-${s})`));
  }
}
const shades = ["25", "50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];
mapPalette("brand", shades);
mapPalette("gray", shades);
mapPalette("error", shades);
mapPalette("warning", shades);
mapPalette("success", shades);
mapPalette("blue", shades);
mapPalette("orange", shades);

const out = `/* AUTO-GENERATED FILE — do not edit directly.
   Source: src/tokens/tokens-core.json
   Generated by: scripts/generate-tokens-css.mjs */

@theme inline {
${themeInline.join("\n")}
}

:root {
${lightRoot.join("\n")}
}

.dark {
${darkRoot.join("\n")}
}
`;

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_PATH, out, "utf8");
console.log(`Wrote ${path.relative(ROOT, OUT_PATH)}`);
