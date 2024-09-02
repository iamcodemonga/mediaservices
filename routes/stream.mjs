import { Router } from "express";

const router = Router();

router.get("/video", (req, res) => {
    res.json({ result: "video is streaming" })
})

router.get("/audio", (req, res) => {
    res.json({ result: "audio is streaming" })
})

export default router