/**
 * @module ImapURL
 */

/**
 * ImapURL - Parses out IMAP connection criteria in a format similar to the one described in RFC5092.
 * Read-only mimic of the URL class, but for parsing IMAP type URLs.
 * Use of the configuration properties will pull through the standard URL properties as much as possible.
 * @extends external:URL
 */
export class ImapURL extends URL {

  #actualProtocol = null;
  #mailbox = null;

  /**
   * @constructor
   * @param {string} urlStr - The URL containing configuration information
   * @property {string} protocol - imap: or imaps: for secure/TLS connection
   * @property {string} user - The IMAP account username to connect with
   * @property {string} password - The IMAP account password to connect with
   * @property {string} port - [optional] The IMAP server port number; defaults to 143 for imap: and 993 for imaps:
   * @property {string} pathname - [optional] The mailbox to use for operations; defaults to INBOX
   * @example imap://user:pass@host:port/mailbox
   */
  constructor(urlStr) {
    let actualProtocol;
    if (urlStr.startsWith('imap://'))
      actualProtocol = 'imap:';
    else if (urlStr.startsWith('imaps://'))
      actualProtocol = 'imaps:';
    else
      throw new Error('Not a valid IMAP URL');
    super(`http:${urlStr.substr(actualProtocol.length)}`);  // switch to http as that is a registred supported protocol
    this.#actualProtocol = actualProtocol;
    const path = super.pathname.substr(1);  // skip leading /
    if (path === '') { // Select default mailbox
      this.#mailbox = 'INBOX';
      this.pathname = `/${this.#mailbox}`;
    }
    else {
      this.#mailbox = decodeURIComponent(path);
    }
  }
  
  // These just override existing URL class properties
  get href() { return `${this.#actualProtocol}${super.href.substr('http:'.length)}` }
  get protocol() { return this.#actualProtocol; }
  get port() { return super.port || (this.useTLS ? '993' : '143'); }
  get origin() { return `${this.protocol}//${super.host}`; }

  /**
   * Getter for the IMAP configuration's target mailbox property
   * @returns {string}
   */
  get mailbox() { return this.#mailbox; }
  /**
   * Getter for the IMAP configuration's use of TLS option
   * @returns {boolean}
   */
  get useTLS() { return this.protocol === 'imaps:'; }

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
      mailbox: this.mailbox,
      useTLS: this.useTLS,
    };
  }

}

/**
 * The built-in URL object
 * @external URL
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/URL|URL}
 */