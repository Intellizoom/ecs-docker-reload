# ECS Docker Reload

Amazon Elastic Container Repository makes using tools like Consul-Template very difficult.  For instance, when a change in Consul causes Consul Template to rerender a configuration file, how do you send a SIGHUP to the container you want to notify to reload?  Typically this simply involves using the Docker API and invoking a `kill` using the target container's name.  But in ECS, we don't get to specify the container name (since containers are deployed as Tasks).

In order to signal a restart (SIGHUP) in ECS we need to take the following steps:

1.  Locate the target container using the Task ARN and ECS Container Name.
2.  When files change, call the Docker API using the Docker socket to send the SIGHUP signal.

That is exactly what this Docker image does.

The implementation makes a couple of assumptions:

- The container that will be restarted is a member of the same task as this container.
- Reload signals will only be sent when the file changes; so if you need an initial reload, submit a PR.

### Usage

```
Usage: index [options]

  Options:

    -h, --help                output usage information
    -V, --version             output the version number
    -w, --watch <directory>   Directory to watch
    -r, --reload <container>  ECS Container to reload
    -t, --wait [timems]       Wait a number of milliseconds; default 5000ms
    -d, --docker [socket]     Path to the Docker socket, default /var/run/docker.sock
```

