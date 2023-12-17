# SA.js

<img src="meta/logo.svg" width="300" height="300" alt="Logo"/>

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

### `findMultiple(page = 0, perPage = 10): Promise`

Performs a search operation and returns multiple results. It allows you to specify the page number and the number of results per page.

- `page` (number): The page number to retrieve results from (default is 0).
- `perPage` (number): The number of results per page (default is 10).

### `searchInCurrentPage(url, findtext): Promise`

A helper function that performs a search operation within the entire content of a web page.

- `url` (string): The URL of the web page to search for content.
- `findtext` (string): The text to search for.

### `searchInPage(url, findtext, page, perPage): Promise`

A helper function that performs a search operation within a specific DOM element of a web page. It allows you to specify the page number and the number of results per page.

- `url` (string): The URL of the web page to search for content.
- `findtext` (string): The text to search for.
- `page` (number): The page number to retrieve results from.
- `perPage` (number): The number of results per page.

## Caching

SA.js implements a simple caching mechanism to store the fetched web page content. This helps to improve performance by avoiding unnecessary requests for the same web page. The cache is implemented using a `Map` object.

## DOM Search

SA.js uses the `DOMParser` API to parse the web page content into a `Document` object. This allows for efficient searching within specific DOM elements, specified using CSS selectors.

## Error Handling

SA.js provides basic error handling for common scenarios. It catches errors related to opening the web page, finding matches, or when no matches are found. It returns meaningful error messages to help with debugging and user feedback.

## Notes

- This class uses the `XMLHttpRequest` object to retrieve the web page content. Make sure your code environment supports this object.
- Cross-origin requests may be subject to restrictions by the same-origin policy. Make sure your code runs in an appropriate environment.

## Contributing

If you find any issues or have suggestions for improvements, please submit an issue or send us a pull request. We welcome and appreciate contributions.

## Build

CDNs: `<script src="https://bbs.minecraftbox.link/static/js/sa.js"></script>`

GitHub: `git clone https://github.com/JankieQwQ/SA.js/`

## License

MIT License
