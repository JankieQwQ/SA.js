class Finder {
  constructor(url, findtext) {
    this.url = url;
    this.findtext = findtext;
    this.body = "";
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
    } catch (error) {
      console.log(error);
      throw new Error("[SA.JS Error] Cannot open webpage.");
    }
  }

  find() {
    return this.urlopen()
      .then(() => {
        const regex = new RegExp(this.findtext, "gi");
        const matches = this.responseText.match(regex);
        if (matches) {
          return matches.length;
        } else {
          return 0;
        }
      })
      .catch((error) => {
        console.log(error);
        return "[SA.JS Error] Cannot open webpage.";
      });
  }

  async findMultiple(page = 0, perPage = 10) {
    try {
      await this.urlopen();
      const regex = new RegExp(this.findtext, "gi");
      const lines = this.responseText.split("\n");
      const results = [];
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(regex)) {
          results.push(lines[i]);
        }
      }
      const start = page * perPage;
      const end = start + perPage;
      return results.slice(start, end);
    } catch (error) {
      console.log(error);
      return "[SA.JS Error] Cannot open webpage.";
    }
  }
}