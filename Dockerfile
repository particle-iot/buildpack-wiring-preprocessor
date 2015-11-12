FROM particle/buildpack-base:0.0.3

RUN apt-get update
RUN apt-get -y install npm

COPY cparser /cparser
COPY lib /lib

WORKDIR /cparser
RUN npm install
WORKDIR /
