/* eslint-disable no-param-reassign */

import bodyParser from 'body-parser';
import {graphiqlExpress, graphqlExpress} from 'apollo-server-express';
import {makeExecutableSchema} from 'graphql-tools';
import graphqlHTTP from 'express-graphql';

import constants from './constants';
import {decodeToken} from '../services/auth';
import schema from '../graphql';
import cors from 'cors';
import {environment} from "./index";


async function auth(req, res, next) {
    try {
        const token = req.headers.authorization;
        if (token != null) {
            const user = await decodeToken(token);
            req.user = user;
        } else {
            req.user = null;
        }
        return next();
    } catch (error) {
        throw error;
    }
}

export default app => {
    // app.use(cors());
    // app.use(bodyParser.json());
    // app.use(auth);
    // app.use(
    //     '/graphiql',
    //     graphiqlExpress({
    //         endpointURL: constants.GRAPHQL_PATH,
    //     }),
    // );
    // app.use(
    //     constants.GRAPHQL_PATH,
    //     graphqlExpress(req => ({
    //         schema,
    //         context: {
    //             user: req.user
    //         }
    //     })),
    // );
    app.use(
        constants.GRAPHQL_PATH,
        graphqlHTTP((request, response, graphQLParams) => ({
            schema: schema,
            pretty: true,
            graphiql: ((environment.match('development')) ? true : false),
            context: {
                request: request,
                test: 'Example context value'
            }
        }))
    );
}