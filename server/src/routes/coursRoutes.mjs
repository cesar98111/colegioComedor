import { Router } from "express";
import * as controller from "../controller/courseController.mjs"

const router = Router()

router.route("/get/:etage").get(controller.getCourseByEtageController)

export default router