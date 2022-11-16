import { PrismaClient } from '@prisma/client';

class PrismaConnector {
	public prisma: PrismaClient;

	constructor(){
		this.connectDb();
	}

	public connectDb(): void {
		this.prisma = new PrismaClient;
	}

	public async disconnectDb(): Promise<void> {
		await this.prisma?.$disconnect();
	}
}

const prismaConnector = new PrismaConnector();
const prisma = prismaConnector.prisma;
export {
	prismaConnector,
	prisma
};