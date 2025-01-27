import express from "express";
import {
    getFishExperts,
    getFishExpertsById,
    createFishExperts,
    updateFishExperts,
    deleteFishExperts,
} from "../controllers/FishExpertController.js";
const router =  express.Router();

router.get('/fishexperts', getFishExperts);
router.get('/fishexperts/:id', getFishExpertsById);
router.post('/fishexperts', createFishExperts);
router.patch('/fishexperts', updateFishExperts);
router.delete('/fishexperts', deleteFishExperts);

export default router;