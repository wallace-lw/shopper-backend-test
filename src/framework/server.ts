import { PrismaClient } from "@prisma/client";
import express from "express";

export const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));
