import tap from 'tap';
import { RedisURL } from '../RedisURL.js';

tap.test('Supports the redis protocol', async (test) => {
  const url = new RedisURL('redis://redis.example.com');
  test.equal(url.protocol, 'redis:');
});

tap.test('Supports the rediss secure flag protocol', async (test) => {
  const url = new RedisURL('rediss://redis.example.com');
  test.equal(url.protocol, 'rediss:');
});

tap.test('Rejects non-redis protocols', async (test) => {
  test.throws(() => { new RedisURL('http://redis.example.com'); });
});

tap.test('Supports username and password', async (test) => {
  const url = new RedisURL('rediss://testuser:testpass@redis.example.com');
  test.equal(url.username, 'testuser');
  test.equal(url.password, 'testpass');
});

tap.test('Supports default port numbers', async (test) => {
  let url = new RedisURL('redis://redis.example.com');
  test.equal(url.port, '6379');
  url = new RedisURL('rediss://redis.example.com');
  test.equal(url.port, '6379');
});

tap.test('Supports requested port number', async (test) => {
  let url = new RedisURL('redis://redis.example.com:12345');
  test.equal(url.port, '12345');
  url = new RedisURL('rediss://redis.example.com:23456');
  test.equal(url.port, '23456');
});

tap.test('Supports corrected href', async (test) => {
  const urlStr = 'redis://user:pass@redis.example.com/';
  const url = new RedisURL(urlStr);
  test.equal(url.href.startsWith(urlStr), true);  // startsWith instead of string compare since default DB will be added, which is a different test
});

tap.test('Supports corrected origin', async (test) => {
  const url = new RedisURL('redis://redis.example.com:12345');
  test.equal(url.origin, 'redis://redis.example.com:12345');
});

tap.test('Supports default database', async (test) => {
  const url = new RedisURL('redis://redis.example.com');
  test.equal(url.database, 0);
});

tap.test('Supports specified database', async (test) => {
  const url = new RedisURL('redis://redis.example.com/4');
  test.equal(url.database, 4);
});

tap.test('Validates specified database', async (test) => {
  let url = new RedisURL('redis://redis.example.com/4');
  test.equal(url.database, 4);
  test.throw(() => { new RedisURL('redis://redis.example.com/invalid'); });
  test.throw(() => { new RedisURL('redis://redis.example.com/-5'); });
  test.throw(() => { new RedisURL('redis://redis.example.com/50'); });
});

tap.test('Supports specified key/channel', async (test) => {
  const url = new RedisURL('redis://redis.example.com/4/demokey');
  test.equal(url.key, 'demokey');  // for data
  test.equal(url.channel, 'demokey');  // for pub/sub
});

tap.test('Supports normal/secure options', async (test) => {
  let url = new RedisURL('redis://redis.example.com');
  test.equal(url.useTLS, false);

  url = new RedisURL('rediss://redis.example.com');
  test.equal(url.useTLS, true);
});

tap.test('Supports connection string serialization', async (test) => {
  const url = new RedisURL('redis://redis.example.com/4/demokey');
  test.equal(url.toConnectionString(), 'redis://redis.example.com/4');  // omits the key/channel which isn't used for connection
});

tap.test('Supports JSON serialization', async (test) => {
  let url = new RedisURL('redis://testuser:testpass@redis.example.com/4/demokey');
  let result = url.toJSON();
  test.ok(result.searchParams);  // test that it's there, but drop for test.match
  delete result.searchParams;
  test.match(result, {
    href: 'redis://testuser:testpass@redis.example.com/4/demokey',
    protocol: 'redis:',
    username: 'testuser',
    password: 'testpass',
    host: 'redis.example.com',
    hostname: 'redis.example.com',
    port: '6379',
    origin: 'redis://redis.example.com',
    pathname: '/4/demokey',
    search: '',
    hash: '',
    useTLS: false,
    database: 4,
    key: 'demokey',
    channel: 'demokey',
  });
  url = new RedisURL('rediss://testuser:testpass@redis.example.com:2345/4/demokey');
  result = url.toJSON();
  test.ok(result.searchParams);  // test that it's there, but drop for test.match
  delete result.searchParams;
  test.match(result, {
    href: 'rediss://testuser:testpass@redis.example.com:2345/4/demokey',
    protocol: 'rediss:',
    username: 'testuser',
    password: 'testpass',
    host: 'redis.example.com:2345',
    hostname: 'redis.example.com',
    port: '2345',
    origin: 'rediss://redis.example.com:2345',
    pathname: '/4/demokey',
    search: '',
    hash: '',
    useTLS: true,
    database: 4,
    key: 'demokey',
    channel: 'demokey',
  });
});
