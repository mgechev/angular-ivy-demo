function errorToJson(error) {
  if (error instanceof Error) {
    return {
      message: error.message,
      stack: error.stack,
      name: error.name
    };
  }
}

function jsonToError(json) {
  if (json) {
    let error = new Error(json.message);
    Object.keys(json).forEach(key => {
      error[key] = json[key];
    });
    return error;
  }
}

exports.errorToJson = errorToJson;
exports.jsonToError = jsonToError;
