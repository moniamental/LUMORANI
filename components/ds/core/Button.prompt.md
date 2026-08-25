Uppercase, wide-tracked CTA — use `primary` (gold gradient) for the single most important action on a view and hairline variants for the rest.

```jsx
<Button variant="primary" size="lg">Jetzt Lieblinge entdecken</Button>
<Button variant="secondary">Zur Kollektion</Button>
<Button variant="ghost" size="sm">Mehr erfahren</Button>
```

Variants: `primary` (gold gradient, ink text, gold glow on hover), `secondary` (gold hairline + gold text), `outline` (neutral hairline, for dark photography), `ghost` (text + growing underline), `inverse` (ink fill, for use on marble/light sections). Sizes `sm | md | lg` map to 10/11/12px labels with `--tracking-caps`. Press state is `--press-scale`; never add a radius larger than `--radius-button` (2px).
