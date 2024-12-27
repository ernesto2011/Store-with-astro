import {v4 as UUID } from 'uuid';
import bcrypt from 'bcryptjs';
import { db, Role, User, Product, ProductImage } from 'astro:db';
import { seedProducts } from './seed-data';

// https://astro.build/db/seed
export default async function seed() {

	const roles= [
			{id:'admin',name:'Administrator'},
			{id:'user',name:'User del sistema'}
	];
	const JohnDoe ={
		id: 'JOHN-123',//UUID(),
		name:'John Doe',
		email:'john.doe@google.com',
		password:bcrypt.hashSync('123456'),
		role:'admin'
	};
	const JaneDoe ={
		id:'JANE-123', //UUID(),
		name:'Jane Doe',
		email:'jane.doe@google.com',
		password:bcrypt.hashSync('123456'),
		role:'user'
	};
	// Seed the DB with our demo data.

	await db.insert(Role).values(roles);
	await db.insert(User).values([JohnDoe, JaneDoe]);
	
	const queries: any =[];
	seedProducts.forEach((p)=>{
		const product = {
			id:UUID(),
			stock: p.stock,
			slug: p.slug,
			price: p.price,
			sizes: p.sizes.join(','),
			type: p.type,
			tags: p.tags.join(','),
			title: p.title,
			description: p.description,
			gender: p.gender,
			user: JohnDoe.id
		};
		queries.push(db.insert(Product).values(product));
		p.images.forEach( img =>{
			const image = {
				id:UUID(),
				image: img,
				productId: product.id
			};
			queries.push(db.insert(ProductImage).values(image));
		});
	})
	await db.batch(queries);
}
