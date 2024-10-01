// import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { customers, skills, projects } from '../lib/placeholder-data';

const client = await db.connect();

// async function seedUsers() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS users (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email TEXT NOT NULL UNIQUE,
//       password TEXT NOT NULL
//     );
//   `;

//   const insertedUsers = await Promise.all(
//     users.map(async (user) => {
//       const hashedPassword = await bcrypt.hash(user.password, 10);
//       return client.sql`
//         INSERT INTO users (id, name, email, password)
//         VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
//         ON CONFLICT (id) DO NOTHING;
//       `;
//     }),
//   );

//   return insertedUsers;
// }

// async function seedInvoices() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS invoices (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       customer_id UUID NOT NULL,
//       amount INT NOT NULL,
//       status VARCHAR(255) NOT NULL,
//       date DATE NOT NULL
//     );
//   `;

//   const insertedInvoices = await Promise.all(
//     invoices.map(
//       (invoice) => client.sql`
//         INSERT INTO invoices (customer_id, amount, status, date)
//         VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedInvoices;
// }

async function seedCustomers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  const insertedCustomers = await Promise.all(
    customers.map(
      (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCustomers;
}

// async function seedRevenue() {
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS revenue (
//       month VARCHAR(4) NOT NULL UNIQUE,
//       revenue INT NOT NULL
//     );
//   `;

//   const insertedRevenue = await Promise.all(
//     revenue.map(
//       (rev) => client.sql`
//         INSERT INTO revenue (month, revenue)
//         VALUES (${rev.month}, ${rev.revenue})
//         ON CONFLICT (month) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedRevenue;
// }

async function seedSkills() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
    await client.sql`
      CREATE TABLE IF NOT EXISTS skills (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        icon_url VARCHAR(255) NOT NULL,
        level INT NOT NULL CHECK (level BETWEEN 1 AND 5)
      );
    `;
  
    const insertedSkills = await Promise.all(
      skills.map(
        (skill) => client.sql`
          INSERT INTO skills (id, name, icon_url, level)
          VALUES (
            ${skill.id}, 
            ${skill.name}, 
            ${skill.icon_url}, 
            ${skill.level}
          )
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );
  
    return insertedSkills;
  }
  
//   async function seedProjects() {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
//     await client.sql`
//       CREATE TABLE IF NOT EXISTS projects (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         title VARCHAR(255) NOT NULL,
//         description VARCHAR(255) NOT NULL,
//         image_url VARCHAR(255) NOT NULL,
//         alt VARCHAR(255) NOT NULL,
//         type VARCHAR(255) NOT NULL,
//         skills VARCHAR(255) NOT NULL
//       );
//     `;
  
//     const insertedProjects = await Promise.all(
//       projects.map(
//         (project) => client.sql`
//           INSERT INTO projects (id, title, description, image_url, alt, type, skills)
//           VALUES (
//             ${project.id}, 
//             ${project.title}, 
//             ${project.description}, 
//             ${project.image_url}, 
//             ${project.alt}, 
//             ${project.type}, 
//             ${client.sql.array(project.skills.map(skill => client.sql`${skill}::UUID`))}
//           )
//           ON CONFLICT (id) DO NOTHING;
//         `,
//       ),
//     );
  
//     return insertedProjects;
//   }
  
export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedSkills();
    // await seedProjects();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    console.log('Database Error:', error);
    return Response.json({ error }, { status: 500 });
  }
}
