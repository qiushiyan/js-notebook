import express from "express";
import fs from "fs/promises";
import path from "path";

interface Cell {
  id: string;
  type: "text" | "code";
  content: string;
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());
  const fullPath = path.join(dir, filename);

  router.get("/cells", async (req, res) => {
    console.log("fetching cells ...");
    try {
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });
      const payload = JSON.parse(result);
      res.send(payload);
    } catch (error) {
      if (error.code === "ENOENT") {
        await fs.writeFile(fullPath, "[]", "utf-8");
        res.send([]);
      } else {
        throw error;
      }
    }
  });

  router.post("/cells", async (req, res) => {
    console.log("saving cells ...");

    const { cells }: { cells: Cell[] } = req.body;

    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");

    res.send({ status: "ok" });
  });

  return router;
};
