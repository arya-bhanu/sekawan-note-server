import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { IndexRoute } from './routers/index.route';

dotenv.config();
const prisma = new PrismaClient();

async function main() {
	const app: Express = express();
	const port = process.env.SERVER_PORT || 5000;
	const cookieSecret = process.env.COOKIE_SECRET || 'cookie-secret';
	const corsConfig = cors({ origin: [process.env.CLIENT_URL_1 as string] });

	// global middleware
	app.use(corsConfig);

	app.use(cookieParser(cookieSecret));

	app.use(IndexRoute);

	app.get('/', (req: Request, res: Response) => {
		res.send('Express + TypeScript Server');
	});

	app.listen(port, () => {
		console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
