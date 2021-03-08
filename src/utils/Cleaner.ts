import { isArray, isBoolean, isString } from 'lodash';
import sanitizeHtml from 'sanitize-html';

export interface Input {
	[x: string]:
		| string
		| number
		| boolean
		| { [x: string]: string | number | boolean }
		| { [x: string]: string | number | boolean }[]
		| unknown;
}

type SanitizedInput = {
	[x: string]: string | number | boolean | Input | Input[];
};

export class Sanitizer {
	sanitized!: number;
	sanitizedOutput: SanitizedInput = {};

	constructor(input: Input | unknown) {
		this.sanitized = 0;

		console.log('Saniziting Input Beginning.');

		this.sanitize(input as Input);
	}

	private sanitize(input: Input) {
		for (const [key, value] of Object.entries(input)) {
			if (isString(value)) {
				//@ts-ignore
				const san = sanitizeHtml(value, {
					allowedTags: [],
					allowedAttributes: {}
				});
				this.sanitizedOutput = {
					...this.sanitizedOutput,
					[key]: san
				};

				this.sanitized++;
			} else if (this.bool(value as boolean)) {
				this.sanitized++;

				this.sanitizedOutput = {
					...this.sanitizedOutput,
					[key]: value as boolean
				};
			} else if (this.num(value as number)) {
				this.sanitized++;

				this.sanitizedOutput = {
					...this.sanitizedOutput,
					[key]: value as number
				};
			} else if (isArray(value as Input[])) {
				this.sanitizedOutput = {
					...this.sanitizedOutput,
					[key]: this.checkSubArray(value as Input[])
				};
			} else {
				this.sanitized++;
				this.sanitizedOutput = {
					...this.sanitizedOutput,
					[key]: this.checkSubObject(value as Input)
				};
			}
		}
	}

	private checkSubObject(input: Input): Input {
		let valid: Input = {} as Input;
		for (const [key, value] of Object.entries(input)) {
			if (isString(value)) {
				//@ts-ignore
				const san = sanitizeHtml(value, {
					allowedTags: [],
					allowedAttributes: {}
				});
				valid = {
					...valid,
					[key]: san
				};
			} else if (this.bool(value as boolean)) {
				valid = {
					...valid,
					[key]: valid
				};
			} else if (this.num(value as number)) {
				valid = {
					...valid,
					[key]: valid
				};
			} else if (isArray(value)) {
				//@ts-ignore
				valid = { ...valid, [key]: this.checkSubArray(value) };
			} else {
				valid = {
					...valid,
					[key]: this.checkSubObject((value as unknown) as Input)
				};
			}
		}

		return valid;
	}

	private checkSubArray(input: Input[]): Input[] {
		const valid: Input[] = [] as Input[];
		for (let i = 0; i < input.length; i++) {
			let validSub: Input = {} as Input;
			for (const [key, value] of Object.entries(input[i])) {
				if (isString(value)) {
					//@ts-ignore
					const san = sanitizeHtml(value, {
						allowedTags: [],
						allowedAttributes: {}
					});
					validSub = {
						...validSub,
						[key]: san
					};
				} else if (this.bool(value as boolean)) {
					validSub = {
						...validSub,
						[key]: value
					};
				} else if (this.num(value as number)) {
					validSub = {
						...validSub,
						[key]: value
					};
				} else if (isArray(value)) {
					validSub = {
						...validSub,
						//@ts-ignore
						[key]: this.checkSubArray(value)
					};
				} else {
					validSub = {
						...validSub,
						[key]: this.checkSubObject((value as unknown) as Input)
					};
				}
			}
			valid.push(validSub);
		}

		return valid;
	}

	private num(input: number | boolean | string | Input): boolean {
		if (typeof input === 'number') {
			return isFinite(input);
		} else {
			return false;
		}
	}

	private bool(input: number | boolean | string | Input): boolean {
		return isBoolean(input);
	}

	// This will run a final check to ensure all checked values were truthy
	checkAll(): Input {
		console.log(this.sanitized);

		return this.sanitizedOutput;
	}
}
