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
        Http.send();
        Http.onreadystatechange = function () {
          if (Http.readyState === 4) {
            if (Http.status === 200) {
              resolve(Http.responseText);
            } else {
              reject(new Error("请求失败"));
            }
          }
        };
      });
    }
  
    find() {
      return this.urlopen()
        .then((responseText) => {
          const lines = responseText.split("\n");
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes(this.findtext)) {
              return lines[i];
            }
          }
          return "未找到指定文本";
        })
        .catch((error) => {
          console.log(error);
          return "请求失败";
        });
    }
  }
  