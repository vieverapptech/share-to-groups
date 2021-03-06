# set mongohost, serverhost, clienthost pointing to localhost
# vi /etc/hosts
# and update as below
# 127.0.0.1    mongohost serverhost clienthost

#if windows is used, setup host alias in
#C:\Windows\System32\drivers\etc\hosts

#setup docker network
  docker network create --driver="bridge" --subnet="10.0.0.0/16" --ip-range="10.0.1.0/24" fs_demo
  docker network ls

# stop if any previously running containers
docker rm $(docker ps -a -q)

# run the containers
# mongo container
docker run --rm -d -p 27017:27017  --network="fs_demo"  --ip="10.0.1.3" -h mongohost --name demo_mongodb_container -v /home/vimala/aav-wrk/fs-demo/mongodbdatafolder:/data/db -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo

docker logs -f demo_mongodb_container

# server container
docker run --rm -d -p 9001:9001 --network="fs_demo" --ip="10.0.1.5" -h serverhost --name demo_server_container  -e MONGOURI="mongodb://mongoadmin:secret@mongohost:27017/studentsdb?authSource=admin" demo_server

# client container
docker run --rm -d -p 8081:80 --network="fs_demo" --ip="10.0.1.4" -h clienthost --name demo_client_container demo_client


curl -X GET \
  http://localhost:9001/students \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' 

curl -X POST \
  http://localhost:9001/students/admit \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 9fcef601-face-f654-c61a-c88bc0bda0c7' \
  -d '{
	"name": "ajayc",
	"dob": "2000-01-01",
	"schoolgrade": "A",
    "degree": "not-awarded",
    "address": "abc street, blore",
    "email": "vijay@abc.com"
}'


#server requests
POST http://localhost:9001/students/admit
{
	"name": "ajaya",
	"dob": "2000-01-01",
	"schoolgrade": "A",
    "degree": "not-awarded",
    "address": "abc street, blore",
    "email": "vijay@abc.com"
}

GET http://localhost:9001/students

POST http://localhost:9001/students/award/62275fe776327c2e7ee6a3f5 