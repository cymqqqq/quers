const path = require('path');
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "quers api doc",
            version: '1.0.0',
            description: "quers api doc"
        },
    },
    apis: [path.join(__dirname, '../routes/*')]
}

var swaggerJson = function(req:any, res: any) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
}

const swaggerSpec = swaggerDoc(options);

var swaggerInstall = function(app: any) {
    if(!app) {
        app = express();
    }

    // app.get('/swagger.json', swaggerJson);
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}

module.exports = swaggerInstall;