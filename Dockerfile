FROM alpine:3.5

MAINTAINER Richard Clayton <rclayton@userzoom.com>

ADD ./build/edr /

ENTRYPOINT ["edr"]
