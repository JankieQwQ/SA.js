class Finder {
  constructor(url, findtext, domSelector = "body") {
    this.url = url;
    this.findtext = findtext;
    this.domSelector = domSelector;
    this.body = null;
    this.responseText = "";
    this.cache = new Map();
  }

  async urlopen() {
    try {
      if (this.cache.has(this.url)) {
        this.responseText = this.cache.get(this.url);
      } else {
        const response = await fetch(this.url);
        if (response.ok) {
          this.responseText = await response.text();
          this.cache.set(this.url, this.responseText);
        } else {
          throw new Error("[SA.JS Error] Cannot open webpage.");
        }
      }
      const parser = new DOMParser();
      this.body = parser.parseFromString(this.responseText, "text/html").querySelector(this.domSelector);
      if (!this.body) {
        throw new Error("[SA.JS Error] Cannot find DOM element with selector: " + this.domSelector);
      }
    } catch (error) {
      console.log(error);
      throw new Error("[SA.JS Error] Cannot open webpage.");
    }
  }

  find() {
    return this.urlopen()
      .then(() => {
        const regex = new RegExp(this.findtext, "gi");
        const matches = this.body.textContent.match(regex);
        if (matches) {
          return matches.length;
        } else {
          throw new Error("No matches found.");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.message === "No matches found.") {
          return "No matches found. Please try searching for something else.";
        } else {
          return "[SA.JS Error] Cannot open webpage.";
        }
      });
  }

  async findMultiple(page = 0, perPage = 10) {
    try {
      await this.urlopen();
      const regex = new RegExp(this.findtext, "gi");
      const lines = this.body.textContent.split("\n");
      const results = [];
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(regex)) {
          results.push(lines[i]);
        }
      }
      const start = page * perPage;
      const end = start + perPage;
      if (results.length === 0) {
        throw new Error("No matches found.");
      }
      return results.slice(start, end);
    } catch (error) {
      console.log(error);
      if (error.message === "No matches found.") {
        return "No matches found. Please try searching for something else.";
      } else {
        return "[SA.JS Error] Cannot open webpage.";
      }
    }
  }
}

async function searchInCurrentPage(url, findtext, domSelector = "body") {
  const finder = new Finder(url, findtext, domSelector);
  const result = await finder.findMultiple();
  return result;
}

async function searchInPage(url, findtext, page, perPage, domSelector = "body") {
  const finder = new Finder(url, findtext, domSelector);
  const result = await finder.findMultiple(page, perPage);
  return result;
}
