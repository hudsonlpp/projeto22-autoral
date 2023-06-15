import { PrismaClient, Follower } from "@prisma/client";

const prisma = new PrismaClient();

async function createFollower(followerData: Follower): Promise<Follower> {
  try {
    console.log("Creating new follower:", followerData);
    const follower = await prisma.follower.create({ data: followerData });
    console.log("New follower created:", follower);
    return follower;
  } catch (error) {
    console.error("Error creating follower:", error);
    throw new Error("Failed to create follower.");
  }
}

async function unfollow(userId: number, followerId: number): Promise<void> {
    try {
      console.log('Removing follower with ID:', followerId, 'from user with ID:', userId);
      await prisma.follower.deleteMany({
        where: {
          follower_id: followerId,
          followed_id: userId,
        },
      });
      console.log('Follower removed successfully.');
    } catch (error) {
      console.error('Error removing follower:', error);
      throw new Error('Failed to remove follower.');
    }
  }
  

async function getFollowers(userId: number): Promise<Follower[]> {
  try {
    console.log("Fetching followers for user with ID:", userId);
    const followers = await prisma.follower.findMany({
      where: { followed_id: userId },
      include: { follower: true },
    });
    console.log("Followers retrieved successfully:", followers);
    return followers;
  } catch (error) {
    console.error("Error fetching followers:", error);
    throw new Error("Failed to fetch followers.");
  }
}

async function getFollowing(userId: number): Promise<Follower[]> {
  try {
    console.log("Fetching users followed by user with ID:", userId);
    const following = await prisma.follower.findMany({
      where: { follower_id: userId },
      include: { followed: true },
    });
    console.log("Users followed retrieved successfully:", following);
    return following;
  } catch (error) {
    console.error("Error fetching users followed:", error);
    throw new Error("Failed to fetch users followed.");
  }
}

const followerRepository = { 
    createFollower,
    unfollow,
    getFollowers,
    getFollowing
 };
export default followerRepository;
