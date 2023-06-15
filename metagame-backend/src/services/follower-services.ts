import { Follower } from "@prisma/client";
import followerRepository from "../repositories/follower-repository";

async function createFollower(followerData: Follower): Promise<Follower> {
  console.log("Creating follower...");
  const follower = await followerRepository.createFollower(followerData);
  console.log("Follower created!");
  return follower;
}

async function unfollow(userId: number, followerId: number): Promise<void> {
    try {
      await followerRepository.unfollow(userId, followerId);
    } catch (error) {
      console.error('Error stopping following:', error);
      throw new Error('Failed to stop following user.');
    }
  }

async function getFollowers(userId: number): Promise<Follower[]> {
  console.log("Fetching followers...");
  const followers = await followerRepository.getFollowers(userId);
  console.log("Followers fetched!");
  return followers;
}

async function getFollowing(userId: number): Promise<Follower[]> {
  console.log("Fetching users followed...");
  const following = await followerRepository.getFollowing(userId);
  console.log("Users followed fetched!");
  return following;
}

const followerServices ={ 
    createFollower,
    unfollow,
    getFollowers,
    getFollowing
 };
export default followerServices;
