import tap from 'tap';
import { MQTTURL } from '../MQTTURL.js';

tap.test('Supports the mqtt protocol', async (test) => {
  const url = new MQTTURL('mqtt://mosquitto.example.com');
  test.equal(url.protocol, 'mqtt:');
});

tap.test('Supports the mqtts secure flag protocol', async (test) => {
  const url = new MQTTURL('mqtts://mosquitto.example.com');
  test.equal(url.protocol, 'mqtts:');
});

tap.test('Rejects non-mqtt protocols', async (test) => {
  test.throws(() => { new MQTTURL('http://mosquitto.example.com'); });
});

tap.test('Supports username and password', async (test) => {
  const url = new MQTTURL('mqtts://testuser:testpass@mosquitto.example.com');
  test.equal(url.username, 'testuser');
  test.equal(url.password, 'testpass');
});

tap.test('Supports default port numbers', async (test) => {
  let url = new MQTTURL('mqtt://mosquitto.example.com');
  test.equal(url.port, '1883');
  url = new MQTTURL('mqtts://mosquitto.example.com');
  test.equal(url.port, '8883');
});

tap.test('Supports requested port number', async (test) => {
  let url = new MQTTURL('mqtt://mosquitto.example.com:12345');
  test.equal(url.port, '12345');
  url = new MQTTURL('mqtts://mosquitto.example.com:23456');
  test.equal(url.port, '23456');
});

tap.test('Supports corrected href', async (test) => {
  const urlStr = 'mqtt://user:pass@mosquitto.example.com/';
  const url = new MQTTURL(urlStr);
  test.equal(url.href, urlStr);
});

tap.test('Supports corrected origin', async (test) => {
  const url = new MQTTURL('mqtt://mosquitto.example.com:12345');
  test.equal(url.origin, 'mqtt://mosquitto.example.com:12345');
});

tap.test('Supports normal/secure options', async (test) => {
  let url = new MQTTURL('mqtt://mosquitto.example.com');
  test.equal(url.secure, false);

  url = new MQTTURL('mqtts://mosquitto.example.com');
  test.equal(url.secure, true);
});

tap.test('Supports requested MQTT version', async (test) => {
  let url = new MQTTURL('mqtt://mosquitto.example.com');
  test.equal(url.mqttVersion, 4);

  url = new MQTTURL('mqtt://mosquitto.example.com/?mqttversion=5');
  test.equal(url.mqttVersion, 5);

  url = new MQTTURL('mqtt://mosquitto.example.com/?mqttversion=asdf');
  test.equal(url.mqttVersion, 4);
});

tap.test('Supports specified default QoS', async (test) => {
  let url = new MQTTURL('mqtt://mosquitto.example.com');
  test.equal(url.defaultQoS, 2);

  url = new MQTTURL('mqtt://mosquitto.example.com/?defaultqos=1');
  test.equal(url.defaultQoS, 1);

  url = new MQTTURL('mqtt://mosquitto.example.com/?defaultqos=asdf');
  test.equal(url.defaultQoS, 2);
});

tap.test('Supports string parameters', async (test) => {
  let url = new MQTTURL('mqtt://mosquitto.example.com/?mqttversion=4');
  test.equal(url.paramString('mqttversion'), '4');
  url = new MQTTURL('mqtt://mosquitto.example.com/?mqttversion=4');
  test.equal(url.paramString('missingparam'), '');
});

tap.test('Supports integer parameters', async (test) => {
  let url = new MQTTURL('mqtt://mosquitto.example.com/?mqttversion=4');
  test.equal(url.paramInt('mqttversion'), 4);
  url = new MQTTURL('mqtt://mosquitto.example.com/?mqttversion=4');
  test.equal(url.paramInt('missingparam'), undefined);
});

tap.test('Supports float parameters', async (test) => {
  let url = new MQTTURL('mqtt://mosquitto.example.com/?mqttversion=3.14');
  test.equal(url.paramFloat('mqttversion'), 3.14);
  url = new MQTTURL('mqtt://mosquitto.example.com/?mqttversion=4');
  test.equal(url.paramFloat('missingparam'), undefined);
});

tap.test('Supports boolean parameters', async (test) => {
  let url = new MQTTURL('mqtt://mosquitto.example.com/?someparam=true');
  test.equal(url.paramBoolean('someparam'), true);
  url = new MQTTURL('mqtt://mosquitto.example.com/?someparam=Y');
  test.equal(url.paramBoolean('someparam'), true);
  url = new MQTTURL('mqtt://mosquitto.example.com/?someparam=yes');
  test.equal(url.paramBoolean('someparam'), true);
  url = new MQTTURL('mqtt://mosquitto.example.com/?someparam=1');
  test.equal(url.paramBoolean('someparam'), true);
  url = new MQTTURL('mqtt://mosquitto.example.com/?someparam=false');
  test.equal(url.paramBoolean('someparam'), false);
  url = new MQTTURL('mqtt://mosquitto.example.com/?someparam=N');
  test.equal(url.paramBoolean('someparam'), false);
  url = new MQTTURL('mqtt://mosquitto.example.com/?someparam=no');
  test.equal(url.paramBoolean('someparam'), false);
  url = new MQTTURL('mqtt://mosquitto.example.com/?someparam=0');
  test.equal(url.paramBoolean('someparam'), false);
  url = new MQTTURL('mqtt://mosquitto.example.com/?someparam=false');
  test.equal(url.paramBoolean('missingparam'), undefined);
});

tap.test('Supports collection of will object parameters', async (test) => {
  let url = new MQTTURL('mqtt://mosquitto.example.com/');
  test.equal(url.will, undefined);
  url = new MQTTURL('mqtt://mosquitto.example.com/?will_topic=data/sensor1status&will_payload=offline&will_qos=2&will_retain=true');
  test.match(url.will, {
    topic: 'data/sensor1status',
    payload: 'offline',
    qos: 2,
    retain: true,
  });
});

tap.test('Supports JSON serialization', async (test) => {
  let url = new MQTTURL('mqtt://testuser:testpass@mosquitto.example.com:2345?some_value=yes');
  let result = url.toJSON();
  test.ok(result.searchParams);
  delete result.searchParams;
  test.match(result, {
    href: 'mqtt://testuser:testpass@mosquitto.example.com:2345/?some_value=yes',
    protocol: 'mqtt:',
    username: 'testuser',
    password: 'testpass',
    host: 'mosquitto.example.com:2345',
    hostname: 'mosquitto.example.com',
    port: '2345',
    origin: 'mqtt://mosquitto.example.com:2345',
    pathname: '/',
    search: '?some_value=yes',
    hash: '',
    secure: false,
    mqttVersion: '4',
    defaultQoS: 2,
    will: undefined,
  });
});

tap.test('Supports stirng serialization', async (test) => {
  const url = new MQTTURL('mqtt://testuser:testpass@mosquitto.example.com:2345?some_value=yes');
  test.equal(url.toString(), 'mqtt://testuser:testpass@mosquitto.example.com:2345/?some_value=yes');
});
