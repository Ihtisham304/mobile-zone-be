import { Router } from "express";
import UserToken from "../../models/UserToken.js";
import jwt from "jsonwebtoken";
import verifyRefreshToken from "../../utils/verifyRefreshToken.js";
import { refreshTokenBodyValidation } from "../../utils/validations.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { error } = refreshTokenBodyValidation(req.body);
    console.log("check");
    if (error) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }

    console.log("check2");
    console.log(req.body.refreshToken);

    const { tokenDetails } = await verifyRefreshToken(req.body.refreshToken);

    console.log("check3");

    const payload = { _id: tokenDetails._id, roles: tokenDetails.roles };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: "14m" }
    );

    return res.status(200).json({
      error: false,
      accessToken,
      message: "Access token generated",
    });
  } catch (err) {
    console.error("Error in refresh token route:", err);
    return res.status(400).json({
      error: true,
      message: err.message || "Something went wrong",
    });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { error } = refreshTokenBodyValidation(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const userToken = await UserToken.findOne({ token: req.body.refreshToken });

    if (!userToken) {
      return res
        .status(200)
        .json({ error: false, message: "Logged out Successfully" });
    }

    await UserToken.deleteOne({ token: req.body.refreshToken });
    return res
      .status(200)
      .json({ error: false, message: "Logged out Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
