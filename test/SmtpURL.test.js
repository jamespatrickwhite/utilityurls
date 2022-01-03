import tap from 'tap';
import { SmtpURL } from '../SmtpURL.js';

tap.test('Supports the smtp protocol', async (test) => {
  const url = new SmtpURL('smtp://mail.example.com');
  test.equal(url.protocol, 'smtp:');
});

tap.test('Supports the smtps secure flag protocol', async (test) => {
  const url = new SmtpURL('smtps://mail.example.com');
  test.equal(url.protocol, 'smtps:');
});

tap.test('Rejects non-smtp protocols', async (test) => {
  test.throws(() => { new SmtpURL('http://mail.example.com'); });
});

tap.test('Supports username and password', async (test) => {
  const url = new SmtpURL('smtps://testuser:testpass@mail.example.com');
  test.equal(url.username, 'testuser');
  test.equal(url.password, 'testpass');
});

tap.test('Supports default port numbers', async (test) => {
  let url = new SmtpURL('smtp://mail.example.com');
  test.equal(url.port, '25');
  url = new SmtpURL('smtps://mail.example.com');
  test.equal(url.port, '587');
});

tap.test('Supports requested port number', async (test) => {
  let url = new SmtpURL('smtp://mail.example.com:12345');
  test.equal(url.port, '12345');
  url = new SmtpURL('smtps://mail.example.com:23456');
  test.equal(url.port, '23456');
});

tap.test('Supports corrected href', async (test) => {
  const urlStr = 'smtp://user:pass@mail.example.com/';
  const url = new SmtpURL(urlStr);
  test.equal(url.href, urlStr);
});

tap.test('Supports corrected origin', async (test) => {
  const url = new SmtpURL('smtp://mail.example.com:12345');
  test.equal(url.origin, 'smtp://mail.example.com:12345');
});

tap.test('Supports normal/secure options', async (test) => {
  let url = new SmtpURL('smtp://mail.example.com');
  test.equal(url.useTLS, false);

  url = new SmtpURL('smtps://mail.example.com');
  test.equal(url.useTLS, true);
});

tap.test('Supports JSON serialization', async (test) => {
  let url = new SmtpURL('smtp://testuser:testpass@mail.example.com');
  let result = url.toJSON();
  test.ok(result.searchParams);
  delete result.searchParams;
  test.matches(result, {
    href: 'smtp://testuser:testpass@mail.example.com',
    protocol: 'smtp:',
    username: 'testuser',
    password: 'testpass',
    host: 'mail.example.com',
    hostname: 'mail.example.com',
    port: '25',
    origin: 'smtp://mail.example.com',
    pathname: '/',
    search: '',
    hash: '',
    useTLS: false,
  });
  url = new SmtpURL('smtps://testuser:testpass@mail.example.com');
  result = url.toJSON();
  test.ok(result.searchParams);
  delete result.searchParams;
  test.matches(result, {
    href: 'smtps://testuser:testpass@mail.example.com/',
    protocol: 'smtps:',
    username: 'testuser',
    password: 'testpass',
    host: 'mail.example.com',
    hostname: 'mail.example.com',
    port: '587',
    origin: 'smtps://mail.example.com',
    pathname: '/',
    search: '',
    hash: '',
    useTLS: true,
  });
  url = new SmtpURL('smtps://mail.example.com:2345');
  result = url.toJSON();
  test.ok(result.searchParams);
  delete result.searchParams;
  test.matches(result, {
    href: 'smtps://mail.example.com:2345',
    protocol: 'smtps:',
    username: '',
    password: '',
    host: 'mail.example.com:2345',
    hostname: 'mail.example.com',
    port: '2345',
    origin: 'smtps://mail.example.com:2345',
    pathname: '/',
    search: '',
    hash: '',
    useTLS: true,
  });
});

tap.test('Supports string serialization', async (test) => {
  const url = new SmtpURL('smtps://testuser:testpass@mail.example.com:2345');
  test.equal(url.toString(), 'smtps://testuser:testpass@mail.example.com:2345/');
});