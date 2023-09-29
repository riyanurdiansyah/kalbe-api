const errorMessage = (error: any) => {
  if (error instanceof Error) {
    return {
      code: 400,
      message: "ERROR: " + error.message,
    };
  } else {
    return {
      code: 400,
      message: "ERROR: Failed to execute request",
    };
  }
};

export default {
  errorMessage,
};
