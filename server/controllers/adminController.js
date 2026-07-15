export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("========== ADMIN LOGIN ==========");
    console.log("ENV EMAIL:", process.env.ADMIN_EMAIL);
    console.log("ENV PASSWORD:", process.env.ADMIN_PASSWORD);
    console.log("BODY:", req.body);
    console.log("Email Match:", email === process.env.ADMIN_EMAIL);
    console.log("Password Match:", password === process.env.ADMIN_PASSWORD);

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid Admin Credentials",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admin Login Successful",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};