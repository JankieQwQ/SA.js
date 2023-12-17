class finder {
  constructor(url, findtext) {
    this.url = url;
    this.findtext = findtext;
    this.body = "";
  }

  urlopen() {
    return new Promise((resolve, reject) => {
      const Http = new XMLHttpRequest();
      Http.open("GET", this.url);
      Http.setRequestHeader("Access-Control-Allow-Origin", "*");
      Http.send();
      Http.onreadystatechange = function() {
        if (Http.readyState === 4) {
          if (Http.status === 200) {
            resolve(Http.responseText);
          } else {
            reject(new Error("[SA.JS Error] Cannot open webpage."));
          }
        }
      };
    });
  }

  find() {
    return this.urlopen()
      .then((responseText) => {
        const lines = responseText.split("\n");
        const results = [];
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes(this.findtext)) {
            results.push(lines[i]);
          }
        }
        return results.length;
      })
      .catch((error) => {
        console.log(error);
        return "[SA.JS Error] Cannot open webpage.";
      });
  }
  
  findmultiple() {
    return this.urlopen()
      .then((responseText) => {
        const lines = responseText.split("\n");
        const results = [];
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes(this.findtext)) {
            results.push(lines[i]);
          }
        }
        return results;
      })
      .catch((error) => {
        console.log(error);
        return "[SA.JS Error] Cannot open webpage.";
      });
  }
}
