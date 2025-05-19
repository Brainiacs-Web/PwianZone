const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const testSchema = new mongoose.Schema({
  testName: String,
  testDuration: Number,
  batchId: String
});

const Test = mongoose.model('Test', testSchema);

app.get('/tests', async (req, res) => {
  const batchId = req.query.batchId;
  if (!batchId) return res.status(400).json({ error: 'batchId required' });

  try {
    const tests = await Test.find({ batchId });
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching tests' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
