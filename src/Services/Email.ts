import sgMail from '@sendgrid/mail';
import { Config } from '../index';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger';

const SENDGRID_SENDER = 'legendarycomedy1@gmail.com';

export class EmailService {
	templateName: string = '';
	context: Services.ServerContext;

	constructor(context: Services.ServerContext, templateName?: string) {
		this.templateName = templateName ?? '';
		this.context = context;
	}

	async sendPlainEmail(
		recipient: string,
		subject: string,
		text: string,
		html: string
	): Promise<boolean> {
		sgMail.setApiKey(Config.SENDGRID_TOKEN);

		const msg = {
			to: recipient,
			from: SENDGRID_SENDER,
			subject: subject,
			text: text,
			html: html
		};

		sgMail
			.send(msg)
			.then(() => {
				logger.info('Email Sent to ' + recipient);
				return true;
			})
			.catch(error => {
				logger.err('Email could not be sent', error.toString());
				return false;
			});

		return true;
	}

	async generateEmailJWT(userId: number): Promise<string> {
		const JWTOptions: jwt.SignOptions = {
			expiresIn: '30d'
		};

		const token = await jwt.sign(
			{ userId: 1, secret: Config.SESSION_SECRET },
			Config.SESSION_SECRET,
			JWTOptions
		);

		return token;
	}
}
