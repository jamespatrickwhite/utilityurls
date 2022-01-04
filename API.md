## Modules

<dl>
<dt><a href="#module_ImapURL">ImapURL</a></dt>
<dd></dd>
<dt><a href="#module_MQTTURL">MQTTURL</a></dt>
<dd></dd>
<dt><a href="#module_RedisURL">RedisURL</a></dt>
<dd></dd>
<dt><a href="#module_SmtpURL">SmtpURL</a></dt>
<dd></dd>
</dl>

<a name="module_ImapURL"></a>

## ImapURL

* [ImapURL](#module_ImapURL)
    * _static_
        * [.ImapURL](#module_ImapURL.ImapURL) ⇐ [<code>URL</code>](#external_URL)
            * [new exports.ImapURL(urlStr)](#new_module_ImapURL.ImapURL_new)
            * [.mailbox](#module_ImapURL.ImapURL+mailbox) ⇒ <code>string</code>
            * [.useTLS](#module_ImapURL.ImapURL+useTLS) ⇒ <code>boolean</code>
            * [.toJSON()](#module_ImapURL.ImapURL+toJSON) ⇒ <code>Object</code>
    * _inner_
        * [~URL](#external_URL)

<a name="module_ImapURL.ImapURL"></a>

### ImapURL.ImapURL ⇐ [<code>URL</code>](#external_URL)
ImapURL - Parses out IMAP connection criteria in a format similar to the one described in RFC5092.
Read-only mimic of the URL class, but for parsing IMAP type URLs.
Use of the configuration properties will pull through the standard URL properties as much as possible.

**Kind**: static class of [<code>ImapURL</code>](#module_ImapURL)  
**Extends**: [<code>URL</code>](#external_URL)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| protocol | <code>string</code> | imap: or imaps: for secure/TLS connection |
| user | <code>string</code> | The IMAP account username to connect with |
| password | <code>string</code> | The IMAP account password to connect with |
| port | <code>string</code> | [optional] The IMAP server port number; defaults to 143 for imap: and 993 for imaps: |
| pathname | <code>string</code> | [optional] The mailbox to use for operations; defaults to INBOX |


* [.ImapURL](#module_ImapURL.ImapURL) ⇐ [<code>URL</code>](#external_URL)
    * [new exports.ImapURL(urlStr)](#new_module_ImapURL.ImapURL_new)
    * [.mailbox](#module_ImapURL.ImapURL+mailbox) ⇒ <code>string</code>
    * [.useTLS](#module_ImapURL.ImapURL+useTLS) ⇒ <code>boolean</code>
    * [.toJSON()](#module_ImapURL.ImapURL+toJSON) ⇒ <code>Object</code>

<a name="new_module_ImapURL.ImapURL_new"></a>

#### new exports.ImapURL(urlStr)

| Param | Type | Description |
| --- | --- | --- |
| urlStr | <code>string</code> | The URL containing configuration information |

**Example**  
```js
imap://user:pass@host:port/mailbox
```
<a name="module_ImapURL.ImapURL+mailbox"></a>

#### imapURL.mailbox ⇒ <code>string</code>
Getter for the IMAP configuration's target mailbox property

**Kind**: instance property of [<code>ImapURL</code>](#module_ImapURL.ImapURL)  
<a name="module_ImapURL.ImapURL+useTLS"></a>

#### imapURL.useTLS ⇒ <code>boolean</code>
Getter for the IMAP configuration's use of TLS option

**Kind**: instance property of [<code>ImapURL</code>](#module_ImapURL.ImapURL)  
<a name="module_ImapURL.ImapURL+toJSON"></a>

#### imapURL.toJSON() ⇒ <code>Object</code>
Gets an plain object representation suitable for JSON stringification

**Kind**: instance method of [<code>ImapURL</code>](#module_ImapURL.ImapURL)  
<a name="external_URL"></a>

### ImapURL~URL
The built-in URL object

**Kind**: inner external of [<code>ImapURL</code>](#module_ImapURL)  
**See**: [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL)  
<a name="module_MQTTURL"></a>

## MQTTURL

* [MQTTURL](#module_MQTTURL)
    * [.MQTTURL](#module_MQTTURL.MQTTURL) ⇐ [<code>URL</code>](#external_URL)
        * [new exports.MQTTURL(urlStr)](#new_module_MQTTURL.MQTTURL_new)
        * [.secure](#module_MQTTURL.MQTTURL+secure) ⇒ <code>boolean</code>
        * [.mqttVersion](#module_MQTTURL.MQTTURL+mqttVersion) ⇒ <code>float</code>
        * [.defaultQoS](#module_MQTTURL.MQTTURL+defaultQoS) ⇒ <code>int</code>
        * [.will](#module_MQTTURL.MQTTURL+will) ⇒ <code>Object</code>
        * [.toJSON()](#module_MQTTURL.MQTTURL+toJSON) ⇒ <code>Object</code>
        * [.paramString(name)](#module_MQTTURL.MQTTURL+paramString) ⇒ <code>string</code>
        * [.paramInt(name)](#module_MQTTURL.MQTTURL+paramInt) ⇒ <code>int</code>
        * [.paramFloat(name)](#module_MQTTURL.MQTTURL+paramFloat) ⇒ <code>number</code>
        * [.paramBoolean(name)](#module_MQTTURL.MQTTURL+paramBoolean) ⇒ <code>boolean</code>
        * [.paramObject(name)](#module_MQTTURL.MQTTURL+paramObject) ⇒ <code>Object</code>

<a name="module_MQTTURL.MQTTURL"></a>

### MQTTURL.MQTTURL ⇐ [<code>URL</code>](#external_URL)
MQTTURL - Parses out MQTT connection criteria in a URL-based format.
Read-only mimic of the URL class, but for parsing MQTT type URLs.
Use of the configuration properties will pull through the standard URL properties as much as possible.

**Kind**: static class of [<code>MQTTURL</code>](#module_MQTTURL)  
**Extends**: [<code>URL</code>](#external_URL)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| protocol | <code>string</code> | mqtt: or mqtts: for secure/TLS connection |
| user | <code>string</code> | [optional] The MQTT username to connect with |
| password | <code>string</code> | [optional] The MQTT password to connect with |
| port | <code>string</code> | [optional] The MQTT server port number; defaults to 1883 for mqtt: and 8883 for mqtts: |
| mqttversion | <code>string</code> | [optional] Search parameter that represents the desired version of MQTT; defaults to 4 |
| defaultqos | <code>string</code> | [optional] Search parameter that represents the desired quality-of-service level; defaults to 2 |
| will_* | <code>string</code> | [optional] Search parameters starting with will_ are collected into an object for LWT preferences |


* [.MQTTURL](#module_MQTTURL.MQTTURL) ⇐ [<code>URL</code>](#external_URL)
    * [new exports.MQTTURL(urlStr)](#new_module_MQTTURL.MQTTURL_new)
    * [.secure](#module_MQTTURL.MQTTURL+secure) ⇒ <code>boolean</code>
    * [.mqttVersion](#module_MQTTURL.MQTTURL+mqttVersion) ⇒ <code>float</code>
    * [.defaultQoS](#module_MQTTURL.MQTTURL+defaultQoS) ⇒ <code>int</code>
    * [.will](#module_MQTTURL.MQTTURL+will) ⇒ <code>Object</code>
    * [.toJSON()](#module_MQTTURL.MQTTURL+toJSON) ⇒ <code>Object</code>
    * [.paramString(name)](#module_MQTTURL.MQTTURL+paramString) ⇒ <code>string</code>
    * [.paramInt(name)](#module_MQTTURL.MQTTURL+paramInt) ⇒ <code>int</code>
    * [.paramFloat(name)](#module_MQTTURL.MQTTURL+paramFloat) ⇒ <code>number</code>
    * [.paramBoolean(name)](#module_MQTTURL.MQTTURL+paramBoolean) ⇒ <code>boolean</code>
    * [.paramObject(name)](#module_MQTTURL.MQTTURL+paramObject) ⇒ <code>Object</code>

<a name="new_module_MQTTURL.MQTTURL_new"></a>

#### new exports.MQTTURL(urlStr)

| Param | Type | Description |
| --- | --- | --- |
| urlStr | <code>string</code> | The URL containing configuration information |

**Example**  
```js
mqtt://user:pass@host:port/?mqttversion=4&defaultqos=2&will_topic=devices/12345/onlinestatus&will_payload=offline&will_retain=true
```
<a name="module_MQTTURL.MQTTURL+secure"></a>

#### mqtturL.secure ⇒ <code>boolean</code>
Returns if the MQTT connection should use the secured version

**Kind**: instance property of [<code>MQTTURL</code>](#module_MQTTURL.MQTTURL)  
<a name="module_MQTTURL.MQTTURL+mqttVersion"></a>

#### mqtturL.mqttVersion ⇒ <code>float</code>
Returns the desired version of MQTT to use in the connection

**Kind**: instance property of [<code>MQTTURL</code>](#module_MQTTURL.MQTTURL)  
<a name="module_MQTTURL.MQTTURL+defaultQoS"></a>

#### mqtturL.defaultQoS ⇒ <code>int</code>
Returns the requested Quality of Service for message delivery

**Kind**: instance property of [<code>MQTTURL</code>](#module_MQTTURL.MQTTURL)  
<a name="module_MQTTURL.MQTTURL+will"></a>

#### mqtturL.will ⇒ <code>Object</code>
Returns the settings (if any were specified) for the Last Will and Testament (LWT)
to be used if the connection is lost

**Kind**: instance property of [<code>MQTTURL</code>](#module_MQTTURL.MQTTURL)  
<a name="module_MQTTURL.MQTTURL+toJSON"></a>

#### mqtturL.toJSON() ⇒ <code>Object</code>
Gets an plain object representation suitable for JSON stringification

**Kind**: instance method of [<code>MQTTURL</code>](#module_MQTTURL.MQTTURL)  
<a name="module_MQTTURL.MQTTURL+paramString"></a>

#### mqtturL.paramString(name) ⇒ <code>string</code>
Return a given search parameter's value as a string, if found

**Kind**: instance method of [<code>MQTTURL</code>](#module_MQTTURL.MQTTURL)  
**Returns**: <code>string</code> - The value as a string, or an empty string if not found  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The named search parameter to return |

<a name="module_MQTTURL.MQTTURL+paramInt"></a>

#### mqtturL.paramInt(name) ⇒ <code>int</code>
Return a given search parameter's value as an integer, if found

**Kind**: instance method of [<code>MQTTURL</code>](#module_MQTTURL.MQTTURL)  
**Returns**: <code>int</code> - The value as an integer, or undefined if not found  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The named search parameter to return |

<a name="module_MQTTURL.MQTTURL+paramFloat"></a>

#### mqtturL.paramFloat(name) ⇒ <code>number</code>
Return a given search parameter's value as a floating point number, if found

**Kind**: instance method of [<code>MQTTURL</code>](#module_MQTTURL.MQTTURL)  
**Returns**: <code>number</code> - The value as a number, or undefined if not found  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The named search parameter to return |

<a name="module_MQTTURL.MQTTURL+paramBoolean"></a>

#### mqtturL.paramBoolean(name) ⇒ <code>boolean</code>
Return a given search parameter's value as a boolean (with Y/Yes/T/True/1 or set w/o a value equal to true), if found

**Kind**: instance method of [<code>MQTTURL</code>](#module_MQTTURL.MQTTURL)  
**Returns**: <code>boolean</code> - The value as a boolean, or undefined if not found  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The named search parameter to return |

<a name="module_MQTTURL.MQTTURL+paramObject"></a>

#### mqtturL.paramObject(name) ⇒ <code>Object</code>
Return a collection of search parameters with the same prefix as an object of key/value properties

**Kind**: instance method of [<code>MQTTURL</code>](#module_MQTTURL.MQTTURL)  
**Returns**: <code>Object</code> - The object of key/value properties, or undefined if none found  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The search parameter prefix followed by an underscore character to search against |

<a name="module_RedisURL"></a>

## RedisURL

* [RedisURL](#module_RedisURL)
    * [.RedisURL](#module_RedisURL.RedisURL) ⇐ [<code>URL</code>](#external_URL)
        * [new exports.RedisURL(urlStr)](#new_module_RedisURL.RedisURL_new)
        * [.MAX_DB_NUM](#module_RedisURL.RedisURL+MAX_DB_NUM)
        * [.database](#module_RedisURL.RedisURL+database) ⇒ <code>int</code>
        * [.key](#module_RedisURL.RedisURL+key) ⇒ <code>string</code>
        * [.channel](#module_RedisURL.RedisURL+channel) ⇒ <code>string</code>
        * [.useTLS](#module_RedisURL.RedisURL+useTLS) ⇒ <code>boolean</code>
        * [.toConnectionString()](#module_RedisURL.RedisURL+toConnectionString) ⇒ <code>string</code>
        * [.toJSON()](#module_RedisURL.RedisURL+toJSON) ⇒ <code>Object</code>

<a name="module_RedisURL.RedisURL"></a>

### RedisURL.RedisURL ⇐ [<code>URL</code>](#external_URL)
RedisURL - Read-only mimic of URL but for parsing Redis type URLs.
Per: [https://www.iana.org/assignments/uri-schemes/prov/redis](https://www.iana.org/assignments/uri-schemes/prov/redis) and [https://www.iana.org/assignments/uri-schemes/prov/rediss](https://www.iana.org/assignments/uri-schemes/prov/rediss)
this implementation extends the format, adding a /<key name> suffix beyond the DB number part of the URL pathname

**Kind**: static class of [<code>RedisURL</code>](#module_RedisURL)  
**Extends**: [<code>URL</code>](#external_URL)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| protocol | <code>string</code> | redis: or rediss: for secure/TLS connection |
| user | <code>string</code> | [optional] The Redis username to connect with |
| password | <code>string</code> | [optional] The Redis account password to connect with |
| port | <code>string</code> | [optional] The Redis server port number; defaults to 6379 |
| pathname | <code>string</code> | [optional] The DB number to interact with; defaults to 0. Further pathname content represents a Redis key or message channel. |


* [.RedisURL](#module_RedisURL.RedisURL) ⇐ [<code>URL</code>](#external_URL)
    * [new exports.RedisURL(urlStr)](#new_module_RedisURL.RedisURL_new)
    * [.MAX_DB_NUM](#module_RedisURL.RedisURL+MAX_DB_NUM)
    * [.database](#module_RedisURL.RedisURL+database) ⇒ <code>int</code>
    * [.key](#module_RedisURL.RedisURL+key) ⇒ <code>string</code>
    * [.channel](#module_RedisURL.RedisURL+channel) ⇒ <code>string</code>
    * [.useTLS](#module_RedisURL.RedisURL+useTLS) ⇒ <code>boolean</code>
    * [.toConnectionString()](#module_RedisURL.RedisURL+toConnectionString) ⇒ <code>string</code>
    * [.toJSON()](#module_RedisURL.RedisURL+toJSON) ⇒ <code>Object</code>

<a name="new_module_RedisURL.RedisURL_new"></a>

#### new exports.RedisURL(urlStr)

| Param | Type | Description |
| --- | --- | --- |
| urlStr | <code>string</code> | The URL containing configuration information |

**Example**  
```js
redis://user:pass@host:port/0
```
**Example**  
```js
redis://user:pass@host:port/0/keyname
```
<a name="module_RedisURL.RedisURL+MAX_DB_NUM"></a>

#### redisURL.MAX\_DB\_NUM
Maximum Redis DB Number; normally servers default to 16 which range from 0 to 15, but custom
server configurations may permit higher ranges.

**Kind**: instance property of [<code>RedisURL</code>](#module_RedisURL.RedisURL)  
**Access**: public  
<a name="module_RedisURL.RedisURL+database"></a>

#### redisURL.database ⇒ <code>int</code>
Return the desired Redis DB number

**Kind**: instance property of [<code>RedisURL</code>](#module_RedisURL.RedisURL)  
<a name="module_RedisURL.RedisURL+key"></a>

#### redisURL.key ⇒ <code>string</code>
Return the desired Redis key, if one was specified

**Kind**: instance property of [<code>RedisURL</code>](#module_RedisURL.RedisURL)  
<a name="module_RedisURL.RedisURL+channel"></a>

#### redisURL.channel ⇒ <code>string</code>
Return the desired Redis message channel, if one was specified

**Kind**: instance property of [<code>RedisURL</code>](#module_RedisURL.RedisURL)  
**See**: key()  
<a name="module_RedisURL.RedisURL+useTLS"></a>

#### redisURL.useTLS ⇒ <code>boolean</code>
Return whether this connection should use a secure method

**Kind**: instance property of [<code>RedisURL</code>](#module_RedisURL.RedisURL)  
<a name="module_RedisURL.RedisURL+toConnectionString"></a>

#### redisURL.toConnectionString() ⇒ <code>string</code>
Return the connection URL format to be used in multiple Redis clients

**Kind**: instance method of [<code>RedisURL</code>](#module_RedisURL.RedisURL)  
<a name="module_RedisURL.RedisURL+toJSON"></a>

#### redisURL.toJSON() ⇒ <code>Object</code>
Gets an plain object representation suitable for JSON stringification

**Kind**: instance method of [<code>RedisURL</code>](#module_RedisURL.RedisURL)  
<a name="module_SmtpURL"></a>

## SmtpURL

* [SmtpURL](#module_SmtpURL)
    * [.SmtpURL](#module_SmtpURL.SmtpURL) ⇐ [<code>URL</code>](#external_URL)
        * [new exports.SmtpURL(urlStr)](#new_module_SmtpURL.SmtpURL_new)
        * [.useTLS](#module_SmtpURL.SmtpURL+useTLS) ⇒ <code>boolean</code>
        * [.toJSON()](#module_SmtpURL.SmtpURL+toJSON) ⇒ <code>Object</code>

<a name="module_SmtpURL.SmtpURL"></a>

### SmtpURL.SmtpURL ⇐ [<code>URL</code>](#external_URL)
SmtpURL - Parses out criteria for connecting with a SMTP server.
Read-only mimic of the URL class, but for parsing SMTP type URLs.
Use of the configuration properties will pull through the standard URL properties as much as possible.

**Kind**: static class of [<code>SmtpURL</code>](#module_SmtpURL)  
**Extends**: [<code>URL</code>](#external_URL)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| protocol | <code>string</code> | smtp: or smtps: for secure/TLS connection |
| user | <code>string</code> | The SMTP account username to connect to the server |
| password | <code>string</code> | The SMTP account password to connect to the server |
| port | <code>string</code> | [optional] The SMTP server port number; defaults to 25 for smtp: and 587 for smtps: |


* [.SmtpURL](#module_SmtpURL.SmtpURL) ⇐ [<code>URL</code>](#external_URL)
    * [new exports.SmtpURL(urlStr)](#new_module_SmtpURL.SmtpURL_new)
    * [.useTLS](#module_SmtpURL.SmtpURL+useTLS) ⇒ <code>boolean</code>
    * [.toJSON()](#module_SmtpURL.SmtpURL+toJSON) ⇒ <code>Object</code>

<a name="new_module_SmtpURL.SmtpURL_new"></a>

#### new exports.SmtpURL(urlStr)

| Param | Type | Description |
| --- | --- | --- |
| urlStr | <code>string</code> | The URL containing configuration information |

**Example**  
```js
smtp://user:pass@host:port
```
<a name="module_SmtpURL.SmtpURL+useTLS"></a>

#### smtpURL.useTLS ⇒ <code>boolean</code>
Returns whether this connection should use a secure TLS option

**Kind**: instance property of [<code>SmtpURL</code>](#module_SmtpURL.SmtpURL)  
<a name="module_SmtpURL.SmtpURL+toJSON"></a>

#### smtpURL.toJSON() ⇒ <code>Object</code>
Gets an plain object representation suitable for JSON stringification

**Kind**: instance method of [<code>SmtpURL</code>](#module_SmtpURL.SmtpURL)  
