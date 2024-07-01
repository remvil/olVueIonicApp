// types/LoginResponse.type.ts
export type ExtAPIResponse = {
	code: number;
	msg: string;
	data: any;
};

export type UserObject = {
	id?: number;
	name?: string;
	token: string;
};
