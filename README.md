# Docker 
docker build -t legendcity-restapi .
docker-compose up


# Create
# http://localhost:7000/api/v1/task/create/
{
	"name": "Task 12",
  "priority": 55
}

# Update
# http://localhost:7000/api/v1/task/update
{
	"id": 1,
  "name": "Task 12",
  "priority": 55
}

# Read
# http://localhost:7000/api/v1/task/1

# Fetch by priority
# http://localhost:7000/api/v1/task/

# Delete
# http://localhost:7000/api/v1/task/delete/
{
	"id": 1
}