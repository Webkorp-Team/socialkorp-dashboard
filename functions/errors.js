
export class MissingParameterError extends Error{
  constructor(parameter){
    super(`Missing parameter "${parameter}"`);
  }
}

export class UnauthorizedError extends Error{
  constructor(message){
    super(message || 'Unauthorized');
  }
}

export class NotFoundError extends Error{
  constructor(message){
    super(message || 'Not Found');
  }
}
