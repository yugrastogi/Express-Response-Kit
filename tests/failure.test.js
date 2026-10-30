import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import { failure } from "../src/index.js";

describe("failure()", () => {
  it("should return a standardized error response", async () => {
    const app = express();

    app.get("/test", (req, res) => {
      return failure(res, "Project not found", 404);
    });

    const response = await request(app).get("/test");

    expect(response.status).toBe(404);

    expect(response.body).toEqual({
      success: false,
      message: "Project not found"
    });
  });

  it("should use default values when arguments are omitted", async () => {
    const app = express();

    app.get("/test", (req, res) => {
      return failure(res);
    });

    const response = await request(app).get("/test");

    expect(response.status).toBe(500);

    expect(response.body).toEqual({
      success: false,
      message: "Something went wrong"
    });
  });
});