import {v4 as UUID } from 'uuid';
import bcrypt from 'bcryptjs';
import { db, Role, User } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {

	const roles= [
			{id:'admin',name:'Administrator'},
			{id:'user',name:'User del sistema'}
	];
	const JohnDoe ={
		id:UUID(),
		name:'John Doe',
		email:'john.doe@google.com',
		password:bcrypt.hashSync('123456'),
		role:'admin'
	};
	const JaneDoe ={
		id:UUID(),
		name:'Jane Doe',
		email:'jane.doe@google.com',
		password:bcrypt.hashSync('123456'),
		role:'user'
	};
	// Seed the DB with our demo data.

	await db.insert(Role).values(roles);
	await db.insert(User).values([JohnDoe, JaneDoe]);
}
