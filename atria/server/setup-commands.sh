docker container stop  demo_server_container
docker container rm  demo_server_container
docker build . -t demo_server

docker run --rm -d -p 9001:9001 --network="fs_demo" --ip="10.0.1.5" -h serverhost --name demo_server_container -e MONGOURI="mongodb://mongoadmin:secret@mongohost:27017/studentsdb?authSource=admin" demo_server