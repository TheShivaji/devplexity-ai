export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Email</title>
</head>
<body style="margin:0; padding:0; background:#f1f3f5; font-family: 'Segoe UI', Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:40px 15px;">

<table width="100%" style="max-width:600px; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.08);">

<tr>
<td style="background:#212529; padding:25px; text-align:center;">
<h1 style="color:#ffffff; margin:0; font-size:22px; font-weight:600;">Email Verification</h1>
</td>
</tr>

<tr>
<td style="padding:35px; color:#495057; font-size:15px; line-height:1.6;">

<p>Hello,</p>

<p>Thanks for signing up. Please use the verification code below:</p>

<div style="text-align:center; margin:30px 0;">
<span style="display:inline-block; background:#f8f9fa; border:1px dashed #ced4da; color:#212529; padding:16px 28px; font-size:26px; font-weight:600; letter-spacing:6px; border-radius:8px;">
{verificationCode}
</span>
</div>

<p>This code will expire in <strong>15 minutes</strong>.</p>

<p>If you didn’t create this account, you can safely ignore this email.</p>

<p style="margin-top:25px;">Regards,<br><strong>Team Shivaji</strong></p>

</td>
</tr>

<tr>
<td style="text-align:center; padding:15px; font-size:12px; color:#adb5bd;">
This is an automated email. Please do not reply.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="margin:0; padding:0; background:#f1f3f5; font-family:'Segoe UI', Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:40px 15px;">

<table width="100%" style="max-width:600px; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.08);">

<tr>
<td style="background:#212529; padding:25px; text-align:center;">
<h1 style="color:#ffffff; margin:0; font-size:22px;">Password Reset Successful</h1>
</td>
</tr>

<tr>
<td style="padding:35px; color:#495057; font-size:15px; line-height:1.6;">

<p>Hello,</p>

<p>Your password has been successfully reset.</p>

<div style="text-align:center; margin:30px 0;">
<div style="background:#212529; color:white; width:65px; height:65px; line-height:65px; border-radius:50%; font-size:28px; margin:auto;">
✓
</div>
</div>

<p>If this wasn't you, please contact support immediately.</p>

<p><strong>Security Tips:</strong></p>
<ul style="padding-left:18px;">
<li>Use strong passwords</li>
<li>Enable 2FA</li>
<li>Avoid password reuse</li>
</ul>

<p style="margin-top:25px;">Regards,<br><strong>Your App Team</strong></p>

</td>
</tr>

<tr>
<td style="text-align:center; padding:15px; font-size:12px; color:#adb5bd;">
Automated email — do not reply.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Password</title>
</head>
<body style="margin:0; padding:0; background:#f1f3f5; font-family:'Segoe UI', Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:40px 15px;">

<table width="100%" style="max-width:600px; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.08);">

<tr>
<td style="background:#212529; padding:25px; text-align:center;">
<h1 style="color:#ffffff; margin:0; font-size:22px;">Reset Your Password</h1>
</td>
</tr>

<tr>
<td style="padding:35px; color:#495057; font-size:15px; line-height:1.6;">

<p>Hello,</p>

<p>We received a request to reset your password.</p>

<div style="text-align:center; margin:30px 0;">
<a href="{resetURL}" 
style="background:#212529; color:white; padding:14px 30px; text-decoration:none; border-radius:6px; font-weight:600; display:inline-block;">
Reset Password
</a>
</div>

<p>This link will expire in <strong>1 hour</strong>.</p>

<p>If you didn’t request this, you can ignore this email.</p>

<p style="margin-top:25px;">Regards,<br><strong>Your App Team</strong></p>

</td>
</tr>

<tr>
<td style="text-align:center; padding:15px; font-size:12px; color:#adb5bd;">
Automated email — do not reply.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = (name, email) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome</title>
</head>
<body style="margin:0; padding:0; background:#f1f3f5; font-family:'Segoe UI', Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:40px 15px;">

<table width="100%" style="max-width:600px; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.08);">

<!-- Header -->
<tr>
<td style="background:#212529; padding:25px; text-align:center;">
<h1 style="color:#ffffff; margin:0; font-size:22px; font-weight:600;">
Welcome 🎉
</h1>
</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:35px; color:#495057; font-size:15px; line-height:1.6;">

<p>Hello ${name},</p>

<p>
Welcome to our platform! We're excited to have you onboard.
</p>

<!-- User Info Box -->
<div style="background:#f8f9fa; border:1px solid #dee2e6; border-radius:8px; padding:15px; margin:20px 0;">
<p style="margin:0;"><strong>Name:</strong> ${name}</p>
<p style="margin:5px 0 0;"><strong>Email:</strong> ${email}</p>
</div>

<p>
Your account has been successfully created and you're ready to get started.
</p>

<div style="text-align:center; margin:30px 0;">
<a href="#" 
style="background:#212529; color:white; padding:14px 30px; text-decoration:none; border-radius:6px; font-weight:600; display:inline-block;">
Get Started
</a>
</div>

<p>
If you have any questions, feel free to reach out to our support team.
</p>

<p style="margin-top:25px;">
Best regards,<br>
<strong>Your App Team</strong>
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td style="text-align:center; padding:15px; font-size:12px; color:#adb5bd;">
This is an automated email. Please do not reply.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;