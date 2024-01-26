enum CommonErrors {
  ACCESS_DENIED = 'Access denied',
}

enum UserErrors {
  NOT_EXISTS = 'User does not exist',
  USER_EXISTS = 'User already exists',
  INVALID_PASSWORD = 'Password does not match',
}

enum AuthErrors {
  INVALID_REFRESH_TOKEN = 'Refresh token is invalid',
  INVALID_ACCESS_TOKEN = 'Access token is invalid',
}

export const ErrorCode = {
  ...CommonErrors,
  USER: UserErrors,
  AUTH: AuthErrors,
};

export type ErrorCode = CommonErrors & UserErrors & AuthErrors;
