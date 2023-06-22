import Router from "express";
import registerController from "../controllers/authorization/registerController";
import LoginController from "../controllers/authorization/loginController";
import UsersController from "../controllers/users/UsersController";
import RewardsController from "../controllers/rewards/rewardsController";
import PlatformController from "../controllers/platform/platformController";
import SliceController from "../controllers/slice/sliceController";
import FollowerController from "../controllers/followers/followersController";
import walletController from "../controllers/wallet/walletController";
import S3Controller from "../controllers/file/S3Controller";

import { authorizationMiddleware } from "../middleware/authorization-middleware";
import { corsMiddleware } from "../middleware/cors-middleware";
import { upload } from "../middleware";
import { loggerMiddleware } from "../middleware/logger-middleware";

const router = Router();
router.use(corsMiddleware);

//*
//* ──────────────────────────────────────────────── I ──────────
//*   :::::: A U T H : :  :   :    :     :        :          :
//* ──────────────────────────────────────────────────────────
//*

router.post("/register", registerController.register);
router.post("/login", LoginController.login);

//* ─────────────────────────────────────────────────────────────────────────────

//*
//* ──────────────────────────────────────────────── II ──────────
//*   :::::: U S E R : :  :   :    :     :        :          :
//* ──────────────────────────────────────────────────────────
//*

router.get("/users", loggerMiddleware, authorizationMiddleware, UsersController.getAllUser);
router.get("/users/kol/:userId", authorizationMiddleware, UsersController.getKOLById);
router.get("/users/:userId", authorizationMiddleware, UsersController.getKOLById);
router.put("/users/:userId", upload.single("image"), authorizationMiddleware, UsersController.updateUser);
router.get("/user/profile", authorizationMiddleware, UsersController.getMe);
router.get("/user/platform", authorizationMiddleware, UsersController.getUserByPlatform);
//* ─────────────────────────────────────────────────────────────────────────────

//*
//* ────────────────────────────────────────────────────── III ──────────
//*   :::::: R E W A R D S : :  :   :    :     :        :          :
//* ────────────────────────────────────────────────────────────────
//*

router.post("/reward", authorizationMiddleware, RewardsController.createRewards);
router.get("/reward", authorizationMiddleware, RewardsController.getAllRewards);
router.get("/reward/:rewardId", authorizationMiddleware, RewardsController.getRewardById);
router.post("/reward/cakebox", upload.single("image"), authorizationMiddleware, RewardsController.createCakeBox);
router.put("/reward/claim/:cakeboxId", authorizationMiddleware, RewardsController.claimCakeBox);
router.put("/reward/buy/:rewardId", authorizationMiddleware, RewardsController.buyReward);
router.put("/reward/toConfectionary/:rewardId", authorizationMiddleware, RewardsController.toConfectionary);

//* ─────────────────────────────────────────────────────────────────────────────

//*
//* ────────────────────────────────────────────────── IV ──────────
//*   :::::: S L I C E : :  :   :    :     :        :          :
//* ────────────────────────────────────────────────────────────
//*

router.post("/slice", authorizationMiddleware, SliceController.createSlice);

//* ─────────────────────────────────────────────────────────────────────────────

//*
//* ──────────────────────────────────────────────────────── V ──────────
//*   :::::: P L A T F O R M : :  :   :    :     :        :          :
//* ──────────────────────────────────────────────────────────────────
//*

router.post("/platform", authorizationMiddleware, PlatformController.addPlatform);
router.delete("/platform", authorizationMiddleware, PlatformController.removePlatform);
router.get("/platform/:userId", authorizationMiddleware, PlatformController.getPlatformById);

//* ─────────────────────────────────────────────────────────────────────────────

//*
//* ────────────────────────────────────────────────────────── VI ──────────
//*   :::::: F O L L O W E R S : :  :   :    :     :        :          :
//* ────────────────────────────────────────────────────────────────────
//*

router.put("/followers", authorizationMiddleware, FollowerController.addFollower);
router.delete("/followers", authorizationMiddleware, FollowerController.removeFollower);

//* ─────────────────────────────────────────────────────────────────────────────

//*
//* ────────────────────────────────────────────────────── VII ──────────
//*   :::::: S 3   F I L E : :  :   :    :     :        :          :
//* ────────────────────────────────────────────────────────────────
//*

router.get("/image/:key", S3Controller.getImage);
router.post("/image", upload.single("image"), S3Controller.uploadImage);
router.post("/image/test", upload.single("image"), S3Controller.test);

//* ─────────────────────────────────────────────────────────────────────────────

//*
//* ────────────────────────────────────────────────────── VIII ──────────
//*   :::::: WALLET : :  :   :    :     :        :          :
//* ────────────────────────────────────────────────────────────────
//*

router.post("/wallet", authorizationMiddleware, walletController.addWallet);
router.get("/wallet", authorizationMiddleware, walletController.getWallet);
router.put("/wallet", authorizationMiddleware, walletController.editWallet);
router.delete("/wallet/:id", authorizationMiddleware, walletController.removeWallet);

//* ─────────────────────────────────────────────────────────────────────────────

export default router;
