# Discord Theme Design Tokens

## CSS Custom Properties

Add to `styles/globals.css`:

```css
:root {
  /* Discord Dark Theme */
  --bg-primary:     #1e1f22;    /* Outermost background */
  --bg-secondary:   #2b2d31;    /* Sidebar, panels */
  --bg-tertiary:    #1e1f22;    /* App background */
  --bg-accent:      #404249;    /* Selected items */
  --bg-modifier-hover:   #35373c;
  --bg-modifier-active:  #404249;
  --bg-modifier-selected: #404249;

  /* Text */
  --text-normal:    #dbdee1;    /* Primary text */
  --text-muted:     #80848e;    /* Hint text */
  --text-link:      #00a8fc;    /* Links */
  --text-positive:  #23a55a;
  --text-warning:   #f0b232;
  --text-danger:    #f23f42;

  /* Interactive */
  --interactive-normal:  #b5bac1;
  --interactive-hover:   #dbdee1;
  --interactive-active:  #ffffff;

  /* Brand */
  --brand-primary:   #5865f2;   /* Blurple */
  --brand-hover:     #4752c4;
  --brand-active:    #3c45a5;

  /* Borders */
  --border-subtle:   #1e1f22;
  --border-normal:   #3f4147;

  /* Status */
  --status-online:   #23a55a;
  --status-idle:     #f0b232;
  --status-dnd:      #f23f42;
  --status-offline:  #80848e;
}
```

## Tailwind Config Extension

```js
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      discord: {
        blurple:   '#5865f2',
        'blurple-hover': '#4752c4',
        green:     '#23a55a',
        yellow:    '#f0b232',
        red:       '#f23f42',
        'bg-1':    '#1e1f22',
        'bg-2':    '#2b2d31',
        'bg-3':    '#313338',
        'text-1':  '#dbdee1',
        'text-2':  '#b5bac1',
        'text-3':  '#80848e',
      },
    },
  },
}
```

## Discord Component Patterns

### Cards
```tailwind
bg-discord-bg-2 rounded-lg border border-[#3f4147] p-4
```

### Primary Button (Blurple)
```tailwind
bg-discord-blurple hover:bg-discord-blurple-hover text-white font-medium py-2 px-4 rounded-sm transition-colors
```

### Destructive Button
```tailwind
bg-[#f23f42] hover:bg-[#a12d2e] text-white font-medium py-2 px-4 rounded-sm transition-colors
```

### Input Field
```tailwind
bg-[#1e1f22] border border-[#1e1f22] text-discord-text-1 placeholder-discord-text-3 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-discord-blurple
```

### Badge / Pill
```tailwind
inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-discord-blurple/20 text-discord-blurple
```
