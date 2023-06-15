import { Request, Response } from "express";
import followerService from "../services/follower-services";
import { Follower } from "@prisma/client";
import httpStatus from "http-status";

async function createFollower(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const followerId = parseInt(id);
    const followerData: Follower = { id: followerId, follower_id: followerId, followed_id: req.body.followed_id };

    const newFollower = await followerService.createFollower(followerData);

    res.status(httpStatus.OK).json(newFollower);
  } catch (error) {
    console.error("Error creating follower:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Failed to create follower." });
  }
}

// async function unfollow(req: Request, res: Response): Promise<void> {
//     try {
//       const { id, followerId } = req.params;
//       const userId = parseInt(id);
//       const parsedFollowerId = parseInt(followerId);
  
//       if (isNaN(parsedFollowerId)) {
//         res.status(400).json({ error: "Invalid followerId. It must be a valid number." });
//         return;
//       }
  
//       console.log("Deleting follower with ID:", parsedFollowerId);
//       await followerService.unfollow(userId, parsedFollowerId);
//       console.log("Follower deleted successfully.");
  
//       res.sendStatus(204);
//     } catch (error) {
//       console.error("Error deleting follower:", error);
//       res.status(500).json({ error: "Failed to delete follower." });
//     }
//   }


async function unfollow(req: Request, res: Response): Promise<void> {
  try {
    const { id, followerId } = req.params;
    const userId = parseInt(id);
    const parsedFollowerId = parseInt(followerId);

    if (isNaN(parsedFollowerId)) {
      res.status(400).json({ error: 'Invalid followerId. It must be a valid number.' });
      return;
    }

    await followerService.unfollow(userId, parsedFollowerId);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error stopping following:', error);
    res.status(500).json({ error: 'Failed to stop following user.' });
  }
}

async function getFollowers(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    const followers = await followerService.getFollowers(userId);

    res.status(200).json(followers);
  } catch (error) {
    console.error("Error fetching followers:", error);
    res.status(500).json({ error: "Failed to fetch followers." });
  }
}

async function getFollowing(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    const following = await followerService.getFollowing(userId);

    res.status(200).json(following);
  } catch (error) {
    console.error("Error fetching users followed:", error);
    res.status(500).json({ error: "Failed to fetch users followed." });
  }
}

const followerController = {
  createFollower,
  unfollow,
  getFollowers,
  getFollowing
};

export default followerController;
