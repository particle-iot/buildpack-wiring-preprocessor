FROM particle/buildpack-base-node:0.1.2-node_v0.10.44

COPY cparser /cparser
COPY bin /bin
RUN rm -rf /test
ADD test /test

WORKDIR /cparser
RUN npm install
WORKDIR /
