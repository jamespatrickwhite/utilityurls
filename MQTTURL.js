export class MQTTURL extends URL {
  #actualProtocol = null;

  constructor(urlStr) {
    let actualProtocol;
    if (urlStr.startsWith('mqtts://'))
      actualProtocol = 'mqtts:';
    else if (urlStr.startsWith('mqtt://'))
      actualProtocol = 'mqtt:';
    else
      throw new Error('Not a valid MQTT URL');
    super(`http:${urlStr.substr(actualProtocol.length)}`);  // switch to http as that is a registred supported protocol
    this.#actualProtocol = actualProtocol;
  }

  get protocol() { return this.#actualProtocol; }
  get port() {
    if (super.port)
      return super.port;
    switch (this.#actualProtocol) {
      case 'mqtts:':
        return '8883';
      case 'mqtt:':
      default:
        return '1883';
    }
  }
  get href() { return this.#toMQTTURL(super.href); }
  get origin() { return this.#toMQTTURL(super.origin); }

  get secure() { return this.#actualProtocol === 'mqtts:'; }
  get mqttVersion() { return this.paramFloat('mqttVersion') || 4; }  // 3.x, 4, 5
  get defaultQoS() { return this.paramInt('defaultqos') || 2; }

  get will() {
    const rec = this.paramObject('will');
    if (!rec)
      return rec;
    // topic, payload - optional properties_ MQTT 5 items
    rec.qos = this.paramInt('will_qos');
    rec.retain = this.paramBoolean('will_retain');
    return rec;
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
      secure: this.secure,
      mqttVersion: this.mqttVersion,
      defaultQoS: this.defaultQoS,
      will: this.will,
    };
  }

  #toMQTTURL(urlStr) {
    return `${this.#actualProtocol}${urlStr.substr(this.#actualProtocol.length)}`;
  }

  #param(name) {
    if (this.searchParams.has(name))
      return this.searchParams.get(name);
    return undefined;
  }

  paramString(name) {
    return this.#param(name) || '';
  }

  paramInt(name) {
    const value = parseInt(this.#param(name), 10);
    if (isNaN(value))
      return undefined;
    return value;
  }

  paramFloat(name) {
    const value = parseFloat(this.#param(name));
    if (isNaN(value))
      return undefined;
    return value;
  }

  paramBoolean(name) {
    let value = this.#param(name);
    if (value === undefined)
      return value;
    // treat truthy as true and set w/o a given value as an exist/true
    return ['y', 'yes', 't', 'true', '1', ''].includes(value.toLowerCase());
  }

  paramObject(name) {
    const prefix = `${name}_`;
    let obj = undefined;
    for (let paramName of this.searchParams.keys()) {
      if (paramName.startsWith(prefix)) {
        obj = obj || {};
        obj[paramName.substr(prefix.length)] = this.searchParams.get(paramName);
      }
    }
    return obj;
  }

}
