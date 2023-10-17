import {
  getUserById,
  addUser,
  addVolunteer,
  isAdmin,
  removeVolunteer,
  blockUser,
  unblockUser,
} from './firebase.js';

export async function startResponse(user) {
  try {
    let fetchedUser = await getUserById(user.id);
    // if first time user
    if (!fetchedUser) {
      await addUser(user);
    }
    fetchedUser = await getUserById(user.id);
    if (fetchedUser.role === 'admin') {
      return 'Use /addVolunteer [userId] to add a new volunteer.\nUse /removeVolunteer [userId] to remove user as volunteer.\nUse /blockUser [userId] to block a user.\nUse /unblockUser [userId] to unblock a user.\nUse /start to see menu again.';
    } else if (fetchedUser.role === 'volunteer') {
      return 'Use /startVolunteer to match with a user.\nUse /endChat to disconnect with user.\nUse /reportUser [userId] to report user to admin.\nUse /start to see menu again.';
    }
    return 'Welcome to Helpline Bot.\nUse /getHelp to be matched with a volunteer.\nUse /endChat to end the chat with the volunteer.\nIf you are a volunteer, use /register to register your status with admin then /start again.\nUse /stop to disconnect.';
  } catch (e) {
    return `error occurred when starting bot`;
  }
}

export async function addVolunteerResponse(fromId, id) {
  try {
    const admin = await isAdmin(fromId);
    if (!admin) {
      return `unable to use command. you are not an admin.`;
    }
    const add = await addVolunteer(id);
    if (add) {
      return `successfully added ${id} as volunteer`;
    }
    return `user not yet registered. user must press /start and /register to be added as volunteer.`;
  } catch (e) {
    return `error occurred when adding ${id} as volunteer`;
  }
}

export async function removeVolunteerResponse(fromId, id) {
  try {
    const admin = await isAdmin(fromId);
    if (!admin) {
      return `unable to use command. you are not an admin.`;
    }
    const remove = await removeVolunteer(id);
    if (remove) {
      return `successfully removed ${id} as volunteer`;
    }
    return `user not yet registered. user must press /start.`;
  } catch (e) {
    return `error occurred when removing ${id} as volunteer`;
  }
}

export async function blockUserResponse(fromId, id) {
  try {
    const admin = await isAdmin(fromId);
    if (!admin) {
      return `unable to use command. you are not an admin.`;
    }
    const block = await blockUser(id);
    if (block) {
      return `successfully block user ${id}`;
    }
    return `user not yet registered. user must press /start.`;
  } catch (e) {
    return `error occurred when blocking user ${id}`;
  }
}

export async function unblockUserResponse(fromId, id) {
  try {
    const admin = await isAdmin(fromId);
    if (!admin) {
      return `unable to use command. you are not an admin.`;
    }
    const block = await unblockUser(id);
    if (block) {
      return `successfully unblock user ${id}`;
    }
    return `user not yet registered. user must press /start.`;
  } catch (e) {
    return `error occurred when unblocking user ${id}`;
  }
}
