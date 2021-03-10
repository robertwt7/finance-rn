FROM alpine:latest


RUN apk update \
    && apk add sqlite \
    && apk add socat \
    && apk add sqlite-dev

RUN mkdir /db
RUN /usr/bin/sqlite3 /db/finance.db
CMD /bin/sh