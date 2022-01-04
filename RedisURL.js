/**
 * @module RedisURL
 */

/**
 * RedisURL - Read-only mimic of URL but for parsing Redis type URLs.
 * Per: {@link https://www.iana.org/assignments/uri-schemes/prov/redis} and {@link https://www.iana.org/assignments/uri-schemes/prov/rediss}
 * this implementation extends the format, adding a /<key name> suffix beyond the DB number part of the URL pathname
 * @extends external:URL
 */
export class RedisURL extends URL {
  /**
   * Maximum Redis DB Number; normally servers default to 16 which range from 0 to 15, but custom
   * server configurations may permit higher ranges.
   * @static
   * @public
   */
  static MAX_DB_NUM = 16;  // Default configuration; can be overriden with custom setup

  #actualProtocol = null;
  #key = null;

  /**
   * @constructor
   * @param {string} urlStr - The URL containing configuration information
   * @property {string} protocol - redis: or rediss: for secure/TLS connection
   * @property {string} user - [optional] The Redis username to connect with
   * @property {string} password - [optional] The Redis account password to connect with
   * @property {string} port - [optional] The Redis server port number; defaults to 6379
   * @property {string} pathname - [optional] The DB number to interact with; defaults to 0. Further pathname content represents a Redis key or message channel.
   * @example redis://user:pass@host:port/0
   * @example redis://user:pass@host:port/0/keyname
   */
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

  /**
   * Return the desired Redis DB number
   * @returns {int}
   */
  get database() { return parseInt(this.pathname.substr(1), 10) || 0; }
  /**
   * Return the desired Redis key, if one was specified
   * @returns {string}
   */
  get key() { return this.#key; }
  /**
   * Return the desired Redis message channel, if one was specified
   * @see key()
   * @returns {string}
   */
  get channel() { return this.#key; }

  /**
   * Return whether this connection should use a secure method
   * @returns {boolean}
   */
  get useTLS() { return this.protocol === 'rediss:'; }

  /**
   * Return the connection URL format to be used in multiple Redis clients
   * @returns {string}
   */
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

  /**
   * Gets an plain object representation suitable for JSON stringification
   * @returns {Object}
   */
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
