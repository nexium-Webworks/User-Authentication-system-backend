"use strict";

class Response {

    success(res, message, code = 200, success = true) {
      return res.status(code).json({
            success,
            statusCode: code,
            message: message
        });
    }

    successWithData(res, message, data, code = 200, success = true) {
        return res.status(code).json({
            success,
            statusCode: code,
            message: message,
            data: data
        });
    }

    error(res, message, code = 500, statusCode = 500) {
        return res.status(code).json({
            success: false,
            statusCode: statusCode,
            message: message
        });
    }

    downloadCSV(res, data, filename, code = 200, success = true ) {
        return res
            .setHeader('Content-disposition', `attachment; filename=${filename}.csv`)
            .set('Content-Type', 'text/csv')
            .send(data)
    }
}

export default Response;
