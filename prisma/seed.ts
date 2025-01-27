import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clean existing data
  await prisma.signup.deleteMany()
  await prisma.event.deleteMany()
  await prisma.user.deleteMany()

  // Create users (admins)
  const admin1 = await prisma.user.create({
    data: {
      email: 'sarah@villageapp.com',
      name: 'Sarah Johnson',
      outsetaId: 'outseta_123', // Example Outseta ID
    },
  })

  const admin2 = await prisma.user.create({
    data: {
      email: 'mike@villageapp.com',
      name: 'Mike Chen',
      outsetaId: 'outseta_456', // Example Outseta ID
    },
  })

  // Create events
  const event1 = await prisma.event.create({
    data: {
      adminId: admin1.id,
      title: 'Community Garden Workshop',
      description: 'Learn organic gardening techniques and help plant our spring vegetables!',
      eventDate: new Date('2025-03-15'),
      location: 'Community Garden - 123 Green St',
    },
  })

  const event2 = await prisma.event.create({
    data: {
      adminId: admin1.id,
      title: 'Neighborhood Cleanup Day',
      description: 'Join us for our monthly neighborhood cleanup initiative',
      eventDate: new Date('2025-02-20'),
      location: 'Central Park Entrance',
    },
  })

  const event3 = await prisma.event.create({
    data: {
      adminId: admin2.id,
      title: 'Community Potluck Dinner',
      description: 'Bring your favorite dish and meet your neighbors!',
      eventDate: new Date('2025-02-10'),
      location: 'Community Center - 456 Main St',
    },
  })

  // Create signups
  await prisma.signup.createMany({
    data: [
      {
        eventId: event1.id,
        name: 'John Smith',
        email: 'john@example.com',
        slot: 'Morning Session',
      },
      {
        eventId: event1.id,
        name: 'Emma Davis',
        email: 'emma@example.com',
        slot: 'Afternoon Session',
      },
      {
        eventId: event2.id,
        name: 'Alex Wong',
        email: 'alex@example.com',
        slot: 'Zone 1',
      },
      {
        eventId: event3.id,
        name: 'Maria Garcia',
        email: 'maria@example.com',
        slot: 'Main Course',
      },
      {
        eventId: event3.id,
        name: 'David Kim',
        email: 'david@example.com',
        slot: 'Desserts',
      },
    ],
  })

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })