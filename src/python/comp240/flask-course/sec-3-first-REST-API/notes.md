## What's a web server? (in the sense of a software)

- A piece of software designed to accept incoming web requests
- When go to http://www.google.com you send the following:
  - >GET / HTTP/1.1
  - >Host: www.google.com
  - Abvet is a GET request
- The sever sees `GET / HTTP/1.1 `
  - `GET` is the verb: tells the server what we think the server is going to return
  - `/` is the path: what we want out of the server (?)
  - `HTTP/1.1` is the protocol
- Going to a page will always do a GET
- But there are many other things we can do, such as POST, DELETE, PUT, OPTIONS, HEAD and much more

## HTTP verbs

- GET: retrieve something; GET /item/1
- POST: receive data, and use it; POST /item
- PUT: make sure something is there (or update); PUT /item
- DELETE: remove something; DELETE /item/1

## REST principles

### What is a REST API?

- A way of thinking about how a web server responds to your requests
- Doesn't respond with just data, also with resources

### Thinking in resources
- Similar to OOP, think of the server as having resources, each able to interact with the pertinent request

### Stateless
- One request cannot depend on any other requests
- Server only knows the current request, not previous requests





