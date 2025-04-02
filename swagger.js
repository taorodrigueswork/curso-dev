import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "This is the API documentation for the project.",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["pages/api/v1/**/*.js"], // Adjust the path to your API files
};

const swaggerSpec = swaggerJsdoc(options);
console.log(swaggerSpec);
export default swaggerSpec;
