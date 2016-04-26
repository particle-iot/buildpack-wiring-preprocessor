FROM particle/buildpack-base:0.1.1

# Node installation from https://github.com/mhart/alpine-node/blob/master/Dockerfile
ENV NODE_VERSION=v0.10.44 CFLAGS="-D__USE_MISC" NPM_VERSION=2
ENV RM_DIRS=/usr/include
RUN apk add --no-cache curl make gcc g++ binutils-gold python linux-headers paxctl libgcc libstdc++ gnupg && \
  gpg --keyserver pool.sks-keyservers.net --recv-keys 9554F04D7259F04124DE6B476D5A82AC7E37093B && \
  gpg --keyserver pool.sks-keyservers.net --recv-keys 94AE36675C464D64BAFA68DD7434390BDBE9B9C5 && \
  gpg --keyserver pool.sks-keyservers.net --recv-keys 0034A06D9D9B0064CE8ADF6BF1747F4AD2306D93 && \
  gpg --keyserver pool.sks-keyservers.net --recv-keys FD3A5288F042B6850C66B31F09FE44734EB7990E && \
  gpg --keyserver pool.sks-keyservers.net --recv-keys 71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 && \
  gpg --keyserver pool.sks-keyservers.net --recv-keys DD8F2338BAE7501E3DD5AC78C273792F7D83545D && \
  gpg --keyserver pool.sks-keyservers.net --recv-keys C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 && \
  gpg --keyserver pool.sks-keyservers.net --recv-keys B9AE9905FFD7803F25714661B63B535A4C206CA9 && \
  curl -o node-${NODE_VERSION}.tar.gz -sSL https://nodejs.org/dist/${NODE_VERSION}/node-${NODE_VERSION}.tar.gz && \
  curl -o SHASUMS256.txt.asc -sSL https://nodejs.org/dist/${NODE_VERSION}/SHASUMS256.txt.asc && \
  gpg --verify SHASUMS256.txt.asc && \
  grep node-${NODE_VERSION}.tar.gz SHASUMS256.txt.asc | sha256sum -c - && \
  tar -zxf node-${NODE_VERSION}.tar.gz && \
  cd /node-${NODE_VERSION} && \
  ./configure --prefix=/usr ${CONFIG_FLAGS} && \
  make -j$(grep -c ^processor /proc/cpuinfo 2>/dev/null || 1) && \
  make install && \
  paxctl -cm /usr/bin/node && \
  cd / && \
  if [ -x /usr/bin/npm ]; then \
    npm install -g npm@${NPM_VERSION} && \
    find /usr/lib/node_modules/npm -name test -o -name .bin -type d | xargs rm -rf; \
  fi && \
  apk del curl make gcc g++ binutils-gold python linux-headers paxctl gnupg ${DEL_PKGS} && \
  rm -rf /etc/ssl /node-${NODE_VERSION}.tar.gz /SHASUMS256.txt.asc /node-${NODE_VERSION} ${RM_DIRS} \
    /usr/share/man /tmp/* /var/cache/apk/* /root/.npm /root/.node-gyp /root/.gnupg \
    /usr/lib/node_modules/npm/man /usr/lib/node_modules/npm/doc /usr/lib/node_modules/npm/html

COPY cparser /cparser
COPY bin /bin

WORKDIR /cparser
RUN npm install
WORKDIR /
