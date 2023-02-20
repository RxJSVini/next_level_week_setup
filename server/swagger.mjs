import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from'swagger-jsdoc';

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Docs',
            version: '1.0.0',
            description: 'API documentation for my project',
        },
        servers: [
            {
                url: 'http://localhost:3333',
                description: 'Local server',
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Arquivos de rota
};
const specs = swaggerJsdoc(options);

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.listen(3000);
