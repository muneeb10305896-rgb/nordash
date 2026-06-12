const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://nordash_admin:03194017526Muneeb@cluster0.goajive.mongodb.net/nordash?appName=Cluster0';
const ADMIN_EMAIL = 'muneeb10305896@gmail.com';
const NEW_PASSWORD = 'nordash2025';

async function resetAdminPassword() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI, { bufferCommands: false });

  const AdminUser = mongoose.model('AdminUser', new mongoose.Schema({
    email: String,
    passwordHash: String,
    name: String,
    role: String,
  }));

  const hash = await bcrypt.hash(NEW_PASSWORD, 12);
  const result = await AdminUser.findOneAndUpdate(
    { email: ADMIN_EMAIL },
    { passwordHash: hash },
    { new: true }
  );

  if (result) {
    console.log('');
    console.log('Password reset successfully!');
    console.log('Email   :', ADMIN_EMAIL);
    console.log('Password:', NEW_PASSWORD);
    console.log('');
  } else {
    console.log('Admin user not found — creating it...');
    await AdminUser.create({
      email: ADMIN_EMAIL,
      passwordHash: hash,
      name: 'Muneeb',
      role: 'superadmin',
    });
    console.log('Admin user created!');
    console.log('Email   :', ADMIN_EMAIL);
    console.log('Password:', NEW_PASSWORD);
  }

  await mongoose.disconnect();
  process.exit(0);
}

resetAdminPassword().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
