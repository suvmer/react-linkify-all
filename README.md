# react-linkify-all
NPM package that converts text with links to array of React components. Customizable. Built-in support of emails, Telegram, Twitter links. Own pattern can be used to linkify everything!

## Installation
```sh
npm i react-linkify-all
```
## Basic Usage
```jsx
import { Linkify } from 'react-linkify-all'
...
<Linkify links twitters emails>Some text with links.net, @twitters and emails@domain.org</Linkify>
```
Props "twitters", "emails" could be added optionally.

You can also use React components(\<Emails/\>, \<Twitters/\>, \<Tgs\/>, ...) and linkify() method.

### Example for react components:
![](linkify.png)
**Nesting is not supported yet:** use <Linkify .../> to summarize effects

## Own components and patterns
You could use your own component for links:
```jsx
const component = (match, i, link) => {
    return <a href={link} style={{color:"yellow"}}>#{i}. {match}</a>;
}
...
<Linkify ... component={component}>...</Linkify>
```
The "i" parameter can be used to number links(there is a counter for each type of link)
Parameters "match" and "link" may differ.
Example #1:
```jsx
<Links>site.com</Links>
```
match: site.com
i: 1
link: https://site.com

### Own patterns
Every pattern for linkify is set by an object:
```jsx
const option = {
    regex: RegExp, //          /(...)/g,
    component?: (match, i, link) => ReactElement,
    linkFn?: (match:string) => string
}
```
**WARNING:** be sure to put parentheses around the regular expression. In addition, every internal capturing group should be not captured. RegEx should capture only the entrie word you need.

The default component is:
```jsx
const defaultComponent = (match, i, link) => <a href={link}>{match}</a>;
```
"linkFn" is a function for converting a match into a link.
In Example #1 above, linkFn is:
```js
const example = match => match.substring(0, 4) === 'http' ? match : 'https://'+match
```
It is used to handle matches like site.com and https://site.com
### Using own patterns
```jsx
const option = {
    regex: new RegExp("((?<=\\B)@[a-zA-Z0-9_]{5,32}(?=\\b))", "g"),
    component: (match, i, link) => <a href={link}>{match}</a>,
    linkFn: match => "https://twitter.com/"+match.substring(1)
  };
...
<Linkify options={option}>...</Linkify>
```
That example will wrap every Twitter profile mention into <a\> tag.

Also, you can combine options:

```jsx
<Linkify options={[option1, option2, ..., optionN]}>...</Linkify>
```

They will be applied consistently

## linkify() function usage example
```jsx
import { linkify } from 'react-linkify-all';
...
const Card = (text) => {
    const option = ...;
    const result = linkify(text, option);
    return <div>{result}</div>;
}
```