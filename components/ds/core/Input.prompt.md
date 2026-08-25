Underline-only text field for newsletter, checkout and contact forms.

```jsx
<Input label="Email*" type="email" placeholder="name@mail.de" />
<Input label="PLZ" error="Bitte Postleitzahl angeben" />
```

Never wrap it in a bordered box — the hairline bottom rule is the brand's field treatment. Focus turns the rule `--gold-300`; error turns it `--status-error`. Use `tone="light"` on marble backgrounds.
