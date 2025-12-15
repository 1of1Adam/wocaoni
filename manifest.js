console.log("🍿️ DualSubs: 🔣 Universal");
console.log("Manifest.response.bundle.js");
console.log("Version: 1.7.5");
console.log("Date: 2025/11/23 15:45:04");
(() => {
  "use strict";

  let e = (() => {
    let e = Object.keys(globalThis);
    switch (true) {
      case e.includes("$task"):
        return "Quantumult X";
      case e.includes("$loon"):
        return "Loon";
      case e.includes("$rocket"):
        return "Shadowrocket";
      case typeof module != "undefined":
        return "Node.js";
      case e.includes("Egern"):
        return "Egern";
      case e.includes("$environment"):
        if ($environment["surge-version"]) {
          return "Surge";
        }
        if ($environment["stash-version"]) {
          return "Stash";
        }
        return;
      default:
        return;
    }
  })();
  class a {
    static #e = new Map([]);
    static #a = [];
    static #t = new Map([]);
    static clear = () => {};
    static count = (e = "default") => {
      switch (a.#e.has(e)) {
        case true:
          a.#e.set(e, a.#e.get(e) + 1);
          break;
        case false:
          a.#e.set(e, 0);
      }
      a.log(`${e}: ${a.#e.get(e)}`);
    };
    static countReset = (e = "default") => {
      switch (a.#e.has(e)) {
        case true:
          a.#e.set(e, 0);
          a.log(`${e}: ${a.#e.get(e)}`);
          break;
        case false:
          a.warn(`Counter "${e}" doesn’t exist`);
      }
    };
    static debug = (...e) => {
      if (!(a.#s < 4)) {
        e = e.map(e => `🅱️ ${e}`);
        a.log(...e);
      }
    };
    static error(...t) {
      if (!(a.#s < 1)) {
        switch (e) {
          case "Surge":
          case "Loon":
          case "Stash":
          case "Egern":
          case "Shadowrocket":
          case "Quantumult X":
          default:
            t = t.map(e => `❌ ${e}`);
            break;
          case "Node.js":
            t = t.map(e => `❌ ${e.stack}`);
        }
        a.log(...t);
      }
    }
    static exception = (...e) => a.error(...e);
    static group = e => a.#a.unshift(e);
    static groupEnd = () => a.#a.shift();
    static info(...e) {
      if (!(a.#s < 3)) {
        e = e.map(e => `ℹ️ ${e}`);
        a.log(...e);
      }
    }
    static #s = 3;
    static get logLevel() {
      switch (a.#s) {
        case 0:
          return "OFF";
        case 1:
          return "ERROR";
        case 2:
          return "WARN";
        case 3:
        default:
          return "INFO";
        case 4:
          return "DEBUG";
        case 5:
          return "ALL";
      }
    }
    static set logLevel(e) {
      switch (typeof e) {
        case "string":
          e = e.toLowerCase();
          break;
        case "number":
          break;
        default:
          e = "warn";
      }
      switch (e) {
        case 0:
        case "off":
          a.#s = 0;
          break;
        case 1:
        case "error":
          a.#s = 1;
          break;
        case 2:
        case "warn":
        case "warning":
        default:
          a.#s = 2;
          break;
        case 3:
        case "info":
          a.#s = 3;
          break;
        case 4:
        case "debug":
          a.#s = 4;
          break;
        case 5:
        case "all":
          a.#s = 5;
      }
    }
    static log = (...e) => {
      if (a.#s !== 0) {
        e = e.map(e => {
          switch (typeof e) {
            case "object":
              e = JSON.stringify(e);
              break;
            case "bigint":
            case "number":
            case "boolean":
            case "string":
              e = e.toString();
          }
          return e;
        });
        a.#a.forEach(a => {
          (e = e.map(e => `  ${e}`)).unshift(`▼ ${a}:`);
        });
        console.log((e = ["", ...e]).join("\n"));
      }
    };
    static time = (e = "default") => a.#t.set(e, Date.now());
    static timeEnd = (e = "default") => a.#t.delete(e);
    static timeLog = (e = "default") => {
      let t = a.#t.get(e);
      if (t) {
        a.log(`${e}: ${Date.now() - t}ms`);
      } else {
        a.warn(`Timer "${e}" doesn’t exist`);
      }
    };
    static warn(...e) {
      if (!(a.#s < 2)) {
        e = e.map(e => `⚠️ ${e}`);
        a.log(...e);
      }
    }
  }
  class t {
    static escape(e) {
      let a = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
      };
      return e.replace(/[&<>"']/g, e => a[e]);
    }
    static get(e = {}, a = "", s) {
      if (!Array.isArray(a)) {
        a = t.toPath(a);
      }
      let n = a.reduce((e, a) => Object(e)[a], e);
      if (n === undefined) {
        return s;
      } else {
        return n;
      }
    }
    static omit(e = {}, a = []) {
      if (!Array.isArray(a)) {
        a = [a.toString()];
      }
      a.forEach(a => t.unset(e, a));
      return e;
    }
    static pick(e = {}, a = []) {
      if (!Array.isArray(a)) {
        a = [a.toString()];
      }
      return Object.fromEntries(Object.entries(e).filter(([e, t]) => a.includes(e)));
    }
    static set(e, a, s) {
      if (!Array.isArray(a)) {
        a = t.toPath(a);
      }
      a.slice(0, -1).reduce((e, t, s) => Object(e[t]) === e[t] ? e[t] : e[t] = /^\d+$/.test(a[s + 1]) ? [] : {}, e)[a[a.length - 1]] = s;
      return e;
    }
    static toPath(e) {
      return e.replace(/\[(\d+)\]/g, ".$1").split(".").filter(Boolean);
    }
    static unescape(e) {
      let a = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": "\"",
        "&#39;": "'"
      };
      return e.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, e => a[e]);
    }
    static unset(e = {}, a = "") {
      if (!Array.isArray(a)) {
        a = t.toPath(a);
      }
      return a.reduce((e, t, s) => s === a.length - 1 ? (delete e[t], true) : Object(e)[t], e);
    }
  }
  let s = {
    100: "Continue",
    101: "Switching Protocols",
    102: "Processing",
    103: "Early Hints",
    200: "OK",
    201: "Created",
    202: "Accepted",
    203: "Non-Authoritative Information",
    204: "No Content",
    205: "Reset Content",
    206: "Partial Content",
    207: "Multi-Status",
    208: "Already Reported",
    226: "IM Used",
    300: "Multiple Choices",
    301: "Moved Permanently",
    302: "Found",
    304: "Not Modified",
    307: "Temporary Redirect",
    308: "Permanent Redirect",
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Content Too Large",
    414: "URI Too Long",
    415: "Unsupported Media Type",
    416: "Range Not Satisfiable",
    417: "Expectation Failed",
    418: "I'm a teapot",
    421: "Misdirected Request",
    422: "Unprocessable Entity",
    423: "Locked",
    424: "Failed Dependency",
    425: "Too Early",
    426: "Upgrade Required",
    428: "Precondition Required",
    429: "Too Many Requests",
    431: "Request Header Fields Too Large",
    451: "Unavailable For Legal Reasons",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    506: "Variant Also Negotiates",
    507: "Insufficient Storage",
    508: "Loop Detected",
    510: "Not Extended",
    511: "Network Authentication Required"
  };
  async function n(a, l = {}) {
    switch (typeof a) {
      case "object":
        a = {
          ...l,
          ...a
        };
        break;
      case "string":
        a = {
          ...l,
          url: a
        };
        break;
      default:
        throw TypeError(`${Function.name}: 参数类型错误, resource 必须为对象或字符串`);
    }
    if (!a.method) {
      a.method = "GET";
      if (a.body ?? a.bodyBytes) {
        a.method = "POST";
      }
    }
    delete a.headers?.Host;
    delete a.headers?.[":authority"];
    delete a.headers?.["Content-Length"];
    delete a.headers?.["content-length"];
    let g = a.method.toLocaleLowerCase();
    if (!a.timeout) {
      a.timeout = 5;
    }
    if (a.timeout) {
      a.timeout = Number.parseInt(a.timeout, 10);
      if (a.timeout > 500) {
        a.timeout = Math.round(a.timeout / 1000);
      }
    }
    switch (e) {
      case "Loon":
      case "Surge":
      case "Stash":
      case "Egern":
      case "Shadowrocket":
      default:
        if (a.timeout && e === "Loon") {
          a.timeout = a.timeout * 1000;
        }
        if (a.policy) {
          switch (e) {
            case "Loon":
              a.node = a.policy;
              break;
            case "Stash":
              t.set(a, "headers.X-Stash-Selected-Proxy", encodeURI(a.policy));
              break;
            case "Shadowrocket":
              t.set(a, "headers.X-Surge-Proxy", a.policy);
          }
        }
        if (typeof a.redirection == "boolean") {
          a["auto-redirect"] = a.redirection;
        }
        if (a.bodyBytes && !a.body) {
          a.body = a.bodyBytes;
          a.bodyBytes = undefined;
        }
        switch ((a.headers?.Accept || a.headers?.accept)?.split(";")?.[0]) {
          case "application/protobuf":
          case "application/x-protobuf":
          case "application/vnd.google.protobuf":
          case "application/vnd.apple.flatbuffer":
          case "application/grpc":
          case "application/grpc+proto":
          case "application/octet-stream":
            a["binary-mode"] = true;
        }
        return await new Promise((e, t) => {
          $httpClient[g](a, (n, l, g) => {
            if (n) {
              t(n);
            } else {
              l.ok = /^2\d\d$/.test(l.status);
              l.statusCode = l.status;
              l.statusText = s[l.status];
              if (g) {
                l.body = g;
                if (a["binary-mode"] == true) {
                  l.bodyBytes = g;
                }
              }
              e(l);
            }
          });
        });
      case "Quantumult X":
        a.timeout = a.timeout * 1000;
        if (a.policy) {
          t.set(a, "opts.policy", a.policy);
        }
        if (typeof a["auto-redirect"] == "boolean") {
          t.set(a, "opts.redirection", a["auto-redirect"]);
        }
        if (a.body instanceof ArrayBuffer) {
          a.bodyBytes = a.body;
          a.body = undefined;
        } else if (ArrayBuffer.isView(a.body)) {
          a.bodyBytes = a.body.buffer.slice(a.body.byteOffset, a.body.byteLength + a.body.byteOffset);
          a.body = undefined;
        } else if (a.body) {
          a.bodyBytes = undefined;
        }
        return Promise.race([await $task.fetch(a).then(e => {
          e.ok = /^2\d\d$/.test(e.statusCode);
          e.status = e.statusCode;
          e.statusText = s[e.status];
          switch ((e.headers?.["Content-Type"] ?? e.headers?.["content-type"])?.split(";")?.[0]) {
            case "application/protobuf":
            case "application/x-protobuf":
            case "application/vnd.google.protobuf":
            case "application/vnd.apple.flatbuffer":
            case "application/grpc":
            case "application/grpc+proto":
            case "application/octet-stream":
              e.body = e.bodyBytes;
          }
          e.bodyBytes = undefined;
          return e;
        }, e => Promise.reject(e.error)), new Promise((e, t) => {
          setTimeout(() => {
            t(Error(`${Function.name}: 请求超时, 请检查网络后重试`));
          }, a.timeout);
        })]);
      case "Node.js":
        {
          let e = globalThis.fetch ? globalThis.fetch : require("node-fetch");
          let t = (globalThis.fetchCookie ? globalThis.fetchCookie : require("fetch-cookie").default)(e);
          a.timeout = a.timeout * 1000;
          a.redirect = a.redirection ? "follow" : "manual";
          let {
            url: s,
            ...n
          } = a;
          return Promise.race([await t(s, n).then(async e => {
            let a;
            let t = await e.arrayBuffer();
            try {
              a = e.headers.raw();
            } catch {
              a = Array.from(e.headers.entries()).reduce((e, [a, t]) => {
                e[a] = e[a] ? [...e[a], t] : [t];
                return e;
              }, {});
            }
            return {
              ok: e.ok ?? /^2\d\d$/.test(e.status),
              status: e.status,
              statusCode: e.status,
              statusText: e.statusText,
              body: new TextDecoder("utf-8").decode(t),
              bodyBytes: t,
              headers: Object.fromEntries(Object.entries(a).map(([e, a]) => [e, e.toLowerCase() !== "set-cookie" ? a.toString() : a]))
            };
          }).catch(e => Promise.reject(e.message)), new Promise((e, t) => {
            setTimeout(() => {
              t(Error(`${Function.name}: 请求超时, 请检查网络后重试`));
            }, a.timeout);
          })]);
        }
    }
  }
  class l {
    static data = null;
    static dataFile = "box.dat";
    static #n = /^@(?<key>[^.]+)(?:\.(?<path>.*))?$/;
    static getItem(a, s = null) {
      let n = s;
      if (a.startsWith("@") === true) {
        let {
          key: e,
          path: s
        } = a.match(l.#n)?.groups;
        a = e;
        let g = l.getItem(a, {});
        if (typeof g != "object") {
          g = {};
        }
        n = t.get(g, s);
        try {
          n = JSON.parse(n);
        } catch (e) {}
      } else {
        switch (e) {
          case "Surge":
          case "Loon":
          case "Stash":
          case "Egern":
          case "Shadowrocket":
            n = $persistentStore.read(a);
            break;
          case "Quantumult X":
            n = $prefs.valueForKey(a);
            break;
          case "Node.js":
            l.data = l.#l(l.dataFile);
            n = l.data?.[a];
            break;
          default:
            n = l.data?.[a] || null;
        }
        try {
          n = JSON.parse(n);
        } catch (e) {}
      }
      return n ?? s;
    }
    static setItem(a = new String(), s = new String()) {
      let n = false;
      s = typeof s == "object" ? JSON.stringify(s) : String(s);
      if (a.startsWith("@") === true) {
        let {
          key: e,
          path: g
        } = a.match(l.#n)?.groups;
        a = e;
        let o = l.getItem(a, {});
        if (typeof o != "object") {
          o = {};
        }
        t.set(o, g, s);
        n = l.setItem(a, o);
      } else {
        switch (e) {
          case "Surge":
          case "Loon":
          case "Stash":
          case "Egern":
          case "Shadowrocket":
            n = $persistentStore.write(s, a);
            break;
          case "Quantumult X":
            n = $prefs.setValueForKey(s, a);
            break;
          case "Node.js":
            l.data = l.#l(l.dataFile);
            l.data[a] = s;
            l.#g(l.dataFile);
            n = true;
            break;
          default:
            n = l.data?.[a] || null;
        }
      }
      return n;
    }
    static removeItem(a) {
      let s = false;
      if (a.startsWith("@") === true) {
        let {
          key: e,
          path: n
        } = a.match(l.#n)?.groups;
        a = e;
        let g = l.getItem(a);
        if (typeof g != "object") {
          g = {};
        }
        keyValue = t.unset(g, n);
        s = l.setItem(a, g);
      } else {
        switch (e) {
          case "Surge":
          case "Loon":
          case "Stash":
          case "Egern":
          case "Shadowrocket":
          case "Node.js":
          default:
            s = false;
            break;
          case "Quantumult X":
            s = $prefs.removeValueForKey(a);
        }
      }
      return s;
    }
    static clear() {
      let a = false;
      switch (e) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Egern":
        case "Shadowrocket":
        case "Node.js":
        default:
          a = false;
          break;
        case "Quantumult X":
          a = $prefs.removeAllValues();
      }
      return a;
    }
    static #l = a => {
      if (e !== "Node.js") {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("node:fs");
        this.path = this.path ? this.path : require("node:path");
        let e = this.path.resolve(a);
        let t = this.path.resolve(process.cwd(), a);
        let s = this.fs.existsSync(e);
        let n = !s && this.fs.existsSync(t);
        if (!s && !n) {
          return {};
        }
        try {
          return JSON.parse(this.fs.readFileSync(s ? e : t));
        } catch (e) {
          return {};
        }
      }
    };
    static #g = (a = this.dataFile) => {
      if (e === "Node.js") {
        this.fs = this.fs ? this.fs : require("node:fs");
        this.path = this.path ? this.path : require("node:path");
        let e = this.path.resolve(a);
        let t = this.path.resolve(process.cwd(), a);
        let s = this.fs.existsSync(e);
        let n = !s && this.fs.existsSync(t);
        let l = JSON.stringify(this.data);
        if (s) {
          this.fs.writeFileSync(e, l);
        } else if (n) {
          this.fs.writeFileSync(t, l);
        } else {
          this.fs.writeFileSync(e, l);
        }
      }
    };
  }
  function g(e) {
    if (/^\d+$/.test(e)) {
      e = Number.parseInt(e, 10);
    }
    return e;
  }
  class o {
    constructor(e) {
      switch (typeof e) {
        case "string":
          if (e.length === 0) {
            break;
          }
          if (e.startsWith("?")) {
            e = e.slice(1);
          }
          e.split("&").map(e => e.split("=")).forEach(([e, a]) => {
            this.#o.push(e ? decodeURIComponent(e) : e);
            this.#i.push(a ? decodeURIComponent(a) : a);
          });
          break;
        case "object":
          if (Array.isArray(e)) {
            Object.entries(e).forEach(([e, a]) => {
              this.#o.push(e);
              this.#i.push(a);
            });
          } else if (Symbol.iterator in Object(e)) {
            for (const [a, t] of e) {
              this.#o.push(a);
              this.#i.push(t);
            }
          }
      }
      this.#r(this.#o, this.#i);
    }
    #u = "";
    #o = [];
    #i = [];
    #c(e) {
      return encodeURIComponent(e).replace(/%2C/g, ",").replace(/%21/g, "!").replace(/%27/g, "'").replace(/%28/g, "(").replace(/%29/g, ")").replace(/%2A/g, "*");
    }
    #r(e, a) {
      if (e.length === 0) {
        this.#u = "";
      } else {
        this.#u = e.map((e, t) => {
          switch (typeof a[t]) {
            case "object":
              return `${this.#c(e)}=${this.#c(JSON.stringify(a[t]))}`;
            case "boolean":
            case "number":
            case "string":
              return `${this.#c(e)}=${this.#c(a[t])}`;
            default:
              return this.#c(e);
          }
        }).join("&");
      }
    }
    append(e, a) {
      this.#o.push(e);
      this.#i.push(a);
      this.#r(this.#o, this.#i);
    }
    delete(e, a) {
      while (this.#o.indexOf(e) > -1) {
        this.#i.splice(this.#o.indexOf(e), 1);
        this.#o.splice(this.#o.indexOf(e), 1);
      }
      this.#r(this.#o, this.#i);
    }
    entries() {
      return this.#o.map((e, a) => [e, this.#i[a]]);
    }
    get(e) {
      return this.#i[this.#o.indexOf(e)];
    }
    getAll(e) {
      return this.#i.filter((a, t) => this.#o[t] === e);
    }
    has(e, a) {
      return this.#o.indexOf(e) > -1;
    }
    keys() {
      return this.#o;
    }
    set(e, a) {
      if (this.#o.indexOf(e) === -1) {
        this.append(e, a);
      } else {
        let t = true;
        let s = [];
        this.#o = this.#o.filter((n, l) => n !== e ? (s.push(this.#i[l]), true) : !!t && (t = false, s.push(a), true));
        this.#i = s;
        this.#r(this.#o, this.#i);
      }
    }
    sort() {
      let e = this.entries().sort();
      this.#o = [];
      this.#i = [];
      e.forEach(e => {
        this.#o.push(e[0]);
        this.#i.push(e[1]);
      });
      this.#r(this.#o, this.#i);
    }
    toString = () => this.#u;
    values = () => this.#i.values();
  }
  class i {
    constructor(e, a) {
      switch (typeof e) {
        case "string":
          {
            const t = /^(blob:|file:)?[a-zA-z]+:\/\/.*/.test(e);
            const s = !!a && /^(blob:|file:)?[a-zA-z]+:\/\/.*/.test(a);
            if (t) {
              this.href = e;
            } else if (s) {
              this.href = a + e;
            } else {
              throw TypeError("URL string is not valid. If using a relative url, a second argument needs to be passed representing the base URL. Example: new URL(\"relative/path\", \"http://www.example.com\");");
            }
            break;
          }
        case "object":
          break;
        default:
          throw TypeError("Invalid argument type.");
      }
    }
    #m = {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      password: "",
      pathname: "",
      port: NaN,
      protocol: "",
      search: "",
      searchParams: new o(""),
      username: ""
    };
    static #d = /^(?<scheme>([^:\/?#]+):)?(?:\/\/(?<authority>[^\/?#]*))?(?<path>[^?#]*)(?<query>\?([^#]*))?(?<hash>#(.*))?$/;
    static #p = /^(?<authentication>(?<username>[^:]*)(:(?<password>[^@]*))?@)?(?<hostname>[^:]+)(:(?<port>\d+))?$/;
    get hash() {
      return this.#m.hash;
    }
    set hash(e) {
      if (e.length !== 0) {
        if (e.startsWith("#")) {
          e = e.slice(1);
        }
        this.#m.hash = `#${encodeURIComponent(e)}`;
      }
    }
    get host() {
      if (this.port.length > 0) {
        return `${this.hostname}:${this.port}`;
      } else {
        return this.hostname;
      }
    }
    set host(e) {
      [this.hostname, this.port] = e.split(":", 2);
    }
    get hostname() {
      return encodeURIComponent(this.#m.hostname);
    }
    set hostname(e) {
      this.#m.hostname = e ?? "";
    }
    get href() {
      let e = "";
      if (this.username.length > 0) {
        e += this.username;
        if (this.password.length > 0) {
          e += `:${this.password}`;
        }
        e += "@";
      }
      return `${this.protocol}//${e}${this.host}${this.pathname}${this.search}${this.hash}`;
    }
    set href(e) {
      if (e.startsWith("blob:") || e.startsWith("file:")) {
        e = e.slice(5);
      }
      let a = e.match(i.#d);
      if (!a) {
        throw TypeError("Invalid URL format.");
      }
      this.protocol = a.groups.scheme ?? "";
      let t = a.groups.authority.match(i.#p);
      this.username = t.groups.username ?? "";
      this.password = t.groups.password ?? "";
      this.hostname = t.groups.hostname ?? "";
      this.port = t.groups.port ?? "";
      this.pathname = a.groups.path ?? "";
      this.search = a.groups.query ?? "";
      this.hash = a.groups.hash ?? "";
    }
    get origin() {
      return `${this.protocol}//${this.host}`;
    }
    get password() {
      return encodeURIComponent(this.#m.password);
    }
    set password(e) {
      if (this.username.length > 0) {
        this.#m.password = e ?? "";
      }
    }
    get pathname() {
      return `/${this.#m.pathname}`;
    }
    set pathname(e) {
      if ((e = `${e}`).startsWith("/")) {
        e = e.slice(1);
      }
      this.#m.pathname = e;
    }
    get port() {
      if (Number.isNaN(this.#m.port)) {
        return "";
      }
      let e = this.#m.port.toString();
      if (this.protocol === "ftp:" && e === "21" || this.protocol === "http:" && e === "80" || this.protocol === "https:" && e === "443") {
        return "";
      } else {
        return e;
      }
    }
    set port(e) {
      if (e === "") {
        this.#m.port = NaN;
      } else {
        let a = Number.parseInt(e, 10);
        if (a >= 0 && a < 65535) {
          this.#m.port = a;
        }
      }
    }
    get protocol() {
      return `${this.#m.protocol}:`;
    }
    set protocol(e) {
      if (e.endsWith(":")) {
        e = e.slice(0, -1);
      }
      this.#m.protocol = e;
    }
    get search() {
      this.#m.search = this.searchParams.toString();
      if (this.#m.search.length > 0) {
        return `?${this.#m.search}`;
      } else {
        return "";
      }
    }
    set search(e) {
      if ((e = `${e}`).startsWith("?")) {
        e = e.slice(1);
      }
      this.#m.search = e;
      this.#m.searchParams = new o(this.#m.search);
    }
    get searchParams() {
      return this.#m.searchParams;
    }
    get username() {
      return encodeURIComponent(this.#m.username);
    }
    set username(e) {
      this.#m.username = e ?? "";
    }
    static parse = (e, a) => new i(e, a);
    toString = () => this.href;
    toJSON = () => JSON.stringify({
      hash: this.hash,
      host: this.host,
      hostname: this.hostname,
      href: this.href,
      origin: this.origin,
      password: this.password,
      pathname: this.pathname,
      port: this.port,
      protocol: this.protocol,
      search: this.search,
      searchParams: this.searchParams,
      username: this.username
    });
  }
  class r {
    static name = "EXTM3U";
    static version = "0.8.8";
    static about = () => console.log(`
🟧 ${this.name} v${this.version}
`);
    static #h = /^(?:(?<TAG>#(?:EXT|AIV)[^#:\s\r\n]+)(?::(?<OPTION>[^\r\n]+))?(?:(?:\r\n|\r|\n)(?<URI>[^#\s\r\n]+))?|(?<NOTE>#[^\r\n]+)?)(?:\r\n|\r|\n)?$/gm;
    static #N = /^((-?\d+[x.\d]+)|[0-9A-Z-]+)$/;
    static parse(e = new String()) {
      return [...e.matchAll(this.#h)].map(e => {
        e = e?.groups || e;
        if (/=/.test(e?.OPTION)) {
          e.OPTION = Object.fromEntries(`${e.OPTION},`.split(/,\s*(?![^"]*",)/).slice(0, -1).map(e => {
            (e = e.split(/=(.*)/))[1] = isNaN(e[1]) ? e[1].replace(/^"(.*)"$/, "$1") : parseFloat(e[1]);
            return e;
          }));
        }
        return e;
      });
    }
    static stringify(e = [], a = {
      lineBreak: "\n"
    }) {
      if (e?.[0]?.TAG !== "#EXTM3U") {
        e.unshift({
          TAG: "#EXTM3U"
        });
      }
      return e.map(e => {
        if (typeof e?.OPTION == "object") {
          e.OPTION = Object.entries(e.OPTION).map(a => {
            if (e?.TAG === "#EXT-X-SESSION-DATA") {
              a[1] = `"${a[1]}"`;
            } else if (isNaN(a[1])) {
              if (a[0] === "ID" || a[0] === "INSTREAM-ID" || a[0] === "KEYFORMAT") {
                a[1] = `"${a[1]}"`;
              } else if (!this.#N.test(a[1])) {
                a[1] = `"${a[1]}"`;
              }
            } else {
              a[1] = typeof a[1] == "number" ? a[1] : `"${a[1]}"`;
            }
            return a.join("=");
          }).join(",");
        }
        return e = e?.URI ? e.TAG + ":" + e.OPTION + a.lineBreak + e.URI : e?.OPTION ? e.TAG + ":" + e.OPTION : e?.TAG ? e.TAG : e?.NOTE ? e.NOTE : "";
      }).join(a.lineBreak);
    }
  }
  function u(e = {}, t = {}, s = "", n = "", l = true, g = "iPhone") {
    a.log("☑️ Set DualSubs Subtitle Option", `type: ${s}`);
    let o = e?.OPTION?.NAME.trim();
    let i = t?.OPTION?.NAME.trim();
    let r = e?.OPTION?.LANGUAGE.trim();
    let c = t?.OPTION?.LANGUAGE.trim();
    let m = JSON.parse(JSON.stringify(e));
    switch (s) {
      case "Official":
        m.OPTION.NAME = `官方字幕 (${o}/${i})`;
        break;
      case "Translate":
        m.OPTION.NAME = `翻译字幕 (${o}/${i})`;
        break;
      case "External":
        m.OPTION.NAME = `外挂字幕 (${o})`;
    }
    switch (n) {
      case "Apple":
      case "MGM+":
        switch (g) {
          case "Web":
          case "Macintosh":
            m.OPTION.LANGUAGE = r;
            break;
          default:
            m.OPTION.LANGUAGE = `${s} (${r}/${c})`;
        }
        break;
      case "Disney+":
      case "PrimeVideo":
      case "Hulu":
      case "Nebula":
      case "PlutoTV":
      case "Paramount+":
      case "Discovery+Ph":
        m.OPTION.LANGUAGE = `${s} (${r}/${c})`;
        break;
      case "Max":
      case "HBOMax":
      case "Viki":
      default:
        m.OPTION.LANGUAGE = r;
        break;
      case "MUBI":
        m.OPTION.LANGUAGE = `${s} (${r}/${c})`;
        if (!l) {
          m.OPTION.NAME = o;
        }
    }
    m.OPTION["ASSOC-LANGUAGE"] = c;
    let d = m.OPTION.URI.includes("?") ? "&" : "?";
    m.OPTION.URI += `${d}subtype=${s}`;
    m.OPTION.AUTOSELECT = "YES";
    if (!l) {
      m.OPTION.DEFAULT = "YES";
    }
    a.log("✅ Set DualSubs Subtitle Option", `newOption: ${JSON.stringify(m)}`);
    return m;
  }
  function c(e = "", a = "") {
    let t = "";
    switch (true) {
      case a.startsWith("https://") || a.startsWith("http://"):
        t = a;
        break;
      case a.startsWith("/"):
        t = e.match(/^(https?:\/\/(?:[^/]+))/i)?.[0] + a;
        break;
      default:
        t = e.match(/^(https?:\/\/(?:[^?]+)\/)/i)?.[0] + a;
    }
    return t;
  }
  class m {
    constructor(e = "application/x-mpegURL", t = "Universal") {
      this.Name = "AttrList";
      this.Version = "1.0.7";
      this.format = e;
      this.platform = t;
      a.log(`🟧 ${this.Name} v${this.Version}`, `format: ${this.format}`, `platform: ${this.platform}`);
    }
    get(e = "", t = [], s = "", n = []) {
      a.log("☑️ Get Attribute List", `type: ${s}`, `langCodes: ${n}`);
      let l = [];
      switch (this.format) {
        case "application/x-mpegURL":
        case "application/x-mpegurl":
        case "application/vnd.apple.mpegurl":
        case "audio/mpegurl":
          {
            let g = t.filter(e => e?.TAG === "#EXT-X-MEDIA").filter(e => e?.OPTION?.TYPE === s).filter(e => e?.OPTION?.FORCED !== "YES");
            for (let e of n) {
              a.debug(`for (let ${e} of langcodes)`);
              if ((l = g.filter(a => a?.OPTION?.LANGUAGE?.toLowerCase() === e?.toLowerCase())).length !== 0) {
                break;
              }
            }
            l = l.map(a => {
              a.URL = c(e, a?.OPTION?.URI ?? null);
              return a;
            });
            break;
          }
        case "text/json":
        case "application/json":
          if (this.platform === "PrimeVideo") {
            let e = t?.[s] ?? [];
            for (let t of n) {
              a.debug(`for (let ${t} of langcodes)`);
              if ((l = e.filter(e => e?.languageCode?.toLowerCase() === t?.toLowerCase())).length !== 0) {
                break;
              }
            }
            l = l.map(e => {
              e.URL = e.url;
              return e;
            });
          }
      }
      a.log("✅ Get Attribute List");
      return l;
    }
    set(e = [], t = {}, s = [], n = [], l = true, g = "iPhone") {
      s = l === true ? s : s.reverse();
      let o = t?.[n?.[0]];
      let i = t?.[n?.[1]];
      a.log("☑️ Set Attribute List", `types: ${s}`);
      switch (this.format) {
        case "application/x-mpegURL":
        case "application/x-mpegurl":
        case "application/vnd.apple.mpegurl":
        case "audio/mpegurl":
          o?.forEach(t => {
            let o = e.findIndex(e => e?.OPTION?.URI === t.OPTION.URI);
            s.forEach(s => {
              let r;
              a.debug(`type: ${s}`);
              switch (s) {
                case "Official":
                  i?.forEach(e => {
                    if (t?.OPTION?.["GROUP-ID"] === e?.OPTION?.["GROUP-ID"]) {
                      switch (this.platform) {
                        case "Apple":
                        case "Max":
                          if (t?.OPTION.CHARACTERISTICS === e?.OPTION.CHARACTERISTICS) {
                            r = u(t, e, s, this.platform, l, g);
                          }
                          break;
                        default:
                          r = u(t, e, s, this.platform, l, g);
                      }
                    }
                  });
                  break;
                case "Translate":
                case "External":
                  r = u(t, {
                    OPTION: {
                      TYPE: "SUBTITLES",
                      NAME: i?.[0]?.OPTION?.NAME ?? n[1].toLowerCase(),
                      LANGUAGE: i?.[0]?.OPTION?.LANGUAGE ?? n[1].toLowerCase()
                    }
                  }, s, this.platform, l, g);
                  r.OPTION.URI += `&lang=${t?.OPTION?.LANGUAGE?.toUpperCase()}`;
              }
              if (r) {
                if (l) {
                  e.splice(o + 1, 0, r);
                } else {
                  e.splice(o, 1, r);
                }
              }
            });
          });
          break;
        case "text/json":
        case "application/json":
          if (this.platform === "PrimeVideo") {
            o?.forEach(t => {
              let g = e.findIndex(e => e?.timedTextTrackId === t.timedTextTrackId);
              s.forEach(s => {
                let o;
                a.debug(`type: ${s}`);
                switch (s) {
                  case "Official":
                    i?.forEach(e => {
                      if (t.trackGroupId === e.trackGroupId) {
                        (o = JSON.parse(JSON.stringify(t))).displayName = `${s} (${t.displayName}/${e.displayName})`;
                        o.languageCode = `${t.languageCode}/${e.languageCode}_${s}`;
                        o.timedTextTrackId = `${t.timedTextTrackId}_${s}`;
                        let a = o.url.includes("?") ? "&" : "?";
                        o.url += `${a}subtype=${s}`;
                        o.url += `&lang=${n[0]}`;
                      }
                    });
                    break;
                  case "Translate":
                  case "External":
                    {
                      (o = JSON.parse(JSON.stringify(t))).displayName = `${s} (${t.displayName}/${n[1]})`;
                      o.languageCode = `${t.languageCode}/${n[1].toLowerCase()}_${s}`;
                      o.timedTextTrackId = `${t.timedTextTrackId}_${s}`;
                      let e = t.url.includes("?") ? "&" : "?";
                      o.url += `${e}subtype=${s}`;
                      o.url += `&lang=${t.languageCode.toUpperCase()}`;
                    }
                }
                if (o) {
                  e.splice(g + +!!l, 0, o);
                }
              });
            });
          }
      }
      a.log("✅ Set Attribute List");
      return e;
    }
  }
  let d = {
    Universal: {
      Settings: {
        Types: ["Official", "Translate"],
        Languages: ["AUTO", "ZH"]
      },
      Configs: {
        Languages: {
          AUTO: ["en", "en-US", "eng", "en-GB", "en-UK", "en-CA", "en-US SDH", "ja", "ja-JP", "jpn", "ko", "ko-KR", "kor", "pt", "pt-PT", "pt-BR", "por"],
          AR: ["ar", "ar-001"],
          BG: ["bg", "bg-BG", "bul"],
          CS: ["cs", "cs-CZ", "ces"],
          DA: ["da", "da-DK", "dan"],
          DE: ["de", "de-DE", "deu"],
          EL: ["el", "el-GR", "ell"],
          EN: ["en", "en-US", "eng", "en-GB", "en-UK", "en-CA", "en-US SDH"],
          "EN-CA": ["en-CA", "en", "eng"],
          "EN-GB": ["en-UK", "en", "eng"],
          "EN-US": ["en-US", "en", "eng"],
          "EN-US SDH": ["en-US SDH", "en-US", "en", "eng"],
          ES: ["es", "es-419", "es-ES", "spa", "es-419 SDH"],
          "ES-419": ["es-419", "es", "spa"],
          "ES-419 SDH": ["es-419 SDH", "es-419", "es", "spa"],
          "ES-ES": ["es-ES", "es", "spa"],
          ET: ["et", "et-EE", "est"],
          FI: ["fi", "fi-FI", "fin"],
          FR: ["fr", "fr-CA", "fr-FR", "fra"],
          "FR-CA": ["fr-CA", "fr", "fra"],
          "FR-DR": ["fr-FR", "fr", "fra"],
          HU: ["hu", "hu-HU", "hun"],
          ID: ["id", "id-id"],
          IT: ["it", "it-IT", "ita"],
          JA: ["ja", "ja-JP", "jpn"],
          KO: ["ko", "ko-KR", "kor"],
          LT: ["lt", "lt-LT", "lit"],
          LV: ["lv", "lv-LV", "lav"],
          NL: ["nl", "nl-NL", "nld"],
          NO: ["no", "nb-NO", "nor"],
          PL: ["pl", "pl-PL"],
          PT: ["pt", "pt-PT", "pt-BR", "por"],
          "PT-PT": ["pt-PT", "pt", "por"],
          "PT-BR": ["pt-BR", "pt", "por"],
          RO: ["ro", "ro-RO", "ron"],
          RU: ["ru", "ru-RU", "rus"],
          SK: ["sk", "sk-SK", "slk"],
          SL: ["sl", "sl-SI", "slv"],
          SV: ["sv", "sv-SE", "swe"],
          IS: ["is", "is-IS", "isl"],
          ZH: ["zh", "cmn", "zho", "zh-CN", "zh-Hans", "zh-Hans-SG", "cmn-Hans", "zh-TW", "zh-Hant", "zh-Hant-TW", "cmn-Hant", "zh-HK", "yue-Hant", "yue"],
          "ZH-CN": ["zh-CN", "zh-Hans", "cmn-Hans", "zh-Hans-SG", "zho"],
          "ZH-HANS": ["zh-Hans", "zh-Hans-SG", "cmn-Hans", "zh-CN", "zho"],
          "ZH-HK": ["zh-HK", "yue-Hant", "yue", "zho"],
          "ZH-TW": ["zh-TW", "zh-Hant-TW", "zh-Hant", "cmn-Hant", "zho"],
          "ZH-HANT": ["zh-Hant", "zh-Hant-TW", "cmn-Hant", "zh-TW", "zho"],
          YUE: ["yue", "yue-Hant", "zh-HK", "zho"],
          "YUE-HK": ["yue-Hant", "yue", "zh-HK", "zho"]
        }
      }
    },
    YouTube: {
      Settings: {
        Type: "Official",
        Types: ["Translate", "External"],
        Languages: ["AUTO", "ZH"],
        AutoCC: true,
        ShowOnly: false
      },
      Configs: {
        Languages: {
          BG: "bg-BG",
          CS: "cs",
          DA: "da-DK",
          DE: "de",
          EL: "el",
          EN: "en",
          "EN-GB": "en-GB",
          "EN-US": "en-US",
          "EN-US SDH": "en-US SDH",
          ES: "es",
          "ES-419": "es-419",
          "ES-ES": "es-ES",
          ET: "et-EE",
          FI: "fi",
          FR: "fr",
          HU: "hu-HU",
          ID: "id",
          IS: "is-IS",
          IT: "it",
          JA: "ja",
          KO: "ko",
          LT: "lt-LT",
          LV: "lv-LV",
          NL: "nl-NL",
          NO: "nb-NO",
          PL: "pl-PL",
          PT: "pt",
          "PT-PT": "pt-PT",
          "PT-BR": "pt-BR",
          RO: "ro-RO",
          RU: "ru-RU",
          SK: "sk-SK",
          SL: "sl-SI",
          SV: "sv-SE",
          YUE: "yue",
          "YUE-HK": "yue-HK",
          ZH: "zh",
          "ZH-HANS": "zh-Hans",
          "ZH-HK": "zh-Hant-HK",
          "ZH-HANT": "zh-Hant",
          "ZH-TW": "zh-TW"
        },
        translationLanguages: {
          DESKTOP: [{
            languageCode: "sq",
            languageName: {
              simpleText: "Shqip - 阿尔巴尼亚语"
            }
          }, {
            languageCode: "ak",
            languageName: {
              simpleText: "Ákán - 阿肯语"
            }
          }, {
            languageCode: "ar",
            languageName: {
              simpleText: "العربية - 阿拉伯语"
            }
          }, {
            languageCode: "am",
            languageName: {
              simpleText: "አማርኛ - 阿姆哈拉语"
            }
          }, {
            languageCode: "as",
            languageName: {
              simpleText: "অসমীয়া - 阿萨姆语"
            }
          }, {
            languageCode: "az",
            languageName: {
              simpleText: "آذربايجان ديلی - 阿塞拜疆语"
            }
          }, {
            languageCode: "ee",
            languageName: {
              simpleText: "Èʋegbe - 埃维语"
            }
          }, {
            languageCode: "ay",
            languageName: {
              simpleText: "Aymar aru - 艾马拉语"
            }
          }, {
            languageCode: "ga",
            languageName: {
              simpleText: "Gaeilge - 爱尔兰语"
            }
          }, {
            languageCode: "et",
            languageName: {
              simpleText: "Eesti - 爱沙尼亚语"
            }
          }, {
            languageCode: "or",
            languageName: {
              simpleText: "ଓଡ଼ିଆ - 奥里亚语"
            }
          }, {
            languageCode: "om",
            languageName: {
              simpleText: "Afaan Oromoo - 奥罗莫语"
            }
          }, {
            languageCode: "eu",
            languageName: {
              simpleText: "Euskara - 巴斯克语"
            }
          }, {
            languageCode: "be",
            languageName: {
              simpleText: "Беларуская - 白俄罗斯语"
            }
          }, {
            languageCode: "bg",
            languageName: {
              simpleText: "Български - 保加利亚语"
            }
          }, {
            languageCode: "nso",
            languageName: {
              simpleText: "Sesotho sa Leboa - 北索托语"
            }
          }, {
            languageCode: "is",
            languageName: {
              simpleText: "Íslenska - 冰岛语"
            }
          }, {
            languageCode: "pl",
            languageName: {
              simpleText: "Polski - 波兰语"
            }
          }, {
            languageCode: "bs",
            languageName: {
              simpleText: "Bosanski - 波斯尼亚语"
            }
          }, {
            languageCode: "fa",
            languageName: {
              simpleText: "فارسی - 波斯语"
            }
          }, {
            languageCode: "bho",
            languageName: {
              simpleText: "भोजपुरी - 博杰普尔语"
            }
          }, {
            languageCode: "ts",
            languageName: {
              simpleText: "Xitsonga - 聪加语"
            }
          }, {
            languageCode: "tt",
            languageName: {
              simpleText: "Татарча - 鞑靼语"
            }
          }, {
            languageCode: "da",
            languageName: {
              simpleText: "Dansk - 丹麦语"
            }
          }, {
            languageCode: "de",
            languageName: {
              simpleText: "Deutsch - 德语"
            }
          }, {
            languageCode: "dv",
            languageName: {
              simpleText: "ދިވެހިބަސް - 迪维希语"
            }
          }, {
            languageCode: "ru",
            languageName: {
              simpleText: "Русский - 俄语"
            }
          }, {
            languageCode: "fr",
            languageName: {
              simpleText: "français - 法语"
            }
          }, {
            languageCode: "sa",
            languageName: {
              simpleText: "संस्कृतम् - 梵语"
            }
          }, {
            languageCode: "fil",
            languageName: {
              simpleText: "Filipino - 菲律宾语"
            }
          }, {
            languageCode: "fi",
            languageName: {
              simpleText: "suomi - 芬兰语"
            }
          }, {
            languageCode: "km",
            languageName: {
              simpleText: "ភាសាខ្មែរ - 高棉语"
            }
          }, {
            languageCode: "ka",
            languageName: {
              simpleText: "ქართული - 格鲁吉亚语"
            }
          }, {
            languageCode: "gu",
            languageName: {
              simpleText: "ગુજરાતી - 古吉拉特语"
            }
          }, {
            languageCode: "gn",
            languageName: {
              simpleText: "Avañe'ẽ - 瓜拉尼语"
            }
          }, {
            languageCode: "kk",
            languageName: {
              simpleText: "Қазақ тілі - 哈萨克语"
            }
          }, {
            languageCode: "ht",
            languageName: {
              simpleText: "Kreyòl ayisyen - 海地克里奥尔语"
            }
          }, {
            languageCode: "ko",
            languageName: {
              simpleText: "한국어 - 韩语"
            }
          }, {
            languageCode: "ha",
            languageName: {
              simpleText: "هَوُسَ - 豪萨语"
            }
          }, {
            languageCode: "nl",
            languageName: {
              simpleText: "Nederlands - 荷兰语"
            }
          }, {
            languageCode: "gl",
            languageName: {
              simpleText: "Galego - 加利西亚语"
            }
          }, {
            languageCode: "ca",
            languageName: {
              simpleText: "català - 加泰罗尼亚语"
            }
          }, {
            languageCode: "cs",
            languageName: {
              simpleText: "čeština - 捷克语"
            }
          }, {
            languageCode: "kn",
            languageName: {
              simpleText: "ಕನ್ನಡ - 卡纳达语"
            }
          }, {
            languageCode: "ky",
            languageName: {
              simpleText: "кыргыз тили - 吉尔吉斯语"
            }
          }, {
            languageCode: "xh",
            languageName: {
              simpleText: "isiXhosa - 科萨语"
            }
          }, {
            languageCode: "co",
            languageName: {
              simpleText: "corsu - 科西嘉语"
            }
          }, {
            languageCode: "hr",
            languageName: {
              simpleText: "hrvatski - 克罗地亚语"
            }
          }, {
            languageCode: "qu",
            languageName: {
              simpleText: "Runa Simi - 克丘亚语"
            }
          }, {
            languageCode: "ku",
            languageName: {
              simpleText: "Kurdî - 库尔德语"
            }
          }, {
            languageCode: "la",
            languageName: {
              simpleText: "lingua latīna - 拉丁语"
            }
          }, {
            languageCode: "lv",
            languageName: {
              simpleText: "latviešu valoda - 拉脱维亚语"
            }
          }, {
            languageCode: "lo",
            languageName: {
              simpleText: "ພາສາລາວ - 老挝语"
            }
          }, {
            languageCode: "lt",
            languageName: {
              simpleText: "lietuvių kalba - 立陶宛语"
            }
          }, {
            languageCode: "ln",
            languageName: {
              simpleText: "lingála - 林加拉语"
            }
          }, {
            languageCode: "lg",
            languageName: {
              simpleText: "Luganda - 卢干达语"
            }
          }, {
            languageCode: "lb",
            languageName: {
              simpleText: "Lëtzebuergesch - 卢森堡语"
            }
          }, {
            languageCode: "rw",
            languageName: {
              simpleText: "Kinyarwanda - 卢旺达语"
            }
          }, {
            languageCode: "ro",
            languageName: {
              simpleText: "Română - 罗马尼亚语"
            }
          }, {
            languageCode: "mt",
            languageName: {
              simpleText: "Malti - 马耳他语"
            }
          }, {
            languageCode: "mr",
            languageName: {
              simpleText: "मराठी - 马拉地语"
            }
          }, {
            languageCode: "mg",
            languageName: {
              simpleText: "Malagasy - 马拉加斯语"
            }
          }, {
            languageCode: "ml",
            languageName: {
              simpleText: "മലയാളം - 马拉雅拉姆语"
            }
          }, {
            languageCode: "ms",
            languageName: {
              simpleText: "bahasa Melayu - 马来语"
            }
          }, {
            languageCode: "mk",
            languageName: {
              simpleText: "македонски јазик - 马其顿语"
            }
          }, {
            languageCode: "mi",
            languageName: {
              simpleText: "te reo Māori - 毛利语"
            }
          }, {
            languageCode: "mn",
            languageName: {
              simpleText: "Монгол хэл - 蒙古语"
            }
          }, {
            languageCode: "bn",
            languageName: {
              simpleText: "বাংলা - 孟加拉语"
            }
          }, {
            languageCode: "my",
            languageName: {
              simpleText: "ဗမာစာ - 缅甸语"
            }
          }, {
            languageCode: "hmn",
            languageName: {
              simpleText: "Hmoob - 苗语"
            }
          }, {
            languageCode: "af",
            languageName: {
              simpleText: "Afrikaans - 南非荷兰语"
            }
          }, {
            languageCode: "st",
            languageName: {
              simpleText: "Sesotho - 南索托语"
            }
          }, {
            languageCode: "ne",
            languageName: {
              simpleText: "नेपाली - 尼泊尔语"
            }
          }, {
            languageCode: "no",
            languageName: {
              simpleText: "Norsk - 挪威语"
            }
          }, {
            languageCode: "pa",
            languageName: {
              simpleText: "ਪੰਜਾਬੀ - 旁遮普语"
            }
          }, {
            languageCode: "pt",
            languageName: {
              simpleText: "Português - 葡萄牙语"
            }
          }, {
            languageCode: "ps",
            languageName: {
              simpleText: "پښتو - 普什图语"
            }
          }, {
            languageCode: "ny",
            languageName: {
              simpleText: "chiCheŵa - 齐切瓦语"
            }
          }, {
            languageCode: "ja",
            languageName: {
              simpleText: "日本語 - 日语"
            }
          }, {
            languageCode: "sv",
            languageName: {
              simpleText: "Svenska - 瑞典语"
            }
          }, {
            languageCode: "sm",
            languageName: {
              simpleText: "Gagana fa'a Samoa - 萨摩亚语"
            }
          }, {
            languageCode: "sr",
            languageName: {
              simpleText: "Српски језик - 塞尔维亚语"
            }
          }, {
            languageCode: "si",
            languageName: {
              simpleText: "සිංහල - 僧伽罗语"
            }
          }, {
            languageCode: "sn",
            languageName: {
              simpleText: "ChiShona - 绍纳语"
            }
          }, {
            languageCode: "eo",
            languageName: {
              simpleText: "Esperanto - 世界语"
            }
          }, {
            languageCode: "sk",
            languageName: {
              simpleText: "slovenčina - 斯洛伐克语"
            }
          }, {
            languageCode: "sl",
            languageName: {
              simpleText: "slovenščina - 斯洛文尼亚语"
            }
          }, {
            languageCode: "sw",
            languageName: {
              simpleText: "Kiswahili - 斯瓦希里语"
            }
          }, {
            languageCode: "gd",
            languageName: {
              simpleText: "Gàidhlig - 苏格兰盖尔语"
            }
          }, {
            languageCode: "ceb",
            languageName: {
              simpleText: "Binisaya - 宿务语"
            }
          }, {
            languageCode: "so",
            languageName: {
              simpleText: "Soomaaliga - 索马里语"
            }
          }, {
            languageCode: "tg",
            languageName: {
              simpleText: "тоҷикӣ - 塔吉克语"
            }
          }, {
            languageCode: "te",
            languageName: {
              simpleText: "తెలుగు - 泰卢固语"
            }
          }, {
            languageCode: "ta",
            languageName: {
              simpleText: "தமிழ் - 泰米尔语"
            }
          }, {
            languageCode: "th",
            languageName: {
              simpleText: "ไทย - 泰语"
            }
          }, {
            languageCode: "ti",
            languageName: {
              simpleText: "ትግርኛ - 提格利尼亚语"
            }
          }, {
            languageCode: "tr",
            languageName: {
              simpleText: "Türkçe - 土耳其语"
            }
          }, {
            languageCode: "tk",
            languageName: {
              simpleText: "Türkmen - 土库曼语"
            }
          }, {
            languageCode: "cy",
            languageName: {
              simpleText: "Cymraeg - 威尔士语"
            }
          }, {
            languageCode: "ug",
            languageName: {
              simpleText: "ئۇيغۇرچە - 维吾尔语"
            }
          }, {
            languageCode: "und",
            languageName: {
              simpleText: "Unknown - 未知语言"
            }
          }, {
            languageCode: "ur",
            languageName: {
              simpleText: "اردو - 乌尔都语"
            }
          }, {
            languageCode: "uk",
            languageName: {
              simpleText: "українська - 乌克兰语"
            }
          }, {
            languageCode: "uz",
            languageName: {
              simpleText: "O'zbek - 乌兹别克语"
            }
          }, {
            languageCode: "es",
            languageName: {
              simpleText: "Español - 西班牙语"
            }
          }, {
            languageCode: "fy",
            languageName: {
              simpleText: "Frysk - 西弗里西亚语"
            }
          }, {
            languageCode: "iw",
            languageName: {
              simpleText: "עברית - 希伯来语"
            }
          }, {
            languageCode: "el",
            languageName: {
              simpleText: "Ελληνικά - 希腊语"
            }
          }, {
            languageCode: "haw",
            languageName: {
              simpleText: "ʻŌlelo Hawaiʻi - 夏威夷语"
            }
          }, {
            languageCode: "sd",
            languageName: {
              simpleText: "سنڌي - 信德语"
            }
          }, {
            languageCode: "hu",
            languageName: {
              simpleText: "magyar - 匈牙利语"
            }
          }, {
            languageCode: "su",
            languageName: {
              simpleText: "Basa Sunda - 巽他语"
            }
          }, {
            languageCode: "hy",
            languageName: {
              simpleText: "հայերեն - 亚美尼亚语"
            }
          }, {
            languageCode: "ig",
            languageName: {
              simpleText: "Igbo - 伊博语"
            }
          }, {
            languageCode: "it",
            languageName: {
              simpleText: "Italiano - 意大利语"
            }
          }, {
            languageCode: "yi",
            languageName: {
              simpleText: "ייִדיש - 意第绪语"
            }
          }, {
            languageCode: "hi",
            languageName: {
              simpleText: "हिन्दी - 印地语"
            }
          }, {
            languageCode: "id",
            languageName: {
              simpleText: "Bahasa Indonesia - 印度尼西亚语"
            }
          }, {
            languageCode: "en",
            languageName: {
              simpleText: "English - 英语"
            }
          }, {
            languageCode: "yo",
            languageName: {
              simpleText: "Yorùbá - 约鲁巴语"
            }
          }, {
            languageCode: "vi",
            languageName: {
              simpleText: "Tiếng Việt - 越南语"
            }
          }, {
            languageCode: "jv",
            languageName: {
              simpleText: "Basa Jawa - 爪哇语"
            }
          }, {
            languageCode: "zh-Hant",
            languageName: {
              simpleText: "中文（繁體）- 中文（繁体）"
            }
          }, {
            languageCode: "zh-Hans",
            languageName: {
              simpleText: "中文（简体）"
            }
          }, {
            languageCode: "zu",
            languageName: {
              simpleText: "isiZulu - 祖鲁语"
            }
          }, {
            languageCode: "kri",
            languageName: {
              simpleText: "Krìì - 克里语"
            }
          }],
          MOBILE: [{
            languageCode: "sq",
            languageName: {
              runs: [{
                text: "Shqip - 阿尔巴尼亚语"
              }]
            }
          }, {
            languageCode: "ak",
            languageName: {
              runs: [{
                text: "Ákán - 阿肯语"
              }]
            }
          }, {
            languageCode: "ar",
            languageName: {
              runs: [{
                text: "العربية - 阿拉伯语"
              }]
            }
          }, {
            languageCode: "am",
            languageName: {
              runs: [{
                text: "አማርኛ - 阿姆哈拉语"
              }]
            }
          }, {
            languageCode: "as",
            languageName: {
              runs: [{
                text: "অসমীয়া - 阿萨姆语"
              }]
            }
          }, {
            languageCode: "az",
            languageName: {
              runs: [{
                text: "Azərbaycanca - 阿塞拜疆语"
              }]
            }
          }, {
            languageCode: "ee",
            languageName: {
              runs: [{
                text: "Eʋegbe - 埃维语"
              }]
            }
          }, {
            languageCode: "ay",
            languageName: {
              runs: [{
                text: "Aymar - 艾马拉语"
              }]
            }
          }, {
            languageCode: "ga",
            languageName: {
              runs: [{
                text: "Gaeilge - 爱尔兰语"
              }]
            }
          }, {
            languageCode: "et",
            languageName: {
              runs: [{
                text: "Eesti - 爱沙尼亚语"
              }]
            }
          }, {
            languageCode: "or",
            languageName: {
              runs: [{
                text: "ଓଡ଼ିଆ - 奥里亚语"
              }]
            }
          }, {
            languageCode: "om",
            languageName: {
              runs: [{
                text: "Oromoo - 奥罗莫语"
              }]
            }
          }, {
            languageCode: "eu",
            languageName: {
              runs: [{
                text: "Euskara - 巴斯克语"
              }]
            }
          }, {
            languageCode: "be",
            languageName: {
              runs: [{
                text: "Беларуская - 白俄罗斯语"
              }]
            }
          }, {
            languageCode: "bg",
            languageName: {
              runs: [{
                text: "Български - 保加利亚语"
              }]
            }
          }, {
            languageCode: "nso",
            languageName: {
              runs: [{
                text: "Sesotho sa Leboa - 北索托语"
              }]
            }
          }, {
            languageCode: "is",
            languageName: {
              runs: [{
                text: "Íslenska - 冰岛语"
              }]
            }
          }, {
            languageCode: "pl",
            languageName: {
              runs: [{
                text: "Polski - 波兰语"
              }]
            }
          }, {
            languageCode: "bs",
            languageName: {
              runs: [{
                text: "Bosanski - 波斯尼亚语"
              }]
            }
          }, {
            languageCode: "fa",
            languageName: {
              runs: [{
                text: "فارسی - 波斯语"
              }]
            }
          }, {
            languageCode: "bho",
            languageName: {
              runs: [{
                text: "भोजपुरी - 博杰普尔语"
              }]
            }
          }, {
            languageCode: "ts",
            languageName: {
              runs: [{
                text: "Xitsonga - 聪加语"
              }]
            }
          }, {
            languageCode: "tt",
            languageName: {
              runs: [{
                text: "Татарча - 鞑靼语"
              }]
            }
          }, {
            languageCode: "da",
            languageName: {
              runs: [{
                text: "Dansk - 丹麦语"
              }]
            }
          }, {
            languageCode: "de",
            languageName: {
              runs: [{
                text: "Deutsch - 德语"
              }]
            }
          }, {
            languageCode: "dv",
            languageName: {
              runs: [{
                text: "ދިވެހިބަސް - 迪维希语"
              }]
            }
          }, {
            languageCode: "ru",
            languageName: {
              runs: [{
                text: "Русский - 俄语"
              }]
            }
          }, {
            languageCode: "fr",
            languageName: {
              runs: [{
                text: "Français - 法语"
              }]
            }
          }, {
            languageCode: "sa",
            languageName: {
              runs: [{
                text: "संस्कृतम् - 梵语"
              }]
            }
          }, {
            languageCode: "fil",
            languageName: {
              runs: [{
                text: "Filipino - 菲律宾语"
              }]
            }
          }, {
            languageCode: "fi",
            languageName: {
              runs: [{
                text: "Suomi - 芬兰语"
              }]
            }
          }, {
            languageCode: "km",
            languageName: {
              runs: [{
                text: "ភាសាខ្មែរ - 高棉语"
              }]
            }
          }, {
            languageCode: "ka",
            languageName: {
              runs: [{
                text: "ქართული - 格鲁吉亚语"
              }]
            }
          }, {
            languageCode: "gu",
            languageName: {
              runs: [{
                text: "ગુજરાતી - 古吉拉特语"
              }]
            }
          }, {
            languageCode: "gn",
            languageName: {
              runs: [{
                text: "Avañe'ẽ - 瓜拉尼语"
              }]
            }
          }, {
            languageCode: "kk",
            languageName: {
              runs: [{
                text: "Қазақ тілі - 哈萨克语"
              }]
            }
          }, {
            languageCode: "ht",
            languageName: {
              runs: [{
                text: "海地克里奥尔语"
              }]
            }
          }, {
            languageCode: "ko",
            languageName: {
              runs: [{
                text: "한국말 - 韩语"
              }]
            }
          }, {
            languageCode: "ha",
            languageName: {
              runs: [{
                text: "هَوُسَ - 豪萨语"
              }]
            }
          }, {
            languageCode: "nl",
            languageName: {
              runs: [{
                text: "Nederlands - 荷兰语"
              }]
            }
          }, {
            languageCode: "gl",
            languageName: {
              runs: [{
                text: "Galego - 加利西亚语"
              }]
            }
          }, {
            languageCode: "ca",
            languageName: {
              runs: [{
                text: "Català - 加泰罗尼亚语"
              }]
            }
          }, {
            languageCode: "cs",
            languageName: {
              runs: [{
                text: "Čeština - 捷克语"
              }]
            }
          }, {
            languageCode: "kn",
            languageName: {
              runs: [{
                text: "ಕನ್ನಡ - 卡纳达语"
              }]
            }
          }, {
            languageCode: "ky",
            languageName: {
              runs: [{
                text: "Кыргызча - 吉尔吉斯语"
              }]
            }
          }, {
            languageCode: "xh",
            languageName: {
              runs: [{
                text: "isiXhosa - 科萨语"
              }]
            }
          }, {
            languageCode: "co",
            languageName: {
              runs: [{
                text: "Corsu - 科西嘉语"
              }]
            }
          }, {
            languageCode: "hr",
            languageName: {
              runs: [{
                text: "Hrvatski - 克罗地亚语"
              }]
            }
          }, {
            languageCode: "qu",
            languageName: {
              runs: [{
                text: "Runa Simi - 克丘亚语"
              }]
            }
          }, {
            languageCode: "ku",
            languageName: {
              runs: [{
                text: "Kurdî - 库尔德语"
              }]
            }
          }, {
            languageCode: "la",
            languageName: {
              runs: [{
                text: "lingua latīna - 拉丁语"
              }]
            }
          }, {
            languageCode: "lv",
            languageName: {
              runs: [{
                text: "Latviešu - 拉脱维亚语"
              }]
            }
          }, {
            languageCode: "lo",
            languageName: {
              runs: [{
                text: "ລາວ - 老挝语"
              }]
            }
          }, {
            languageCode: "lt",
            languageName: {
              runs: [{
                text: "Lietuvių - 立陶宛语"
              }]
            }
          }, {
            languageCode: "ln",
            languageName: {
              runs: [{
                text: "Lingála - 林加拉语"
              }]
            }
          }, {
            languageCode: "lg",
            languageName: {
              runs: [{
                text: "Luganda - 卢干达语"
              }]
            }
          }, {
            languageCode: "lb",
            languageName: {
              runs: [{
                text: "Lëtzebuergesch - 卢森堡语"
              }]
            }
          }, {
            languageCode: "rw",
            languageName: {
              runs: [{
                text: "Kinyarwanda - 卢旺达语"
              }]
            }
          }, {
            languageCode: "ro",
            languageName: {
              runs: [{
                text: "Română - 罗马尼亚语"
              }]
            }
          }, {
            languageCode: "mt",
            languageName: {
              runs: [{
                text: "Malti - 马耳他语"
              }]
            }
          }, {
            languageCode: "mr",
            languageName: {
              runs: [{
                text: "मराठी - 马拉地语"
              }]
            }
          }, {
            languageCode: "mg",
            languageName: {
              runs: [{
                text: "Malagasy - 马拉加斯语"
              }]
            }
          }, {
            languageCode: "ml",
            languageName: {
              runs: [{
                text: "മലയാളം - 马拉雅拉姆语"
              }]
            }
          }, {
            languageCode: "ms",
            languageName: {
              runs: [{
                text: "Bahasa Melayu - 马来语"
              }]
            }
          }, {
            languageCode: "mk",
            languageName: {
              runs: [{
                text: "македонски - 马其顿语"
              }]
            }
          }, {
            languageCode: "mi",
            languageName: {
              runs: [{
                text: "Māori - 毛利语"
              }]
            }
          }, {
            languageCode: "mn",
            languageName: {
              runs: [{
                text: "Монгол - 蒙古语"
              }]
            }
          }, {
            languageCode: "bn",
            languageName: {
              runs: [{
                text: "বাংলা - 孟加拉语"
              }]
            }
          }, {
            languageCode: "my",
            languageName: {
              runs: [{
                text: "ဗမာစာ - 缅甸语"
              }]
            }
          }, {
            languageCode: "hmn",
            languageName: {
              runs: [{
                text: "Hmoob - 苗语"
              }]
            }
          }, {
            languageCode: "af",
            languageName: {
              runs: [{
                text: "Afrikaans - 南非荷兰语"
              }]
            }
          }, {
            languageCode: "st",
            languageName: {
              runs: [{
                text: "Sesotho - 南索托语"
              }]
            }
          }, {
            languageCode: "ne",
            languageName: {
              runs: [{
                text: "नेपाली - 尼泊尔语"
              }]
            }
          }, {
            languageCode: "no",
            languageName: {
              runs: [{
                text: "Norsk - 挪威语"
              }]
            }
          }, {
            languageCode: "pa",
            languageName: {
              runs: [{
                text: "ਪੰਜਾਬੀ - 旁遮普语"
              }]
            }
          }, {
            languageCode: "pt",
            languageName: {
              runs: [{
                text: "Português - 葡萄牙语"
              }]
            }
          }, {
            languageCode: "ps",
            languageName: {
              runs: [{
                text: "پښتو - 普什图语"
              }]
            }
          }, {
            languageCode: "ny",
            languageName: {
              runs: [{
                text: "chiCheŵa - 齐切瓦语"
              }]
            }
          }, {
            languageCode: "ja",
            languageName: {
              runs: [{
                text: "日本語 - 日语"
              }]
            }
          }, {
            languageCode: "sv",
            languageName: {
              runs: [{
                text: "Svenska - 瑞典语"
              }]
            }
          }, {
            languageCode: "sm",
            languageName: {
              runs: [{
                text: "Gagana Samoa - 萨摩亚语"
              }]
            }
          }, {
            languageCode: "sr",
            languageName: {
              runs: [{
                text: "Српски језик - 塞尔维亚语"
              }]
            }
          }, {
            languageCode: "si",
            languageName: {
              runs: [{
                text: "සිංහල - 僧伽罗语"
              }]
            }
          }, {
            languageCode: "sn",
            languageName: {
              runs: [{
                text: "ChiShona - 绍纳语"
              }]
            }
          }, {
            languageCode: "eo",
            languageName: {
              runs: [{
                text: "Esperanto - 世界语"
              }]
            }
          }, {
            languageCode: "sk",
            languageName: {
              runs: [{
                text: "Slovenčina - 斯洛伐克语"
              }]
            }
          }, {
            languageCode: "sl",
            languageName: {
              runs: [{
                text: "Slovenščina - 斯洛文尼亚语"
              }]
            }
          }, {
            languageCode: "sw",
            languageName: {
              runs: [{
                text: "Kiswahili - 斯瓦希里语"
              }]
            }
          }, {
            languageCode: "gd",
            languageName: {
              runs: [{
                text: "Gàidhlig - 苏格兰盖尔语"
              }]
            }
          }, {
            languageCode: "ceb",
            languageName: {
              runs: [{
                text: "Cebuano - 宿务语"
              }]
            }
          }, {
            languageCode: "so",
            languageName: {
              runs: [{
                text: "Soomaaliga - 索马里语"
              }]
            }
          }, {
            languageCode: "tg",
            languageName: {
              runs: [{
                text: "тоҷикӣ - 塔吉克语"
              }]
            }
          }, {
            languageCode: "te",
            languageName: {
              runs: [{
                text: "తెలుగు - 泰卢固语"
              }]
            }
          }, {
            languageCode: "ta",
            languageName: {
              runs: [{
                text: "தமிழ் - 泰米尔语"
              }]
            }
          }, {
            languageCode: "th",
            languageName: {
              runs: [{
                text: "ไทย - 泰语"
              }]
            }
          }, {
            languageCode: "ti",
            languageName: {
              runs: [{
                text: "ትግርኛ - 提格利尼亚语"
              }]
            }
          }, {
            languageCode: "tr",
            languageName: {
              runs: [{
                text: "Türkçe - 土耳其语"
              }]
            }
          }, {
            languageCode: "tk",
            languageName: {
              runs: [{
                text: "Türkmen - 土库曼语"
              }]
            }
          }, {
            languageCode: "cy",
            languageName: {
              runs: [{
                text: "Cymraeg - 威尔士语"
              }]
            }
          }, {
            languageCode: "ug",
            languageName: {
              runs: [{
                text: "ئۇيغۇرچە - 维吾尔语"
              }]
            }
          }, {
            languageCode: "und",
            languageName: {
              runs: [{
                text: "Unknown - 未知语言"
              }]
            }
          }, {
            languageCode: "ur",
            languageName: {
              runs: [{
                text: "اردو - 乌尔都语"
              }]
            }
          }, {
            languageCode: "uk",
            languageName: {
              runs: [{
                text: "Українська - 乌克兰语"
              }]
            }
          }, {
            languageCode: "uz",
            languageName: {
              runs: [{
                text: "O‘zbek - 乌兹别克语"
              }]
            }
          }, {
            languageCode: "es",
            languageName: {
              runs: [{
                text: "Español - 西班牙语"
              }]
            }
          }, {
            languageCode: "fy",
            languageName: {
              runs: [{
                text: "Frysk - 西弗里西亚语"
              }]
            }
          }, {
            languageCode: "iw",
            languageName: {
              runs: [{
                text: "עברית - 希伯来语"
              }]
            }
          }, {
            languageCode: "el",
            languageName: {
              runs: [{
                text: "Ελληνικά - 希腊语"
              }]
            }
          }, {
            languageCode: "haw",
            languageName: {
              runs: [{
                text: "ʻŌlelo Hawaiʻi - 夏威夷语"
              }]
            }
          }, {
            languageCode: "sd",
            languageName: {
              runs: [{
                text: "سنڌي - 信德语"
              }]
            }
          }, {
            languageCode: "hu",
            languageName: {
              runs: [{
                text: "Magyar - 匈牙利语"
              }]
            }
          }, {
            languageCode: "su",
            languageName: {
              runs: [{
                text: "Basa Sunda - 巽他语"
              }]
            }
          }, {
            languageCode: "hy",
            languageName: {
              runs: [{
                text: "Հայերեն - 亚美尼亚语"
              }]
            }
          }, {
            languageCode: "ig",
            languageName: {
              runs: [{
                text: "Igbo - 伊博语"
              }]
            }
          }, {
            languageCode: "it",
            languageName: {
              runs: [{
                text: "Italiano - 意大利语"
              }]
            }
          }, {
            languageCode: "yi",
            languageName: {
              runs: [{
                text: "ייִדיש - 意第绪语"
              }]
            }
          }, {
            languageCode: "hi",
            languageName: {
              runs: [{
                text: "हिन्दी - 印地语"
              }]
            }
          }, {
            languageCode: "id",
            languageName: {
              runs: [{
                text: "Bahasa Indonesia - 印度尼西亚语"
              }]
            }
          }, {
            languageCode: "en",
            languageName: {
              runs: [{
                text: "English - 英语"
              }]
            }
          }, {
            languageCode: "yo",
            languageName: {
              runs: [{
                text: "Yorùbá - 约鲁巴语"
              }]
            }
          }, {
            languageCode: "vi",
            languageName: {
              runs: [{
                text: "Tiếng Việt - 越南语"
              }]
            }
          }, {
            languageCode: "jv",
            languageName: {
              runs: [{
                text: "Basa Jawa - 爪哇语"
              }]
            }
          }, {
            languageCode: "zh-Hant",
            languageName: {
              runs: [{
                text: "中文（繁體） - 中文（繁体）"
              }]
            }
          }, {
            languageCode: "zh-Hans",
            languageName: {
              runs: [{
                text: "中文（简体）"
              }]
            }
          }, {
            languageCode: "zu",
            languageName: {
              runs: [{
                text: "isiZulu - 祖鲁语"
              }]
            }
          }, {
            languageCode: "kri",
            languageName: {
              runs: [{
                text: "Krìì - 克里语"
              }]
            }
          }]
        }
      }
    },
    Netflix: {
      Settings: {
        Type: "Translate",
        Languages: ["AUTO", "ZH"]
      },
      Configs: {
        Languages: {
          AR: "ar",
          CS: "cs",
          DA: "da",
          DE: "de",
          EN: "en",
          "EN-GB": "en-GB",
          "EN-US": "en-US",
          "EN-US SDH": "en-US SDH",
          ES: "es",
          "ES-419": "es-419",
          "ES-ES": "es-ES",
          FI: "fi",
          FR: "fr",
          HE: "he",
          HR: "hr",
          HU: "hu",
          ID: "id",
          IT: "it",
          JA: "ja",
          KO: "ko",
          MS: "ms",
          NB: "nb",
          NL: "nl",
          PL: "pl",
          PT: "pt",
          "PT-PT": "pt-PT",
          "PT-BR": "pt-BR",
          RO: "ro",
          RU: "ru",
          SV: "sv",
          TH: "th",
          TR: "tr",
          UK: "uk",
          VI: "vi",
          IS: "is",
          ZH: "zh",
          "ZH-HANS": "zh-Hans",
          "ZH-HK": "zh-HK",
          "ZH-HANT": "zh-Hant"
        }
      }
    },
    Spotify: {
      Settings: {
        Types: ["Translate", "External"],
        Languages: ["AUTO", "ZH"]
      }
    },
    Composite: {
      Settings: {
        CacheSize: 20,
        ShowOnly: false,
        Position: "Reverse",
        Offset: 0,
        Tolerance: 1000
      }
    },
    Translate: {
      Settings: {
        Vendor: "Google",
        ShowOnly: false,
        Position: "Forward",
        CacheSize: 10,
        Method: "Part",
        Times: 3,
        Interval: 500,
        Exponential: true
      }
    },
    External: {
      Settings: {
        SubVendor: "URL",
        LrcVendor: "NeteaseMusic",
        CacheSize: 50
      }
    },
    API: {
      Settings: {
        GoogleCloud: {
          Version: "v2",
          Mode: "Key",
          Auth: ""
        },
        Microsoft: {
          Version: "Azure",
          Mode: "Token",
          Region: "",
          Auth: ""
        },
        DeepL: {
          Version: "Free",
          Auth: ""
        },
        DeepLX: {
          Endpoint: "",
          Auth: ""
        },
        URL: "",
        NeteaseMusic: {
          PhoneNumber: "",
          Password: ""
        }
      }
    },
    Default: {
      Settings: {
        Type: "Translate",
        Types: ["Official", "Translate"],
        Languages: ["EN", "ZH"],
        CacheSize: 50,
        LogLevel: "WARN"
      },
      Configs: {
        breakLine: {
          "text/xml": "&#x000A;",
          "application/xml": "&#x000A;",
          "text/vtt": "\n",
          "application/vtt": "\n",
          "text/json": "\n",
          "application/json": "\n"
        }
      }
    }
  };
  function p(e, t = 100) {
    a.log("☑️ Set Cache", `cacheSize: ${t}`);
    e = (e = Array.from(e || [])).slice(-t);
    a.log("✅ Set Cache");
    return e;
  }
  let h = new i($request.url);
  a.info(`url: ${h.toJSON()}`);
  let N = h.pathname.split("/").filter(Boolean);
  a.info(`PATHs: ${N}`);
  let f = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"])?.split(";")?.[0];
  a.info(`FORMAT: ${f}`);
  let C = function (e) {
    a.log("☑️ Detect Platform");
    let t = "Universal";
    switch (true) {
      case /\.(netflix\.com|nflxvideo\.net)/i.test(e):
        t = "Netflix";
        break;
      case /(\.youtube|youtubei\.googleapis)\.com/i.test(e):
        t = "YouTube";
        break;
      case /\.spotify(cdn)?\.com/i.test(e):
        t = "Spotify";
        break;
      case /\.apple\.com/i.test(e):
        t = "Apple";
        break;
      case /\.(dssott|starott|dssedge)\.com/i.test(e):
        t = "Disney+";
        break;
      case /primevideo\.com|(\.(pv-cdn|aiv-cdn|akamaihd|cloudfront)\.net)|s3\.amazonaws\.com\/aiv-prod-timedtext\//i.test(e):
        t = "PrimeVideo";
        break;
      case /pro?d\.media\.(h264\.io|max\.com)/i.test(e):
        t = "Max";
        break;
      case /\.(api\.hbo|hbomaxcdn)\.com/i.test(e):
        t = "HBOMax";
        break;
      case /\.hulu(stream|im)?\.com/i.test(e):
        t = "Hulu";
        break;
      case /\.(pplus\.paramount\.tech|cbs(aavideo|cbsivideo)?\.com)/i.test(e):
        t = "Paramount+";
        break;
      case /\.uplynk\.com/i.test(e):
        t = "Discovery+";
        break;
      case /dplus-ph-/i.test(e):
        t = "Discovery+Ph";
        break;
      case /\.peacocktv\.com/i.test(e):
        t = "PeacockTV";
        break;
      case /\.fubo\.tv/i.test(e):
        t = "FuboTV";
        break;
      case /\.viki\.io/i.test(e):
        t = "Viki";
        break;
      case /epix(hls\.akamaized\.net|\.services\.io)/i.test(e):
        t = "MGM+";
        break;
      case /\.nebula\.app/i.test(e):
        t = "Nebula";
        break;
      case /\.pluto(\.tv|tv\.net)/i.test(e):
        t = "PlutoTV";
        break;
      case /\.mubicdn\.net/i.test(e):
        t = "MUBI";
    }
    a.log("✅ Detect Platform", `Platform: ${t}`);
    return t;
  }($request.url);
  function T(e, t, s) {
    a.log("☑️ getPlaylistCache", `language: ${s}`);
    let n = "";
    let l = {};
    let g = 0;
    t?.forEach((t, o) => {
      if (Array.isArray(t?.[s])) {
        let i = t?.[s];
        if (i?.some((t, s) => !!e.includes(t?.URI ?? t?.OPTION?.URI ?? null) && (g = s, a.debug(`subtitlesPlaylistIndex: ${g}`), true))) {
          n = o;
          l = t;
        }
      }
    });
    a.log("✅ getPlaylistCache", `masterPlaylistURL: ${JSON.stringify(n)}`);
    return {
      masterPlaylistURL: n,
      subtitlesPlaylist: l,
      subtitlesPlaylistIndex: g
    };
  }
  async function x(e, t, s, n = 0, l = "Universal") {
    a.log("☑️ setSubtitlesCache", `language: ${s}, index: ${n}`);
    await Promise.all(t?.[s]?.map(async (t, s, g) => {
      if (g[n] && s === n || !g[n]) {
        let s = e.get(t.URL) ?? [];
        if (s.length === 0) {
          s = await y(t?.URL, $request.headers, l);
        }
        if (s.length !== 0) {
          e = e.set(t.URL, s);
        }
        a.log("✅ setSubtitlesCache", `val?.URL: ${t?.URL}`);
      }
    }));
    return e;
  }
  async function y(e, t, s) {
    a.log("☑️ Get Subtitle *.vtt *.ttml URLs");
    let l = await n(e, {
      headers: t
    }).then((a, t) => r.parse(a.body).filter(({
      URI: e
    }) => /^.+\.((web)?vtt|ttml2?|xml|smi)(\?.+)?$/.test(e)).filter(({
      URI: e
    }) => !e.includes("empty")).filter(({
      URI: e
    }) => !e.includes("blank")).filter(({
      URI: e
    }) => !e.includes("default")).map(({
      URI: a
    }) => c(e, a)));
    switch (s) {
      case "Disney+":
        if (l.some(e => /\/.+-MAIN\//.test(e))) {
          l = l.filter(e => /\/.+-MAIN\//.test(e));
        }
        break;
      case "PrimeVideo":
        if (l.some(e => /\/aiv-prod-timedtext\//.test(e))) {
          l = l.filter(e => /\/aiv-prod-timedtext\//.test(e));
        }
        l = l.filter((e, a, t) => t.indexOf(e, 0) === a);
    }
    a.log("✅ Get Subtitle *.vtt *.ttml URLs", `subtitles: ${l}`);
    return l;
  }
  a.info(`PLATFORM: ${C}`);
  (async () => {
    let {
      Settings: e,
      Caches: s,
      Configs: n
    } = function (e, s, n) {
      a.log("☑️ Set Environment Variables");
      let {
        Settings: o,
        Caches: i,
        Configs: r
      } = function (e, a, s) {
        a = [a].flat(Infinity);
        let n = {
          Settings: s?.Default?.Settings || {},
          Configs: s?.Default?.Configs || {},
          Caches: {}
        };
        a.forEach(e => {
          n.Settings = {
            ...n.Settings,
            ...s?.[e]?.Settings
          };
          n.Configs = {
            ...n.Configs,
            ...s?.[e]?.Configs
          };
        });
        switch (typeof $argument) {
          case "string":
            $argument = Object.fromEntries($argument.split("&").map(e => e.split("=", 2).map(e => e.replace(/\"/g, ""))));
          case "object":
            {
              let e = {};
              Object.keys($argument).forEach(a => t.set(e, a, $argument[a]));
              n.Settings = {
                ...n.Settings,
                ...e
              };
            }
        }
        let o = l.getItem(e);
        if (o) {
          a.forEach(e => {
            switch (typeof o?.[e]?.Settings) {
              case "string":
                o[e].Settings = JSON.parse(o[e].Settings || "{}");
              case "object":
                n.Settings = {
                  ...n.Settings,
                  ...o[e].Settings
                };
            }
            switch (typeof o?.[e]?.Caches) {
              case "string":
                o[e].Caches = JSON.parse(o[e].Caches || "{}");
              case "object":
                n.Caches = {
                  ...n.Caches,
                  ...o[e].Caches
                };
            }
          });
        }
        (function e(a, t) {
          for (let s in a) {
            let n = a[s];
            a[s] = typeof n == "object" && n !== null ? e(n, t) : t(s, n);
          }
          return a;
        })(n.Settings, (e, a) => {
          if (a === "true" || a === "false") {
            a = JSON.parse(a);
          } else if (typeof a == "string") {
            a = a.includes(",") ? a.split(",").map(e => g(e)) : g(a);
          }
          return a;
        });
        return n;
      }(e, s, n);
      if (!Array.isArray(o?.Types)) {
        o.Types = o.Types ? [o.Types] : [];
      }
      a.info(`typeof Settings: ${typeof o}`, `Settings: ${JSON.stringify(o, null, 2)}`);
      if (typeof i?.Playlists != "object" || Array.isArray(i?.Playlists)) {
        i.Playlists = {};
      }
      i.Playlists.Master = new Map(JSON.parse(i?.Playlists?.Master || "[]"));
      i.Playlists.Subtitle = new Map(JSON.parse(i?.Playlists?.Subtitle || "[]"));
      if (typeof i?.Subtitles != "object") {
        i.Subtitles = new Map(JSON.parse(i?.Subtitles || "[]"));
      }
      if (typeof i?.Metadatas != "object" || Array.isArray(i?.Metadatas)) {
        i.Metadatas = {};
      }
      if (typeof i?.Metadatas?.Tracks != "object") {
        i.Metadatas.Tracks = new Map(JSON.parse(i?.Metadatas?.Tracks || "[]"));
      }
      a.log("✅ Set Environment Variables");
      return {
        Settings: o,
        Caches: i,
        Configs: r
      };
    }("DualSubs", [["YouTube", "Netflix", "BiliBili", "Spotify"].includes(C) ? C : "Universal", "Composite"], d);
    a.logLevel = e.LogLevel;
    let o = new m(f, C);
    let i = h.searchParams?.get("subtype") ?? e.Type;
    let u = [h.searchParams?.get("lang")?.toUpperCase?.() ?? e.Languages[0], (h.searchParams?.get("tlang") ?? s?.tlang)?.toUpperCase?.() ?? e.Languages[1]];
    a.info(`Type: ${i}`, `Languages: ${u}`);
    let {
      standard: c,
      device: N
    } = function (e = new URL(), t = {}, s = "Universal") {
      a.log("☑️ is Standard?");
      let n = t["user-agent"] ?? t["User-Agent"];
      a.debug(`UA: ${n}`);
      let l = n.includes("Mozilla/5.0") ? "Web" : n.includes("iPhone") ? "iPhone" : n.includes("iPad") ? "iPad" : n.includes("Macintosh") ? "Macintosh" : n.includes("AppleTV") || n.includes("Apple TV") ? "AppleTV" : "iPhone";
      switch (s) {
        case "Max":
        case "HBOMax":
          if (t["x-hbo-device-name"]?.includes("ios")) {
            l = "iPhone";
          } else if (e.searchParams.get("device-code") === "iphone") {
            l = "iPhone";
          }
          break;
        case "PeacockTV":
          if (n.includes("PeacockMobile")) {
            l = "iPhone";
          }
      }
      let g = true;
      switch (l) {
        case "iPhone":
        case "iPad":
        case "Macintosh":
          switch (s) {
            case "Max":
            case "HBOMax":
            case "Viki":
            case "PeacockTV":
            case "FuboTV":
            case "MUBI":
              g = false;
              break;
            default:
              g = true;
          }
          break;
        case "Web":
          switch (s) {
            case "Max":
            case "HBOMax":
            case "FuboTV":
            case "TED":
            case "MUBI":
              g = false;
              break;
            default:
              g = true;
          }
          break;
        default:
          switch (s) {
            case "Max":
            case "HBOMax":
              g = false;
              break;
            default:
              g = true;
          }
      }
      a.log("✅ is Standard?", `standard: ${g}`, `device: ${l}`);
      return {
        standard: g,
        device: l
      };
    }(h, $request.headers, C);
    let y = {};
    switch (f) {
      case undefined:
      case "application/x-www-form-urlencoded":
      case "text/plain":
      default:
      case "text/xml":
      case "text/html":
      case "text/plist":
      case "application/xml":
      case "application/plist":
      case "application/x-plist":
      case "text/vtt":
      case "application/vtt":
        break;
      case "application/x-mpegURL":
      case "application/x-mpegurl":
      case "application/vnd.apple.mpegurl":
      case "audio/x-mpegurl":
      case "audio/mpegurl":
        switch (function (e = {}) {
          let t;
          a.log("☑️ detectPlaylist");
          e.forEach(e => {
            switch (e.TAG) {
              case "#EXT-X-MEDIA":
              case "#EXT-X-STREAM-INF":
                t = "Multivariant Playlist";
                break;
              case "#EXT-X-PLAYLIST-TYPE":
              case "EXT-X-TARGETDURATION":
              case "#EXTINF":
                t = "Media Playlist";
            }
          });
          a.log("✅ detectPlaylist", `type: ${t}`);
          return t;
        }(y = r.parse($response.body))) {
          case "Multivariant Playlist":
            {
              let a = s.Playlists.Master.get($request.url) || {};
              a[u[0]] = o.get($request.url, y, "SUBTITLES", n.Languages[u[0]]);
              a[u[1]] = o.get($request.url, y, "SUBTITLES", n.Languages[u[1]]);
              y = o.set(y, a, e.Types, u, c, N);
              s.Playlists.Master.set($request.url, a);
              s.Playlists.Master = p(s.Playlists.Master, e.CacheSize);
              l.setItem("@DualSubs.Composite.Caches.Playlists.Master", s.Playlists.Master);
              break;
            }
          case "Media Playlist":
            switch (i) {
              case "Official":
                {
                  a.info("官方字幕");
                  let {
                    subtitlesPlaylist: t,
                    subtitlesPlaylistIndex: n
                  } = T($request.url, s.Playlists.Master, u[0]) ?? T($request.url, s.Playlists.Master, u[1]);
                  s.Playlists.Subtitle = await x(s.Playlists.Subtitle, t, u[0], n, C);
                  s.Playlists.Subtitle = await x(s.Playlists.Subtitle, t, u[1], n, C);
                  s.Playlists.Subtitle = p(s?.Playlists.Subtitle, e.CacheSize);
                  l.setItem("@DualSubs.Composite.Caches.Playlists.Subtitle", s.Playlists.Subtitle);
                  break;
                }
              case "Translate":
              default:
                a.info("翻译字幕");
                break;
              case "External":
                a.info("外挂字幕");
            }
            y = y.map((e, a) => {
              if (/^.+\.((web)?vtt|ttml2?|xml|smi)(\?.+)?$/.test(e?.URI)) {
                let t = e.URI.includes("?") ? "&" : "?";
                if (!/empty|blank|default/.test(e.URI)) {
                  e.URI += `${t}subtype=${i}`;
                  if (h.searchParams?.has("lang")) {
                    e.URI += `&lang=${h.searchParams.get("lang")}`;
                  }
                }
                if (e.TAG !== "#EXT-X-BYTERANGE") {
                  return e;
                }
                y[a - 1].URI = e.URI;
              } else if (e?.URI && C === "MGM+") {
                e.URI += `?subtype=${i}`;
                if (h.searchParams?.has("lang")) {
                  e.URI += `&lang=${h.searchParams.get("lang")}`;
                }
                return e;
              } else {
                return e;
              }
            });
        }
        $response.body = r.stringify(y);
        break;
      case "text/json":
      case "application/json":
        {
          y = JSON.parse($response.body ?? "{}");
          let a = s.Playlists.Master.get($request.url) || {};
          if (C === "PrimeVideo" && y?.subtitleUrls) {
            a[u[0]] = o.get($request.url, y, "subtitleUrls", n.Languages[u[0]]);
            a[u[1]] = o.get($request.url, y, "subtitleUrls", n.Languages[u[1]]);
            y.subtitleUrls = o.set(y.subtitleUrls, a, e.Types, u, c, N);
          }
          s.Playlists.Master.set($request.url, a);
          s.Playlists.Master = p(s.Playlists.Master, e.CacheSize);
          l.setItem("@DualSubs.Composite.Caches.Playlists.Master", s.Playlists.Master);
          $response.body = JSON.stringify(y);
        }
      case "application/protobuf":
      case "application/x-protobuf":
      case "application/vnd.google.protobuf":
      case "application/grpc":
      case "application/grpc+proto":
      case "application/octet-stream":
    }
  })().catch(e => a.error(e)).finally(() => function (n = {}) {
    switch (e) {
      case "Surge":
        if (n.policy) {
          t.set(n, "headers.X-Surge-Policy", n.policy);
        }
        a.log("🚩 执行结束!", `🕛 ${new Date().getTime() / 1000 - $script.startTime} 秒`);
        $done(n);
        break;
      case "Loon":
        if (n.policy) {
          n.node = n.policy;
        }
        a.log("🚩 执行结束!", `🕛 ${(new Date() - $script.startTime) / 1000} 秒`);
        $done(n);
        break;
      case "Stash":
        if (n.policy) {
          t.set(n, "headers.X-Stash-Selected-Proxy", encodeURI(n.policy));
        }
        a.log("🚩 执行结束!", `🕛 ${(new Date() - $script.startTime) / 1000} 秒`);
        $done(n);
        break;
      case "Egern":
      case "Shadowrocket":
        a.log("🚩 执行结束!");
        $done(n);
        break;
      case "Quantumult X":
        if (n.policy) {
          t.set(n, "opts.policy", n.policy);
        }
        switch (typeof (n = t.pick(n, ["status", "url", "headers", "body", "bodyBytes"])).status) {
          case "number":
            n.status = `HTTP/1.1 ${n.status} ${s[n.status]}`;
            break;
          case "string":
          case "undefined":
            break;
          default:
            throw TypeError(`${Function.name}: 参数类型错误, status 必须为数字或字符串`);
        }
        if (n.body instanceof ArrayBuffer) {
          n.bodyBytes = n.body;
          n.body = undefined;
        } else if (ArrayBuffer.isView(n.body)) {
          n.bodyBytes = n.body.buffer.slice(n.body.byteOffset, n.body.byteLength + n.body.byteOffset);
          n.body = undefined;
        } else if (n.body) {
          n.bodyBytes = undefined;
        }
        a.log("🚩 执行结束!");
        $done(n);
        break;
      default:
        a.log("🚩 执行结束!");
        process.exit(1);
    }
  }($response));
})();