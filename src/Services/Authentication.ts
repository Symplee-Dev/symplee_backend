import bcrypt from 'bcryptjs';

export class Authentication {
	password: string;

	constructor(password: string) {
		this.password = password;
	}

	async hashPassword(): Promise<string> {
		const salt = await bcrypt.genSaltSync(10);

		return await bcrypt.hashSync(this.password, salt);
	}

	async verifyPassword(password: string, hashed: string) {
		return await bcrypt.compareSync(password, hashed);
	}
}
