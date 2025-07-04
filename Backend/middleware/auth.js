const { validateToken } = require("../services/authentication");

function checkForAuthentication() {
  return (req, res, next) => {
    const authHeader = req.header("Authorization");
  

  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization header missing or malformed" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }

    try {
      const user = validateToken(token); 
      req.user = user;
      next(); 
    } catch (err) {
      console.error("Token validation error:", err.message);
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };
}

module.exports = {
  checkForAuthentication,
};
