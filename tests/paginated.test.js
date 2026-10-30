import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import { paginated } from "../src/index.js";

describe("paginated()", () => {
  it("should return data with pagination metadata", async () => {
    const app = express();

    app.get("/users", (req, res) => {
      return paginated(
        res,
        [{ id: 11 }, { id: 12 }],
        { page: 2, limit: 10, totalItems: 25 },
        "Users fetched successfully"
      );
    });

    const response = await request(app).get("/users");

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      success: true,
      message: "Users fetched successfully",
      data: [{ id: 11 }, { id: 12 }],
      pagination: {
        page: 2,
        limit: 10,
        totalItems: 25,
        totalPages: 3,
        hasNextPage: true,
        hasPreviousPage: true
      }
    });
  });

  it("should indicate there is no previous page on page 1", async () => {
    const app = express();

    app.get("/users", (req, res) => {
      return paginated(
        res,
        [{ id: 1 }],
        { page: 1, limit: 10, totalItems: 25 }
      );
    });

    const response = await request(app).get("/users");

    expect(response.body.pagination.hasPreviousPage).toBe(false);
    expect(response.body.pagination.hasNextPage).toBe(true);
  });

  it("should indicate there is no next page on the last page", async () => {
    const app = express();

    app.get("/users", (req, res) => {
      return paginated(
        res,
        [{ id: 21 }, { id: 22 }, { id: 23 }, { id: 24 }, { id: 25 }],
        { page: 3, limit: 10, totalItems: 25 }
      );
    });

    const response = await request(app).get("/users");

    expect(response.body.pagination.hasPreviousPage).toBe(true);
    expect(response.body.pagination.hasNextPage).toBe(false);
  });
});import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import { paginated } from "../src/index.js";

describe("paginated()", () => {
  it("should return data with pagination metadata", async () => {
    const app = express();

    app.get("/users", (req, res) => {
      return paginated(
        res,
        [{ id: 11 }, { id: 12 }],
        { page: 2, limit: 10, totalItems: 25 },
        "Users fetched successfully"
      );
    });

    const response = await request(app).get("/users");

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      success: true,
      message: "Users fetched successfully",
      data: [{ id: 11 }, { id: 12 }],
      pagination: {
        page: 2,
        limit: 10,
        totalItems: 25,
        totalPages: 3,
        hasNextPage: true,
        hasPreviousPage: true
      }
    });
  });

  it("should indicate there is no previous page on page 1", async () => {
    const app = express();

    app.get("/users", (req, res) => {
      return paginated(
        res,
        [{ id: 1 }],
        { page: 1, limit: 10, totalItems: 25 }
      );
    });

    const response = await request(app).get("/users");

    expect(response.body.pagination.hasPreviousPage).toBe(false);
    expect(response.body.pagination.hasNextPage).toBe(true);
  });

  it("should indicate there is no next page on the last page", async () => {
    const app = express();

    app.get("/users", (req, res) => {
      return paginated(
        res,
        [{ id: 21 }, { id: 22 }, { id: 23 }, { id: 24 }, { id: 25 }],
        { page: 3, limit: 10, totalItems: 25 }
      );
    });

    const response = await request(app).get("/users");

    expect(response.body.pagination.hasPreviousPage).toBe(true);
    expect(response.body.pagination.hasNextPage).toBe(false);
  });

    it("should throw a TypeError when page is invalid", () => {
    const app = express();

    app.get("/users", (req, res) => {
      return paginated(res, [], {
        page: 0,
        limit: 10,
        totalItems: 25
      });
    });

    expect(() => {
      // The route callback is not executed here.
      paginated({}, [], {
        page: 0,
        limit: 10,
        totalItems: 25
      });
    }).toThrow(TypeError);
  });

  it("should throw a TypeError when limit is invalid", () => {
    expect(() => {
      paginated({}, [], {
        page: 1,
        limit: 0,
        totalItems: 25
      });
    }).toThrow("limit must be a positive integer");
  });

  it("should throw a TypeError when totalItems is negative", () => {
    expect(() => {
      paginated({}, [], {
        page: 1,
        limit: 10,
        totalItems: -1
      });
    }).toThrow("totalItems must be a non-negative integer");
  });
});