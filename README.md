
<!-- Getting Started -->
## 	:toolbox: Getting Started

<!-- Prerequisites -->
### :bangbang: Prerequisites

This project uses NPM as package manager

* Install node.js version 21.3.0 or later from the official NodeJS website <a href="https://nodejs.org/id">*here*<a/> <br />
  Make sure your node.js and npm already install in your device using, open cmd and run:
  ```bash
  node -v
  npm -v
  ```
* Install Docker version 27.1.1 or later from the official Docker website <a href="https://www.docker.com/get-started">*here*</a>.  
  Make sure Docker and Docker Compose are installed correctly on your device by running the following commands in your terminal:

  ```bash
  docker -v
  docker-compose -v

## :file_folder: Project Structure

The project structure is as follows:

```sh
EMR-GRAPHQL-API/
│
├── node_modules/          # Node.js dependencies
├── src/                   # Source code
│   ├── __tests__/         # Unit tests
│   │   └── resolver.test.ts
│   ├── entity/            # TypeORM entities
│   │   ├── Appointment.entity.ts
│   │   ├── ContactInfo.entity.ts
│   │   ├── Doctor.entity.ts
│   │   ├── MedicalHistory.entity.ts
│   │   ├── Medication.entity.ts
│   │   └── Patient.entity.ts
│   ├── lib/               # Utility functions
│   │   ├── Manager.ts
│   │   ├── data-source.ts
│   │   ├── index.ts
│   │   ├── resolver.ts
│   │   ├── schema.graphql
│   │   ├── schema.ts
│   │   └── types.ts
├── .dockerignore          # Files to ignore in Docker builds
├── .env                   # Environment variables
├── .gitignore             # Files to ignore in git
├── codegen.ts             # GraphQL codegen configuration
├── docker-compose.yml     # Docker Compose configuration
├── Dockerfile             # Docker image configuration
├── jest.config.js         # Jest configuration
├── package-lock.json      # NPM lock file
├── package.json           # NPM package configuration
└── tsconfig.json          # TypeScript configuration
```

### :running: Run Locally With NPM

Follow this step to run this repostory code in your local device:
  1. Open git bash and Clone the repo
   ```sh
   git clone https://github.com/zulnurdiana/emr-graphql-api.git
   ```
  2. Go to project folder 
  ``` sh
  cd emr-graphql-api
  ``` 
3. Open the project at VS Code 
  ``` sh
  code . 
  ``` 
  4. open terminal & install Package
  ``` sh
  npm install
  ``` 
  5.  Start the server
   ```sh
   npm start, or
   npm run dev (using nodemon)
   ```
  
  _Note:_
  1. Make sure you change the value of .env file
  2. Setup .env file to your local environment

### :whale2: Run Locally With Docker
  Using Docker so you dont need to configure `node version`
  1. Open git bash and Clone the repo
   ```sh
   git clone https://github.com/zulnurdiana/emr-graphql-api.git
   ```
  2. Go to project folder 
  ``` sh
  cd emr-graphql-api
  ``` 
  3. Open the project at VS Code 
  ``` sh
  code . 
  ``` 
  4. open terminal & build docker image
  ``` sh
  docker-compose build
  ``` 
  5. Run the docker image
  ```sh
  docker-compose up
  ```

<!-- TechStack -->
### :space_invader: Tech Stack
  <h4>Backend:</h4>
  <img src="https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white" />
  <img src="https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql" />
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
  
  <h4>Database:</h4>
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" />

<h4>Tools:</h4>
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />
  <img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white" />
