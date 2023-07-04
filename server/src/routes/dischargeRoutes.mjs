import { Router } from "express";
import * as controller from "../controller/discharController.mjs"

import { verifyToken, isAdmin } from "../midlleware/authjwt.mjs"


const router =  Router()

router.route("/insert/:id").post([verifyToken,isAdmin],controller.insertDischarge)

export default router