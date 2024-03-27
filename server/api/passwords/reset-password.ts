// resetPassword.ts

import { Request, Response } from 'express';
import { generateNewPassword, updateUserPassword, sendPasswordResetEmail } from '../../utils/passwordUtils'; // Import necessary functions for password reset

export const resetPasswordHandler = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    // Generate a new password
    const newPassword = generateNewPassword();
    
    // Update the user's password in the database
    await updateUserPassword(email, newPassword);

    // Send an email to the user's email address containing the new password
    await sendPasswordResetEmail(email, newPassword);

    res.status(200).send('Password reset successful.');
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).send('Internal server error.');
  }
};
