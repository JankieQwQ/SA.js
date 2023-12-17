# SA.js

![Logo](meta/logo.svg)

SA.js is a JavaScript script that allows you to search for specific text within a given web page. It provides a simple way to retrieve the content of a web page and search for desired information. This can help users quickly find the text they are interested in.

## Usage Example

```javascript
const myFinder = new Finder("https://www.example.com", "Hello, World!");

myFinder.find()
  .then((result) => {
    console.log(result); // Output the found text line
  })
  .catch((error) => {
    console.log(error); // Output the error message
  });
```

## Constructor

### `constructor(url, findtext)`

Create a new instance of the finder.

- `url` (string): The URL of the web page to search for content.
- `findtext` (string): The text to search for.

## Methods

### `find(): Promise`

Performs the search operation and returns a Promise object that resolves with the result or rejects with an error.

## Notes

- This class uses the `XMLHttpRequest` object to retrieve the web page content. Make sure your code environment supports this object.
- Cross-origin requests may be subject to restrictions by the same-origin policy. Make sure your code runs in an appropriate environment.


## Contributing

If you find any issues or have suggestions for improvements, please submit an issue or send us a pull request. We welcome and appreciate contributions.

## License

MIT License