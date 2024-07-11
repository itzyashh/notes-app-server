
const verifyToken = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}
    export default verifyToken;