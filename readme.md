# EffectBox - A collection of ready-to-use & lean frontend effects & tools

## Problem

There are a lot of frontend Javascript effects out there - like number counters, video popups, and more. Each of those frontend effects have their own usage, their own set of required html structures, initializer functions, start, end, destroy functions. When you're building multiple websites, implementing multiple effects can take a long time since you'll have to conform to each library's conventions. Some effects / libraries have a ton of options or customizations, sometimes we only need things to be lean.

## Goal

The goal is to have a collection of ready-to-use Javascript frontend effects and frontend utilities and provide a lean and simple way to use them.

The goal is NOT to create effects from scratch, but to bring in the ones that would work well and won't leave a huge footprint.

## Principles

Each effect and utility will try and adhere to these principles:

1. **Just Works** - should work the way you think it would. For example, an entrace-type effect should start when the element comes into the viewport.
2. **Simplicity** - we can only have 2 functions - a `start()` and `stop()` function.
3. **Standardized** - use each effect almost the same way.

You can import each effect/utility individually as you need them in your project, or include the whole EffectBox script.

## What's Inside?

#### Effects

- [x] Number Count-Up

#### Utilities

- [x] Scroll Reveal - Trigger a callback when an element becomes visible

> Create an issue or PR and suggest frontend effects & utilities!

## Installation via NPM

Each effect / utility is an ES6 module that can be imported into your project so you can use them only when needed.

Install via `npm`

```bash
npm install effectbox
```

And then import when needed:

```js
import { countUp } from 'effectbox'
import { scrollReveal } from 'effectbox'
```

## Installation via &lt;script> tag

Or you can include the whole pre-built library via `<script>`:

```html
<script src="//path/to/effectbox.min.js" type="text/javascript"></script>
```

This exposes the global/window variable `effectBox` that contains all the effects and libraries - for example `effectBox.countUp`

Not so advisable.

## Usage

Each effect usually needs a minimal HTML structure, a set of options and Javascript to `start()` the effect up.

To make the documentation short(er), I'll explain how to use one effect - the Count Up effect in detail now. This will be very similar to how other effects can be used, so you should be able to use the other effects without any hitch. The rest of the documentation afterwards can be for options and descriptions.

### Step 1: Set up the HTML Structure

For the Count Up effect, this is the minimal HTML. I'll add a class so I can find it later:

```html
<div class="my-count-up">123</div>
```

### Step 2: Start it Up

Each effect has a `start()` and `stop()` function. It's required to call the `start()` function when your DOM is ready.

```js
import { countUp } from 'effectbox'

// When DOM is ready...
const el = document.querySelector( '.my-count-up' )
countUp.start( el )
```

You should be able to `stop()` the function after calling `start()`. And you should be able to `start()` it again afterwards.

It should now work fine, but we can customize it a little bit with options.

### Step 3: Options

Options can either be passed via Javascript during the `start()` function or via `data-*` attributes in the main HTML structure.

The Count Up effect has a `duration` option to change the speed of the animation. This can be set with Javascript via:

```js
countUp.start( el, {
    duration: 2000,
} )
```

Or it can be set via the HTML structure:

```html
<div data-duration="2000">123</div>
```

# Documentation

## `countUp`

Animates a number to have a count-up effect when it scrolls into the viewport.

### Minimal HTML

```html
<div>9,876</div>
```

The text in the middle can be a string containing more than one number and can contain non-numeric characters. Only the numeric characters will count-up.

### Options

| Option | Type | Default | Description |
| - | - | - | - |
| duration | number | 1000 | The duration of the count effect |
| delay | number | 16 | The delay of each count tick |
| lang | string | `en` | The locale to use for number formatting. Use other locale strings e.g. `fr-FR` to use localized decimal and thousand symbols |

### Example

**HTML**
```html
<div>$99.99/yr</div>
```

**JS**
```js
countUp.start( el )
```

## `scrollReveal`

Triggers a callback function once when the element scrolls into the viewport. It gets triggered when the element is already in view at the start.

### Options

| Option | Type | Default | Description |
| - | - | - | - |
| callback | function | | The function called when the element comes into the viewport |

### Example

**JS**
```js
const callback = () => {
    console.log( 'Now in view!' )
}
scrollReveal.start( el, {
    callback: callback,
} )
```