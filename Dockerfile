FROM particle/buildpack-base:0.3.6

ENV NODE_VERSION=v0.10.44 NVM_DIR="/root/.nvm"
RUN apt-get update -q && apt-get install -qy build-essential libssl-dev man-db \
  && curl https://raw.githubusercontent.com/creationix/nvm/v0.16.1/install.sh | sh \
  && . $NVM_DIR/nvm.sh && nvm install ${NODE_VERSION} \
  && nvm alias default ${NODE_VERSION} && nvm use default \
  && echo ". $NVM_DIR/nvm.sh && nvm use default" >> /etc/profile \
  && apt-get remove build-essential -qy && apt-get clean && apt-get purge \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY cparser /cparser
COPY bin /bin
RUN rm -rf /test
ADD test /test

WORKDIR /cparser
RUN /bin/run-in-nvm npm install
WORKDIR /
