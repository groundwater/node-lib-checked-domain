# checked domain

Handle typed domain exceptions

## install

```bash
npm install --save lib-checked-domain
```

## usage

Catch known types, or throw when the type is unknown.

```javascript
check(function () {
  // throw a *typed* exception
  throw check.Error('exit', 'bad exit')
})
.on('fail', function () {
  // handle 'fail' type
})
.on('exit', function () {
  // handle 'exit' type
})
```

## see also

- [Error Handling in Node.js](https://www.joyent.com/developers/node/design/errors)
