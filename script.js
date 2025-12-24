const { prisma } = require('./lib/prisma');

async function main() {
    const all_users = await prisma.post.deleteMany();
    console.log(all_users);
}

main()
.then(async () => await prisma.$disconnect())
.catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});