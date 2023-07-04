import { Router } from "express";
import * as controller from "../controller/aluController.mjs"

import { verifyToken, isAdmin } from "../midlleware/authjwt.mjs";



const router = Router()


router.route("/insert").post([verifyToken,isAdmin],controller.insertAluController)

router.route("/update/:id").put([verifyToken,isAdmin], controller.updateAluController)

router.route("/getByCourse/:course/:etage").get(controller.getAluByCourseController)

router.route("/getByToDay/:course/:etage").get(controller.getAluByToDay)

router.route("/getByCourse/:name/:course/:etage").get(controller.getAluByNameAndCourseController)

router.route("/highs/:name").get([verifyToken,isAdmin],controller.highByNameController)

router.route("/like/:name/:course/:etage").get(controller.getLikeNameAlu)

export default router