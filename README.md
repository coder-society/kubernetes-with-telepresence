# Run a local process in Kubernetes with Telepresence

This repository contains two Node.js applications.

- [echo-server](/echo-server) a server which returns status messages.
- [task-runner](/task-runner) a client which calls the `echo-server` every 3 seconds.

The corresponding article to this repository was published on the [Coder Society blog](https://blog.codersociety.com/run-a-local-process-in-kubernetes-with-telepresence-dc16bd593b52).

<img src="https://user-images.githubusercontent.com/2142829/30082451-262f5db4-928b-11e7-802f-279d41c497ee.png" width="50%">

## Getting Started

**1. Clone the repository**
```
$ git clone https://github.com/coder-society/kubernetes-with-telepresence
```

**2. Run the echo-server**

```
$ node ./echo-server/server.js
Echo Server listening on http://localhost:3000
```

**3. Make a request to the status route**

```
$ curl http://localhost:3000
{"status":"ok","time":1504645235278,"hostname":"kewa.local"}
```

**4. Deploy to Kubernetes**

Deploy the two apps to Kubernetes by applying the manifest files.

```
$ kubectl apply -f ./echo-server/echo-server.yaml
deployment "echo-server" created
service "echo-server" created

$ kubectl apply -f ./task-runner/task-runner.yaml
deployment "task-runner" created
```

**5. Run the task-runner locally without Telepresence**

```
$ node ./task-runner/index.js
getaddrinfo ENOTFOUND echo-server echo-server:80
getaddrinfo ENOTFOUND echo-server echo-server:80
getaddrinfo ENOTFOUND echo-server echo-server:80
```

You can't connect to the `echo-server`, because it's not publicly available.

**6. Run the task-runner locally with Telepresence**

```
$ telepresence --run node task-runner/index.js
...
{"status":"ok","time":1504647042810,"hostname":"echo-server-1203620631-fpfvw"}
{"status":"ok","time":1504647043491,"hostname":"echo-server-1203620631-swsk5"}
{"status":"ok","time":1504647046640,"hostname":"echo-server-1203620631-fpfvw"}
```

This shows that you can connect to the `echo-server` although it's not publicly exposed.

