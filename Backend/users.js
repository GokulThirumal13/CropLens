const {MongoClient,ObjectId}=require("mongodb");
const bcrypt = require('bcrypt');
const express=require("express");
const jwt = require('jsonwebtoken');
const cors=require("cors");
const app = express(); 
const port =6969;

app.use(express.json());
app.use(cors());
const uri = "mongodb://127.0.0.1:27017";
async function getDB() {
  const client = new MongoClient(uri);
  await client.connect();
  console.log("MongoDB connection established");
  const db = client.db("plantcare");
  return { db, client };
}

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const { db, client } = await getDB(); 

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email or password is required" });
    }

    const eregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!eregex.test(email)) {
      return res.status(400).json({ message: "Should have valid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const userCollection = db.collection("users");
    const userExists = await userCollection.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    await userCollection.insertOne({ email, password: hashed });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await client.close();
    console.log(" MongoDB connection closed ");
  }
});



app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { db, client } = await getDB(); 

  try {
    const userCollection = db.collection("users"); 

    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ email }, "your_secret_key", { expiresIn: "2h" });
    res.json({ message: "Login success", token });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await client.close(); 
    console.log("MongoDB connection closed ");
  }
});


app.post("/submit-diagnosis", async (req, res) => {
  const { db, client } = await getDB(); 
  try {
    const diagnosisCollection = db.collection("diagnoses");

    const { title, description, image } = req.body;

    if (!title || !description || !image) {
      return res.status(400).json({ message: "Missing fields" });
    }

    await diagnosisCollection.insertOne({
      title,
      description,
      image,
    });

    res.status(201).json({ message: "Diagnosis submitted successfully" });
  } catch (err) {
    console.error("Error submitting diagnosis:", err);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await client.close();
    console.log("MongoDB connection closed ");
  }
});

app.get("/diagnosis", async (req, res) => {
  const { db, client } = await getDB();

  try {
    const diagnosisCollection = db.collection("diagnoses");

    const data = await diagnosisCollection.find().toArray();
    res.json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Error fetching data" });
  } finally {
    await client.close();
    console.log("MongoDB connection closed ");
  }
});



 

app.delete("/diagnosis/:id", async (req, res) => {
  const { db, client } = await getDB();
  try {
    const diagnosisCollection = db.collection("diagnoses");
    const { id } = req.params;

    const result = await diagnosisCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.json({ message: "Diagnosis deleted successfully" });
    } else {
      res.status(404).json({ message: "Diagnosis not found" });
    }
  } catch (err) {
    console.error("Error deleting diagnosis:", err);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
});


