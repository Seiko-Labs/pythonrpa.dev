/* eslint-disable @typescript-eslint/no-require-imports -- required for tailwindcss */

import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-fill": "repeat(auto-fill, minmax(300px, 1fr))",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },

        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          collapsible: "hsl(var(--sidebar-collapsible))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },

        branch: {
          DEFAULT: "hsl(var(--branch))",
          active: "hsl(var(--branch-active))",
        },

        theme: {
          checked: "hsl(var(--theme-checked))",
          unchecked: "hsl(var(--theme-unchecked))",
        },

        dialog: {
          background: "hsl(var(--dialog-background))",
        },
      },

      typography: (theme: (s: string) => string) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.800"),
            h1: {
              fontWeight: theme("fontWeight.bold"),
              fontSize: theme("fontSize.2xl"),
              marginBottom: theme("spacing.5"),
            },
            h2: {
              fontWeight: theme("fontWeight.bold"),
              fontSize: theme("fontSize.xl"),
              marginBottom: theme("spacing.4"),
            },
            p: {
              marginTop: theme("spacing.5"),
              marginBottom: theme("spacing.5"),
              fontWeight: theme("fontWeight.medium"),
            },
            ul: {
              listStyleType: "disc",
              paddingLeft: theme("spacing.5"),
              marginTop: theme("spacing.2"),
              marginBottom: theme("spacing.2"),
            },
            li: {
              "&::marker": {
                color: theme("colors.gray.600"),
              },
            },
            code: {
              backgroundColor: theme("colors.accent/20"),
              borderRadius: theme("borderRadius.md"),
              padding: `${theme("spacing.0.5")} ${theme("spacing.1")}`,
              fontFamily: theme("fontFamily.mono"),
            },
            blockquote: {
              borderLeftColor: theme("colors.accent/20"),
              paddingLeft: theme("spacing.4"),
              fontStyle: "italic",
            },
            pre: {
              backgroundColor: theme("colors.muted"),
              borderRadius: theme("borderRadius.md"),
              padding: theme("spacing.4"),
            },
            ".rounded-3xl": {
              borderRadius: theme("borderRadius.3xl"),
            },
            ".bg-background": {
              backgroundColor: theme("colors.background"),
            },
            ".border-accent\\/20": {
              borderColor: theme("colors.accent/20"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
