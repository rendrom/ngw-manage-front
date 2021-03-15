# sense-front

Based on:

https://github.com/ntnyq/element-plus-admin and https://github.com/PanJiaChen/vue-element-admin

## Installation

```bash
cd ./prj/frontend
npm i
npm run prod
```

run developer server with hot reload

```bash
npm start
```

then open [http://localhost:8000](http://localhost:8000)

### Docker

Build image

```bash
docker build -t registry.nextgis.com/sense_service:latest . -f .\docker\Dockerfile
```

Run image on [http://localhost:8000](http://localhost:8000)

```bash
docker-compose -f ./docker/docker-compose.local.yaml up
```

Upload image to NextGIS registry

```bash
docker push registry.nextgis.com/sense_service:latest
```

### Lints and fixes files

```bash
npm run lint
```
