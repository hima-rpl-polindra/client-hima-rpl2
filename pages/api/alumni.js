// File: pages/api/alumni.js (Di dalam project Client)

// Asumsi path ini mengarah ke file MongoClient kamu yang di atas
import connectToDatabase from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const db = await connectToDatabase();
      const alumni = await db
        .collection("alumni")
        .find({})
        .sort({ angkatan: -1 })
        .toArray();

      return res.status(200).json(alumni);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Gagal mengambil data dari database" });
    }
  }

  res.status(405).json({ message: "Method not allowed" });
}
