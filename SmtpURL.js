// SmtpURL - Parses out criteria for connecting with a SMTP server
// Format: smtp://user:pass@host:port -- NOTE: this implementation adds smtps: for TLS option
export class SmtpURL extends URL {
  #actualProtocol = null;

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

  get useTLS() { return this.protocol === 'smtps:'; }

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
    };
  }

}
