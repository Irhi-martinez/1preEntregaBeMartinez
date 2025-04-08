import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  role: { type: String, default: 'user' },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hashSync(this.password, saltRounds);
  }
  next();
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;