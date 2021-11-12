const errorCodes = {
  requestInputInvalid: { message: 'Request input is invalid', code: 400 },
  questionIdNotFound: { message: 'Question is was not found', code: 404 },
  couldNotFindEntry: {
    message: 'Could not find entry or bad question format',
    code: 404,
  },
  badEntryFormat: { message: 'Could not proccess entry', code: 422 },
  unknownMongoError: { message: 'Internal MongoDB error', code: 400 },
};

module.exports = errorCodes;
