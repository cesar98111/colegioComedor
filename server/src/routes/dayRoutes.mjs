import { Router } from "express";
import * as controller from "../controller/daysController.mjs"

import { verifyToken, isAdmin } from "../midlleware/authjwt.mjs"

import {existDay} from "../midlleware/verifyAsistance.mjs"


const router = Router()

router.route("/asistance/update").put(controller.updateAsistance)

router.route("/insert/asistance").post([existDay],controller.insertAsistance)

router.route("/get/:name").get(controller.getDayByNameController)

router.route("/getByName/:name").get([verifyToken,isAdmin],controller.getDayByName)

router.route("/update/:asistencia").put([verifyToken,isAdmin],controller.updateDaysByNameDateController)

router.route("/getBetewnDate").post([verifyToken,isAdmin],controller.getasistanceBeteewnDatesController)

router.route("/insert/spcific/:id").post(controller.insertAspcificDay)

export default router