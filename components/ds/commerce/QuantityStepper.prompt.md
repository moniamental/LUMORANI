Quantity control.

```jsx
<QuantityStepper value={qty} onChange={setQty} max={3} />
```

Uses the minus sign "−" (U+2212), not a hyphen. Cap `max` at real stock — most Lumorani pieces are one-offs, so `max={1}` is common.
