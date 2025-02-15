import UserToken from "../models/UserToken.js";
import jwt from "jsonwebtoken";

const verifyRefreshToken = async (refreshToken) => {
  try {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

    // Find the token in the database
    const userToken = await UserToken.findOne({ token: refreshToken });

    if (!userToken) {
      throw {
        error: true,
        message: "Invalid refresh token",
      };
    }

    // Verify the JWT token
    const tokenDetails = jwt.verify(refreshToken, privateKey);

    return {
      tokenDetails,
      error: false,
      message: "Valid refresh token",
    };
  } catch (error) {
    console.error("Error in verifyRefreshToken:", error);
    throw {
      error: true,
      message: "Invalid or expired refresh token",
    };
  }
};

export default verifyRefreshToken;
