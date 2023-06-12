import cron from 'node-cron';
import signOutRepository from 'repositories/sign-out-repository';

cron.schedule('0 * * * *', async () => {
  await signOutRepository.removeExpiredTokens();
  console.log('Expired tokens removed from the blacklist.');
});