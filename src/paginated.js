export function paginated(
  res,
  data,
  { page, limit, totalItems },
  message = "Data fetched successfully",
  statusCode = 200
) {
  if (!Number.isInteger(page) || page < 1) {
    throw new TypeError("page must be a positive integer");
  }

  if (!Number.isInteger(limit) || limit < 1) {
    throw new TypeError("limit must be a positive integer");
  }

  if (!Number.isInteger(totalItems) || totalItems < 0) {
    throw new TypeError("totalItems must be a non-negative integer");
  }

  const totalPages = Math.ceil(totalItems / limit);

  return res.status(statusCode).json({
    success: true,
    message,
    data,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    }
  });
}