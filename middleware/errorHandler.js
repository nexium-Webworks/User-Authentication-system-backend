'use strict';
import HttpStatus, { getReasonPhrase } from '../lib/statuscode.js';

import logger from '../utils/logger.js';
import buildError from '../utils/buildError.js';

/**
 * Error response middleware for 404 not found.
 *
 * @param {Object} req
 * @param {Object} res
 */
export function notFound(req, res) {
    res.status(HttpStatus.NOT_FOUND).json({
        status: false,
        error: {
            code: HttpStatus.NOT_FOUND,
            message: getReasonPhrase(HttpStatus.NOT_FOUND)
        }
    });
}

/**
* Method not allowed error middleware. This middleware should be placed at
* the very bottom of the middleware stack.
*
* @param {Object} req
* @param {Object} res
*/
export function methodNotAllowed(req, res) {
    res.status(HttpStatus.METHOD_NOT_ALLOWED).json({
        status: false,
        error: {
            code: HttpStatus.METHOD_NOT_ALLOWED,
            message: getReasonPhrase(HttpStatus.METHOD_NOT_ALLOWED)
        }
    });
}

/**
* To handle errors from body parser for cases such as invalid JSON sent through
* the body (https://github.com/expressjs/body-parser#errors).
*
* @param  {Object}   err
* @param  {Object}   req
* @param  {Object}   res
* @param  {Function} next
*/
export function bodyParser(err, req, res, next) {
    logger.error(err.message);
    res.status(err.status).json({
        status: false,
        error: {
            code: err.status,
            message: getReasonPhrase(err.status)
        }
    });
}

/**
 * Generic error response middleware for validation and internal server errors.
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
export function genericErrorHandler(err, req, res, next) {
    logger.error(err.stack);
    const error = buildError(err);
    res.status(error.code).json({ status: false, error });
}
