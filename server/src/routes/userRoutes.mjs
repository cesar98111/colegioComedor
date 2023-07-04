import { Router } from "express";
import * as controller from "../controller/userController.mjs"

import { verifyToken, isAdmin } from "../midlleware/authjwt.mjs";
import {  verifyUser } from "../midlleware/verifyUser.mjs"

const router = Router()

/* aqui se muestran todas las rutas que manejan la parte de los usuarios
 logeos y registros*/

//endpoint get que se encarga de consultar el numero de usuarios
router.route("/count").get(controller.getUserCount)
/* endpoint get que se encarga de consultar el 
usuario dado un token como paramatro en la cabecera 
de la ruta
*/ 
router.route("/userById/:token").get(controller.getUserByToken)
/* endpoint get que se encarga de recoger todos los usuarios
provee de midlewares para la verificacion del token y la comprobación
del rol */
router.route("/get").get([verifyToken, isAdmin],controller.getAllUserController)
/* endpoint post que se encarga de recoger los datos de un usuario 
y guardarlos en la base de datos, este endpoint consta de midlewares que 
se encargan de verificar de que el token es valido, si es administrador o no y 
verificar si el usuario ya existe */
router.route("/register").post([verifyToken,isAdmin,verifyUser],controller.sigUp)

/* enpoint post que se encarga de devolver el token de un usuario 
pasandole en el cuerpo un email y una contraseña*/
router.route("/login").post(controller.sigIn)

router.route("/userByName/:name").get([verifyToken,isAdmin],controller.getUserByNameController)

router.route("/delete/:id").delete([verifyToken,isAdmin],controller.deleteUserController)

router.route("/update/:id").put([verifyToken,isAdmin],controller.updateUserController)

router.route("/userId/:id").get([verifyToken,isAdmin],controller.getUsersByIdController)

router.route("/password/:id").put([verifyToken,isAdmin],controller.updatePasswordController)




export default router