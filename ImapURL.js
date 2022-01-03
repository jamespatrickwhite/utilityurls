// ImapURL - Parses out something similar to the format described in RFC5092
// Format: imap://user:pass@host:port/mailbox -- NOTE: this implementation adds imaps: for SSL/TLS option
// Read-only mimic of URL but for parsing IMAP type URLs
export class ImapURL extends URL {

  #actualProtocol = null;
  #mailbox = null;

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
  
  get href() { return `${this.#actualProtocol}${super.href.substr('http:'.length)}` }
  get protocol() { return this.#actualProtocol; }
  get port() { return super.port || (this.useTLS ? '993' : '143'); }
  get origin() { return `${this.protocol}//${super.host}`; }

  get mailbox() { return this.#mailbox; }
  get useTLS() { return this.protocol === 'imaps:'; }

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
      mailbox: this.mailbox,
      useTLS: this.useTLS,
    };
  }

}
