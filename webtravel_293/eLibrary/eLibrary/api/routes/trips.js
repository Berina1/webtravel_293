import { addTrip, deleteTrip, getTrip, getTrips, searchTrips, updateTrip } from "../controllers/trips.js";
import express  from "express";

const router = express.Router()

router.get("/search/",searchTrips)
router.delete("/:id",deleteTrip)
router.put("/:id",updateTrip)
router.get("/:id",getTrip)
router.get("/",getTrips)
router.post("/",addTrip)

export default router