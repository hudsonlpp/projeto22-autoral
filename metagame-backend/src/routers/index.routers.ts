import { Router } from "express";
import auth from "./auth.routers";

const router = Router();

router.use(auth);
router.get("/health", (_req, res) => res.send("OK!"))
router.all("*", (_req, res) => res.status(404).send({ message: "Not Found" }));

export default router;