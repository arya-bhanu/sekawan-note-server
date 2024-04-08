import express, { Request, Response } from 'express';
import { Role } from '../enums/ROLE.ENUM';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', (req: Request, res: Response) => {
	const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET || 'secret';
	const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET || 'secret';

	const userAdmin = {
		id: 3,
		username: 'Admin',
		role: Role.Admin,
	};

	const accessToken = jwt.sign(userAdmin, accessTokenSecret, {
		expiresIn: '1h',
	});
	const refreshToken = jwt.sign(userAdmin, refreshTokenSecret, {
		expiresIn: '1d',
	});

	res
		.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			sameSite: 'strict',
		})
		.header('Authorization', accessToken)
		.send(userAdmin);
});

export { router as AdminRouter };
