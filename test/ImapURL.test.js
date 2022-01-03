import tap from 'tap';
import { ImapURL } from '../ImapURL.js';

tap.test('Supports the imap protocol', async (test) => {
  const url = new ImapURL('imap://mail.example.com');
  test.equal(url.protocol, 'imap:');
});

tap.test('Supports the imaps secure flag protocol', async (test) => {
  const url = new ImapURL('imaps://mail.example.com');
  test.equal(url.protocol, 'imaps:');
});

tap.test('Rejects non-imap protocols', async (test) => {
  test.throws(() => { new ImapURL('http://mail.example.com'); });
});

tap.test('Supports username and password', async (test) => {
  const url = new ImapURL('imaps://testuser:testpass@mail.example.com');
  test.equal(url.username, 'testuser');
  test.equal(url.password, 'testpass');
});

tap.test('Supports default port numbers', async (test) => {
  let url = new ImapURL('imap://mail.example.com');
  test.equal(url.port, '143');
  url = new ImapURL('imaps://mail.example.com');
  test.equal(url.port, '993');
});

tap.test('Supports requested port number', async (test) => {
  let url = new ImapURL('imap://mail.example.com:12345');
  test.equal(url.port, '12345');
  url = new ImapURL('imaps://mail.example.com:23456');
  test.equal(url.port, '23456');
});

tap.test('Supports corrected href', async (test) => {
  const urlStr = 'imap://user:pass@mail.example.com/';
  const url = new ImapURL(urlStr);
  test.equal(url.href.startsWith(urlStr), true);  // startsWith instead of string comparison since default mailbox is added and that test is separate
});

tap.test('Supports corrected origin', async (test) => {
  const url = new ImapURL('imap://mail.example.com:12345');
  test.equal(url.origin, 'imap://mail.example.com:12345');
});

tap.test('Supports normal/secure options', async (test) => {
  let url = new ImapURL('imap://mail.example.com');
  test.equal(url.useTLS, false);

  url = new ImapURL('imaps://mail.example.com');
  test.equal(url.useTLS, true);
});

tap.test('Supports default mailbox', async (test) => {
  const url = new ImapURL('imap://mail.example.com');
  test.equal(url.mailbox, 'INBOX');
  test.equal(url.pathname, '/INBOX');
});

tap.test('Supports requested mailbox', async (test) => {
  let url = new ImapURL('imap://mail.example.com/mailbox2');
  test.equal(url.mailbox, 'mailbox2');

  url = new ImapURL('imap://mail.example.com/some/other/nested/mailbox');
  test.equal(url.mailbox, 'some/other/nested/mailbox');
});

tap.test('Supports JSON serialization', async (test) => {
  let url = new ImapURL('imaps://testuser:testpass@mail.example.com');
  let result = url.toJSON();
  test.ok(result.searchParams);
  delete result.searchParams;
  test.matches(result, {
    href: 'imaps://testuser:testpass@mail.example.com',
    protocol: 'imaps:',
    username: 'testuser',
    password: 'testpass',
    host: 'mail.example.com',
    hostname: 'mail.example.com',
    port: '993',
    origin: 'imaps://mail.example.com',
    pathname: '/INBOX',
    search: '',
    hash: '',
    mailbox: 'INBOX',
    useTLS: true,
  });
  url = new ImapURL('imap://testuser:testpass@mail.example.com:2345/mailbox2');
  result = url.toJSON();
  test.ok(result.searchParams);
  delete result.searchParams;
  test.matches(result, {
    href: 'imap://testuser:testpass@mail.example.com:2345/mailbox2',
    protocol: 'imap:',
    username: 'testuser',
    password: 'testpass',
    host: 'mail.example.com:2345',
    hostname: 'mail.example.com',
    port: '2345',
    origin: 'imap://mail.example.com:2345',
    pathname: '/mailbox2',
    search: '',
    hash: '',
    mailbox: 'mailbox2',
    useTLS: false,
  });
});

tap.test('Supports string serialization', async (test) => {
  const url = new ImapURL('imaps://testuser:testpass@mail.example.com');
  test.equal(url.toString(), 'imaps://testuser:testpass@mail.example.com/INBOX');
})