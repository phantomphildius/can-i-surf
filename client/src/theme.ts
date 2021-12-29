import { ThemeType } from 'grommet';

const theme: ThemeType = {
  global: {
    font: {
      family:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    },
    colors: {
      aqua: '#21618c',
      navy: '#003366',
      cream: '#faf9f6',
      sand: '#faf0e6',
      salmon: '#ffa083',
      gold: '#e4d072',
    },
    focus: {
      border: {
        color: 'salmon',
      },
      outline: {
        color: 'salmon',
      },
    },
  },
  button: {
    border: {
      radius: '5px',
    },
    default: {},
    primary: {
      background: {
        color: 'navy',
      },
      padding: {
        vertical: '4px',
        horizontal: '8px',
      },
      border: {
        width: 'small',
        color: 'navy',
      },
    },
    hover: {
      primary: {
        background: {
          opacity: 'medium',
          color: 'navy',
        },
      },
    },
    secondary: {
      background: { color: 'cream' },
      border: {
        width: 'small',
        color: 'navy',
      },
    },
    active: {
      primary: {
        background: {
          color: 'gold',
          opacity: 'medium',
        },
        border: {
          color: 'gold',
          width: 'small',
        },
      },
    },
  },
  list: {
    item: {
      border: {
        color: 'navy',
        side: 'left',
      },
    },
  },
} as const;

export default theme;
