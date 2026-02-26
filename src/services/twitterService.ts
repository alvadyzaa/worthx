export interface TwitterProfile {
  username: string;
  displayName: string;
  followersCount: number;
  followingCount: number;
  profileImageUrl: string;
  isVerified: boolean;
  exists: boolean;
}

export const fetchTwitterProfile = async (username: string): Promise<TwitterProfile> => {
  // Strip @ if provided
  const cleanUsername = username.replace('@', '');

  let exists = false;
  let screenName = cleanUsername;
  let displayName = cleanUsername;
  let followersCount = 0;
  let followingCount = 0;
  const fallbackAvatar = `https://unavatar.io/twitter/${cleanUsername}`;
  let profileImageUrl = `https://wsrv.nl/?url=${encodeURIComponent(fallbackAvatar)}&output=png`;
  let isVerified = false;

  try {
    const yuzuRes = await fetch(`https://shadowban-api.yuzurisa.com/${cleanUsername}`);
    if (yuzuRes.ok) {
      const data = await yuzuRes.json();
      if (data && data.profile && data.profile.exists) {
        exists = true;
        screenName = data.profile.screen_name || cleanUsername;
        displayName = screenName;
        followersCount = data.profile.followers_count || 0;
        followingCount = data.profile.friends_count || data.profile.following_count || 0;
        isVerified = data.profile.is_blue_verified || data.profile.verified || false;
      }
    }
  } catch (error) {
    console.warn("Failed to fetch from yuzurisa", error);
  }

  try {
    const vxRes = await fetch(`https://api.vxtwitter.com/${screenName}`);
    if (vxRes.ok) {
      const vxData = await vxRes.json();
      exists = true; // if vx API works, it exists
      if (vxData.name) displayName = vxData.name;
      if (vxData.profile_image_url) {
        profileImageUrl = `https://wsrv.nl/?url=${encodeURIComponent(vxData.profile_image_url.replace('_normal', '_400x400'))}`;
      }
      if (vxData.followers_count !== undefined) followersCount = vxData.followers_count;
      if (vxData.following_count !== undefined) followingCount = vxData.following_count;
    }
  } catch (error) {
    console.warn("Failed to fetch from vxtwitter", error);
  }

  return {
    username: screenName,
    displayName,
    followersCount,
    followingCount,
    profileImageUrl,
    isVerified,
    exists
  };
};
