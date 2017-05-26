FROM debian:unstable-slim

MAINTAINER Richard Clayton <rclayton@userzoom.com>

ADD ./build/edr /usr/local/bin/edr

RUN chmod +x /usr/local/bin/edr

ENTRYPOINT ["edr"]
