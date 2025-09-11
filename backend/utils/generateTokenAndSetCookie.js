import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});

	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",  // Changed from "strict" to "lax"
		maxAge: 7 * 24 * 60 * 60 * 1000,
		path: "/",  // Explicitly set path
		domain: process.env.NODE_ENV === "development" ? "localhost" : undefined
	});
	return token;
};
