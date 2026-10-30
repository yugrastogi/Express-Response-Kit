import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import { success } from "../src/index.js";

describe("success()", () => {
  it("should return a standardized success response", async () => {
    const app = express();

    app.get("/test", (req, res) => {
      return success(
        res,
        { id: 1, name: "Yug" },
        "User fetched successfully"
      );
    });

    const response = await request(app).get("/test");

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      success: true,
      message: "User fetched successfully",
      data: {
        id: 1,
        name: "Yug"
      }
    });
  });

  it("should support custom status codes", async () => {
    const app = express();

    app.post("/test", (req, res) => {
      return success(res, { id: 1 }, "Created", 201);
    });

    const response = await request(app).post("/test");

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });
});