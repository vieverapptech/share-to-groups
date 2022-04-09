docker container stop  demo_client_container
docker container rm  demo_client_container
docker build . -t demo_client

docker run --rm -d -p 8081:80 --network="fs_demo" --ip="10.0.1.4" -h clienthost --name demo_client_container demo_client
