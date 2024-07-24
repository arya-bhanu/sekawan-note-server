import { PrismaClient } from '@prisma/client';
import express from 'express';
const prisma = new PrismaClient();

const router = express.Router();

router.get('/books', async (req, res) => {
	try {
		const data = await prisma.book.findMany();
		res.status(200).json(data);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

router.post('/create-book', async (req, res) => {
	const { description, imgUrl, title } = req.body;
	try {
		const response = await prisma.book.create({
			data: {
				description,
				imgUrl,
				title,
			},
		});
		res.status(200).json({ data: response });
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

router.put('/update-book/:id', async (req, res) => {
	const { description, imgUrl, title } = req.body;
	const id = Number(req.params['id']);
	try {
		const response = await prisma.book.update({
			where: { id },
			data: {
				description,
				imgUrl,
				title,
			},
		});
		res.status(200).json({ data: response });
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

router.delete('/delete-book/:id', async (req, res) => {
	const id = Number(req.params['id']);
	try {
		const response = await prisma.book.delete({ where: { id } });
		res.status(200).json({ data: response });
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

export { router as AdminRoute };
