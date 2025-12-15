console.log("🍿️ DualSubs: 🔣 Universal");
console.log("Translate.response.bundle.js");
console.log("Version: 1.7.5");
console.log("Date: 2025/11/23 15:45:04");
(() => {
  var e = {
    21: function (e, t, a) {
      var n;
      e.exports = n || function (e, t) {
        if (typeof window != "undefined" && window.crypto) {
          n = window.crypto;
        }
        if (typeof self != "undefined" && self.crypto) {
          n = self.crypto;
        }
        if (typeof globalThis != "undefined" && globalThis.crypto) {
          n = globalThis.crypto;
        }
        if (!n && typeof window != "undefined" && window.msCrypto) {
          n = window.msCrypto;
        }
        if (!n && a.g !== undefined && a.g.crypto) {
          n = a.g.crypto;
        }
        if (!n) {
          try {
            n = a(656);
          } catch (e) {}
        }
        var n;
        function s() {
          if (n) {
            if (typeof n.getRandomValues == "function") {
              try {
                return n.getRandomValues(new Uint32Array(1))[0];
              } catch (e) {}
            }
            if (typeof n.randomBytes == "function") {
              try {
                return n.randomBytes(4).readInt32LE();
              } catch (e) {}
            }
          }
          throw Error("Native crypto module could not be used to get secure random number.");
        }
        var r = Object.create || function () {
          function e() {}
          return function (t) {
            var a;
            e.prototype = t;
            a = new e();
            e.prototype = null;
            return a;
          };
        }();
        var i = {};
        var o = i.lib = {};
        var l = o.Base = {
          extend: function (e) {
            var t = r(this);
            if (e) {
              t.mixIn(e);
            }
            if (!t.hasOwnProperty("init") || this.init === t.init) {
              t.init = function () {
                t.$super.init.apply(this, arguments);
              };
            }
            t.init.prototype = t;
            t.$super = this;
            return t;
          },
          create: function () {
            var e = this.extend();
            e.init.apply(e, arguments);
            return e;
          },
          init: function () {},
          mixIn: function (e) {
            for (var t in e) {
              if (e.hasOwnProperty(t)) {
                this[t] = e[t];
              }
            }
            if (e.hasOwnProperty("toString")) {
              this.toString = e.toString;
            }
          },
          clone: function () {
            return this.init.prototype.extend(this);
          }
        };
        var u = o.WordArray = l.extend({
          init: function (e, a) {
            e = this.words = e || [];
            if (t != a) {
              this.sigBytes = a;
            } else {
              this.sigBytes = e.length * 4;
            }
          },
          toString: function (e) {
            return (e || c).stringify(this);
          },
          concat: function (e) {
            var t = this.words;
            var a = e.words;
            var n = this.sigBytes;
            var s = e.sigBytes;
            this.clamp();
            if (n % 4) {
              for (var r = 0; r < s; r++) {
                var i = a[r >>> 2] >>> 24 - r % 4 * 8 & 255;
                t[n + r >>> 2] |= i << 24 - (n + r) % 4 * 8;
              }
            } else {
              for (var o = 0; o < s; o += 4) {
                t[n + o >>> 2] = a[o >>> 2];
              }
            }
            this.sigBytes += s;
            return this;
          },
          clamp: function () {
            var t = this.words;
            var a = this.sigBytes;
            t[a >>> 2] &= -1 << 32 - a % 4 * 8;
            t.length = e.ceil(a / 4);
          },
          clone: function () {
            var e = l.clone.call(this);
            e.words = this.words.slice(0);
            return e;
          },
          random: function (e) {
            var t = [];
            for (var a = 0; a < e; a += 4) {
              t.push(s());
            }
            return new u.init(t, e);
          }
        });
        var g = i.enc = {};
        var c = g.Hex = {
          stringify: function (e) {
            var t = e.words;
            for (var a = e.sigBytes, n = [], s = 0; s < a; s++) {
              var r = t[s >>> 2] >>> 24 - s % 4 * 8 & 255;
              n.push((r >>> 4).toString(16));
              n.push((r & 15).toString(16));
            }
            return n.join("");
          },
          parse: function (e) {
            for (var t = e.length, a = [], n = 0; n < t; n += 2) {
              a[n >>> 3] |= parseInt(e.substr(n, 2), 16) << 24 - n % 8 * 4;
            }
            return new u.init(a, t / 2);
          }
        };
        var d = g.Latin1 = {
          stringify: function (e) {
            var t = e.words;
            for (var a = e.sigBytes, n = [], s = 0; s < a; s++) {
              var r = t[s >>> 2] >>> 24 - s % 4 * 8 & 255;
              n.push(String.fromCharCode(r));
            }
            return n.join("");
          },
          parse: function (e) {
            for (var t = e.length, a = [], n = 0; n < t; n++) {
              a[n >>> 2] |= (e.charCodeAt(n) & 255) << 24 - n % 4 * 8;
            }
            return new u.init(a, t);
          }
        };
        var h = g.Utf8 = {
          stringify: function (e) {
            try {
              return decodeURIComponent(escape(d.stringify(e)));
            } catch (e) {
              throw Error("Malformed UTF-8 data");
            }
          },
          parse: function (e) {
            return d.parse(unescape(encodeURIComponent(e)));
          }
        };
        var p = o.BufferedBlockAlgorithm = l.extend({
          reset: function () {
            this._data = new u.init();
            this._nDataBytes = 0;
          },
          _append: function (e) {
            if (typeof e == "string") {
              e = h.parse(e);
            }
            this._data.concat(e);
            this._nDataBytes += e.sigBytes;
          },
          _process: function (t) {
            var a;
            var n = this._data;
            var s = n.words;
            var r = n.sigBytes;
            var i = this.blockSize;
            var o = r / (i * 4);
            var l = (o = t ? e.ceil(o) : e.max((o | 0) - this._minBufferSize, 0)) * i;
            var g = e.min(l * 4, r);
            if (l) {
              for (var c = 0; c < l; c += i) {
                this._doProcessBlock(s, c);
              }
              a = s.splice(0, l);
              n.sigBytes -= g;
            }
            return new u.init(a, g);
          },
          clone: function () {
            var e = l.clone.call(this);
            e._data = this._data.clone();
            return e;
          },
          _minBufferSize: 0
        });
        o.Hasher = p.extend({
          cfg: l.extend(),
          init: function (e) {
            this.cfg = this.cfg.extend(e);
            this.reset();
          },
          reset: function () {
            p.reset.call(this);
            this._doReset();
          },
          update: function (e) {
            this._append(e);
            this._process();
            return this;
          },
          finalize: function (e) {
            if (e) {
              this._append(e);
            }
            return this._doFinalize();
          },
          blockSize: 16,
          _createHelper: function (e) {
            return function (t, a) {
              return new e.init(a).finalize(t);
            };
          },
          _createHmacHelper: function (e) {
            return function (t, a) {
              return new m.HMAC.init(e, a).finalize(t);
            };
          }
        });
        var m = i.algo = {};
        return i;
      }(Math);
    },
    636: function (e, t, a) {
      var n;
      n = a(21);
      (function (e) {
        var t = n.lib;
        var a = t.WordArray;
        var s = t.Hasher;
        var r = n.algo;
        var i = [];
        for (var o = 0; o < 64; o++) {
          i[o] = e.abs(e.sin(o + 1)) * 4294967296 | 0;
        }
        var l = r.MD5 = s.extend({
          _doReset: function () {
            this._hash = new a.init([1732584193, 4023233417, 2562383102, 271733878]);
          },
          _doProcessBlock: function (e, t) {
            for (var a = 0; a < 16; a++) {
              var n = t + a;
              var s = e[n];
              e[n] = (s << 8 | s >>> 24) & 16711935 | (s << 24 | s >>> 8) & -16711936;
            }
            var r = this._hash.words;
            var o = e[t + 0];
            var l = e[t + 1];
            var h = e[t + 2];
            var p = e[t + 3];
            var m = e[t + 4];
            var f = e[t + 5];
            var y = e[t + 6];
            var b = e[t + 7];
            var T = e[t + 8];
            var N = e[t + 9];
            var w = e[t + 10];
            var k = e[t + 11];
            var x = e[t + 12];
            var S = e[t + 13];
            var C = e[t + 14];
            var v = e[t + 15];
            var E = r[0];
            var A = r[1];
            var L = r[2];
            var I = r[3];
            E = u(E, A, L, I, o, 7, i[0]);
            I = u(I, E, A, L, l, 12, i[1]);
            L = u(L, I, E, A, h, 17, i[2]);
            A = u(A, L, I, E, p, 22, i[3]);
            E = u(E, A, L, I, m, 7, i[4]);
            I = u(I, E, A, L, f, 12, i[5]);
            L = u(L, I, E, A, y, 17, i[6]);
            A = u(A, L, I, E, b, 22, i[7]);
            E = u(E, A, L, I, T, 7, i[8]);
            I = u(I, E, A, L, N, 12, i[9]);
            L = u(L, I, E, A, w, 17, i[10]);
            A = u(A, L, I, E, k, 22, i[11]);
            E = u(E, A, L, I, x, 7, i[12]);
            I = u(I, E, A, L, S, 12, i[13]);
            L = u(L, I, E, A, C, 17, i[14]);
            A = u(A, L, I, E, v, 22, i[15]);
            E = g(E, A, L, I, l, 5, i[16]);
            I = g(I, E, A, L, y, 9, i[17]);
            L = g(L, I, E, A, k, 14, i[18]);
            A = g(A, L, I, E, o, 20, i[19]);
            E = g(E, A, L, I, f, 5, i[20]);
            I = g(I, E, A, L, w, 9, i[21]);
            L = g(L, I, E, A, v, 14, i[22]);
            A = g(A, L, I, E, m, 20, i[23]);
            E = g(E, A, L, I, N, 5, i[24]);
            I = g(I, E, A, L, C, 9, i[25]);
            L = g(L, I, E, A, p, 14, i[26]);
            A = g(A, L, I, E, T, 20, i[27]);
            E = g(E, A, L, I, S, 5, i[28]);
            I = g(I, E, A, L, h, 9, i[29]);
            L = g(L, I, E, A, b, 14, i[30]);
            A = g(A, L, I, E, x, 20, i[31]);
            E = c(E, A, L, I, f, 4, i[32]);
            I = c(I, E, A, L, T, 11, i[33]);
            L = c(L, I, E, A, k, 16, i[34]);
            A = c(A, L, I, E, C, 23, i[35]);
            E = c(E, A, L, I, l, 4, i[36]);
            I = c(I, E, A, L, m, 11, i[37]);
            L = c(L, I, E, A, b, 16, i[38]);
            A = c(A, L, I, E, w, 23, i[39]);
            E = c(E, A, L, I, S, 4, i[40]);
            I = c(I, E, A, L, o, 11, i[41]);
            L = c(L, I, E, A, p, 16, i[42]);
            A = c(A, L, I, E, y, 23, i[43]);
            E = c(E, A, L, I, N, 4, i[44]);
            I = c(I, E, A, L, x, 11, i[45]);
            L = c(L, I, E, A, v, 16, i[46]);
            A = c(A, L, I, E, h, 23, i[47]);
            E = d(E, A, L, I, o, 6, i[48]);
            I = d(I, E, A, L, b, 10, i[49]);
            L = d(L, I, E, A, C, 15, i[50]);
            A = d(A, L, I, E, f, 21, i[51]);
            E = d(E, A, L, I, x, 6, i[52]);
            I = d(I, E, A, L, p, 10, i[53]);
            L = d(L, I, E, A, w, 15, i[54]);
            A = d(A, L, I, E, l, 21, i[55]);
            E = d(E, A, L, I, T, 6, i[56]);
            I = d(I, E, A, L, v, 10, i[57]);
            L = d(L, I, E, A, y, 15, i[58]);
            A = d(A, L, I, E, S, 21, i[59]);
            E = d(E, A, L, I, m, 6, i[60]);
            I = d(I, E, A, L, k, 10, i[61]);
            L = d(L, I, E, A, h, 15, i[62]);
            A = d(A, L, I, E, N, 21, i[63]);
            r[0] = r[0] + E | 0;
            r[1] = r[1] + A | 0;
            r[2] = r[2] + L | 0;
            r[3] = r[3] + I | 0;
          },
          _doFinalize: function () {
            var t = this._data;
            var a = t.words;
            var n = this._nDataBytes * 8;
            var s = t.sigBytes * 8;
            a[s >>> 5] |= 128 << 24 - s % 32;
            var r = e.floor(n / 4294967296);
            a[(s + 64 >>> 9 << 4) + 15] = (r << 8 | r >>> 24) & 16711935 | (r << 24 | r >>> 8) & -16711936;
            a[(s + 64 >>> 9 << 4) + 14] = (n << 8 | n >>> 24) & 16711935 | (n << 24 | n >>> 8) & -16711936;
            t.sigBytes = (a.length + 1) * 4;
            this._process();
            var i = this._hash;
            var o = i.words;
            for (var l = 0; l < 4; l++) {
              var u = o[l];
              o[l] = (u << 8 | u >>> 24) & 16711935 | (u << 24 | u >>> 8) & -16711936;
            }
            return i;
          },
          clone: function () {
            var e = s.clone.call(this);
            e._hash = this._hash.clone();
            return e;
          }
        });
        function u(e, t, a, n, s, r, i) {
          var o = e + (t & a | ~t & n) + s + i;
          return (o << r | o >>> 32 - r) + t;
        }
        function g(e, t, a, n, s, r, i) {
          var o = e + (t & n | a & ~n) + s + i;
          return (o << r | o >>> 32 - r) + t;
        }
        function c(e, t, a, n, s, r, i) {
          var o = e + (t ^ a ^ n) + s + i;
          return (o << r | o >>> 32 - r) + t;
        }
        function d(e, t, a, n, s, r, i) {
          var o = e + (a ^ (t | ~n)) + s + i;
          return (o << r | o >>> 32 - r) + t;
        }
        n.MD5 = s._createHelper(l);
        n.HmacMD5 = s._createHmacHelper(l);
      })(Math);
      e.exports = n.MD5;
    },
    656: function () {}
  };
  var t = {};
  function a(n) {
    var s = t[n];
    if (s !== undefined) {
      return s.exports;
    }
    var r = t[n] = {
      exports: {}
    };
    e[n].call(r.exports, r, r.exports, a);
    return r.exports;
  }
  a.g = (() => {
    if (typeof globalThis == "object") {
      return globalThis;
    }
    try {
      return this || Function("return this")();
    } catch (e) {
      if (typeof window == "object") {
        return window;
      }
    }
  })();
  (() => {
    "use strict";

    let e;
    let t;
    let n;
    let s = (() => {
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
    class r {
      static #e = new Map([]);
      static #t = [];
      static #a = new Map([]);
      static clear = () => {};
      static count = (e = "default") => {
        switch (r.#e.has(e)) {
          case true:
            r.#e.set(e, r.#e.get(e) + 1);
            break;
          case false:
            r.#e.set(e, 0);
        }
        r.log(`${e}: ${r.#e.get(e)}`);
      };
      static countReset = (e = "default") => {
        switch (r.#e.has(e)) {
          case true:
            r.#e.set(e, 0);
            r.log(`${e}: ${r.#e.get(e)}`);
            break;
          case false:
            r.warn(`Counter "${e}" doesn’t exist`);
        }
      };
      static debug = (...e) => {
        if (!(r.#n < 4)) {
          e = e.map(e => `🅱️ ${e}`);
          r.log(...e);
        }
      };
      static error(...e) {
        if (!(r.#n < 1)) {
          switch (s) {
            case "Surge":
            case "Loon":
            case "Stash":
            case "Egern":
            case "Shadowrocket":
            case "Quantumult X":
            default:
              e = e.map(e => `❌ ${e}`);
              break;
            case "Node.js":
              e = e.map(e => `❌ ${e.stack}`);
          }
          r.log(...e);
        }
      }
      static exception = (...e) => r.error(...e);
      static group = e => r.#t.unshift(e);
      static groupEnd = () => r.#t.shift();
      static info(...e) {
        if (!(r.#n < 3)) {
          e = e.map(e => `ℹ️ ${e}`);
          r.log(...e);
        }
      }
      static #n = 3;
      static get logLevel() {
        switch (r.#n) {
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
            r.#n = 0;
            break;
          case 1:
          case "error":
            r.#n = 1;
            break;
          case 2:
          case "warn":
          case "warning":
          default:
            r.#n = 2;
            break;
          case 3:
          case "info":
            r.#n = 3;
            break;
          case 4:
          case "debug":
            r.#n = 4;
            break;
          case 5:
          case "all":
            r.#n = 5;
        }
      }
      static log = (...e) => {
        if (r.#n !== 0) {
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
          r.#t.forEach(t => {
            (e = e.map(e => `  ${e}`)).unshift(`▼ ${t}:`);
          });
          console.log((e = ["", ...e]).join("\n"));
        }
      };
      static time = (e = "default") => r.#a.set(e, Date.now());
      static timeEnd = (e = "default") => r.#a.delete(e);
      static timeLog = (e = "default") => {
        let t = r.#a.get(e);
        if (t) {
          r.log(`${e}: ${Date.now() - t}ms`);
        } else {
          r.warn(`Timer "${e}" doesn’t exist`);
        }
      };
      static warn(...e) {
        if (!(r.#n < 2)) {
          e = e.map(e => `⚠️ ${e}`);
          r.log(...e);
        }
      }
    }
    class i {
      static escape(e) {
        let t = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "\"": "&quot;",
          "'": "&#39;"
        };
        return e.replace(/[&<>"']/g, e => t[e]);
      }
      static get(e = {}, t = "", a) {
        if (!Array.isArray(t)) {
          t = i.toPath(t);
        }
        let n = t.reduce((e, t) => Object(e)[t], e);
        if (n === undefined) {
          return a;
        } else {
          return n;
        }
      }
      static omit(e = {}, t = []) {
        if (!Array.isArray(t)) {
          t = [t.toString()];
        }
        t.forEach(t => i.unset(e, t));
        return e;
      }
      static pick(e = {}, t = []) {
        if (!Array.isArray(t)) {
          t = [t.toString()];
        }
        return Object.fromEntries(Object.entries(e).filter(([e, a]) => t.includes(e)));
      }
      static set(e, t, a) {
        if (!Array.isArray(t)) {
          t = i.toPath(t);
        }
        t.slice(0, -1).reduce((e, a, n) => Object(e[a]) === e[a] ? e[a] : e[a] = /^\d+$/.test(t[n + 1]) ? [] : {}, e)[t[t.length - 1]] = a;
        return e;
      }
      static toPath(e) {
        return e.replace(/\[(\d+)\]/g, ".$1").split(".").filter(Boolean);
      }
      static unescape(e) {
        let t = {
          "&amp;": "&",
          "&lt;": "<",
          "&gt;": ">",
          "&quot;": "\"",
          "&#39;": "'"
        };
        return e.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, e => t[e]);
      }
      static unset(e = {}, t = "") {
        if (!Array.isArray(t)) {
          t = i.toPath(t);
        }
        return t.reduce((e, a, n) => n === t.length - 1 ? (delete e[a], true) : Object(e)[a], e);
      }
    }
    let o = {
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
    async function l(e, t = {}) {
      switch (typeof e) {
        case "object":
          e = {
            ...t,
            ...e
          };
          break;
        case "string":
          e = {
            ...t,
            url: e
          };
          break;
        default:
          throw TypeError(`${Function.name}: 参数类型错误, resource 必须为对象或字符串`);
      }
      if (!e.method) {
        e.method = "GET";
        if (e.body ?? e.bodyBytes) {
          e.method = "POST";
        }
      }
      delete e.headers?.Host;
      delete e.headers?.[":authority"];
      delete e.headers?.["Content-Length"];
      delete e.headers?.["content-length"];
      let a = e.method.toLocaleLowerCase();
      if (!e.timeout) {
        e.timeout = 5;
      }
      if (e.timeout) {
        e.timeout = Number.parseInt(e.timeout, 10);
        if (e.timeout > 500) {
          e.timeout = Math.round(e.timeout / 1000);
        }
      }
      switch (s) {
        case "Loon":
        case "Surge":
        case "Stash":
        case "Egern":
        case "Shadowrocket":
        default:
          if (e.timeout && s === "Loon") {
            e.timeout = e.timeout * 1000;
          }
          if (e.policy) {
            switch (s) {
              case "Loon":
                e.node = e.policy;
                break;
              case "Stash":
                i.set(e, "headers.X-Stash-Selected-Proxy", encodeURI(e.policy));
                break;
              case "Shadowrocket":
                i.set(e, "headers.X-Surge-Proxy", e.policy);
            }
          }
          if (typeof e.redirection == "boolean") {
            e["auto-redirect"] = e.redirection;
          }
          if (e.bodyBytes && !e.body) {
            e.body = e.bodyBytes;
            e.bodyBytes = undefined;
          }
          switch ((e.headers?.Accept || e.headers?.accept)?.split(";")?.[0]) {
            case "application/protobuf":
            case "application/x-protobuf":
            case "application/vnd.google.protobuf":
            case "application/vnd.apple.flatbuffer":
            case "application/grpc":
            case "application/grpc+proto":
            case "application/octet-stream":
              e["binary-mode"] = true;
          }
          return await new Promise((t, n) => {
            $httpClient[a](e, (a, s, r) => {
              if (a) {
                n(a);
              } else {
                s.ok = /^2\d\d$/.test(s.status);
                s.statusCode = s.status;
                s.statusText = o[s.status];
                if (r) {
                  s.body = r;
                  if (e["binary-mode"] == true) {
                    s.bodyBytes = r;
                  }
                }
                t(s);
              }
            });
          });
        case "Quantumult X":
          e.timeout = e.timeout * 1000;
          if (e.policy) {
            i.set(e, "opts.policy", e.policy);
          }
          if (typeof e["auto-redirect"] == "boolean") {
            i.set(e, "opts.redirection", e["auto-redirect"]);
          }
          if (e.body instanceof ArrayBuffer) {
            e.bodyBytes = e.body;
            e.body = undefined;
          } else if (ArrayBuffer.isView(e.body)) {
            e.bodyBytes = e.body.buffer.slice(e.body.byteOffset, e.body.byteLength + e.body.byteOffset);
            e.body = undefined;
          } else if (e.body) {
            e.bodyBytes = undefined;
          }
          return Promise.race([await $task.fetch(e).then(e => {
            e.ok = /^2\d\d$/.test(e.statusCode);
            e.status = e.statusCode;
            e.statusText = o[e.status];
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
          }, e => Promise.reject(e.error)), new Promise((t, a) => {
            setTimeout(() => {
              a(Error(`${Function.name}: 请求超时, 请检查网络后重试`));
            }, e.timeout);
          })]);
        case "Node.js":
          {
            let t = globalThis.fetch ? globalThis.fetch : require("node-fetch");
            let a = (globalThis.fetchCookie ? globalThis.fetchCookie : require("fetch-cookie").default)(t);
            e.timeout = e.timeout * 1000;
            e.redirect = e.redirection ? "follow" : "manual";
            let {
              url: n,
              ...s
            } = e;
            return Promise.race([await a(n, s).then(async e => {
              let t;
              let a = await e.arrayBuffer();
              try {
                t = e.headers.raw();
              } catch {
                t = Array.from(e.headers.entries()).reduce((e, [t, a]) => {
                  e[t] = e[t] ? [...e[t], a] : [a];
                  return e;
                }, {});
              }
              return {
                ok: e.ok ?? /^2\d\d$/.test(e.status),
                status: e.status,
                statusCode: e.status,
                statusText: e.statusText,
                body: new TextDecoder("utf-8").decode(a),
                bodyBytes: a,
                headers: Object.fromEntries(Object.entries(t).map(([e, t]) => [e, e.toLowerCase() !== "set-cookie" ? t.toString() : t]))
              };
            }).catch(e => Promise.reject(e.message)), new Promise((t, a) => {
              setTimeout(() => {
                a(Error(`${Function.name}: 请求超时, 请检查网络后重试`));
              }, e.timeout);
            })]);
          }
      }
    }
    class u {
      static data = null;
      static dataFile = "box.dat";
      static #s = /^@(?<key>[^.]+)(?:\.(?<path>.*))?$/;
      static getItem(e, t = null) {
        let a = t;
        if (e.startsWith("@") === true) {
          let {
            key: t,
            path: n
          } = e.match(u.#s)?.groups;
          e = t;
          let s = u.getItem(e, {});
          if (typeof s != "object") {
            s = {};
          }
          a = i.get(s, n);
          try {
            a = JSON.parse(a);
          } catch (e) {}
        } else {
          switch (s) {
            case "Surge":
            case "Loon":
            case "Stash":
            case "Egern":
            case "Shadowrocket":
              a = $persistentStore.read(e);
              break;
            case "Quantumult X":
              a = $prefs.valueForKey(e);
              break;
            case "Node.js":
              u.data = u.#r(u.dataFile);
              a = u.data?.[e];
              break;
            default:
              a = u.data?.[e] || null;
          }
          try {
            a = JSON.parse(a);
          } catch (e) {}
        }
        return a ?? t;
      }
      static setItem(e = new String(), t = new String()) {
        let a = false;
        t = typeof t == "object" ? JSON.stringify(t) : String(t);
        if (e.startsWith("@") === true) {
          let {
            key: n,
            path: s
          } = e.match(u.#s)?.groups;
          e = n;
          let r = u.getItem(e, {});
          if (typeof r != "object") {
            r = {};
          }
          i.set(r, s, t);
          a = u.setItem(e, r);
        } else {
          switch (s) {
            case "Surge":
            case "Loon":
            case "Stash":
            case "Egern":
            case "Shadowrocket":
              a = $persistentStore.write(t, e);
              break;
            case "Quantumult X":
              a = $prefs.setValueForKey(t, e);
              break;
            case "Node.js":
              u.data = u.#r(u.dataFile);
              u.data[e] = t;
              u.#i(u.dataFile);
              a = true;
              break;
            default:
              a = u.data?.[e] || null;
          }
        }
        return a;
      }
      static removeItem(e) {
        let t = false;
        if (e.startsWith("@") === true) {
          let {
            key: a,
            path: n
          } = e.match(u.#s)?.groups;
          e = a;
          let s = u.getItem(e);
          if (typeof s != "object") {
            s = {};
          }
          keyValue = i.unset(s, n);
          t = u.setItem(e, s);
        } else {
          switch (s) {
            case "Surge":
            case "Loon":
            case "Stash":
            case "Egern":
            case "Shadowrocket":
            case "Node.js":
            default:
              t = false;
              break;
            case "Quantumult X":
              t = $prefs.removeValueForKey(e);
          }
        }
        return t;
      }
      static clear() {
        let e = false;
        switch (s) {
          case "Surge":
          case "Loon":
          case "Stash":
          case "Egern":
          case "Shadowrocket":
          case "Node.js":
          default:
            e = false;
            break;
          case "Quantumult X":
            e = $prefs.removeAllValues();
        }
        return e;
      }
      static #r = e => {
        if (s !== "Node.js") {
          return {};
        }
        {
          this.fs = this.fs ? this.fs : require("node:fs");
          this.path = this.path ? this.path : require("node:path");
          let t = this.path.resolve(e);
          let a = this.path.resolve(process.cwd(), e);
          let n = this.fs.existsSync(t);
          let s = !n && this.fs.existsSync(a);
          if (!n && !s) {
            return {};
          }
          try {
            return JSON.parse(this.fs.readFileSync(n ? t : a));
          } catch (e) {
            return {};
          }
        }
      };
      static #i = (e = this.dataFile) => {
        if (s === "Node.js") {
          this.fs = this.fs ? this.fs : require("node:fs");
          this.path = this.path ? this.path : require("node:path");
          let t = this.path.resolve(e);
          let a = this.path.resolve(process.cwd(), e);
          let n = this.fs.existsSync(t);
          let s = !n && this.fs.existsSync(a);
          let r = JSON.stringify(this.data);
          if (n) {
            this.fs.writeFileSync(t, r);
          } else if (s) {
            this.fs.writeFileSync(a, r);
          } else {
            this.fs.writeFileSync(t, r);
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
    class c {
      constructor(e) {
        switch (typeof e) {
          case "string":
            if (e.length === 0) {
              break;
            }
            if (e.startsWith("?")) {
              e = e.slice(1);
            }
            e.split("&").map(e => e.split("=")).forEach(([e, t]) => {
              this.#o.push(e ? decodeURIComponent(e) : e);
              this.#l.push(t ? decodeURIComponent(t) : t);
            });
            break;
          case "object":
            if (Array.isArray(e)) {
              Object.entries(e).forEach(([e, t]) => {
                this.#o.push(e);
                this.#l.push(t);
              });
            } else if (Symbol.iterator in Object(e)) {
              for (const [t, a] of e) {
                this.#o.push(t);
                this.#l.push(a);
              }
            }
        }
        this.#u(this.#o, this.#l);
      }
      #g = "";
      #o = [];
      #l = [];
      #c(e) {
        return encodeURIComponent(e).replace(/%2C/g, ",").replace(/%21/g, "!").replace(/%27/g, "'").replace(/%28/g, "(").replace(/%29/g, ")").replace(/%2A/g, "*");
      }
      #u(e, t) {
        if (e.length === 0) {
          this.#g = "";
        } else {
          this.#g = e.map((e, a) => {
            switch (typeof t[a]) {
              case "object":
                return `${this.#c(e)}=${this.#c(JSON.stringify(t[a]))}`;
              case "boolean":
              case "number":
              case "string":
                return `${this.#c(e)}=${this.#c(t[a])}`;
              default:
                return this.#c(e);
            }
          }).join("&");
        }
      }
      append(e, t) {
        this.#o.push(e);
        this.#l.push(t);
        this.#u(this.#o, this.#l);
      }
      delete(e, t) {
        while (this.#o.indexOf(e) > -1) {
          this.#l.splice(this.#o.indexOf(e), 1);
          this.#o.splice(this.#o.indexOf(e), 1);
        }
        this.#u(this.#o, this.#l);
      }
      entries() {
        return this.#o.map((e, t) => [e, this.#l[t]]);
      }
      get(e) {
        return this.#l[this.#o.indexOf(e)];
      }
      getAll(e) {
        return this.#l.filter((t, a) => this.#o[a] === e);
      }
      has(e, t) {
        return this.#o.indexOf(e) > -1;
      }
      keys() {
        return this.#o;
      }
      set(e, t) {
        if (this.#o.indexOf(e) === -1) {
          this.append(e, t);
        } else {
          let a = true;
          let n = [];
          this.#o = this.#o.filter((s, r) => s !== e ? (n.push(this.#l[r]), true) : !!a && (a = false, n.push(t), true));
          this.#l = n;
          this.#u(this.#o, this.#l);
        }
      }
      sort() {
        let e = this.entries().sort();
        this.#o = [];
        this.#l = [];
        e.forEach(e => {
          this.#o.push(e[0]);
          this.#l.push(e[1]);
        });
        this.#u(this.#o, this.#l);
      }
      toString = () => this.#g;
      values = () => this.#l.values();
    }
    class d {
      constructor(e, t) {
        switch (typeof e) {
          case "string":
            {
              const a = /^(blob:|file:)?[a-zA-z]+:\/\/.*/.test(e);
              const n = !!t && /^(blob:|file:)?[a-zA-z]+:\/\/.*/.test(t);
              if (a) {
                this.href = e;
              } else if (n) {
                this.href = t + e;
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
      #d = {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        password: "",
        pathname: "",
        port: NaN,
        protocol: "",
        search: "",
        searchParams: new c(""),
        username: ""
      };
      static #h = /^(?<scheme>([^:\/?#]+):)?(?:\/\/(?<authority>[^\/?#]*))?(?<path>[^?#]*)(?<query>\?([^#]*))?(?<hash>#(.*))?$/;
      static #p = /^(?<authentication>(?<username>[^:]*)(:(?<password>[^@]*))?@)?(?<hostname>[^:]+)(:(?<port>\d+))?$/;
      get hash() {
        return this.#d.hash;
      }
      set hash(e) {
        if (e.length !== 0) {
          if (e.startsWith("#")) {
            e = e.slice(1);
          }
          this.#d.hash = `#${encodeURIComponent(e)}`;
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
        return encodeURIComponent(this.#d.hostname);
      }
      set hostname(e) {
        this.#d.hostname = e ?? "";
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
        let t = e.match(d.#h);
        if (!t) {
          throw TypeError("Invalid URL format.");
        }
        this.protocol = t.groups.scheme ?? "";
        let a = t.groups.authority.match(d.#p);
        this.username = a.groups.username ?? "";
        this.password = a.groups.password ?? "";
        this.hostname = a.groups.hostname ?? "";
        this.port = a.groups.port ?? "";
        this.pathname = t.groups.path ?? "";
        this.search = t.groups.query ?? "";
        this.hash = t.groups.hash ?? "";
      }
      get origin() {
        return `${this.protocol}//${this.host}`;
      }
      get password() {
        return encodeURIComponent(this.#d.password);
      }
      set password(e) {
        if (this.username.length > 0) {
          this.#d.password = e ?? "";
        }
      }
      get pathname() {
        return `/${this.#d.pathname}`;
      }
      set pathname(e) {
        if ((e = `${e}`).startsWith("/")) {
          e = e.slice(1);
        }
        this.#d.pathname = e;
      }
      get port() {
        if (Number.isNaN(this.#d.port)) {
          return "";
        }
        let e = this.#d.port.toString();
        if (this.protocol === "ftp:" && e === "21" || this.protocol === "http:" && e === "80" || this.protocol === "https:" && e === "443") {
          return "";
        } else {
          return e;
        }
      }
      set port(e) {
        if (e === "") {
          this.#d.port = NaN;
        } else {
          let t = Number.parseInt(e, 10);
          if (t >= 0 && t < 65535) {
            this.#d.port = t;
          }
        }
      }
      get protocol() {
        return `${this.#d.protocol}:`;
      }
      set protocol(e) {
        if (e.endsWith(":")) {
          e = e.slice(0, -1);
        }
        this.#d.protocol = e;
      }
      get search() {
        this.#d.search = this.searchParams.toString();
        if (this.#d.search.length > 0) {
          return `?${this.#d.search}`;
        } else {
          return "";
        }
      }
      set search(e) {
        if ((e = `${e}`).startsWith("?")) {
          e = e.slice(1);
        }
        this.#d.search = e;
        this.#d.searchParams = new c(this.#d.search);
      }
      get searchParams() {
        return this.#d.searchParams;
      }
      get username() {
        return encodeURIComponent(this.#d.username);
      }
      set username(e) {
        this.#d.username = e ?? "";
      }
      static parse = (e, t) => new d(e, t);
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
    class h {
      static name = "XML";
      static version = "0.4.2";
      static about = () => console.log(`
🟧 ${this.name} v${this.version}
`);
      static #m = "@";
      static #f = "#";
      static #y = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&apos;": "'",
        "&quot;": "\""
      };
      static #b = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&apos;",
        "\"": "&quot;"
      };
      static parse(e = new String(), t = "") {
        let a = this.#y;
        let n = this.#m;
        let s = this.#f;
        return function e(t, a) {
          let i;
          switch (typeof t) {
            case "string":
            case "undefined":
              i = t;
              break;
            case "object":
              let o = t.raw;
              let l = t.name;
              let u = t.tag;
              let g = t.children;
              i = o || (u ? function (e, t) {
                let a;
                let s;
                if (!e) {
                  return;
                }
                let i = e.split(/([^\s='"]+(?:\s*=\s*(?:'[\S\s]*?'|"[\S\s]*?"|[^\s'"]*))?)/);
                let o = i.length;
                for (let e = 0; e < o; e++) {
                  var l;
                  l = i[e];
                  let o = l?.trim?.();
                  if (!o) {
                    continue;
                  }
                  a ||= {};
                  let u = o.indexOf("=");
                  if (u < 0) {
                    o = n + o;
                    s = null;
                  } else {
                    s = o.substr(u + 1).replace(/^\s+/, "");
                    o = n + o.substr(0, u).replace(/\s+$/, "");
                    let e = s[0];
                    if (e === s[s.length - 1] && (e === "'" || e === "\"")) {
                      s = s.substr(1, s.length - 2);
                    }
                    s = r(s);
                  }
                  if (t) {
                    s = t(o, s);
                  }
                  c(a, o, s);
                }
                return a;
              }(u, a) : g ? {} : {
                [l]: undefined
              });
              if (l === "plist") {
                i = Object.assign(i, function e(t, a) {
                  let n;
                  switch (typeof t) {
                    case "string":
                    case "undefined":
                      n = t;
                      break;
                    case "object":
                      let s = t.name;
                      let r = t.children;
                      n = {};
                      switch (s) {
                        case "plist":
                          n = Object.assign(n, e(r[0], a));
                          break;
                        case "dict":
                          let i = r.map(t => e(t, a));
                          n = Object.fromEntries(i = function (e, t) {
                            for (var a = 0, n = []; a < e.length;) {
                              n.push(e.slice(a, a += 2));
                            }
                            return n;
                          }(i, 2));
                          break;
                        case "array":
                          if (!Array.isArray(n)) {
                            n = [];
                          }
                          n = r.map(t => e(t, a));
                          break;
                        case "key":
                        case "string":
                          n = r[0];
                          break;
                        case "true":
                        case "false":
                          n = JSON.parse(s);
                          break;
                        case "integer":
                          n = BigInt(r[0]);
                          break;
                        case "real":
                          n = parseFloat(r[0]);
                      }
                      if (a) {
                        n = a(s || "", n);
                      }
                  }
                  return n;
                }(g[0], a));
              } else {
                g?.forEach?.((t, n) => {
                  if (typeof t == "string") {
                    c(i, s, e(t, a), undefined);
                  } else if (t.tag || t.children || t.raw) {
                    c(i, t.name, e(t, a), undefined);
                  } else {
                    c(i, t.name, e(t, a), g?.[n - 1]?.name);
                  }
                });
              }
              if (g && g.length === 0) {
                c(i, s, null, undefined);
              }
              if (a) {
                i = a(l || "", i);
              }
          }
          return i;
          function c(e, t, a, n = t) {
            if (a !== undefined) {
              let s = e[n];
              if (Array.isArray(s)) {
                s.push(a);
              } else if (s) {
                e[n] = [s, a];
              } else {
                e[t] = a;
              }
            }
          }
        }(function (e) {
          let t = e.replace(/^[ \t]+/gm, "").split(/<([^!<>?](?:'[\S\s]*?'|"[\S\s]*?"|[^'"<>])*|!(?:--[\S\s]*?--|\[[^\[\]'"<>]+\[[\S\s]*?]]|DOCTYPE[^\[<>]*?\[[\S\s]*?]|(?:ENTITY[^"<>]*?"[\S\s]*?")?[\S\s]*?)|\?[\S\s]*?\?)>/);
          let a = t.length;
          let n = {
            children: []
          };
          let s = n;
          let i = [];
          for (let e = 0; e < a;) {
            let a = t[e++];
            if (a) {
              (function (e) {
                var t;
                t = e;
                if (e = t?.replace?.(/^(\r\n|\r|\n|\t)+|(\r\n|\r|\n|\t)+$/g, "")) {
                  o(r(e));
                }
              })(a);
            }
            let n = t[e++];
            if (n) {
              (function (e) {
                let t = e.split(" ");
                let a = t.shift();
                let n = t.length;
                let r = {};
                switch (a[0]) {
                  case "/":
                    let l = e.replace(/^\/|[\s\/].*$/g, "").toLowerCase();
                    while (i.length) {
                      let e = s?.name?.toLowerCase?.();
                      s = i.pop();
                      if (e === l) {
                        break;
                      }
                    }
                    break;
                  case "?":
                    r.name = a;
                    r.raw = t.join(" ");
                    o(r);
                    break;
                  case "!":
                    if (/!\[CDATA\[(.+)\]\]/.test(e)) {
                      r.name = "!CDATA";
                      r.raw = e.match(/!\[CDATA\[(?<raw>.+)\]\]/)?.groups?.raw;
                    } else if (/!--(.+)--/.test(e)) {
                      r.name = "!--";
                      r.raw = e.match(/!--(?<raw>.+)--/)?.groups?.raw;
                    } else {
                      r.name = a;
                      r.raw = t.join(" ");
                    }
                    o(r);
                    break;
                  default:
                    o(r = function (e) {
                      let t = {
                        children: []
                      };
                      let a = (e = e.replace(/\s*\/?$/, "")).search(/[\s='"\/]/);
                      if (a < 0) {
                        t.name = e;
                      } else {
                        t.name = e.substr(0, a);
                        t.tag = e.substr(a);
                      }
                      return t;
                    }(e));
                    if ((t?.[n - 1] ?? a).slice(-1) === "/" || a === "link") {
                      delete r.children;
                    } else {
                      i.push(s);
                      s = r;
                    }
                }
              })(n);
            }
          }
          return n;
          function o(e) {
            s.children.push(e);
          }
        }(e), t);
        function r(e) {
          return e.replace(/(&(?:lt|gt|amp|apos|quot|#(?:\d{1,6}|x[0-9a-fA-F]{1,5}));)/g, function (e) {
            if (e[1] === "#") {
              let t = e[2] === "x" ? parseInt(e.substr(3), 16) : parseInt(e.substr(2), 10);
              if (t > -1) {
                return String.fromCharCode(t);
              }
            }
            return a[e] || e;
          });
        }
      }
      static stringify(e = {}, t = "") {
        this.#b;
        let a = this.#m;
        let n = this.#f;
        let s = "";
        for (let t in e) {
          s += function e(t, s, r) {
            let i = "";
            switch (typeof t) {
              case "object":
                if (Array.isArray(t)) {
                  i = t.reduce((t, a) => t += `${r}${e(a, s, `${r}	`)}
`, "");
                } else {
                  let o = "";
                  let l = false;
                  for (let e in t) {
                    if (e[0] === a) {
                      o += ` ${e.substring(1)}="${t[e].toString()}"`;
                      delete t[e];
                    } else if (t[e] === undefined) {
                      s = e;
                    } else {
                      l = true;
                    }
                  }
                  i += `${r}<${s}${o}${l || s === "link" ? "" : "/"}>`;
                  if (l) {
                    if (s === "plist") {
                      i += function e(t, a, n) {
                        let s = "";
                        switch (typeof t) {
                          case "boolean":
                            s = `${n}<${t.toString()}/>`;
                            break;
                          case "number":
                            s = `${n}<real>${t.toString()}</real>`;
                            break;
                          case "bigint":
                            s = `${n}<integer>${t.toString()}</integer>`;
                            break;
                          case "string":
                            s = `${n}<string>${t.toString()}</string>`;
                            break;
                          case "object":
                            let r = "";
                            if (Array.isArray(t)) {
                              for (var i = 0, o = t.length; i < o; i++) {
                                r += `${n}${e(t[i], a, `${n}	`)}`;
                              }
                              s = `${n}<array>${r}${n}</array>`;
                            } else {
                              let a = "";
                              Object.entries(t).forEach(([t, s]) => {
                                a += `${n}<key>${t}</key>`;
                                a += e(s, t, n);
                              });
                              s = `${n}<dict>${a}${n}</dict>`;
                            }
                        }
                        return s;
                      }(t, s, `${r}	`);
                    } else {
                      for (let a in t) {
                        if (a === n) {
                          i += t[a] ?? "";
                        } else {
                          i += e(t[a], a, `${r}	`);
                        }
                      }
                    }
                    i += `${i.slice(-1) === "\n" ? r : ""}</${s}>`;
                  }
                }
                break;
              case "string":
                switch (s) {
                  case "?xml":
                  case "!DOCTYPE":
                    i += `${r}<${s} ${t.toString()}>`;
                    break;
                  case "?":
                    i += `${r}<${s}${t.toString()}${s}>`;
                    break;
                  case "!--":
                    i += `${r}<!--${t.toString()}-->`;
                    break;
                  case "!CDATA":
                    i += `${r}<![CDATA[${t.toString()}]]>`;
                    break;
                  case n:
                    i += t;
                    break;
                  default:
                    i += `${r}<${s}>${t.toString()}</${s}>`;
                }
                break;
              case "undefined":
                i += `${r}<${s.toString()}/>`;
            }
            return i;
          }(e[t], t, "");
        }
        if (t) {
          return s.replace(/\t/g, t);
        } else {
          return s.replace(/\t|\n/g, "");
        }
      }
    }
    class p {
      static name = "WebVTT";
      static version = "2.2.0";
      static about = () => console.log(`
🟧 ${this.name} v${this.version}
`);
      static parse(e = new String(), t = {
        milliseconds: true,
        timeStamp: true,
        line: "single",
        lineBreak: "\n"
      }) {
        let a = t.milliseconds ? /^((?<index>\d+)(\r\n|\r|\n))?(?<timing>(?<startTime>[0-9:.,]+) --> (?<endTime>[0-9:.,]+)) ?(?<settings>.+)?[^](?<text>[\s\S]*)?$/ : /^((?<index>\d+)(\r\n|\r|\n))?(?<timing>(?<startTime>[0-9:]+)[0-9.,]+ --> (?<endTime>[0-9:]+)[0-9.,]+) ?(?<settings>.+)?[^](?<text>[\s\S]*)?$/;
        let n = e.split(/\r\n\r\n|\r\r|\n\n/);
        let s = {
          headers: {},
          comments: [],
          style: "",
          body: []
        };
        n.forEach(e => {
          switch ((e = e.trim()).substring(0, 5).trim()) {
            case "WEBVT":
              {
                let t = e.split(/\r\n|\r|\n/);
                s.headers.type = t.shift();
                s.headers.options = t;
                break;
              }
            case "NOTE":
              s.comments.push(e);
              break;
            case "STYLE":
              {
                let a = e.split(/\r\n|\r|\n/);
                a.shift();
                s.style = a.join(t.lineBreak);
                break;
              }
            default:
              let n = e.match(a)?.groups;
              if (n) {
                if (s.headers?.type !== "WEBVTT") {
                  n.timing = n?.timing?.replace?.(",", ".");
                  n.startTime = n?.startTime?.replace?.(",", ".");
                  n.endTime = n?.endTime?.replace?.(",", ".");
                }
                if (t.timeStamp) {
                  let e = n?.startTime?.replace?.(/(.*)/, "1970-01-01T$1Z");
                  n.timeStamp = t.milliseconds ? Date.parse(e) : Date.parse(e) / 1000;
                }
                n.text = n?.text?.trimEnd?.();
                switch (t.line) {
                  case "single":
                    n.text = n?.text?.replace?.(/\r\n|\r|\n/, " ");
                    break;
                  case "multi":
                    n.text = n?.text?.split?.(/\r\n|\r|\n/);
                }
                s.body.push(n);
              }
          }
        });
        return s;
      }
      static stringify(e = {
        headers: {},
        comments: [],
        style: "",
        body: []
      }, t = {
        milliseconds: true,
        timeStamp: true,
        line: "single",
        lineBreak: "\n"
      }) {
        return [e.headers = [e.headers?.type || "", e.headers?.options || ""].flat(Infinity).join(t.lineBreak), e.comments = e?.comments?.join?.(t.lineBreak), e.style = e?.style?.length > 0 ? ["STYLE", e.style].join(t.lineBreak) : "", e.body = e.body.map(e => {
          if (Array.isArray(e.text)) {
            e.text = e.text.join(t.lineBreak);
          }
          return e = `${e.index ? e.index + t.lineBreak : ""}${e.timing} ${e?.settings ?? ""}${t.lineBreak}${e.text}`;
        }).join(t.lineBreak + t.lineBreak)].join(t.lineBreak + t.lineBreak).trim() + t.lineBreak + t.lineBreak;
      }
    }
    let m = {
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
    var f;
    var y;
    var b;
    var T;
    var N;
    var w;
    var k;
    var x;
    var S;
    var C;
    var v;
    var E;
    var A = a(636);
    class L {
      constructor(e = {}) {
        this.Name = "Translate";
        this.Version = "1.0.7";
        r.log(`🟧 ${this.Name} v${this.Version}`);
        this.Source = "AUTO";
        this.Target = "ZH";
        this.API = {};
        Object.assign(this, e);
      }
      #T = {
        Google: {
          AUTO: "auto",
          AF: "af",
          AM: "am",
          AR: "ar",
          AS: "as",
          AY: "ay",
          AZ: "az",
          BG: "bg",
          BE: "be",
          BM: "bm",
          BN: "bn",
          BHO: "bho",
          CS: "cs",
          DA: "da",
          DE: "de",
          EL: "el",
          EU: "eu",
          EN: "en",
          "EN-GB": "en",
          "EN-US": "en",
          "EN-US SDH": "en",
          ES: "es",
          "ES-419": "es",
          "ES-ES": "es",
          ET: "et",
          FI: "fi",
          FR: "fr",
          "FR-CA": "fr",
          HU: "hu",
          ID: "id",
          IS: "is",
          IT: "it",
          JA: "ja",
          KM: "km",
          KO: "ko",
          LT: "lt",
          LV: "lv",
          NL: "nl",
          NO: "no",
          PL: "pl",
          PT: "pt",
          "PT-PT": "pt",
          "PT-BR": "pt",
          PA: "pa",
          RO: "ro",
          RU: "ru",
          SK: "sk",
          SL: "sl",
          SQ: "sq",
          ST: "st",
          SV: "sv",
          TH: "th",
          TR: "tr",
          UK: "uk",
          UR: "ur",
          VI: "vi",
          ZH: "zh",
          "ZH-HANS": "zh-CN",
          "ZH-HK": "zh-TW",
          "ZH-HANT": "zh-TW"
        },
        Microsoft: {
          AUTO: "",
          AF: "af",
          AM: "am",
          AR: "ar",
          AS: "as",
          AY: "ay",
          AZ: "az",
          BG: "bg",
          BE: "be",
          BM: "bm",
          BN: "bn",
          BHO: "bho",
          CS: "cs",
          DA: "da",
          DE: "de",
          EL: "el",
          EU: "eu",
          EN: "en",
          "EN-GB": "en",
          "EN-US": "en",
          "EN-US SDH": "en",
          ES: "es",
          "ES-419": "es",
          "ES-ES": "es",
          ET: "et",
          FI: "fi",
          FR: "fr",
          "FR-CA": "fr-ca",
          HU: "hu",
          ID: "id",
          IS: "is",
          IT: "it",
          JA: "ja",
          KM: "km",
          KO: "ko",
          LT: "lt",
          LV: "lv",
          NL: "nl",
          NO: "no",
          PL: "pl",
          PT: "pt",
          "PT-PT": "pt-pt",
          "PT-BR": "pt",
          PA: "pa",
          RO: "ro",
          RU: "ru",
          SK: "sk",
          SL: "sl",
          SQ: "sq",
          ST: "st",
          SV: "sv",
          TH: "th",
          TR: "tr",
          UK: "uk",
          UR: "ur",
          VI: "vi",
          ZH: "zh-Hans",
          "ZH-HANS": "zh-Hans",
          "ZH-HK": "yue",
          "ZH-HANT": "zh-Hant"
        },
        DeepL: {
          AUTO: "",
          BG: "BG",
          CS: "CS",
          DA: "DA",
          DE: "de",
          EL: "el",
          EN: "EN",
          ES: "ES",
          ET: "ET",
          FI: "FI",
          FR: "FR",
          HU: "HU",
          ID: "ID",
          IT: "IT",
          JA: "JA",
          KO: "ko",
          LT: "LT",
          LV: "LV",
          NL: "NL",
          PL: "PL",
          PT: "PT",
          RO: "RO",
          RU: "RU",
          SK: "SK",
          SL: "SL",
          SV: "SV",
          TR: "TR",
          ZH: "ZH"
        },
        Baidu: {
          AUTO: "auto",
          AR: "ara",
          CS: "cs",
          DA: "dan",
          DE: "de",
          EL: "el",
          EN: "en",
          ES: "spa",
          ET: "est",
          FI: "fin",
          FR: "fra",
          HU: "hu",
          IT: "it",
          JA: "jp",
          KO: "kor",
          NL: "nl",
          PL: "pl",
          PT: "pt",
          RO: "RO",
          RU: "rom",
          SL: "slo",
          SV: "swe",
          TH: "th",
          VI: "vie",
          ZH: "zh",
          "ZH-HANS": "zh",
          "ZH-HK": "cht",
          "ZH-HANT": "cht"
        }
      };
      #N = ["Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134", "Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0"];
      #w = {
        Google: 120,
        GoogleCloud: 120,
        Microsoft: 99,
        Azure: 99,
        DeepL: 49
      };
      async Google(e = [], t = this.Source, a = this.Target) {
        e = Array.isArray(e) ? e : [e];
        t = this.#T.Google[t] ?? this.#T.Google[t?.split?.(/[-_]/)?.[0]] ?? t.toLowerCase();
        a = this.#T.Google[a] ?? this.#T.Google[a?.split?.(/[-_]/)?.[0]] ?? a.toLowerCase();
        let n = [{
          url: "https://translate.googleapis.com/translate_a/single?client=gtx&dt=t",
          headers: {
            Accept: "*/*",
            "User-Agent": this.#N[Math.floor(Math.random() * this.#N.length)],
            Referer: "https://translate.google.com"
          }
        }, {
          url: "https://clients5.google.com/translate_a/t?client=dict-chrome-ex",
          headers: {
            Accept: "*/*",
            "User-Agent": this.#N[Math.floor(Math.random() * this.#N.length)]
          }
        }, {
          url: "https://translate.google.com/translate_a/single?client=it&dt=qca&dt=t&dt=rmt&dt=bd&dt=rms&dt=sos&dt=md&dt=gt&dt=ld&dt=ss&dt=ex&otf=2&dj=1&hl=en&ie=UTF-8&oe=UTF-8",
          headers: {
            Accept: "*/*",
            "User-Agent": "GoogleTranslate/6.29.59279 (iPhone; iOS 15.4; en; iPhone14,2)"
          }
        }, {
          url: "https://translate.googleapis.com/translate_a/single?client=gtx&dj=1&source=bubble&dt=t&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&dt=at",
          headers: {
            Accept: "*/*",
            "User-Agent": "GoogleTranslate/6.29.59279 (iPhone; iOS 15.4; en; iPhone14,2)"
          }
        }];
        let s = n[Math.floor(Math.random() * (n.length - 2))];
        s.url = `${s.url}&sl=${t}&tl=${a}&q=${encodeURIComponent(e.join("\r"))}`;
        return await l(s).then(t => {
          let a = JSON.parse(t.body);
          if (Array.isArray(a)) {
            if (Array.isArray(a?.[0])) {
              if (a.length === 1) {
                a[0].pop();
                e = a[0] ?? `翻译失败, vendor: google`;
              } else {
                e = a?.[0]?.map(e => e?.[0] ?? `翻译失败, vendor: google`);
              }
            } else {
              e = a ?? `翻译失败, vendor: google`;
            }
          } else if (a?.sentences) {
            e = a?.sentences?.map(e => e?.trans ?? `翻译失败, vendor: google`);
          }
          return e?.join("")?.split(/\r/);
        }).catch(e => Promise.reject(e));
      }
      async GoogleCloud(e = [], t = this.Source, a = this.Target, n = this.API) {
        e = Array.isArray(e) ? e : [e];
        t = this.#T.Google[t] ?? this.#T.Google[t?.split?.(/[-_]/)?.[0]] ?? t.toLowerCase();
        a = this.#T.Google[a] ?? this.#T.Google[a?.split?.(/[-_]/)?.[0]] ?? a.toLowerCase();
        let s = {};
        let r = "https://translation.googleapis.com";
        switch (n?.Version) {
          case "v2":
          default:
            s.url = `${r}/language/translate/v2`;
            s.headers = {
              "User-Agent": "DualSubs",
              "Content-Type": "application/json; charset=utf-8"
            };
            s.body = JSON.stringify({
              q: e,
              source: t,
              target: a,
              format: "html"
            });
            if (n?.Mode === "Token") {
              s.headers.Authorization = `Bearer ${n?.Token ?? n?.Auth}`;
            } else {
              s.url += `?key=${n?.Key ?? n?.Auth}`;
            }
            break;
          case "v3":
            s.url = `${r}/v3/projects/${n?.ID}`;
            s.headers = {
              Authorization: `Bearer ${n?.Token ?? n?.Auth}`,
              "x-goog-user-project": n?.ID,
              "User-Agent": "DualSubs",
              "Content-Type": "application/json; charset=utf-8"
            };
            s.body = JSON.stringify({
              sourceLanguageCode: t,
              targetLanguageCode: a,
              contents: Array.isArray(e) ? e : [e],
              mimeType: "text/html"
            });
        }
        return await l(s).then(e => {
          let t = JSON.parse(e.body);
          return t?.data?.translations?.map(e => e?.translatedText ?? `翻译失败, vendor: GoogleCloud`);
        }).catch(e => Promise.reject(e));
      }
      async Microsoft(e = [], t = this.Source, a = this.Target, n = this.API) {
        e = Array.isArray(e) ? e : [e];
        t = this.#T.Microsoft[t] ?? this.#T.Microsoft[t?.split?.(/[-_]/)?.[0]] ?? t.toLowerCase();
        a = this.#T.Microsoft[a] ?? this.#T.Microsoft[a?.split?.(/[-_]/)?.[0]] ?? a.toLowerCase();
        let s = {};
        let r = "https://api.cognitive.microsofttranslator.com";
        switch (n?.Version) {
          case "Azure":
          default:
            r = "https://api.cognitive.microsofttranslator.com";
            break;
          case "AzureCN":
            r = "https://api.translator.azure.cn";
            break;
          case "AzureUS":
            r = "https://api.cognitive.microsofttranslator.us";
        }
        s.url = `${r}/translate?api-version=3.0&textType=html&${t ? `from=${t}` : ""}&to=${a}`;
        s.headers = {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Accept-Language": "zh-hans"
        };
        switch (n?.Mode) {
          case "Token":
          default:
            s.headers.Authorization = `Bearer ${n?.Token ?? n?.Auth}`;
            break;
          case "Key":
            s.headers["Ocp-Apim-Subscription-Key"] = n?.Key ?? n?.Auth;
            s.headers["Ocp-Apim-Subscription-Region"] = n?.Region;
        }
        s.body = JSON.stringify(e = e.map(e => ({
          text: e
        })));
        return await l(s).then(e => {
          let t = JSON.parse(e.body);
          return t?.map(e => e?.translations?.[0]?.text ?? `翻译失败, vendor: Microsoft`);
        }).catch(e => Promise.reject(e));
      }
      async DeepL(e = [], t = this.Source, a = this.Target, n = this.API) {
        e = Array.isArray(e) ? e : [e];
        t = this.#T.DeepL[t] ?? this.#T.DeepL[t?.split?.(/[-_]/)?.[0]] ?? t.toLowerCase();
        a = this.#T.DeepL[a] ?? this.#T.DeepL[a?.split?.(/[-_]/)?.[0]] ?? a.toLowerCase();
        let s = {};
        let r = "https://api-free.deepl.com";
        switch (n?.Version) {
          case "Free":
          default:
            r = "https://api-free.deepl.com";
            break;
          case "Pro":
            r = "https://api.deepl.com";
        }
        s.url = `${r}/v2/translate`;
        s.headers = {
          "User-Agent": "DualSubs",
          "Content-Type": "application/json",
          Authorization: `DeepL-Auth-Key ${n?.Token ?? n?.Auth}`
        };
        let i = {
          text: e,
          target_lang: a,
          tag_handling: "html"
        };
        if (t) {
          i.source_lang = t;
        }
        s.body = JSON.stringify(i);
        return await l(s).then(e => {
          let t = JSON.parse(e.body);
          return t?.translations?.map(e => e?.text ?? `翻译失败, vendor: DeepL`);
        }).catch(e => Promise.reject(e));
      }
      async BaiduFanyi(e = [], t = this.Source, a = this.Target, n = this.API) {
        e = Array.isArray(e) ? e : [e];
        t = this.#T.Baidu[t] ?? this.#T.Baidu[t?.split?.(/[-_]/)?.[0]] ?? t.toLowerCase();
        a = this.#T.Baidu[a] ?? this.#T.Baidu[a?.split?.(/[-_]/)?.[0]] ?? a.toLowerCase();
        let s = {
          url: "https://fanyi-api.baidu.com/api/trans/vip/language",
          headers: {
            "User-Agent": "DualSubs",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        };
        let i = new Date().getTime();
        s.body = `q=${encodeURIComponent(e.join("\n"))}&from=${t}&to=${a}&appid=${n.id}&salt=${i}&sign=${A(n.id + e + i + n.key)}`;
        return await l(s).then(e => {
          let t = JSON.parse(e.body);
          return t?.trans_result?.map(e => e?.dst ?? `翻译失败, vendor: BaiduFanyi`);
        }).catch(e => Promise.reject(r.error(e)));
      }
      async YoudaoAI(e = [], t = this.Source, a = this.Target, n = this.API) {
        e = Array.isArray(e) ? e : [e];
        t = this.#T.Youdao[t] ?? this.#T.Youdao[t?.split?.(/[-_]/)?.[0]];
        a = this.#T.Youdao[a] ?? this.#T.Youdao[a?.split?.(/[-_]/)?.[0]];
        let s = {
          url: "https://openapi.youdao.com/api",
          headers: {
            "User-Agent": "DualSubs",
            "Content-Type": "application/json; charset=utf-8"
          }
        };
        s.body = {
          q: e,
          from: t,
          to: a,
          appKey: n?.Key,
          salt: new Date().getTime(),
          signType: "v3",
          sign: "",
          curtime: Math.floor(new Date() / 1000)
        };
        return await l(s).then(e => {
          let t = JSON.parse(e.body);
          return t?.data ?? `翻译失败, vendor: DeepL`;
        }).catch(e => Promise.reject(e));
      }
    }
    let I = Symbol.for("protobuf-ts/message-type");
    function B(e) {
      let t = false;
      let a = [];
      for (let n = 0; n < e.length; n++) {
        let s = e.charAt(n);
        if (s == "_") {
          t = true;
        } else if (/\d/.test(s)) {
          a.push(s);
          t = true;
        } else if (t) {
          a.push(s.toUpperCase());
          t = false;
        } else if (n == 0) {
          a.push(s.toLowerCase());
        } else {
          a.push(s);
        }
      }
      return a.join("");
    }
    function O(e) {
      e.localName = e.localName ?? B(e.name);
      e.jsonName = e.jsonName ?? B(e.name);
      e.repeat = e.repeat ?? S.NO;
      e.opt = e.opt ?? (!e.repeat && !e.oneof && e.kind == "message");
      return e;
    }
    (f = k ||= {})[f.DOUBLE = 1] = "DOUBLE";
    f[f.FLOAT = 2] = "FLOAT";
    f[f.INT64 = 3] = "INT64";
    f[f.UINT64 = 4] = "UINT64";
    f[f.INT32 = 5] = "INT32";
    f[f.FIXED64 = 6] = "FIXED64";
    f[f.FIXED32 = 7] = "FIXED32";
    f[f.BOOL = 8] = "BOOL";
    f[f.STRING = 9] = "STRING";
    f[f.BYTES = 12] = "BYTES";
    f[f.UINT32 = 13] = "UINT32";
    f[f.SFIXED32 = 15] = "SFIXED32";
    f[f.SFIXED64 = 16] = "SFIXED64";
    f[f.SINT32 = 17] = "SINT32";
    f[f.SINT64 = 18] = "SINT64";
    (y = x ||= {})[y.BIGINT = 0] = "BIGINT";
    y[y.STRING = 1] = "STRING";
    y[y.NUMBER = 2] = "NUMBER";
    (b = S ||= {})[b.NO = 0] = "NO";
    b[b.PACKED = 1] = "PACKED";
    b[b.UNPACKED = 2] = "UNPACKED";
    class $ {
      constructor(e) {
        this.fields = e.fields ?? [];
      }
      prepare() {
        if (this.data) {
          return;
        }
        let e = [];
        let t = [];
        let a = [];
        for (let n of this.fields) {
          if (n.oneof) {
            if (!a.includes(n.oneof)) {
              a.push(n.oneof);
              e.push(n.oneof);
              t.push(n.oneof);
            }
          } else {
            t.push(n.localName);
            switch (n.kind) {
              case "scalar":
              case "enum":
                if (!n.opt || n.repeat) {
                  e.push(n.localName);
                }
                break;
              case "message":
                if (n.repeat) {
                  e.push(n.localName);
                }
                break;
              case "map":
                e.push(n.localName);
            }
          }
        }
        this.data = {
          req: e,
          known: t,
          oneofs: Object.values(a)
        };
      }
      is(e, t, a = false) {
        if (t < 0) {
          return true;
        }
        if (e == null || typeof e != "object") {
          return false;
        }
        this.prepare();
        let n = Object.keys(e);
        let s = this.data;
        if (n.length < s.req.length || s.req.some(e => !n.includes(e)) || !a && n.some(e => !s.known.includes(e))) {
          return false;
        }
        if (t < 1) {
          return true;
        }
        for (let n of s.oneofs) {
          let s = e[n];
          if (!function (e) {
            if (typeof e != "object" || e === null || !e.hasOwnProperty("oneofKind")) {
              return false;
            }
            switch (typeof e.oneofKind) {
              case "string":
                if (e[e.oneofKind] === undefined) {
                  return false;
                }
                return Object.keys(e).length == 2;
              case "undefined":
                return Object.keys(e).length == 1;
              default:
                return false;
            }
          }(s)) {
            return false;
          }
          if (s.oneofKind === undefined) {
            continue;
          }
          let r = this.fields.find(e => e.localName === s.oneofKind);
          if (!r || !this.field(s[s.oneofKind], r, a, t)) {
            return false;
          }
        }
        for (let n of this.fields) {
          if (n.oneof === undefined && !this.field(e[n.localName], n, a, t)) {
            return false;
          }
        }
        return true;
      }
      field(e, t, a, n) {
        let s = t.repeat;
        switch (t.kind) {
          case "scalar":
            if (e === undefined) {
              return t.opt;
            }
            if (s) {
              return this.scalars(e, t.T, n, t.L);
            }
            return this.scalar(e, t.T, t.L);
          case "enum":
            if (e === undefined) {
              return t.opt;
            }
            if (s) {
              return this.scalars(e, k.INT32, n);
            }
            return this.scalar(e, k.INT32);
          case "message":
            if (e === undefined) {
              break;
            }
            if (s) {
              return this.messages(e, t.T(), a, n);
            }
            return this.message(e, t.T(), a, n);
          case "map":
            if (typeof e != "object" || e === null) {
              return false;
            }
            if (n < 2) {
              break;
            }
            if (!this.mapKeys(e, t.K, n)) {
              return false;
            }
            switch (t.V.kind) {
              case "scalar":
                return this.scalars(Object.values(e), t.V.T, n, t.V.L);
              case "enum":
                return this.scalars(Object.values(e), k.INT32, n);
              case "message":
                return this.messages(Object.values(e), t.V.T(), a, n);
            }
        }
        return true;
      }
      message(e, t, a, n) {
        if (a) {
          return t.isAssignable(e, n);
        } else {
          return t.is(e, n);
        }
      }
      messages(e, t, a, n) {
        if (!Array.isArray(e)) {
          return false;
        }
        if (n < 2) {
          return true;
        }
        if (a) {
          for (let a = 0; a < e.length && a < n; a++) {
            if (!t.isAssignable(e[a], n - 1)) {
              return false;
            }
          }
        } else {
          for (let a = 0; a < e.length && a < n; a++) {
            if (!t.is(e[a], n - 1)) {
              return false;
            }
          }
        }
        return true;
      }
      scalar(e, t, a) {
        let n = typeof e;
        switch (t) {
          case k.UINT64:
          case k.FIXED64:
          case k.INT64:
          case k.SFIXED64:
          case k.SINT64:
            switch (a) {
              case x.BIGINT:
                return n == "bigint";
              case x.NUMBER:
                return n == "number" && !isNaN(e);
              default:
                return n == "string";
            }
          case k.BOOL:
            return n == "boolean";
          case k.STRING:
            return n == "string";
          case k.BYTES:
            return e instanceof Uint8Array;
          case k.DOUBLE:
          case k.FLOAT:
            return n == "number" && !isNaN(e);
          default:
            return n == "number" && Number.isInteger(e);
        }
      }
      scalars(e, t, a, n) {
        if (!Array.isArray(e)) {
          return false;
        }
        if (a < 2) {
          return true;
        }
        if (Array.isArray(e)) {
          for (let s = 0; s < e.length && s < a; s++) {
            if (!this.scalar(e[s], t, n)) {
              return false;
            }
          }
        }
        return true;
      }
      mapKeys(e, t, a) {
        let n = Object.keys(e);
        switch (t) {
          case k.INT32:
          case k.FIXED32:
          case k.SFIXED32:
          case k.SINT32:
          case k.UINT32:
            return this.scalars(n.slice(0, a).map(e => parseInt(e)), t, a);
          case k.BOOL:
            return this.scalars(n.slice(0, a).map(e => e == "true" || e != "false" && e), t, a);
          default:
            return this.scalars(n, t, a, x.STRING);
        }
      }
    }
    function R(e) {
      let t = typeof e;
      if (t == "object") {
        if (Array.isArray(e)) {
          return "array";
        }
        if (e === null) {
          return "null";
        }
      }
      return t;
    }
    let U = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    let D = [];
    for (let e = 0; e < U.length; e++) {
      D[U[e].charCodeAt(0)] = e;
    }
    function F() {
      let e = 0;
      let t = 0;
      for (let a = 0; a < 28; a += 7) {
        let n = this.buf[this.pos++];
        e |= (n & 127) << a;
        if ((n & 128) == 0) {
          this.assertBounds();
          return [e, t];
        }
      }
      let a = this.buf[this.pos++];
      e |= (a & 15) << 28;
      t = (a & 112) >> 4;
      if ((a & 128) == 0) {
        this.assertBounds();
        return [e, t];
      }
      for (let a = 3; a <= 31; a += 7) {
        let n = this.buf[this.pos++];
        t |= (n & 127) << a;
        if ((n & 128) == 0) {
          this.assertBounds();
          return [e, t];
        }
      }
      throw Error("invalid varint");
    }
    function P(e, t, a) {
      for (let n = 0; n < 28; n += 7) {
        let s = e >>> n;
        let r = s >>> 7 != 0 || t != 0;
        let i = (r ? s | 128 : s) & 255;
        a.push(i);
        if (!r) {
          return;
        }
      }
      let n = e >>> 28 & 15 | (t & 7) << 4;
      let s = t >> 3 != 0;
      a.push((s ? n | 128 : n) & 255);
      if (s) {
        for (let e = 3; e < 31; e += 7) {
          let n = t >>> e;
          let s = n >>> 7 != 0;
          let r = (s ? n | 128 : n) & 255;
          a.push(r);
          if (!s) {
            return;
          }
        }
        a.push(t >>> 31 & 1);
      }
    }
    function j(e) {
      let t = e[0] == "-";
      if (t) {
        e = e.slice(1);
      }
      let a = 0;
      let n = 0;
      function s(t, s) {
        let r = Number(e.slice(t, s));
        n *= 1000000;
        if ((a = a * 1000000 + r) >= 4294967296) {
          n += a / 4294967296 | 0;
          a %= 4294967296;
        }
      }
      s(-24, -18);
      s(-18, -12);
      s(-12, -6);
      s(-6);
      return [t, a, n];
    }
    function H(e, t) {
      if (t >>> 0 <= 2097151) {
        return "" + (t * 4294967296 + (e >>> 0));
      }
      let a = (e >>> 24 | t << 8) >>> 0 & 16777215;
      let n = t >> 16 & 65535;
      let s = (e & 16777215) + a * 6777216 + n * 6710656;
      let r = a + n * 8147497;
      let i = n * 2;
      function o(e, t) {
        let a = e ? String(e) : "";
        if (t) {
          return "0000000".slice(a.length) + a;
        } else {
          return a;
        }
      }
      if (s >= 10000000) {
        r += Math.floor(s / 10000000);
        s %= 10000000;
      }
      if (r >= 10000000) {
        i += Math.floor(r / 10000000);
        r %= 10000000;
      }
      return o(i, 0) + o(r, i) + o(s, 1);
    }
    function V(e, t) {
      if (e >= 0) {
        while (e > 127) {
          t.push(e & 127 | 128);
          e >>>= 7;
        }
        t.push(e);
      } else {
        for (let a = 0; a < 9; a++) {
          t.push(e & 127 | 128);
          e >>= 7;
        }
        t.push(1);
      }
    }
    function M() {
      let e = this.buf[this.pos++];
      let t = e & 127;
      if ((e & 128) == 0 || (t |= ((e = this.buf[this.pos++]) & 127) << 7, (e & 128) == 0) || (t |= ((e = this.buf[this.pos++]) & 127) << 14, (e & 128) == 0) || (t |= ((e = this.buf[this.pos++]) & 127) << 21, (e & 128) == 0)) {
        this.assertBounds();
        return t;
      }
      t |= ((e = this.buf[this.pos++]) & 15) << 28;
      for (let t = 5; (e & 128) != 0 && t < 10; t++) {
        e = this.buf[this.pos++];
      }
      if ((e & 128) != 0) {
        throw Error("invalid varint");
      }
      this.assertBounds();
      return t >>> 0;
    }
    function K(e) {
      if (!e) {
        throw Error("BigInt unavailable, see https://github.com/timostamm/protobuf-ts/blob/v1.0.8/MANUAL.md#bigint-support");
      }
    }
    D[45] = U.indexOf("+");
    D[95] = U.indexOf("/");
    t = new DataView(new ArrayBuffer(8));
    e = globalThis.BigInt !== undefined && typeof t.getBigInt64 == "function" && typeof t.getBigUint64 == "function" && typeof t.setBigInt64 == "function" && typeof t.setBigUint64 == "function" ? {
      MIN: BigInt("-9223372036854775808"),
      MAX: BigInt("9223372036854775807"),
      UMIN: BigInt("0"),
      UMAX: BigInt("18446744073709551615"),
      C: BigInt,
      V: t
    } : undefined;
    let z = /^-?[0-9]+$/;
    class _ {
      constructor(e, t) {
        this.lo = e | 0;
        this.hi = t | 0;
      }
      isZero() {
        return this.lo == 0 && this.hi == 0;
      }
      toNumber() {
        let e = this.hi * 4294967296 + (this.lo >>> 0);
        if (!Number.isSafeInteger(e)) {
          throw Error("cannot convert to safe number");
        }
        return e;
      }
    }
    class G extends _ {
      static from(t) {
        if (e) {
          switch (typeof t) {
            case "string":
              if (t == "0") {
                return this.ZERO;
              }
              if (t == "") {
                throw Error("string is no integer");
              }
              t = e.C(t);
            case "number":
              if (t === 0) {
                return this.ZERO;
              }
              t = e.C(t);
            case "bigint":
              if (!t) {
                return this.ZERO;
              }
              if (t < e.UMIN) {
                throw Error("signed value for ulong");
              }
              if (t > e.UMAX) {
                throw Error("ulong too large");
              }
              e.V.setBigUint64(0, t, true);
              return new G(e.V.getInt32(0, true), e.V.getInt32(4, true));
          }
        } else {
          switch (typeof t) {
            case "string":
              if (t == "0") {
                return this.ZERO;
              }
              t = t.trim();
              if (!z.test(t)) {
                throw Error("string is no integer");
              }
              let [a, n, s] = j(t);
              if (a) {
                throw Error("signed value for ulong");
              }
              return new G(n, s);
            case "number":
              if (t == 0) {
                return this.ZERO;
              }
              if (!Number.isSafeInteger(t)) {
                throw Error("number is no integer");
              }
              if (t < 0) {
                throw Error("signed value for ulong");
              }
              return new G(t, t / 4294967296);
          }
        }
        throw Error("unknown value " + typeof t);
      }
      toString() {
        if (e) {
          return this.toBigInt().toString();
        } else {
          return H(this.lo, this.hi);
        }
      }
      toBigInt() {
        K(e);
        e.V.setInt32(0, this.lo, true);
        e.V.setInt32(4, this.hi, true);
        return e.V.getBigUint64(0, true);
      }
    }
    G.ZERO = new G(0, 0);
    class W extends _ {
      static from(t) {
        if (e) {
          switch (typeof t) {
            case "string":
              if (t == "0") {
                return this.ZERO;
              }
              if (t == "") {
                throw Error("string is no integer");
              }
              t = e.C(t);
            case "number":
              if (t === 0) {
                return this.ZERO;
              }
              t = e.C(t);
            case "bigint":
              if (!t) {
                return this.ZERO;
              }
              if (t < e.MIN) {
                throw Error("signed long too small");
              }
              if (t > e.MAX) {
                throw Error("signed long too large");
              }
              e.V.setBigInt64(0, t, true);
              return new W(e.V.getInt32(0, true), e.V.getInt32(4, true));
          }
        } else {
          switch (typeof t) {
            case "string":
              if (t == "0") {
                return this.ZERO;
              }
              t = t.trim();
              if (!z.test(t)) {
                throw Error("string is no integer");
              }
              let [a, n, s] = j(t);
              if (a) {
                if (s > 2147483648 || s == 2147483648 && n != 0) {
                  throw Error("signed long too small");
                }
              } else if (s >= 2147483648) {
                throw Error("signed long too large");
              }
              let r = new W(n, s);
              if (a) {
                return r.negate();
              } else {
                return r;
              }
            case "number":
              if (t == 0) {
                return this.ZERO;
              }
              if (!Number.isSafeInteger(t)) {
                throw Error("number is no integer");
              }
              if (t > 0) {
                return new W(t, t / 4294967296);
              } else {
                return new W(-t, -t / 4294967296).negate();
              }
          }
        }
        throw Error("unknown value " + typeof t);
      }
      isNegative() {
        return (this.hi & -2147483648) != 0;
      }
      negate() {
        let e = ~this.hi;
        let t = this.lo;
        if (t) {
          t = ~t + 1;
        } else {
          e += 1;
        }
        return new W(t, e);
      }
      toString() {
        if (e) {
          return this.toBigInt().toString();
        }
        if (this.isNegative()) {
          let e = this.negate();
          return "-" + H(e.lo, e.hi);
        }
        return H(this.lo, this.hi);
      }
      toBigInt() {
        K(e);
        e.V.setInt32(0, this.lo, true);
        e.V.setInt32(4, this.hi, true);
        return e.V.getBigInt64(0, true);
      }
    }
    function J(e, t) {
      if (!e) {
        throw Error(t);
      }
    }
    function Z(e) {
      if (typeof e != "number") {
        throw Error("invalid int 32: " + typeof e);
      }
      if (!Number.isInteger(e) || e > 2147483647 || e < -2147483648) {
        throw Error("invalid int 32: " + e);
      }
    }
    function X(e) {
      if (typeof e != "number") {
        throw Error("invalid uint 32: " + typeof e);
      }
      if (!Number.isInteger(e) || e > 4294967295 || e < 0) {
        throw Error("invalid uint 32: " + e);
      }
    }
    function q(e) {
      if (typeof e != "number") {
        throw Error("invalid float 32: " + typeof e);
      }
      if (Number.isFinite(e) && (e > 3.4028234663852886e+38 || e < -3.4028234663852886e+38)) {
        throw Error("invalid float 32: " + e);
      }
    }
    function Y(e, t) {
      switch (t) {
        case x.BIGINT:
          return e.toBigInt();
        case x.NUMBER:
          return e.toNumber();
        default:
          return e.toString();
      }
    }
    W.ZERO = new W(0, 0);
    class Q {
      constructor(e) {
        this.info = e;
      }
      prepare() {
        if (this.fMap === undefined) {
          this.fMap = {};
          for (let t of this.info.fields ?? []) {
            this.fMap[t.name] = t;
            this.fMap[t.jsonName] = t;
            this.fMap[t.localName] = t;
          }
        }
      }
      assert(e, t, a) {
        if (!e) {
          let e = R(a);
          if (e == "number" || e == "boolean") {
            e = a.toString();
          }
          throw Error(`Cannot parse JSON ${e} for ${this.info.typeName}#${t}`);
        }
      }
      read(e, t, a) {
        this.prepare();
        let n = [];
        for (let [s, r] of Object.entries(e)) {
          let e;
          let i = this.fMap[s];
          if (!i) {
            if (!a.ignoreUnknownFields) {
              throw Error(`Found unknown field while reading ${this.info.typeName} from JSON format. JSON key: ${s}`);
            }
            continue;
          }
          let o = i.localName;
          if (i.oneof) {
            if (r === null && (i.kind !== "enum" || i.T()[0] !== "google.protobuf.NullValue")) {
              continue;
            }
            if (n.includes(i.oneof)) {
              throw Error(`Multiple members of the oneof group "${i.oneof}" of ${this.info.typeName} are present in JSON.`);
            }
            n.push(i.oneof);
            e = t[i.oneof] = {
              oneofKind: o
            };
          } else {
            e = t;
          }
          if (i.kind == "map") {
            if (r === null) {
              continue;
            }
            this.assert(r !== null && typeof r == "object" && !Array.isArray(r), i.name, r);
            let t = e[o];
            for (let [e, n] of Object.entries(r)) {
              let s;
              this.assert(n !== null, i.name + " map value", null);
              switch (i.V.kind) {
                case "message":
                  s = i.V.T().internalJsonRead(n, a);
                  break;
                case "enum":
                  if ((s = this.enum(i.V.T(), n, i.name, a.ignoreUnknownFields)) === false) {
                    continue;
                  }
                  break;
                case "scalar":
                  s = this.scalar(n, i.V.T, i.V.L, i.name);
              }
              this.assert(s !== undefined, i.name + " map value", n);
              let r = e;
              if (i.K == k.BOOL) {
                r = r == "true" || r != "false" && r;
              }
              t[r = this.scalar(r, i.K, x.STRING, i.name).toString()] = s;
            }
          } else if (i.repeat) {
            if (r === null) {
              continue;
            }
            this.assert(Array.isArray(r), i.name, r);
            let t = e[o];
            for (let e of r) {
              let n;
              this.assert(e !== null, i.name, null);
              switch (i.kind) {
                case "message":
                  n = i.T().internalJsonRead(e, a);
                  break;
                case "enum":
                  if ((n = this.enum(i.T(), e, i.name, a.ignoreUnknownFields)) === false) {
                    continue;
                  }
                  break;
                case "scalar":
                  n = this.scalar(e, i.T, i.L, i.name);
              }
              this.assert(n !== undefined, i.name, r);
              t.push(n);
            }
          } else {
            switch (i.kind) {
              case "message":
                if (r === null && i.T().typeName != "google.protobuf.Value") {
                  this.assert(i.oneof === undefined, i.name + " (oneof member)", null);
                  continue;
                }
                e[o] = i.T().internalJsonRead(r, a, e[o]);
                break;
              case "enum":
                if (r === null) {
                  continue;
                }
                let l = this.enum(i.T(), r, i.name, a.ignoreUnknownFields);
                if (l === false) {
                  continue;
                }
                e[o] = l;
                break;
              case "scalar":
                if (r === null) {
                  continue;
                }
                e[o] = this.scalar(r, i.T, i.L, i.name);
            }
          }
        }
      }
      enum(e, t, a, n) {
        if (e[0] == "google.protobuf.NullValue") {
          J(t === null || t === "NULL_VALUE", `Unable to parse field ${this.info.typeName}#${a}, enum ${e[0]} only accepts null.`);
        }
        if (t === null) {
          return 0;
        }
        switch (typeof t) {
          case "number":
            J(Number.isInteger(t), `Unable to parse field ${this.info.typeName}#${a}, enum can only be integral number, got ${t}.`);
            return t;
          case "string":
            let s = t;
            if (e[2] && t.substring(0, e[2].length) === e[2]) {
              s = t.substring(e[2].length);
            }
            let r = e[1][s];
            if (r === undefined && n) {
              return false;
            }
            J(typeof r == "number", `Unable to parse field ${this.info.typeName}#${a}, enum ${e[0]} has no value for "${t}".`);
            return r;
        }
        J(false, `Unable to parse field ${this.info.typeName}#${a}, cannot parse enum value from ${typeof t}".`);
      }
      scalar(e, t, a, n) {
        let s;
        try {
          switch (t) {
            case k.DOUBLE:
            case k.FLOAT:
              if (e === null) {
                return 0;
              }
              if (e === "NaN") {
                return NaN;
              }
              if (e === "Infinity") {
                return Infinity;
              }
              if (e === "-Infinity") {
                return -Infinity;
              }
              if (e === "") {
                s = "empty string";
                break;
              }
              if (typeof e == "string" && e.trim().length !== e.length) {
                s = "extra whitespace";
                break;
              }
              if (typeof e != "string" && typeof e != "number") {
                break;
              }
              let n = Number(e);
              if (Number.isNaN(n)) {
                s = "not a number";
                break;
              }
              if (!Number.isFinite(n)) {
                s = "too large or small";
                break;
              }
              if (t == k.FLOAT) {
                q(n);
              }
              return n;
            case k.INT32:
            case k.FIXED32:
            case k.SFIXED32:
            case k.SINT32:
            case k.UINT32:
              let r;
              if (e === null) {
                return 0;
              }
              if (typeof e == "number") {
                r = e;
              } else if (e === "") {
                s = "empty string";
              } else if (typeof e == "string") {
                if (e.trim().length !== e.length) {
                  s = "extra whitespace";
                } else {
                  r = Number(e);
                }
              }
              if (r === undefined) {
                break;
              }
              if (t == k.UINT32) {
                X(r);
              } else {
                Z(r);
              }
              return r;
            case k.INT64:
            case k.SFIXED64:
            case k.SINT64:
              if (e === null) {
                return Y(W.ZERO, a);
              }
              if (typeof e != "number" && typeof e != "string") {
                break;
              }
              return Y(W.from(e), a);
            case k.FIXED64:
            case k.UINT64:
              if (e === null) {
                return Y(G.ZERO, a);
              }
              if (typeof e != "number" && typeof e != "string") {
                break;
              }
              return Y(G.from(e), a);
            case k.BOOL:
              if (e === null) {
                return false;
              }
              if (typeof e != "boolean") {
                break;
              }
              return e;
            case k.STRING:
              if (e === null) {
                return "";
              }
              if (typeof e != "string") {
                s = "extra whitespace";
                break;
              }
              try {
                encodeURIComponent(e);
              } catch (e) {
                break;
              }
              return e;
            case k.BYTES:
              if (e === null || e === "") {
                return new Uint8Array(0);
              }
              if (typeof e != "string") {
                break;
              }
              return function (e) {
                let t = e.length * 3 / 4;
                if (e[e.length - 2] == "=") {
                  t -= 2;
                } else if (e[e.length - 1] == "=") {
                  t -= 1;
                }
                let a = new Uint8Array(t);
                let n = 0;
                let s = 0;
                let r;
                let i = 0;
                for (let t = 0; t < e.length; t++) {
                  if ((r = D[e.charCodeAt(t)]) === undefined) {
                    switch (e[t]) {
                      case "=":
                        s = 0;
                      case "\n":
                      case "\r":
                      case "\t":
                      case " ":
                        continue;
                      default:
                        throw Error("invalid base64 string.");
                    }
                  }
                  switch (s) {
                    case 0:
                      i = r;
                      s = 1;
                      break;
                    case 1:
                      a[n++] = i << 2 | (r & 48) >> 4;
                      i = r;
                      s = 2;
                      break;
                    case 2:
                      a[n++] = (i & 15) << 4 | (r & 60) >> 2;
                      i = r;
                      s = 3;
                      break;
                    case 3:
                      a[n++] = (i & 3) << 6 | r;
                      s = 0;
                  }
                }
                if (s == 1) {
                  throw Error("invalid base64 string.");
                }
                return a.subarray(0, n);
              }(e);
          }
        } catch (e) {
          s = e.message;
        }
        this.assert(false, n + (s ? " - " + s : ""), e);
      }
    }
    class ee {
      constructor(e) {
        this.fields = e.fields ?? [];
      }
      write(e, t) {
        let a = {};
        for (let n of this.fields) {
          if (!n.oneof) {
            let s = this.field(n, e[n.localName], t);
            if (s !== undefined) {
              a[t.useProtoFieldName ? n.name : n.jsonName] = s;
            }
            continue;
          }
          let s = e[n.oneof];
          if (s.oneofKind !== n.localName) {
            continue;
          }
          let r = n.kind == "scalar" || n.kind == "enum" ? Object.assign(Object.assign({}, t), {
            emitDefaultValues: true
          }) : t;
          let i = this.field(n, s[n.localName], r);
          J(i !== undefined);
          a[t.useProtoFieldName ? n.name : n.jsonName] = i;
        }
        return a;
      }
      field(e, t, a) {
        let n;
        if (e.kind == "map") {
          J(typeof t == "object" && t !== null);
          let s = {};
          switch (e.V.kind) {
            case "scalar":
              for (let [a, n] of Object.entries(t)) {
                let t = this.scalar(e.V.T, n, e.name, false, true);
                J(t !== undefined);
                s[a.toString()] = t;
              }
              break;
            case "message":
              let r = e.V.T();
              for (let [n, i] of Object.entries(t)) {
                let t = this.message(r, i, e.name, a);
                J(t !== undefined);
                s[n.toString()] = t;
              }
              break;
            case "enum":
              let i = e.V.T();
              for (let [n, r] of Object.entries(t)) {
                J(r === undefined || typeof r == "number");
                let t = this.enum(i, r, e.name, false, true, a.enumAsInteger);
                J(t !== undefined);
                s[n.toString()] = t;
              }
          }
          if (a.emitDefaultValues || Object.keys(s).length > 0) {
            n = s;
          }
        } else if (e.repeat) {
          J(Array.isArray(t));
          let s = [];
          switch (e.kind) {
            case "scalar":
              for (let a = 0; a < t.length; a++) {
                let n = this.scalar(e.T, t[a], e.name, e.opt, true);
                J(n !== undefined);
                s.push(n);
              }
              break;
            case "enum":
              let r = e.T();
              for (let n = 0; n < t.length; n++) {
                J(t[n] === undefined || typeof t[n] == "number");
                let i = this.enum(r, t[n], e.name, e.opt, true, a.enumAsInteger);
                J(i !== undefined);
                s.push(i);
              }
              break;
            case "message":
              let i = e.T();
              for (let n = 0; n < t.length; n++) {
                let r = this.message(i, t[n], e.name, a);
                J(r !== undefined);
                s.push(r);
              }
          }
          if (a.emitDefaultValues || s.length > 0 || a.emitDefaultValues) {
            n = s;
          }
        } else {
          switch (e.kind) {
            case "scalar":
              n = this.scalar(e.T, t, e.name, e.opt, a.emitDefaultValues);
              break;
            case "enum":
              n = this.enum(e.T(), t, e.name, e.opt, a.emitDefaultValues, a.enumAsInteger);
              break;
            case "message":
              n = this.message(e.T(), t, e.name, a);
          }
        }
        return n;
      }
      enum(e, t, a, n, s, r) {
        if (e[0] == "google.protobuf.NullValue") {
          if (s || n) {
            return null;
          } else {
            return undefined;
          }
        } else if (t === undefined) {
          J(n);
          return;
        } else if (t !== 0 || s || n) {
          J(typeof t == "number");
          J(Number.isInteger(t));
          if (r || !e[1].hasOwnProperty(t)) {
            return t;
          } else if (e[2]) {
            return e[2] + e[1][t];
          } else {
            return e[1][t];
          }
        } else {
          return undefined;
        }
      }
      message(e, t, a, n) {
        if (t === undefined) {
          if (n.emitDefaultValues) {
            return null;
          } else {
            return undefined;
          }
        } else {
          return e.internalJsonWrite(t, n);
        }
      }
      scalar(e, t, a, n, s) {
        if (t === undefined) {
          J(n);
          return;
        }
        let r = s || n;
        switch (e) {
          case k.INT32:
          case k.SFIXED32:
          case k.SINT32:
            if (t === 0) {
              if (r) {
                return 0;
              } else {
                return undefined;
              }
            }
            Z(t);
            return t;
          case k.FIXED32:
          case k.UINT32:
            if (t === 0) {
              if (r) {
                return 0;
              } else {
                return undefined;
              }
            }
            X(t);
            return t;
          case k.FLOAT:
            q(t);
          case k.DOUBLE:
            if (t === 0) {
              if (r) {
                return 0;
              } else {
                return undefined;
              }
            }
            J(typeof t == "number");
            if (Number.isNaN(t)) {
              return "NaN";
            }
            if (t === Infinity) {
              return "Infinity";
            }
            if (t === -Infinity) {
              return "-Infinity";
            }
            return t;
          case k.STRING:
            if (t === "") {
              if (r) {
                return "";
              } else {
                return undefined;
              }
            }
            J(typeof t == "string");
            return t;
          case k.BOOL:
            if (t === false) {
              return !r && undefined;
            }
            J(typeof t == "boolean");
            return t;
          case k.UINT64:
          case k.FIXED64:
            J(typeof t == "number" || typeof t == "string" || typeof t == "bigint");
            let i = G.from(t);
            if (i.isZero() && !r) {
              return;
            }
            return i.toString();
          case k.INT64:
          case k.SFIXED64:
          case k.SINT64:
            J(typeof t == "number" || typeof t == "string" || typeof t == "bigint");
            let o = W.from(t);
            if (o.isZero() && !r) {
              return;
            }
            return o.toString();
          case k.BYTES:
            J(t instanceof Uint8Array);
            if (!t.byteLength) {
              if (r) {
                return "";
              } else {
                return undefined;
              }
            }
            return function (e) {
              let t = "";
              let a = 0;
              let n;
              let s = 0;
              for (let r = 0; r < e.length; r++) {
                n = e[r];
                switch (a) {
                  case 0:
                    t += U[n >> 2];
                    s = (n & 3) << 4;
                    a = 1;
                    break;
                  case 1:
                    t += U[s | n >> 4];
                    s = (n & 15) << 2;
                    a = 2;
                    break;
                  case 2:
                    t += U[s | n >> 6];
                    t += U[n & 63];
                    a = 0;
                }
              }
              if (a) {
                t += U[s];
                t += "=";
                if (a == 1) {
                  t += "=";
                }
              }
              return t;
            }(t);
        }
      }
    }
    function et(e, t = x.STRING) {
      switch (e) {
        case k.BOOL:
          return false;
        case k.UINT64:
        case k.FIXED64:
          return Y(G.ZERO, t);
        case k.INT64:
        case k.SFIXED64:
        case k.SINT64:
          return Y(W.ZERO, t);
        case k.DOUBLE:
        case k.FLOAT:
          return 0;
        case k.BYTES:
          return new Uint8Array(0);
        case k.STRING:
          return "";
        default:
          return 0;
      }
    }
    (T = C ||= {}).symbol = Symbol.for("protobuf-ts/unknown");
    T.onRead = (e, t, a, s, r) => {
      (n(t) ? t[T.symbol] : t[T.symbol] = []).push({
        no: a,
        wireType: s,
        data: r
      });
    };
    T.onWrite = (e, t, a) => {
      for (let {
        no: e,
        wireType: n,
        data: s
      } of T.list(t)) {
        a.tag(e, n).raw(s);
      }
    };
    T.list = (e, t) => {
      if (n(e)) {
        let a = e[T.symbol];
        if (t) {
          return a.filter(e => e.no == t);
        } else {
          return a;
        }
      }
      return [];
    };
    T.last = (e, t) => T.list(e, t).slice(-1)[0];
    n = e => e && Array.isArray(e[T.symbol]);
    (N = v ||= {})[N.Varint = 0] = "Varint";
    N[N.Bit64 = 1] = "Bit64";
    N[N.LengthDelimited = 2] = "LengthDelimited";
    N[N.StartGroup = 3] = "StartGroup";
    N[N.EndGroup = 4] = "EndGroup";
    N[N.Bit32 = 5] = "Bit32";
    class ea {
      constructor(e) {
        this.info = e;
      }
      prepare() {
        if (!this.fieldNoToField) {
          let t = this.info.fields ?? [];
          this.fieldNoToField = new Map(t.map(e => [e.no, e]));
        }
      }
      read(e, t, a, n) {
        this.prepare();
        let s = n === undefined ? e.len : e.pos + n;
        while (e.pos < s) {
          let [n, s] = e.tag();
          let r = this.fieldNoToField.get(n);
          if (!r) {
            let r = a.readUnknownField;
            if (r == "throw") {
              throw Error(`Unknown field ${n} (wire type ${s}) for ${this.info.typeName}`);
            }
            let i = e.skip(s);
            if (r !== false) {
              (r === true ? C.onRead : r)(this.info.typeName, t, n, s, i);
            }
            continue;
          }
          let i = t;
          let o = r.repeat;
          let l = r.localName;
          if (r.oneof && (i = i[r.oneof]).oneofKind !== l) {
            i = t[r.oneof] = {
              oneofKind: l
            };
          }
          switch (r.kind) {
            case "scalar":
            case "enum":
              let u = r.kind == "enum" ? k.INT32 : r.T;
              let g = r.kind == "scalar" ? r.L : undefined;
              if (o) {
                let t = i[l];
                if (s == v.LengthDelimited && u != k.STRING && u != k.BYTES) {
                  let a = e.uint32() + e.pos;
                  while (e.pos < a) {
                    t.push(this.scalar(e, u, g));
                  }
                } else {
                  t.push(this.scalar(e, u, g));
                }
              } else {
                i[l] = this.scalar(e, u, g);
              }
              break;
            case "message":
              if (o) {
                let t = i[l];
                let n = r.T().internalBinaryRead(e, e.uint32(), a);
                t.push(n);
              } else {
                i[l] = r.T().internalBinaryRead(e, e.uint32(), a, i[l]);
              }
              break;
            case "map":
              let [c, d] = this.mapEntry(r, e, a);
              i[l][c] = d;
          }
        }
      }
      mapEntry(e, t, a) {
        let n;
        let s;
        let r = t.uint32();
        let i = t.pos + r;
        while (t.pos < i) {
          let [r, i] = t.tag();
          switch (r) {
            case 1:
              n = e.K == k.BOOL ? t.bool().toString() : this.scalar(t, e.K, x.STRING);
              break;
            case 2:
              switch (e.V.kind) {
                case "scalar":
                  s = this.scalar(t, e.V.T, e.V.L);
                  break;
                case "enum":
                  s = t.int32();
                  break;
                case "message":
                  s = e.V.T().internalBinaryRead(t, t.uint32(), a);
              }
              break;
            default:
              throw Error(`Unknown field ${r} (wire type ${i}) in map entry for ${this.info.typeName}#${e.name}`);
          }
        }
        if (n === undefined) {
          let t = et(e.K);
          n = e.K == k.BOOL ? t.toString() : t;
        }
        if (s === undefined) {
          switch (e.V.kind) {
            case "scalar":
              s = et(e.V.T, e.V.L);
              break;
            case "enum":
              s = 0;
              break;
            case "message":
              s = e.V.T().create();
          }
        }
        return [n, s];
      }
      scalar(e, t, a) {
        switch (t) {
          case k.INT32:
            return e.int32();
          case k.STRING:
            return e.string();
          case k.BOOL:
            return e.bool();
          case k.DOUBLE:
            return e.double();
          case k.FLOAT:
            return e.float();
          case k.INT64:
            return Y(e.int64(), a);
          case k.UINT64:
            return Y(e.uint64(), a);
          case k.FIXED64:
            return Y(e.fixed64(), a);
          case k.FIXED32:
            return e.fixed32();
          case k.BYTES:
            return e.bytes();
          case k.UINT32:
            return e.uint32();
          case k.SFIXED32:
            return e.sfixed32();
          case k.SFIXED64:
            return Y(e.sfixed64(), a);
          case k.SINT32:
            return e.sint32();
          case k.SINT64:
            return Y(e.sint64(), a);
        }
      }
    }
    class en {
      constructor(e) {
        this.info = e;
      }
      prepare() {
        if (!this.fields) {
          let e = this.info.fields ? this.info.fields.concat() : [];
          this.fields = e.sort((e, t) => e.no - t.no);
        }
      }
      write(e, t, a) {
        this.prepare();
        for (let n of this.fields) {
          let s;
          let r;
          let i = n.repeat;
          let o = n.localName;
          if (n.oneof) {
            let t = e[n.oneof];
            if (t.oneofKind !== o) {
              continue;
            }
            s = t[o];
            r = true;
          } else {
            s = e[o];
            r = false;
          }
          switch (n.kind) {
            case "scalar":
            case "enum":
              let l = n.kind == "enum" ? k.INT32 : n.T;
              if (i) {
                J(Array.isArray(s));
                if (i == S.PACKED) {
                  this.packed(t, l, n.no, s);
                } else {
                  for (let e of s) {
                    this.scalar(t, l, n.no, e, true);
                  }
                }
              } else if (s === undefined) {
                J(n.opt);
              } else {
                this.scalar(t, l, n.no, s, r || n.opt);
              }
              break;
            case "message":
              if (i) {
                J(Array.isArray(s));
                for (let e of s) {
                  this.message(t, a, n.T(), n.no, e);
                }
              } else {
                this.message(t, a, n.T(), n.no, s);
              }
              break;
            case "map":
              J(typeof s == "object" && s !== null);
              for (let [e, r] of Object.entries(s)) {
                this.mapEntry(t, a, n, e, r);
              }
          }
        }
        let n = a.writeUnknownFields;
        if (n !== false) {
          (n === true ? C.onWrite : n)(this.info.typeName, e, t);
        }
      }
      mapEntry(e, t, a, n, s) {
        e.tag(a.no, v.LengthDelimited);
        e.fork();
        let r = n;
        switch (a.K) {
          case k.INT32:
          case k.FIXED32:
          case k.UINT32:
          case k.SFIXED32:
          case k.SINT32:
            r = Number.parseInt(n);
            break;
          case k.BOOL:
            J(n == "true" || n == "false");
            r = n == "true";
        }
        this.scalar(e, a.K, 1, r, true);
        switch (a.V.kind) {
          case "scalar":
            this.scalar(e, a.V.T, 2, s, true);
            break;
          case "enum":
            this.scalar(e, k.INT32, 2, s, true);
            break;
          case "message":
            this.message(e, t, a.V.T(), 2, s);
        }
        e.join();
      }
      message(e, t, a, n, s) {
        if (s !== undefined) {
          a.internalBinaryWrite(s, e.tag(n, v.LengthDelimited).fork(), t);
          e.join();
        }
      }
      scalar(e, t, a, n, s) {
        let [r, i, o] = this.scalarInfo(t, n);
        if (!o || s) {
          e.tag(a, r);
          e[i](n);
        }
      }
      packed(e, t, a, n) {
        if (!n.length) {
          return;
        }
        J(t !== k.BYTES && t !== k.STRING);
        e.tag(a, v.LengthDelimited);
        e.fork();
        let [, s] = this.scalarInfo(t);
        for (let t = 0; t < n.length; t++) {
          e[s](n[t]);
        }
        e.join();
      }
      scalarInfo(e, t) {
        let a;
        let n = v.Varint;
        let s = t === undefined;
        let r = t === 0;
        switch (e) {
          case k.INT32:
            a = "int32";
            break;
          case k.STRING:
            r = s || !t.length;
            n = v.LengthDelimited;
            a = "string";
            break;
          case k.BOOL:
            r = t === false;
            a = "bool";
            break;
          case k.UINT32:
            a = "uint32";
            break;
          case k.DOUBLE:
            n = v.Bit64;
            a = "double";
            break;
          case k.FLOAT:
            n = v.Bit32;
            a = "float";
            break;
          case k.INT64:
            r = s || W.from(t).isZero();
            a = "int64";
            break;
          case k.UINT64:
            r = s || G.from(t).isZero();
            a = "uint64";
            break;
          case k.FIXED64:
            r = s || G.from(t).isZero();
            n = v.Bit64;
            a = "fixed64";
            break;
          case k.BYTES:
            r = s || !t.byteLength;
            n = v.LengthDelimited;
            a = "bytes";
            break;
          case k.FIXED32:
            n = v.Bit32;
            a = "fixed32";
            break;
          case k.SFIXED32:
            n = v.Bit32;
            a = "sfixed32";
            break;
          case k.SFIXED64:
            r = s || W.from(t).isZero();
            n = v.Bit64;
            a = "sfixed64";
            break;
          case k.SINT32:
            a = "sint32";
            break;
          case k.SINT64:
            r = s || W.from(t).isZero();
            a = "sint64";
        }
        return [n, a, s || r];
      }
    }
    function es(e, t, a) {
      let n;
      let s;
      for (let r of e.fields) {
        let e = r.localName;
        if (r.oneof) {
          let i = a[r.oneof];
          if ((i == null ? undefined : i.oneofKind) == undefined) {
            continue;
          }
          n = i[e];
          (s = t[r.oneof]).oneofKind = i.oneofKind;
          if (n == undefined) {
            delete s[e];
            continue;
          }
        } else {
          n = a[e];
          s = t;
          if (n == undefined) {
            continue;
          }
        }
        if (r.repeat) {
          s[e].length = n.length;
        }
        switch (r.kind) {
          case "scalar":
          case "enum":
            if (r.repeat) {
              for (let t = 0; t < n.length; t++) {
                s[e][t] = n[t];
              }
            } else {
              s[e] = n;
            }
            break;
          case "message":
            let i = r.T();
            if (r.repeat) {
              for (let t = 0; t < n.length; t++) {
                s[e][t] = i.create(n[t]);
              }
            } else if (s[e] === undefined) {
              s[e] = i.create(n);
            } else {
              i.mergePartial(s[e], n);
            }
            break;
          case "map":
            switch (r.V.kind) {
              case "scalar":
              case "enum":
                Object.assign(s[e], n);
                break;
              case "message":
                let o = r.V.T();
                for (let t of Object.keys(n)) {
                  s[e][t] = o.create(n[t]);
                }
            }
        }
      }
    }
    let er = {
      emitDefaultValues: false,
      enumAsInteger: false,
      useProtoFieldName: false,
      prettySpaces: 0
    };
    let ei = {
      ignoreUnknownFields: false
    };
    let eo = Object.values;
    function el(e, t, a) {
      if (t === a) {
        return true;
      }
      if (e !== k.BYTES || t.length !== a.length) {
        return false;
      }
      for (let e = 0; e < t.length; e++) {
        if (t[e] != a[e]) {
          return false;
        }
      }
      return true;
    }
    function eu(e, t, a) {
      if (t.length !== a.length) {
        return false;
      }
      for (let n = 0; n < t.length; n++) {
        if (!el(e, t[n], a[n])) {
          return false;
        }
      }
      return true;
    }
    function eg(e, t, a) {
      if (t.length !== a.length) {
        return false;
      }
      for (let n = 0; n < t.length; n++) {
        if (!e.equals(t[n], a[n])) {
          return false;
        }
      }
      return true;
    }
    let ec = {
      writeUnknownFields: true,
      writerFactory: () => new ed()
    };
    class ed {
      constructor(e) {
        this.stack = [];
        this.textEncoder = e ?? new TextEncoder();
        this.chunks = [];
        this.buf = [];
      }
      finish() {
        this.chunks.push(new Uint8Array(this.buf));
        let e = 0;
        for (let t = 0; t < this.chunks.length; t++) {
          e += this.chunks[t].length;
        }
        let t = new Uint8Array(e);
        let a = 0;
        for (let e = 0; e < this.chunks.length; e++) {
          t.set(this.chunks[e], a);
          a += this.chunks[e].length;
        }
        this.chunks = [];
        return t;
      }
      fork() {
        this.stack.push({
          chunks: this.chunks,
          buf: this.buf
        });
        this.chunks = [];
        this.buf = [];
        return this;
      }
      join() {
        let e = this.finish();
        let t = this.stack.pop();
        if (!t) {
          throw Error("invalid state, fork stack empty");
        }
        this.chunks = t.chunks;
        this.buf = t.buf;
        this.uint32(e.byteLength);
        return this.raw(e);
      }
      tag(e, t) {
        return this.uint32((e << 3 | t) >>> 0);
      }
      raw(e) {
        if (this.buf.length) {
          this.chunks.push(new Uint8Array(this.buf));
          this.buf = [];
        }
        this.chunks.push(e);
        return this;
      }
      uint32(e) {
        for (X(e); e > 127;) {
          this.buf.push(e & 127 | 128);
          e >>>= 7;
        }
        this.buf.push(e);
        return this;
      }
      int32(e) {
        Z(e);
        V(e, this.buf);
        return this;
      }
      bool(e) {
        this.buf.push(+!!e);
        return this;
      }
      bytes(e) {
        this.uint32(e.byteLength);
        return this.raw(e);
      }
      string(e) {
        let t = this.textEncoder.encode(e);
        this.uint32(t.byteLength);
        return this.raw(t);
      }
      float(e) {
        q(e);
        let t = new Uint8Array(4);
        new DataView(t.buffer).setFloat32(0, e, true);
        return this.raw(t);
      }
      double(e) {
        let t = new Uint8Array(8);
        new DataView(t.buffer).setFloat64(0, e, true);
        return this.raw(t);
      }
      fixed32(e) {
        X(e);
        let t = new Uint8Array(4);
        new DataView(t.buffer).setUint32(0, e, true);
        return this.raw(t);
      }
      sfixed32(e) {
        Z(e);
        let t = new Uint8Array(4);
        new DataView(t.buffer).setInt32(0, e, true);
        return this.raw(t);
      }
      sint32(e) {
        Z(e);
        V(e = (e << 1 ^ e >> 31) >>> 0, this.buf);
        return this;
      }
      sfixed64(e) {
        let t = new Uint8Array(8);
        let a = new DataView(t.buffer);
        let n = W.from(e);
        a.setInt32(0, n.lo, true);
        a.setInt32(4, n.hi, true);
        return this.raw(t);
      }
      fixed64(e) {
        let t = new Uint8Array(8);
        let a = new DataView(t.buffer);
        let n = G.from(e);
        a.setInt32(0, n.lo, true);
        a.setInt32(4, n.hi, true);
        return this.raw(t);
      }
      int64(e) {
        let t = W.from(e);
        P(t.lo, t.hi, this.buf);
        return this;
      }
      sint64(e) {
        let t = W.from(e);
        let a = t.hi >> 31;
        P(t.lo << 1 ^ a, (t.hi << 1 | t.lo >>> 31) ^ a, this.buf);
        return this;
      }
      uint64(e) {
        let t = G.from(e);
        P(t.lo, t.hi, this.buf);
        return this;
      }
    }
    let eh = {
      readUnknownField: true,
      readerFactory: e => new ep(e)
    };
    class ep {
      constructor(e, t) {
        this.varint64 = F;
        this.uint32 = M;
        this.buf = e;
        this.len = e.length;
        this.pos = 0;
        this.view = new DataView(e.buffer, e.byteOffset, e.byteLength);
        this.textDecoder = t ?? new TextDecoder("utf-8", {
          fatal: true,
          ignoreBOM: true
        });
      }
      tag() {
        let e = this.uint32();
        let t = e >>> 3;
        let a = e & 7;
        if (t <= 0 || a < 0 || a > 5) {
          throw Error("illegal tag: field no " + t + " wire type " + a);
        }
        return [t, a];
      }
      skip(e) {
        let t = this.pos;
        switch (e) {
          case v.Varint:
            while (this.buf[this.pos++] & 128);
            break;
          case v.Bit64:
            this.pos += 4;
          case v.Bit32:
            this.pos += 4;
            break;
          case v.LengthDelimited:
            let a = this.uint32();
            this.pos += a;
            break;
          case v.StartGroup:
            let n;
            while ((n = this.tag()[1]) !== v.EndGroup) {
              this.skip(n);
            }
            break;
          default:
            throw Error("cant skip wire type " + e);
        }
        this.assertBounds();
        return this.buf.subarray(t, this.pos);
      }
      assertBounds() {
        if (this.pos > this.len) {
          throw RangeError("premature EOF");
        }
      }
      int32() {
        return this.uint32() | 0;
      }
      sint32() {
        let e = this.uint32();
        return e >>> 1 ^ -(e & 1);
      }
      int64() {
        return new W(...this.varint64());
      }
      uint64() {
        return new G(...this.varint64());
      }
      sint64() {
        let [e, t] = this.varint64();
        let a = -(e & 1);
        return new W(e = (e >>> 1 | (t & 1) << 31) ^ a, t = t >>> 1 ^ a);
      }
      bool() {
        let [e, t] = this.varint64();
        return e !== 0 || t !== 0;
      }
      fixed32() {
        return this.view.getUint32((this.pos += 4) - 4, true);
      }
      sfixed32() {
        return this.view.getInt32((this.pos += 4) - 4, true);
      }
      fixed64() {
        return new G(this.sfixed32(), this.sfixed32());
      }
      sfixed64() {
        return new W(this.sfixed32(), this.sfixed32());
      }
      float() {
        return this.view.getFloat32((this.pos += 4) - 4, true);
      }
      double() {
        return this.view.getFloat64((this.pos += 8) - 8, true);
      }
      bytes() {
        let e = this.uint32();
        let t = this.pos;
        this.pos += e;
        this.assertBounds();
        return this.buf.subarray(t, t + e);
      }
      string() {
        return this.textDecoder.decode(this.bytes());
      }
    }
    let em = Object.getOwnPropertyDescriptors(Object.getPrototypeOf({}));
    let ef = em[I] = {};
    class ey {
      constructor(e, t, a) {
        this.defaultCheckDepth = 16;
        this.typeName = e;
        this.fields = t.map(O);
        this.options = a ?? {};
        ef.value = this;
        this.messagePrototype = Object.create(null, em);
        this.refTypeCheck = new $(this);
        this.refJsonReader = new Q(this);
        this.refJsonWriter = new ee(this);
        this.refBinReader = new ea(this);
        this.refBinWriter = new en(this);
      }
      create(e) {
        let t = function (e) {
          let t = e.messagePrototype ? Object.create(e.messagePrototype) : Object.defineProperty({}, I, {
            value: e
          });
          for (let a of e.fields) {
            let e = a.localName;
            if (!a.opt) {
              if (a.oneof) {
                t[a.oneof] = {
                  oneofKind: undefined
                };
              } else if (a.repeat) {
                t[e] = [];
              } else {
                switch (a.kind) {
                  case "scalar":
                    t[e] = et(a.T, a.L);
                    break;
                  case "enum":
                    t[e] = 0;
                    break;
                  case "map":
                    t[e] = {};
                }
              }
            }
          }
          return t;
        }(this);
        if (e !== undefined) {
          es(this, t, e);
        }
        return t;
      }
      clone(e) {
        let t = this.create();
        es(this, t, e);
        return t;
      }
      equals(e, t) {
        return function (e, t, a) {
          if (t === a) {
            return true;
          }
          if (!t || !a) {
            return false;
          }
          for (let n of e.fields) {
            let e = n.localName;
            let s = n.oneof ? t[n.oneof][e] : t[e];
            let r = n.oneof ? a[n.oneof][e] : a[e];
            switch (n.kind) {
              case "enum":
              case "scalar":
                let i = n.kind == "enum" ? k.INT32 : n.T;
                if (!(n.repeat ? eu(i, s, r) : el(i, s, r))) {
                  return false;
                }
                break;
              case "map":
                if (!(n.V.kind == "message" ? eg(n.V.T(), eo(s), eo(r)) : eu(n.V.kind == "enum" ? k.INT32 : n.V.T, eo(s), eo(r)))) {
                  return false;
                }
                break;
              case "message":
                let o = n.T();
                if (!(n.repeat ? eg(o, s, r) : o.equals(s, r))) {
                  return false;
                }
            }
          }
          return true;
        }(this, e, t);
      }
      is(e, t = this.defaultCheckDepth) {
        return this.refTypeCheck.is(e, t, false);
      }
      isAssignable(e, t = this.defaultCheckDepth) {
        return this.refTypeCheck.is(e, t, true);
      }
      mergePartial(e, t) {
        es(this, e, t);
      }
      fromBinary(e, t) {
        let a = t ? Object.assign(Object.assign({}, eh), t) : eh;
        return this.internalBinaryRead(a.readerFactory(e), e.byteLength, a);
      }
      fromJson(e, t) {
        return this.internalJsonRead(e, t ? Object.assign(Object.assign({}, ei), t) : ei);
      }
      fromJsonString(e, t) {
        let a = JSON.parse(e);
        return this.fromJson(a, t);
      }
      toJson(e, t) {
        return this.internalJsonWrite(e, t ? Object.assign(Object.assign({}, er), t) : er);
      }
      toJsonString(e, t) {
        return JSON.stringify(this.toJson(e, t), null, (t == null ? undefined : t.prettySpaces) ?? 0);
      }
      toBinary(e, t) {
        let a = t ? Object.assign(Object.assign({}, ec), t) : ec;
        return this.internalBinaryWrite(e, a.writerFactory(), a).finish();
      }
      internalJsonRead(e, t, a) {
        if (e !== null && typeof e == "object" && !Array.isArray(e)) {
          let n = a ?? this.create();
          this.refJsonReader.read(e, n, t);
          return n;
        }
        throw Error(`Unable to parse message ${this.typeName} from JSON ${R(e)}.`);
      }
      internalJsonWrite(e, t) {
        return this.refJsonWriter.write(e, t);
      }
      internalBinaryWrite(e, t, a) {
        this.refBinWriter.write(e, t, a);
        return t;
      }
      internalBinaryRead(e, t, a, n) {
        let s = n ?? this.create();
        this.refBinReader.read(e, s, a, t);
        return s;
      }
    }
    let eb = new class extends ey {
      constructor() {
        super("BrowseResponse", [{
          no: 9,
          name: "contents",
          kind: "message",
          T: () => eT
        }, {
          no: 10,
          name: "continuationContents",
          kind: "message",
          T: () => eN
        }]);
      }
    }();
    let eT = new class extends ey {
      constructor() {
        super("BrowseResponseSupportedRenderers", [{
          no: 49399797,
          name: "section_list_renderer",
          kind: "message",
          oneof: "renderer",
          T: () => eS
        }, {
          no: 58173949,
          name: "single_column_browse_results_renderer",
          kind: "message",
          oneof: "renderer",
          T: () => ew
        }, {
          no: 153515154,
          name: "element_renderer",
          kind: "message",
          oneof: "renderer",
          T: () => eA
        }]);
      }
    }();
    let eN = new class extends ey {
      constructor() {
        super("ContinuationSupportedRenderers", [{
          no: 221496734,
          name: "music_description_shelf_renderer",
          kind: "message",
          T: () => ev
        }]);
      }
    }();
    let ew = new class extends ey {
      constructor() {
        super("SingleColumnBrowseResultsRenderer", [{
          no: 1,
          name: "tabs",
          kind: "message",
          repeat: 1,
          T: () => ek
        }, {
          no: 2,
          name: "hide_tab_bar",
          kind: "scalar",
          opt: true,
          T: 8
        }, {
          no: 3,
          name: "disable_tab_swiping",
          kind: "scalar",
          opt: true,
          T: 8
        }, {
          no: 4,
          name: "disable_tab_navbar_title_update",
          kind: "scalar",
          opt: true,
          T: 8
        }]);
      }
    }();
    let ek = new class extends ey {
      constructor() {
        super("BrowseTabSupportedRenderers", [{
          no: 58174010,
          name: "tab_renderer",
          kind: "message",
          oneof: "renderer",
          T: () => ex
        }]);
      }
    }();
    let ex = new class extends ey {
      constructor() {
        super("TabRenderer", [{
          no: 2,
          name: "title",
          kind: "scalar",
          opt: true,
          T: 9
        }, {
          no: 3,
          name: "selected",
          kind: "scalar",
          T: 8
        }, {
          no: 11,
          name: "tabIdentifier",
          kind: "scalar",
          opt: true,
          T: 9
        }]);
      }
    }();
    let eS = new class extends ey {
      constructor() {
        super("SectionListRenderer", [{
          no: 1,
          name: "contents",
          kind: "message",
          repeat: 1,
          T: () => eC
        }]);
      }
    }();
    let eC = new class extends ey {
      constructor() {
        super("SectionListSupportedRenderers", [{
          no: 221496734,
          name: "music_description_shelf_renderer",
          kind: "message",
          T: () => ev
        }]);
      }
    }();
    let ev = new class extends ey {
      constructor() {
        super("MusicDescriptionShelfRenderer", [{
          no: 3,
          name: "description",
          kind: "message",
          T: () => eE
        }, {
          no: 10,
          name: "footer",
          kind: "message",
          T: () => eI
        }]);
      }
    }();
    let eE = new class extends ey {
      constructor() {
        super("Description", [{
          no: 1,
          name: "runs",
          kind: "message",
          repeat: 1,
          T: () => eF
        }]);
      }
    }();
    let eA = new class extends ey {
      constructor() {
        super("ElementRenderer", [{
          no: 172660663,
          name: "n7F172660663",
          kind: "message",
          T: () => eL
        }]);
      }
    }();
    let eL = new class extends ey {
      constructor() {
        super("n7F172660663", [{
          no: 1,
          name: "n8F1",
          kind: "message",
          T: () => eB
        }]);
      }
    }();
    let eI = new class extends ey {
      constructor() {
        super("Footer", [{
          no: 1,
          name: "runs",
          kind: "message",
          repeat: 1,
          T: () => eF
        }]);
      }
    }();
    let eB = new class extends ey {
      constructor() {
        super("n8F1", [{
          no: 168777401,
          name: "n9F168777401",
          kind: "message",
          T: () => eO
        }]);
      }
    }();
    let eO = new class extends ey {
      constructor() {
        super("n9F168777401", [{
          no: 5,
          name: "n10F5",
          kind: "message",
          T: () => e$
        }]);
      }
    }();
    let e$ = new class extends ey {
      constructor() {
        super("n10F5", [{
          no: 465160965,
          name: "n11F465160965",
          kind: "message",
          T: () => eR
        }]);
      }
    }();
    let eR = new class extends ey {
      constructor() {
        super("n11F465160965", [{
          no: 4,
          name: "n12F4",
          kind: "message",
          T: () => eU
        }]);
      }
    }();
    let eU = new class extends ey {
      constructor() {
        super("n12F4", [{
          no: 1,
          name: "n13F1",
          kind: "message",
          repeat: 1,
          T: () => eD
        }, {
          no: 2,
          name: "originText",
          kind: "scalar",
          T: 9
        }]);
      }
    }();
    let eD = new class extends ey {
      constructor() {
        super("n13F1", [{
          no: 1,
          name: "f1",
          kind: "scalar",
          T: 9
        }]);
      }
    }();
    let eF = new class extends ey {
      constructor() {
        super("Runs", [{
          no: 1,
          name: "text",
          kind: "scalar",
          T: 9
        }]);
      }
    }();
    (w = E ||= {})[w.UNSYNCED = 0] = "UNSYNCED";
    w[w.LINE_SYNCED = 1] = "LINE_SYNCED";
    w[w.SYLLABLE_SYNCED = 2] = "SYLLABLE_SYNCED";
    let eP = new class extends ey {
      constructor() {
        super("com.spotify.lyrics.endpointretrofit.proto.ColorData", [{
          no: 1,
          name: "background",
          kind: "scalar",
          T: 5
        }, {
          no: 2,
          name: "text",
          kind: "scalar",
          T: 5
        }, {
          no: 3,
          name: "highlightText",
          kind: "scalar",
          T: 5
        }]);
      }
      create(e) {
        let t = globalThis.Object.create(this.messagePrototype);
        t.background = 0;
        t.text = 0;
        t.highlightText = 0;
        if (e !== undefined) {
          es(this, t, e);
        }
        return t;
      }
      internalBinaryRead(e, t, a, n) {
        let s = n ?? this.create();
        let r = e.pos + t;
        while (e.pos < r) {
          let [t, n] = e.tag();
          switch (t) {
            case 1:
              s.background = e.int32();
              break;
            case 2:
              s.text = e.int32();
              break;
            case 3:
              s.highlightText = e.int32();
              break;
            default:
              let r = a.readUnknownField;
              if (r === "throw") {
                throw new globalThis.Error(`Unknown field ${t} (wire type ${n}) for ${this.typeName}`);
              }
              let i = e.skip(n);
              if (r !== false) {
                (r === true ? C.onRead : r)(this.typeName, s, t, n, i);
              }
          }
        }
        return s;
      }
      internalBinaryWrite(e, t, a) {
        if (e.background !== 0) {
          t.tag(1, v.Varint).int32(e.background);
        }
        if (e.text !== 0) {
          t.tag(2, v.Varint).int32(e.text);
        }
        if (e.highlightText !== 0) {
          t.tag(3, v.Varint).int32(e.highlightText);
        }
        let n = a.writeUnknownFields;
        if (n !== false) {
          (n == true ? C.onWrite : n)(this.typeName, e, t);
        }
        return t;
      }
    }();
    let ej = new class extends ey {
      constructor() {
        super("com.spotify.lyrics.endpointretrofit.proto.AndroidIntent", [{
          no: 1,
          name: "provider",
          kind: "scalar",
          T: 9
        }, {
          no: 2,
          name: "providerAndroidAppId",
          kind: "scalar",
          T: 9
        }, {
          no: 3,
          name: "action",
          kind: "scalar",
          T: 9
        }, {
          no: 4,
          name: "data",
          kind: "scalar",
          T: 9
        }, {
          no: 5,
          name: "contentType",
          kind: "scalar",
          T: 9
        }]);
      }
      create(e) {
        let t = globalThis.Object.create(this.messagePrototype);
        t.provider = "";
        t.providerAndroidAppId = "";
        t.action = "";
        t.data = "";
        t.contentType = "";
        if (e !== undefined) {
          es(this, t, e);
        }
        return t;
      }
      internalBinaryRead(e, t, a, n) {
        let s = n ?? this.create();
        let r = e.pos + t;
        while (e.pos < r) {
          let [t, n] = e.tag();
          switch (t) {
            case 1:
              s.provider = e.string();
              break;
            case 2:
              s.providerAndroidAppId = e.string();
              break;
            case 3:
              s.action = e.string();
              break;
            case 4:
              s.data = e.string();
              break;
            case 5:
              s.contentType = e.string();
              break;
            default:
              let r = a.readUnknownField;
              if (r === "throw") {
                throw new globalThis.Error(`Unknown field ${t} (wire type ${n}) for ${this.typeName}`);
              }
              let i = e.skip(n);
              if (r !== false) {
                (r === true ? C.onRead : r)(this.typeName, s, t, n, i);
              }
          }
        }
        return s;
      }
      internalBinaryWrite(e, t, a) {
        if (e.provider !== "") {
          t.tag(1, v.LengthDelimited).string(e.provider);
        }
        if (e.providerAndroidAppId !== "") {
          t.tag(2, v.LengthDelimited).string(e.providerAndroidAppId);
        }
        if (e.action !== "") {
          t.tag(3, v.LengthDelimited).string(e.action);
        }
        if (e.data !== "") {
          t.tag(4, v.LengthDelimited).string(e.data);
        }
        if (e.contentType !== "") {
          t.tag(5, v.LengthDelimited).string(e.contentType);
        }
        let n = a.writeUnknownFields;
        if (n !== false) {
          (n == true ? C.onWrite : n)(this.typeName, e, t);
        }
        return t;
      }
    }();
    let eH = new class extends ey {
      constructor() {
        super("com.spotify.lyrics.endpointretrofit.proto.Alternative", [{
          no: 1,
          name: "language",
          kind: "scalar",
          T: 9
        }, {
          no: 2,
          name: "lines",
          kind: "scalar",
          repeat: 2,
          T: 9
        }, {
          no: 3,
          name: "rtlLang",
          kind: "scalar",
          opt: true,
          T: 8
        }]);
      }
      create(e) {
        let t = globalThis.Object.create(this.messagePrototype);
        t.language = "";
        t.lines = [];
        if (e !== undefined) {
          es(this, t, e);
        }
        return t;
      }
      internalBinaryRead(e, t, a, n) {
        let s = n ?? this.create();
        let r = e.pos + t;
        while (e.pos < r) {
          let [t, n] = e.tag();
          switch (t) {
            case 1:
              s.language = e.string();
              break;
            case 2:
              s.lines.push(e.string());
              break;
            case 3:
              s.rtlLang = e.bool();
              break;
            default:
              let r = a.readUnknownField;
              if (r === "throw") {
                throw new globalThis.Error(`Unknown field ${t} (wire type ${n}) for ${this.typeName}`);
              }
              let i = e.skip(n);
              if (r !== false) {
                (r === true ? C.onRead : r)(this.typeName, s, t, n, i);
              }
          }
        }
        return s;
      }
      internalBinaryWrite(e, t, a) {
        if (e.language !== "") {
          t.tag(1, v.LengthDelimited).string(e.language);
        }
        for (let a = 0; a < e.lines.length; a++) {
          t.tag(2, v.LengthDelimited).string(e.lines[a]);
        }
        if (e.rtlLang !== undefined) {
          t.tag(3, v.Varint).bool(e.rtlLang);
        }
        let n = a.writeUnknownFields;
        if (n !== false) {
          (n == true ? C.onWrite : n)(this.typeName, e, t);
        }
        return t;
      }
    }();
    let eV = new class extends ey {
      constructor() {
        super("com.spotify.lyrics.endpointretrofit.proto.LyricsLine", [{
          no: 1,
          name: "startTimeMs",
          kind: "scalar",
          T: 3,
          L: 2
        }, {
          no: 2,
          name: "words",
          kind: "scalar",
          opt: true,
          T: 9
        }, {
          no: 3,
          name: "syllables",
          kind: "message",
          repeat: 1,
          T: () => eM
        }]);
      }
      create(e) {
        let t = globalThis.Object.create(this.messagePrototype);
        t.startTimeMs = 0;
        t.syllables = [];
        if (e !== undefined) {
          es(this, t, e);
        }
        return t;
      }
      internalBinaryRead(e, t, a, n) {
        let s = n ?? this.create();
        let r = e.pos + t;
        while (e.pos < r) {
          let [t, n] = e.tag();
          switch (t) {
            case 1:
              s.startTimeMs = e.int64().toNumber();
              break;
            case 2:
              s.words = e.string();
              break;
            case 3:
              s.syllables.push(eM.internalBinaryRead(e, e.uint32(), a));
              break;
            default:
              let r = a.readUnknownField;
              if (r === "throw") {
                throw new globalThis.Error(`Unknown field ${t} (wire type ${n}) for ${this.typeName}`);
              }
              let i = e.skip(n);
              if (r !== false) {
                (r === true ? C.onRead : r)(this.typeName, s, t, n, i);
              }
          }
        }
        return s;
      }
      internalBinaryWrite(e, t, a) {
        if (e.startTimeMs !== 0) {
          t.tag(1, v.Varint).int64(e.startTimeMs);
        }
        if (e.words !== undefined) {
          t.tag(2, v.LengthDelimited).string(e.words);
        }
        for (let n = 0; n < e.syllables.length; n++) {
          eM.internalBinaryWrite(e.syllables[n], t.tag(3, v.LengthDelimited).fork(), a).join();
        }
        let n = a.writeUnknownFields;
        if (n !== false) {
          (n == true ? C.onWrite : n)(this.typeName, e, t);
        }
        return t;
      }
    }();
    let eM = new class extends ey {
      constructor() {
        super("com.spotify.lyrics.endpointretrofit.proto.Syllable", [{
          no: 1,
          name: "startTimeMs",
          kind: "scalar",
          T: 3,
          L: 2
        }, {
          no: 2,
          name: "numChars",
          kind: "scalar",
          T: 3,
          L: 2
        }]);
      }
      create(e) {
        let t = globalThis.Object.create(this.messagePrototype);
        t.startTimeMs = 0;
        t.numChars = 0;
        if (e !== undefined) {
          es(this, t, e);
        }
        return t;
      }
      internalBinaryRead(e, t, a, n) {
        let s = n ?? this.create();
        let r = e.pos + t;
        while (e.pos < r) {
          let [t, n] = e.tag();
          switch (t) {
            case 1:
              s.startTimeMs = e.int64().toNumber();
              break;
            case 2:
              s.numChars = e.int64().toNumber();
              break;
            default:
              let r = a.readUnknownField;
              if (r === "throw") {
                throw new globalThis.Error(`Unknown field ${t} (wire type ${n}) for ${this.typeName}`);
              }
              let i = e.skip(n);
              if (r !== false) {
                (r === true ? C.onRead : r)(this.typeName, s, t, n, i);
              }
          }
        }
        return s;
      }
      internalBinaryWrite(e, t, a) {
        if (e.startTimeMs !== 0) {
          t.tag(1, v.Varint).int64(e.startTimeMs);
        }
        if (e.numChars !== 0) {
          t.tag(2, v.Varint).int64(e.numChars);
        }
        let n = a.writeUnknownFields;
        if (n !== false) {
          (n == true ? C.onWrite : n)(this.typeName, e, t);
        }
        return t;
      }
    }();
    let eK = new class extends ey {
      constructor() {
        super("com.spotify.lyrics.endpointretrofit.proto.ColorLyricsResponse", [{
          no: 1,
          name: "lyrics",
          kind: "message",
          T: () => ez
        }, {
          no: 2,
          name: "colors",
          kind: "message",
          T: () => eP
        }, {
          no: 3,
          name: "hasVocalRemoval",
          kind: "scalar",
          opt: true,
          T: 8
        }, {
          no: 4,
          name: "vocalRemovalColors",
          kind: "message",
          T: () => eP
        }]);
      }
      create(e) {
        let t = globalThis.Object.create(this.messagePrototype);
        if (e !== undefined) {
          es(this, t, e);
        }
        return t;
      }
      internalBinaryRead(e, t, a, n) {
        let s = n ?? this.create();
        let r = e.pos + t;
        while (e.pos < r) {
          let [t, n] = e.tag();
          switch (t) {
            case 1:
              s.lyrics = ez.internalBinaryRead(e, e.uint32(), a, s.lyrics);
              break;
            case 2:
              s.colors = eP.internalBinaryRead(e, e.uint32(), a, s.colors);
              break;
            case 3:
              s.hasVocalRemoval = e.bool();
              break;
            case 4:
              s.vocalRemovalColors = eP.internalBinaryRead(e, e.uint32(), a, s.vocalRemovalColors);
              break;
            default:
              let r = a.readUnknownField;
              if (r === "throw") {
                throw new globalThis.Error(`Unknown field ${t} (wire type ${n}) for ${this.typeName}`);
              }
              let i = e.skip(n);
              if (r !== false) {
                (r === true ? C.onRead : r)(this.typeName, s, t, n, i);
              }
          }
        }
        return s;
      }
      internalBinaryWrite(e, t, a) {
        if (e.lyrics) {
          ez.internalBinaryWrite(e.lyrics, t.tag(1, v.LengthDelimited).fork(), a).join();
        }
        if (e.colors) {
          eP.internalBinaryWrite(e.colors, t.tag(2, v.LengthDelimited).fork(), a).join();
        }
        if (e.hasVocalRemoval !== undefined) {
          t.tag(3, v.Varint).bool(e.hasVocalRemoval);
        }
        if (e.vocalRemovalColors) {
          eP.internalBinaryWrite(e.vocalRemovalColors, t.tag(4, v.LengthDelimited).fork(), a).join();
        }
        let n = a.writeUnknownFields;
        if (n !== false) {
          (n == true ? C.onWrite : n)(this.typeName, e, t);
        }
        return t;
      }
    }();
    let ez = new class extends ey {
      constructor() {
        super("com.spotify.lyrics.endpointretrofit.proto.LyricsResponse", [{
          no: 1,
          name: "syncType",
          kind: "enum",
          T: () => ["com.spotify.lyrics.endpointretrofit.proto.SyncType", E]
        }, {
          no: 2,
          name: "lines",
          kind: "message",
          repeat: 1,
          T: () => eV
        }, {
          no: 3,
          name: "provider",
          kind: "scalar",
          T: 9
        }, {
          no: 4,
          name: "providerLyricsId",
          kind: "scalar",
          T: 9
        }, {
          no: 5,
          name: "providerDisplayName",
          kind: "scalar",
          T: 9
        }, {
          no: 6,
          name: "syncLyricsAndroidIntent",
          kind: "message",
          T: () => ej
        }, {
          no: 7,
          name: "syncLyricsUri",
          kind: "scalar",
          T: 9
        }, {
          no: 8,
          name: "isDenseTypeface",
          kind: "scalar",
          opt: true,
          T: 8
        }, {
          no: 9,
          name: "alternatives",
          kind: "message",
          repeat: 1,
          T: () => eH
        }, {
          no: 10,
          name: "language",
          kind: "scalar",
          T: 9
        }, {
          no: 11,
          name: "isRtlLanguage",
          kind: "scalar",
          opt: true,
          T: 8
        }, {
          no: 12,
          name: "fullscreenAction",
          kind: "scalar",
          opt: true,
          T: 5
        }, {
          no: 13,
          name: "showUpsell",
          kind: "scalar",
          opt: true,
          T: 8
        }]);
      }
      create(e) {
        let t = globalThis.Object.create(this.messagePrototype);
        t.syncType = 0;
        t.lines = [];
        t.provider = "";
        t.providerLyricsId = "";
        t.providerDisplayName = "";
        t.syncLyricsUri = "";
        t.alternatives = [];
        t.language = "";
        if (e !== undefined) {
          es(this, t, e);
        }
        return t;
      }
      internalBinaryRead(e, t, a, n) {
        let s = n ?? this.create();
        let r = e.pos + t;
        while (e.pos < r) {
          let [t, n] = e.tag();
          switch (t) {
            case 1:
              s.syncType = e.int32();
              break;
            case 2:
              s.lines.push(eV.internalBinaryRead(e, e.uint32(), a));
              break;
            case 3:
              s.provider = e.string();
              break;
            case 4:
              s.providerLyricsId = e.string();
              break;
            case 5:
              s.providerDisplayName = e.string();
              break;
            case 6:
              s.syncLyricsAndroidIntent = ej.internalBinaryRead(e, e.uint32(), a, s.syncLyricsAndroidIntent);
              break;
            case 7:
              s.syncLyricsUri = e.string();
              break;
            case 8:
              s.isDenseTypeface = e.bool();
              break;
            case 9:
              s.alternatives.push(eH.internalBinaryRead(e, e.uint32(), a));
              break;
            case 10:
              s.language = e.string();
              break;
            case 11:
              s.isRtlLanguage = e.bool();
              break;
            case 12:
              s.fullscreenAction = e.int32();
              break;
            case 13:
              s.showUpsell = e.bool();
              break;
            default:
              let r = a.readUnknownField;
              if (r === "throw") {
                throw new globalThis.Error(`Unknown field ${t} (wire type ${n}) for ${this.typeName}`);
              }
              let i = e.skip(n);
              if (r !== false) {
                (r === true ? C.onRead : r)(this.typeName, s, t, n, i);
              }
          }
        }
        return s;
      }
      internalBinaryWrite(e, t, a) {
        if (e.syncType !== 0) {
          t.tag(1, v.Varint).int32(e.syncType);
        }
        for (let n = 0; n < e.lines.length; n++) {
          eV.internalBinaryWrite(e.lines[n], t.tag(2, v.LengthDelimited).fork(), a).join();
        }
        if (e.provider !== "") {
          t.tag(3, v.LengthDelimited).string(e.provider);
        }
        if (e.providerLyricsId !== "") {
          t.tag(4, v.LengthDelimited).string(e.providerLyricsId);
        }
        if (e.providerDisplayName !== "") {
          t.tag(5, v.LengthDelimited).string(e.providerDisplayName);
        }
        if (e.syncLyricsAndroidIntent) {
          ej.internalBinaryWrite(e.syncLyricsAndroidIntent, t.tag(6, v.LengthDelimited).fork(), a).join();
        }
        if (e.syncLyricsUri !== "") {
          t.tag(7, v.LengthDelimited).string(e.syncLyricsUri);
        }
        if (e.isDenseTypeface !== undefined) {
          t.tag(8, v.Varint).bool(e.isDenseTypeface);
        }
        for (let n = 0; n < e.alternatives.length; n++) {
          eH.internalBinaryWrite(e.alternatives[n], t.tag(9, v.LengthDelimited).fork(), a).join();
        }
        if (e.language !== "") {
          t.tag(10, v.LengthDelimited).string(e.language);
        }
        if (e.isRtlLanguage !== undefined) {
          t.tag(11, v.Varint).bool(e.isRtlLanguage);
        }
        if (e.fullscreenAction !== undefined) {
          t.tag(12, v.Varint).int32(e.fullscreenAction);
        }
        if (e.showUpsell !== undefined) {
          t.tag(13, v.Varint).bool(e.showUpsell);
        }
        let n = a.writeUnknownFields;
        if (n !== false) {
          (n == true ? C.onWrite : n)(this.typeName, e, t);
        }
        return t;
      }
    }();
    let e_ = new d($request.url);
    r.info(`url: ${e_.toJSON()}`);
    let eG = e_.pathname.split("/").filter(Boolean);
    r.info(`PATHs: ${eG}`);
    let eW = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"])?.split(";")?.[0];
    async function eJ(e = "Google", t = "Part", a = [], [n = "AUTO", s = "ZH"], i = {}, o = 3, l = 100, u = true) {
      r.log("☑️ Translator", `vendor: ${e}`, `method: ${t}`, `[source, target]: ${[n, s]}`);
      let g = 127;
      switch (e) {
        case "Google":
        case "GoogleCloud":
        default:
          g = 120;
          break;
        case "Microsoft":
        case "Azure":
          g = 99;
          break;
        case "DeepL":
          g = 49;
          break;
        case "DeepLX":
          g = 20;
      }
      let c = [];
      switch (t) {
        default:
        case "Part":
          {
            let t = function (e, t) {
              r.log("☑️ Chunk Array");
              let a = 0;
              let n = [];
              while (a < e.length) {
                n.push(e.slice(a, a += t));
              }
              return n;
            }(a, g);
            c = await Promise.all(t.map(async t => await eX(() => new L({
              Source: n,
              Target: s,
              API: i
            })[e](t), o, l, u))).then(e => e.flat(Infinity));
            break;
          }
        case "Row":
          c = await Promise.all(a.map(async t => await eX(() => new L({
            Source: n,
            Target: s,
            API: i
          })[e](t), o, l, u)));
      }
      r.log("✅ Translator");
      return c;
    }
    function eZ(e, t, a = false, n = "Forward", s = "\n") {
      let r = "";
      if (a === true) {
        r = t;
      } else {
        switch (n) {
          case "Forward":
          default:
            r = `${e}${s}${t}`;
            break;
          case "Reverse":
            r = `${t}${s}${e}`;
        }
      }
      return r;
    }
    async function eX(e, t = 5, a = 1000, n = false) {
      r.log("☑️ retry", `剩余重试次数:${t}`, `时间间隔:${a}ms`);
      try {
        return await e();
      } catch (s) {
        if (t) {
          await new Promise(e => setTimeout(e, a));
          return eX(e, t - 1, n ? a * 2 : a, n);
        }
        throw Error("❌ retry, 最大重试次数");
      }
    }
    if (eW === "application/octet-stream" || eW === "text/plain") {
      eW = function (e, t, a) {
        r.log("☑️ detectFormat", `format: ${e.format || e.searchParams.get("fmt") || e.searchParams.get("format")}`);
        switch (e.format || e.searchParams.get("fmt") || e.searchParams.get("format")) {
          case "txt":
            a = "text/plain";
            break;
          case "xml":
          case "srv3":
          case "ttml":
          case "ttml2":
          case "imsc":
            a = "text/xml";
            break;
          case "vtt":
          case "webvtt":
            a = "text/vtt";
            break;
          case "json":
          case "json3":
            a = "application/json";
            break;
          case "m3u":
          case "m3u8":
            a = "application/x-mpegurl";
            break;
          case "plist":
            a = "application/plist";
            break;
          case undefined:
            let n = t?.substring?.(0, 6).trim?.();
            switch (n) {
              case "<?xml":
                a = "text/xml";
                break;
              case "WEBVTT":
                a = "text/vtt";
                break;
              default:
                switch (n?.substring?.(0, 1)) {
                  case "0":
                  case "1":
                  case "2":
                  case "3":
                  case "4":
                  case "5":
                  case "6":
                  case "7":
                  case "8":
                  case "9":
                    a = "text/vtt";
                    break;
                  case "{":
                    a = "application/json";
                }
                break;
              case undefined:
                a = undefined;
            }
        }
        r.log("✅ detectFormat", `format: ${a}`);
        return a;
      }(e_, $response?.body, eW);
    }
    r.info(`FORMAT: ${eW}`);
    (async () => {
      let e = function (e) {
        r.log("☑️ Detect Platform");
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
        r.log("✅ Detect Platform", `Platform: ${t}`);
        return t;
      }($request.url);
      r.info(`PLATFORM: ${e}`);
      let {
        Settings: t,
        Caches: a,
        Configs: n
      } = function (e, t, a) {
        r.log("☑️ Set Environment Variables");
        let {
          Settings: n,
          Caches: s,
          Configs: o
        } = function (e, t, a) {
          t = [t].flat(Infinity);
          let n = {
            Settings: a?.Default?.Settings || {},
            Configs: a?.Default?.Configs || {},
            Caches: {}
          };
          t.forEach(e => {
            n.Settings = {
              ...n.Settings,
              ...a?.[e]?.Settings
            };
            n.Configs = {
              ...n.Configs,
              ...a?.[e]?.Configs
            };
          });
          switch (typeof $argument) {
            case "string":
              $argument = Object.fromEntries($argument.split("&").map(e => e.split("=", 2).map(e => e.replace(/\"/g, ""))));
            case "object":
              {
                let e = {};
                Object.keys($argument).forEach(t => i.set(e, t, $argument[t]));
                n.Settings = {
                  ...n.Settings,
                  ...e
                };
              }
          }
          let s = u.getItem(e);
          if (s) {
            t.forEach(e => {
              switch (typeof s?.[e]?.Settings) {
                case "string":
                  s[e].Settings = JSON.parse(s[e].Settings || "{}");
                case "object":
                  n.Settings = {
                    ...n.Settings,
                    ...s[e].Settings
                  };
              }
              switch (typeof s?.[e]?.Caches) {
                case "string":
                  s[e].Caches = JSON.parse(s[e].Caches || "{}");
                case "object":
                  n.Caches = {
                    ...n.Caches,
                    ...s[e].Caches
                  };
              }
            });
          }
          (function e(t, a) {
            for (let n in t) {
              let s = t[n];
              t[n] = typeof s == "object" && s !== null ? e(s, a) : a(n, s);
            }
            return t;
          })(n.Settings, (e, t) => {
            if (t === "true" || t === "false") {
              t = JSON.parse(t);
            } else if (typeof t == "string") {
              t = t.includes(",") ? t.split(",").map(e => g(e)) : g(t);
            }
            return t;
          });
          return n;
        }(e, t, a);
        if (!Array.isArray(n?.Types)) {
          n.Types = n.Types ? [n.Types] : [];
        }
        r.info(`typeof Settings: ${typeof n}`, `Settings: ${JSON.stringify(n, null, 2)}`);
        if (typeof s?.Playlists != "object" || Array.isArray(s?.Playlists)) {
          s.Playlists = {};
        }
        s.Playlists.Master = new Map(JSON.parse(s?.Playlists?.Master || "[]"));
        s.Playlists.Subtitle = new Map(JSON.parse(s?.Playlists?.Subtitle || "[]"));
        if (typeof s?.Subtitles != "object") {
          s.Subtitles = new Map(JSON.parse(s?.Subtitles || "[]"));
        }
        if (typeof s?.Metadatas != "object" || Array.isArray(s?.Metadatas)) {
          s.Metadatas = {};
        }
        if (typeof s?.Metadatas?.Tracks != "object") {
          s.Metadatas.Tracks = new Map(JSON.parse(s?.Metadatas?.Tracks || "[]"));
        }
        r.log("✅ Set Environment Variables");
        return {
          Settings: n,
          Caches: s,
          Configs: o
        };
      }("DualSubs", [["YouTube", "Netflix", "BiliBili", "Spotify"].includes(e) ? e : "Universal", "Translate", "API"], m);
      r.logLevel = t.LogLevel;
      let o = e_.searchParams?.get("subtype") ?? t.Type;
      let l = [e_.searchParams?.get("lang")?.toUpperCase?.() ?? t.Languages[0], (e_.searchParams?.get("tlang") ?? a?.tlang)?.toUpperCase?.() ?? t.Languages[1]];
      r.info(`Type: ${o}`, `Languages: ${l}`);
      let c = {};
      switch (eW) {
        case undefined:
        case "application/x-www-form-urlencoded":
        case "text/plain":
        default:
        case "application/x-mpegURL":
        case "application/x-mpegurl":
        case "application/vnd.apple.mpegurl":
        case "audio/mpegurl":
          break;
        case "text/xml":
        case "text/html":
        case "text/plist":
        case "application/xml":
        case "application/plist":
        case "application/x-plist":
          {
            c = h.parse($response.body);
            let e = c?.tt ? "<br />" : (c?.timedtext, "&#x000A;");
            if (c?.timedtext?.head?.wp?.[1]?.["@rc"]) {
              c.timedtext.head.wp[1]["@rc"] = "1";
            }
            let a = c?.tt?.body?.div?.p ?? c?.timedtext?.body?.p;
            let n = [];
            a = a.map(t => {
              if (t?.s) {
                if (Array.isArray(t.s)) {
                  t["#"] = t.s.map(e => e["#"]).join(" ");
                } else {
                  t["#"] = t.s?.["#"] ?? "";
                }
                delete t.s;
              }
              let a = t?.span ?? t;
              let s = Array.isArray(a) ? a?.map(e => e?.["#"] ?? "​").join(e) : a?.["#"];
              n.push(s ?? "​");
              return t;
            });
            let s = await eJ(t.Vendor, t.Method, n, l, t?.[t?.Vendor], t?.Times, t?.Interval, t?.Exponential);
            a = a.map((a, n) => {
              let r = a?.span ?? a;
              if (Array.isArray(r)) {
                s?.[n]?.split(e).forEach((e, a) => {
                  if (r[a]?.["#"]) {
                    r[a]["#"] = eZ(r[a]["#"], e, t?.ShowOnly, t?.Position, " ");
                  }
                });
              } else if (r?.["#"]) {
                r["#"] = eZ(r["#"], s?.[n], t?.ShowOnly, t?.Position, e);
              }
              return a;
            });
            $response.body = h.stringify(c);
            break;
          }
        case "text/vtt":
        case "application/vtt":
          {
            c = p.parse($response.body);
            let e = c?.body.map(e => (e?.text ?? "​")?.replace(/<\/?[^<>]+>/g, ""));
            let a = await eJ(t.Vendor, t.Method, e, l, t?.[t?.Vendor], t?.Times, t?.Interval, t?.Exponential);
            c.body = c.body.map((e, n) => {
              e.text = eZ(e?.text ?? "​", a?.[n], t?.ShowOnly, t?.Position);
              return e;
            });
            $response.body = p.stringify(c);
            break;
          }
        case "text/json":
        case "application/json":
          c = JSON.parse($response.body ?? "{}");
          switch (e) {
            case "YouTube":
              if (c?.events) {
                let e = [];
                c.events = c.events.map(t => {
                  if (t?.segs?.[0]?.utf8) {
                    t.segs = [{
                      utf8: t.segs.map(e => e.utf8).join("")
                    }];
                  }
                  e.push(t?.segs?.[0]?.utf8 ?? "​");
                  t.wWinId = undefined;
                  return t;
                });
                let a = await eJ(t.Vendor, t.Method, e, l, t?.[t?.Vendor], t?.Times, t?.Interval, t?.Exponential);
                c.events = c.events.map((e, n) => {
                  if (e?.segs?.[0]?.utf8) {
                    e.segs[0].utf8 = eZ(e.segs[0].utf8, a?.[n], t?.ShowOnly, t?.Position);
                  }
                  return e;
                });
              } else if (c?.contents?.sectionListRenderer?.contents) {
                let e = c.contents.sectionListRenderer.contents;
                e = await Promise.all(e.map(async e => {
                  if (e?.musicDescriptionShelfRenderer?.description?.runs) {
                    let a = e.musicDescriptionShelfRenderer.description.runs;
                    a = await Promise.all(a.map(async e => {
                      let a = e?.text?.split?.("\n")?.map(e => e?.trim() ?? "​");
                      let n = await eJ(t.Vendor, t.Method, a, l, t?.[t?.Vendor], t?.Times, t?.Interval, t?.Exponential);
                      e.text = (a = a.map((e, a) => {
                        if (e) {
                          return eZ(e, n?.[a], t?.ShowOnly, t?.Position, "\n  └ ");
                        }
                      })).join("\n");
                      return e;
                    }));
                  }
                  return e;
                }));
              }
              break;
            case "Spotify":
              {
                l[0] = c?.lyrics?.language === "z1" ? "ZH-HANT" : c?.lyrics?.language ? c?.lyrics?.language.toUpperCase() : "AUTO";
                let e = c.lyrics.lines.map(e => e?.words ?? "​");
                let a = await eJ(t.Vendor, t.Method, e, l, t?.[t?.Vendor], t?.Times, t?.Interval, t?.Exponential);
                switch ($request?.headers?.["app-platform"] ?? $request?.headers?.["App-Platform"]) {
                  case "OSX":
                  case "Win32_x86_64":
                  case "WebPlayer":
                  case undefined:
                  default:
                    c.lyrics.lines = c.lyrics.lines.map((e, t) => [{
                      startTimeMs: e.startTimeMs.toString(),
                      words: e?.words ?? "",
                      syllables: e?.syllables ?? [],
                      endTimeMs: "0"
                    }, {
                      startTimeMs: e.startTimeMs.toString(),
                      words: a?.[t] ?? "",
                      syllables: [],
                      endTimeMs: "0"
                    }]).flat(Infinity);
                  case "iOS":
                    if (!c?.lyrics?.alternatives) {
                      c.lyrics.alternatives = [];
                    }
                    c.lyrics.alternatives.unshift({
                      language: l[1].toLowerCase(),
                      lines: a
                    });
                }
              }
          }
          $response.body = JSON.stringify(c);
          break;
        case "application/protobuf":
        case "application/x-protobuf":
        case "application/vnd.google.protobuf":
        case "application/grpc":
        case "application/grpc+proto":
        case "application/octet-stream":
          {
            let a = s === "Quantumult X" ? new Uint8Array($response.bodyBytes ?? []) : $response.body ?? new Uint8Array();
            switch (eW) {
              case "application/protobuf":
              case "application/x-protobuf":
              case "application/vnd.google.protobuf":
                switch (e) {
                  case "YouTube":
                    c = eb.fromBinary(a);
                    l[0] = "AUTO";
                    if (c?.contents?.renderer?.elementRenderer?.n7F172660663?.n8F1?.n9F168777401?.n10F5?.n11F465160965?.n12F4?.n13F1) {
                      let e = c.contents.renderer.elementRenderer.n7F172660663.n8F1.n9F168777401.n10F5.n11F465160965.n12F4.n13F1.map(e => e?.f1 ?? "​");
                      let a = await eJ(t.Vendor, t.Method, e, l, t?.[t?.Vendor], t?.Times, t?.Interval, t?.Exponential);
                      c.contents.renderer.elementRenderer.n7F172660663.n8F1.n9F168777401.n10F5.n11F465160965.n12F4.n13F1 = c.contents.renderer.elementRenderer.n7F172660663.n8F1.n9F168777401.n10F5.n11F465160965.n12F4.n13F1.map((e, n) => {
                        if (e?.f1) {
                          e.f1 = eZ(e.f1, a?.[n], t?.ShowOnly, t?.Position);
                        }
                        return e;
                      });
                    } else if (c?.contents?.renderer?.sectionListRenderer?.contents) {
                      let e = c.contents.renderer.sectionListRenderer.contents;
                      e = await Promise.all(e.map(async e => {
                        if (e?.musicDescriptionShelfRenderer?.description?.runs) {
                          let a = e.musicDescriptionShelfRenderer.description.runs;
                          a = await Promise.all(a.map(async e => {
                            let a = e?.text?.split?.("\n")?.map(e => e?.trim() ?? "​");
                            let n = await eJ(t.Vendor, t.Method, a, l, t?.[t?.Vendor], t?.Times, t?.Interval, t?.Exponential);
                            e.text = (a = a.map((e, a) => {
                              if (e) {
                                return eZ(e, n?.[a], t?.ShowOnly, t?.Position, "\n  └ ");
                              }
                            })).join("\n");
                            return e;
                          }));
                        }
                        return e;
                      }));
                    }
                    a = eb.toBinary(c);
                    break;
                  case "Spotify":
                    {
                      c = eK.fromBinary(a);
                      l[0] = c?.lyrics?.language === "z1" ? "ZH-HANT" : c?.lyrics?.language ? c?.lyrics?.language.toUpperCase() : "AUTO";
                      let e = c.lyrics.lines.map(e => e?.words ?? "​");
                      let n = await eJ(t.Vendor, t.Method, e, l, t?.[t?.Vendor], t?.Times, t?.Interval, t?.Exponential);
                      if (!c?.lyrics?.alternatives) {
                        c.lyrics.alternatives = [];
                      }
                      c.lyrics.alternatives.unshift({
                        language: l[1].toLowerCase(),
                        lines: n
                      });
                      a = eK.toBinary(c);
                    }
                }
            }
            $response.body = a;
          }
      }
    })().catch(e => r.error(e)).finally(() => function (e = {}) {
      switch (s) {
        case "Surge":
          if (e.policy) {
            i.set(e, "headers.X-Surge-Policy", e.policy);
          }
          r.log("🚩 执行结束!", `🕛 ${new Date().getTime() / 1000 - $script.startTime} 秒`);
          $done(e);
          break;
        case "Loon":
          if (e.policy) {
            e.node = e.policy;
          }
          r.log("🚩 执行结束!", `🕛 ${(new Date() - $script.startTime) / 1000} 秒`);
          $done(e);
          break;
        case "Stash":
          if (e.policy) {
            i.set(e, "headers.X-Stash-Selected-Proxy", encodeURI(e.policy));
          }
          r.log("🚩 执行结束!", `🕛 ${(new Date() - $script.startTime) / 1000} 秒`);
          $done(e);
          break;
        case "Egern":
        case "Shadowrocket":
          r.log("🚩 执行结束!");
          $done(e);
          break;
        case "Quantumult X":
          if (e.policy) {
            i.set(e, "opts.policy", e.policy);
          }
          switch (typeof (e = i.pick(e, ["status", "url", "headers", "body", "bodyBytes"])).status) {
            case "number":
              e.status = `HTTP/1.1 ${e.status} ${o[e.status]}`;
              break;
            case "string":
            case "undefined":
              break;
            default:
              throw TypeError(`${Function.name}: 参数类型错误, status 必须为数字或字符串`);
          }
          if (e.body instanceof ArrayBuffer) {
            e.bodyBytes = e.body;
            e.body = undefined;
          } else if (ArrayBuffer.isView(e.body)) {
            e.bodyBytes = e.body.buffer.slice(e.body.byteOffset, e.body.byteLength + e.body.byteOffset);
            e.body = undefined;
          } else if (e.body) {
            e.bodyBytes = undefined;
          }
          r.log("🚩 执行结束!");
          $done(e);
          break;
        default:
          r.log("🚩 执行结束!");
          process.exit(1);
      }
    }($response));
  })();
})();