app.post("/submit-report", async (req, res) => {
  const { db, client } = await getDB();
  try {
    const fieldReportsCollection = db.collection("fieldReports");
    const { name, location, disease, notes } = req.body;

    if (!name || !location || !disease) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await fieldReportsCollection.insertOne({
      name,
      location,
      disease,
      notes,
    });

    res.status(201).json({ message: "Report submitted successfully" });
  } catch (err) {
    console.error("Error submitting report:", err);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
});


app.get("/reports", async (req, res) => {
  const { db, client } = await getDB();
  try {
    const fieldReportsCollection = db.collection("fieldReports");
    const reports = await fieldReportsCollection.find().toArray();
    res.json(reports);
  } catch (err) {
    console.error("Failed to fetch reports:", err);
    res.status(500).json({ message: "Failed to fetch reports" });
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
});


app.post("/add-disease", async (req, res) => {
  const { db, client } = await getDB();
  try {
    const newDiseaseCollection = db.collection("customDiseases");
    const { title, description, image } = req.body;

    if (!title || !description || !image) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await newDiseaseCollection.insertOne({ title, description, image });
    res.status(201).json({ message: "Disease added successfully" });
  } catch (err) {
    console.error("Error adding disease:", err);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
});


app.get("/add-disease", async (req, res) => {
  const { db, client } = await getDB();
  try {
    const newDiseaseCollection = db.collection("customDiseases");

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    const total = await newDiseaseCollection.countDocuments();
    const data = await newDiseaseCollection.find().skip(skip).limit(limit).toArray();

    res.json({
      data: data,
      total: total,
      page: page,
      totalpage: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Error fetching diseases:", err);
    res.status(500).json({ message: "Error fetching diseases" });
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
});


app.post("/add-treatment", async (req, res) => {
  const { db, client } = await getDB();
  try {
    const treatmentCollection = db.collection("treatments");
    const { title, disease, date, user } = req.body;

    if (!title || !disease || !date) {
      return res.status(400).json({ message: "Missing fields" });
    }

    await treatmentCollection.insertOne({
      title,
      disease,
      date,
      user,
      completed: false,
    });

    res.status(201).json({ message: "Treatment added" });
  } catch (err) {
    console.error("Error adding treatment:", err);
    res.status(500).json({ message: "Error adding treatment" });
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
});


app.get("/add-treatment", async (req, res) => {
  const { db, client } = await getDB();
  try {
    const treatmentCollection = db.collection("treatments");
    const data = await treatmentCollection.find().toArray();
    res.json(data);
  } catch (err) {
    console.error("Error fetching treatments:", err);
    res.status(500).json({ message: "Error fetching treatments" });
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
});


app.put("/add-treatment/:id", async (req, res) => {
  const { db, client } = await getDB();
  try {
    const treatmentCollection = db.collection("treatments");
    const { id } = req.params;

    await treatmentCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { completed: true } }
    );

    await treatmentCollection.deleteOne({ _id: new ObjectId(id) });

    res.json({ message: "Marked as completed" });
  } catch (err) {
    console.error("Error updating treatment:", err);
    res.status(500).json({ message: "Error updating treatment" });
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
});

app.post("/redRot", async (req, res) => {
  const { db, client } = await getDB(); 
  try {
    const redRotCollection = db.collection("redRot");
    const data = req.body;

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ message: "Request body should be a non-empty array" });
    }

    for (const item of data) {
      if (!item.title || !item.description || !item.image) {
        return res.status(400).json({ message: "Missing required fields in one or more objects" });
      }
    }

    await redRotCollection.insertMany(data);
    res.status(201).json({ message: "Diseases added successfully" });

  } catch (err) {
    console.error("Error adding disease:", err);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
});

app.get("/redRot", async (req, res) => {
  const { db, client } = await getDB();
  try {
    const redRotCollection = db.collection("redRot");

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    const total = await redRotCollection.countDocuments();
    const data = await redRotCollection.find().skip(skip).limit(limit).toArray();

    res.json({
      data,
      page,
      totalPages: Math.ceil(total / limit)
    });

  } catch (err) {
    console.error("Error fetching diseases:", err);
    res.status(500).json({ message: "Error fetching diseases" });
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
});




app.post("/rust", async (req, res) => {
  const { db, client } = await getDB();
  try {
    const rustCollection = db.collection("Rust");
    const data = req.body;

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ message: "Request body should be a non-empty array" });
    }

    for (const item of data) {
      if (!item.title || !item.description || !item.image) {
        return res.status(400).json({ message: "Missing required fields in one or more objects" });
      }
    }

    await rustCollection.insertMany(data);
    res.status(201).json({ message: "Diseases added successfully" });

  } catch (err) {
    console.error("Error adding disease:", err);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
});


app.get("/rust", async (req, res) => {
  const { db, client } = await getDB();
  try {
    const rustCollection = db.collection("Rust");

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    const total = await rustCollection.countDocuments();
    const data = await rustCollection.find().skip(skip).limit(limit).toArray();

    res.json({
      data,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    console.error("Error fetching treatments:", err);
    res.status(500).json({ message: "Error fetching treatments" });
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
});

app.post("/yellow", async (req, res) => {
  const { db, client } = await getDB();
  try {
    const yellowCollection = db.collection("Yellow");
    const data = req.body;

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ message: "Request body should be a non-empty array" });
    }

    for (const item of data) {
      if (!item.title || !item.description || !item.image) {
        return res.status(400).json({ message: "Missing required fields in one or more objects" });
      }
    }

    await yellowCollection.insertMany(data);
    res.status(201).json({ message: "Diseases added successfully" });

  } catch (err) {
    console.error("Error adding disease:", err);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
});


app.get("/yellow", async (req, res) => {
  const { db, client } = await getDB();
  try {
    const yellowCollection = db.collection("Yellow");

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    const total = await yellowCollection.countDocuments();
    const data = await yellowCollection.find().skip(skip).limit(limit).toArray();

    res.json({
      data,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    console.error("Error fetching yellow treatments:", err);
    res.status(500).json({ message: "Error fetching treatments" });
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
});

app.post("/mosaic", async (req, res) => {
  const { db, client } = await getDB();
  try {
    const mosaicCollection = db.collection("Mosaic");
    const data = req.body;

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ message: "Request body should be a non-empty array" });
    }

    for (const item of data) {
      if (!item.title || !item.description || !item.image) {
        return res.status(400).json({ message: "Missing required fields in one or more objects" });
      }
    }

    await mosaicCollection.insertMany(data);
    res.status(201).json({ message: "Diseases added successfully" });

  } catch (err) {
    console.error("Error adding mosaic disease:", err);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
});


app.get("/mosaic", async (req, res) => {
  const { db, client } = await getDB();
  try {
    const mosaicCollection = db.collection("Mosaic");

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    const total = await mosaicCollection.countDocuments();
    const data = await mosaicCollection.find().skip(skip).limit(limit).toArray();

    res.json({
      data,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    console.error("Error fetching mosaic treatments:", err);
    res.status(500).json({ message: "Error fetching treatments" });
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
});


app.get("/all", async (req, res) => {
  const { db, client } = await getDB();

  try {
    const redRotCollection = db.collection("redRot");
    const yellowCollection = db.collection("Yellow");
    const rustCollection = db.collection("Rust");
    const mosaicCollection = db.collection("Mosaic");

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    const [red, yellow, rust, mosaic] = await Promise.all([
      redRotCollection.find().toArray(),
      yellowCollection.find().toArray(),
      rustCollection.find().toArray(),
      mosaicCollection.find().toArray(),
    ]);

    const allDiseases = [...red, ...yellow, ...rust, ...mosaic];
    const total = allDiseases.length;
    const paginated = allDiseases.slice(skip, skip + limit);

    res.json({
      data: paginated,
      page,
      totalPages: Math.ceil(total / limit),
    });

  } catch (err) {
    console.error("Error fetching all diseases:", err);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
});



app.listen(port,()=>{
    console.log(`server running at  http://localhost:${port} `)
});



