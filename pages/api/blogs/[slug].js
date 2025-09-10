import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export default async function HandlingBlog(req, res) {
  const { slug } = req.query;

  await mongooseConnect();

  if (req.method === "GET") {
    try {
      // fetch blog by slug
      const blog = await Blog.findOne({ slug });

      if (!blog) {
        return res.status(404).json({ message: "Blog Not Found" });
      }

      res.status(200).json({ blog });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  } else if (req.method === "POST") {
    try {
      const { name, email, title, contentParagraph } = req.body;

      const blog = await Blog.findOne({ slug });

      if (!blog) {
        return res.status(404).json({ message: "Blog Not Found" });
      }

      res.status(201).json({ message: "Operation successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
