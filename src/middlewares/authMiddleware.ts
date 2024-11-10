import jwt from 'jsonwebtoken'

const authMiddleware = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(403).json({ message: 'No token provided' })
    }
    const secret = "SDFLJLWEIUR3987REWR398R7WERLKSJDFLKSJF823";
    jwt.verify(token, secret!, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        req.user = { id: decoded?.id }
        next()
    })
}

export default authMiddleware