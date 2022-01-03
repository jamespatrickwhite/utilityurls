// Read-only mimic of URL but for parsing Redis type URLs
// Per: https://www.iana.org/assignments/uri-schemes/prov/redis and https://www.iana.org/assignments/uri-schemes/prov/rediss
// this implementation extends the format, adding a /<key name> suffix beyond the DB number part of the URL pathname
export class RedisURL extends URL {
  static MAX_DB_NUM = 16;  // Default configuration; can be overriden with custom setup

  #actualProtocol = null;
  #key = null;

  constructor(urlStr) {
    let actualProtocol;
    if (urlStr.startsWith('redis://'))
      actualProtocol = 'redis:';
    else if (urlStr.startsWith('rediss://'))
      actualProtocol = 'rediss:';
    else
      throw new Error('Not a valid Redis URL');
    super(`http:${urlStr.substr(actualProtocol.length)}`);  // switch to http as that is a registred supported protocol
    this.#actualProtocol = actualProtocol;
    const path = super.pathname.substr(1);  // skip leading /
    if (path === '') { // Select default DB #0
      super.pathname = '/0';
      this.#key = '';
    }
    else {
      const dbNum = parseInt(path, 10);
      if (isNaN(dbNum))
        throw new TypeError('Invalid database numeric format');
      else if (dbNum < 0 || dbNum > (RedisURL.MAX_DB_NUM - 1))
        throw new RangeError('Invalid database number');
      const keySlashIdx = path.indexOf('/');
      if (keySlashIdx !== -1) {
        this.#key = path.substr(keySlashIdx + 1).trim();
      }
    }
  }
  
  get href() { return `${this.#actualProtocol}${super.href.substr('http:'.length)}` }
  get protocol() { return this.#actualProtocol; }
  get port() { return super.port || '6379'; }
  get origin() { return `${this.protocol}//${super.host}`; }

  get database() { return parseInt(this.pathname.substr(1), 10) || 0; }
  get key() { return this.#key; }
  get channel() { return this.#key; }

  get useTLS() { return this.protocol === 'rediss:'; }

  toConnectionString() { // convert to just the type used for connecting to a Redis/DB # instance; omits any extras like key etc
    let str = this.toString();
    if (this.key) {
      if (str.endsWith(this.key)) {
        str = str.substr(0, str.length - this.key.length - 1);  // '/'+key
      }
    }
    return str;
  }

  toString() { return this.href; }

  toJSON() {
    return {
      href: this.href,
      protocol: this.protocol,
      username: this.username,
      password: this.password,
      host: this.host,
      hostname: this.hostname,
      port: this.port,
      origin: this.origin,
      pathname: this.pathname,
      search: this.search,
      searchParams: this.searchParams,
      hash: this.hash,
      useTLS: this.useTLS,
      database: this.database,
      key: this.key,
      channel: this.channel,
    };
  }
}
