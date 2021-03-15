# Docker volume has to be using full path on windows otherwise it will go to created volume
docker run -it -v ${PWD}/sqlite-data:/db sqlite