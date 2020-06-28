

打包
```bash
docker  build -t webpack-doc:1.0.0 .
```

删除
```bash
docker  rmi
# 共享IMAGE ID 删除
docker rmi + REPOSITORY名:TAG
```

发布镜像
```bash
docker  push  账户/imageName
```


创建容器
```bash
docker run -d --name webpack-doc -p 8888:80 webpack-doc:1.0.1
```

修改tag
 docker tag webpack-doc:1.1.0 fearlessma/webpack-doc:1.1.0

dockerfile 

FROM node:alpine

ADD package.json package-lock.json /code/
WORKDIR /code/

RUN npm install --production

ADD . /code

CMD npm run build 