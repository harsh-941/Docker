# PRISMA
npx prisma init -> It will create a folder called prisma

Inside prisma/schema.prisma, add this in last line.

  model User {
    id  Int @id @default(autoincrement())
    username String @unique
    password String
    todos Todo[]
  }

  model Todo {
    id Int @id @default(autoincrement())
    task  String 
    completed Boolean @default(false)
    userId  Int
    user  User  @relation(fields: [userId], references: [id])
  }

Create a file: src/prismaClient.js

Create a Dockerfile in a root directory
  # Use an official node.js runtime as a parent image
  FROM node:22-alpine

  # Set the working directory in the container.
  WORKDIR /app

  # Copy the package.json and package-lock.json to the container
  COPY package*.json .
  #* is for all the package followed by names(package.json, package-lock.json)

  # Install the Dependencies
  RUN npm install

  # Copy the rest of the application code
  COPY . .

  # Expose the port that the app runs on 
  EXPOSE 5003:5003

  #Define the command to run your application
  CMD [ "node", "./src/server.js" ]

Now, let's finalize our Prisma setup
For that we need to run a command that is going to generate a config for our prisma client.
  npx prisma generate

# Postgres docker
Now because we also need postgres, we'll need to run another command FROM ...
but to do it so, we'll create a docker-compose.yaml file in our root directory.
docker-compose.yaml
  services:
    app:
      build: . #We've used .(Dot) because it is in the same root directory.
      container_name: todo-app
      environment:
        - DATABASE_URL=postgresql://postgres:postgres@db:5432/todoapp
        - JWT_SECRET=your_jwt_secret_here
        - NODE_ENV=development
        - PORT=5003
      ports:
        - "5003:5003"
      depends_on:
        - db
      volumes:
        - .:/app

    db:
      image: postgres:13-alpine
      container_name: postgres-db
      environment:
        POSTGRES_USER: postgres
        POSTGRES_PASSWORD: postgres
        POSTGRES_DB: todoapp  
      ports:
        - "5432:5432"
      volumes:
        - postgres-data:/var/lib/postgresql/data

  volumes:
    postgres-data: 

# final step
docker compose build

# database migration
docker compose run app npx prisma migrate dev --name init

# run the container
docker compose up

## Getting Started(From https://github.com/jamezmca/backend-full-course/blob/main/chapter_4/README.md)
Install Docker Desktop

Clone the Repository:

git clone https://github.com/your-username/backend-todo-app.git
cd backend-todo-app
Generate the Prisma Client:
npx prisma generate

Build your docker images:
docker compose build

Create PostgreSQL migrations and apply them:
docker compose run app npx prisma migrate dev --name init

Also - to run/apply migrations if necessary:

docker-compose run app npx prisma migrate deploy

Boot up 2x docker containers:
docker compose up

or

docker compose up -d

If you want to boot it up without it commandeering your terminal (you'll have to stop if via Docker Desktop though).

To login to docker PostgreSQL database (from a new terminal instance while docker containers are running) where you can run SQL commands and modify database!:
docker exec -it postgres-db psql -U postgres -d todoapp

To stop Docker containers:
docker compose down

To delete all docker containers:
docker system prune

Access the App:
Open http://localhost:5003 (or localhost:3000 if changed) in your browser to see the frontend. You can register, log in, and manage your todo list from there.
