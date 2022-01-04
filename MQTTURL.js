/**
 * @module MQTTURL
 */

/**
 * MQTTURL - Parses out MQTT connection criteria in a URL-based format.
 * Read-only mimic of the URL class, but for parsing MQTT type URLs.
 * Use of the configuration properties will pull through the standard URL properties as much as possible.
 * @extends external:URL
 */
 export class MQTTURL extends URL {
  #actualProtocol = null;

  /**
   * @constructor
   * @param {string} urlStr - The URL containing configuration information
   * @property {string} protocol - mqtt: or mqtts: for secure/TLS connection
   * @property {string} user - [optional] The MQTT username to connect with
   * @property {string} password - [optional] The MQTT password to connect with
   * @property {string} port - [optional] The MQTT server port number; defaults to 1883 for mqtt: and 8883 for mqtts:
   * @property {string} mqttversion - [optional] Search parameter that represents the desired version of MQTT; defaults to 4
   * @property {string} defaultqos - [optional] Search parameter that represents the desired quality-of-service level; defaults to 2
   * @property {string} will_* - [optional] Search parameters starting with will_ are collected into an object for LWT preferences
   * @example mqtt://user:pass@host:port/?mqttversion=4&defaultqos=2&will_topic=devices/12345/onlinestatus&will_payload=offline&will_retain=true
   */
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

  /**
   * Returns if the MQTT connection should use the secured version
   * @returns {boolean}
   */
  get secure() { return this.#actualProtocol === 'mqtts:'; }
  /**
   * Returns the desired version of MQTT to use in the connection
   * @returns {float}
   */
  get mqttVersion() { return this.paramFloat('mqttversion') || 4; }  // 3.x, 4, 5
  /**
   * Returns the requested Quality of Service for message delivery
   * @returns {int}
   */
  get defaultQoS() { return this.paramInt('defaultqos') || 2; }

  /**
   * Returns the settings (if any were specified) for the Last Will and Testament (LWT)
   * to be used if the connection is lost
   * @returns {Object}
   */
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

  /**
   * Return a given search parameter's value as a string, if found
   * @param {string} name - The named search parameter to return
   * @returns {string} The value as a string, or an empty string if not found
   */
  paramString(name) {
    return this.#param(name) || '';
  }

  /**
   * Return a given search parameter's value as an integer, if found
   * @param {string} name - The named search parameter to return
   * @returns {int} The value as an integer, or undefined if not found
   */
   paramInt(name) {
    const value = parseInt(this.#param(name), 10);
    if (isNaN(value))
      return undefined;
    return value;
  }

  /**
   * Return a given search parameter's value as a floating point number, if found
   * @param {string} name - The named search parameter to return
   * @returns {number} The value as a number, or undefined if not found
   */
   paramFloat(name) {
    const value = parseFloat(this.#param(name));
    if (isNaN(value))
      return undefined;
    return value;
  }

  /**
   * Return a given search parameter's value as a boolean (with Y/Yes/T/True/1 or set w/o a value equal to true), if found
   * @param {string} name - The named search parameter to return
   * @returns {boolean} The value as a boolean, or undefined if not found
   */
   paramBoolean(name) {
    let value = this.#param(name);
    if (value === undefined)
      return value;
    // treat truthy as true and set w/o a given value as an exist/true
    return ['y', 'yes', 't', 'true', '1', ''].includes(value.toLowerCase());
  }

  /**
   * Return a collection of search parameters with the same prefix as an object of key/value properties
   * @param {string} name - The search parameter prefix followed by an underscore character to search against
   * @returns {Object} The object of key/value properties, or undefined if none found
   */
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
