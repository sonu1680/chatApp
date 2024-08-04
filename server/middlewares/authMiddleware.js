import jwt from "jsonwebtoken";
export const verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token)
    return res
      .status(401)
      .json({ message: "you are not authenticated", success: false });
      jwt.verify(token, process.env.JWT_KEY,async(err,payload)=>{
        if(err) return res.status(403).json({message:"token is expired",succes:false});
        req.userId=payload.userId;
        next();
      });

};
