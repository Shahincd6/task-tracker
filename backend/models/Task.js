import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  dateCreated: { type: Date, default: Date.now },
  dateCompleted: { type: Date }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;
