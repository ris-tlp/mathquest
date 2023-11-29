mongo-up:
	docker run --name mongodb -d -p 27017:27017 -v $(pwd)/tmp/data:/data/db mongodb/mongodb-community-server

mongo-start:
	docker start mongodb

docker-build:
	docker build -t api .

docker-run:
	docker run -p 8000:8000 api