export function failure(
  res,
  message = "Something went wrong",
  statusCode = 500
) {
  return res.status(statusCode).json({
    success: false,
    message
  });
}