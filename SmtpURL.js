/**
 * @module SmtpURL
 */

/**
 * SmtpURL - Parses out criteria for connecting with a SMTP server.
 * Read-only mimic of the URL class, but for parsing SMTP type URLs.
 * Use of the configuration properties will pull through the standard URL properties as much as possible.
 * @extends external:URL
 */
export class SmtpURL extends URL {
  #actualProtocol = null;

  /**
   * @constructor
   * @param {string} urlStr - The URL containing configuration information
   * @property {string} protocol - smtp: or smtps: for secure/TLS connection
   * @property {string} user - The SMTP account username to connect to the server
   * @property {string} password - The SMTP account password to connect to the server
   * @property {string} port - [optional] The SMTP server port number; defaults to 25 for smtp: and 587 for smtps:
   * @example smtp://user:pass@host:port
   */
   constructor(urlStr) {
    let actualProtocol;
    if (urlStr.startsWith('smtp://'))
      actualProtocol = 'smtp:';
    else if (urlStr.startsWith('smtps://'))
      actualProtocol = 'smtps:';
    else
      throw new Error('Not a valid SMTP URL');
    super(`http:${urlStr.substr(actualProtocol.length)}`);  // switch to http as that is a registred supported protocol
    this.#actualProtocol = actualProtocol;
  }
  
  get href() { return `${this.#actualProtocol}${super.href.substr('http:'.length)}` }
  get protocol() { return this.#actualProtocol; }
  get port() { return super.port || (this.useTLS ? '587' : '25'); }
  get origin() { return `${this.protocol}//${super.host}`; }

  /**
   * Returns whether this connection should use a secure TLS option
   * @returns {boolean}
   */
  get useTLS() { return this.protocol === 'smtps:'; }

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
    };
  }

}
