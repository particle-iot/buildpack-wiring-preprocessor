FROM particle/buildpack-base-node:node_v0.10.44

COPY cparser /cparser
COPY bin /bin
RUN rm -rf /test
ADD test /test

WORKDIR /cparser
RUN /bin/run-in-nvm npm install
WORKDIR /
