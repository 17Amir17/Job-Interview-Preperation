const errorCodes = {
  requestInputInvalid: { message: 'Request input is invalid', code: 400 },
  questionIdNotFound: { message: 'Question is was not found', code: 404 },
  couldNotFindEntry: { message: 'Could not find entry', code: 404 },
  unknownMongoError: { message: 'Internal MongoDB error', code: 400 },
};

module.exports = errorCodes;
