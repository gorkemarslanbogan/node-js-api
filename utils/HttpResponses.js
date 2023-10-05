class HttpStatusCodes {
    static OK = { code: 200, message: 'OK' };
    static CREATED = { code: 201, message: 'Created' };
    static ACCEPTED = { code: 202, message: 'Accepted' };
    static NO_CONTENT = { code: 204, message: 'No Content' };
    static BAD_REQUEST = { code: 400, message: 'Bad Request' };
    static UNAUTHORIZED = { code: 401, message: 'Unauthorized' };
    static FORBIDDEN = { code: 403, message: 'Forbidden' };
    static NOT_FOUND = { code: 404, message: 'Not Found' };
    static INTERNAL_SERVER_ERROR = { code: 500, message: 'Internal Server Error' };
    static SERVICE_UNAVAILABLE = { code: 503, message: 'Service Unavailable' };
  }