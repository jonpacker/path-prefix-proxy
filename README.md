path-prefix-proxy
=================

`path-prefix-proxy` is an express middlewhere which makes it easy to add a prefix
path your existing express app.

The most common use case for this is when you have different services running on
different express servers, but you have something like nginx proxying all of 
these services to a single hostname.

For example, say you have an app that currently has the routes

```
GET /login
POST /login
GET /logout
```

But you've realised you want to share the host with some other services. So you'd
like to prefix all of these paths with `/auth`, going to:

```
GET /auth/login
POST /auth/login
GET /auth/logout
```

And what if you need these to be configurable? What if you have static resources 
that you want to be nested under `/auth` as well? `path-prefix-proxy` to the
rescue!

## Usage

Just add this middleware to your express app like so:

```javascript
var pathPrefix = '/auth';
app.use(pathPrefix, require('path-prefix-proxy')(pathPrefix));
```

and immediately your old routes will begin working in their new locations too!

## Install

```
npm install path-prefix-proxy
```

## Deny access to original paths

So now we have everything under `/auth` being proxied to our base routes.
But the base routes are still accessible - so going to `/auth/login` and 
`/login` will yield identical results. What if we don't want this? PPP gives
you an easy way to do this:

```javascript
var proxy = require('path-prefix-proxy')('/auth');
app.use('/auth', proxy);
app.use(proxy.denyUnproxied);
```

Now, `/auth/login` would be successful, but `/login` would not:

```
GET /auth/login -> 200
GET /login      -> 403
```

