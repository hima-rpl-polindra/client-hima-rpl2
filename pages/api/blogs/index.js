import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export default async function handle(req, res) {
  // if authenticated connect to mongodb
  await mongooseConnect();

  const { method } = req;

  if (method === "GET") {
    if (req.query?.id) {
      // fetch a single blog by id
      const Blogs = await Blog.findById(req.query.id);
      res.json(Blogs);
    } else if (req.query?.tags) {
      // fetch blog  by tags
      const Blogs = await Blog.find({
        blogcategory: req.query.tags,
      });
      res.json(Blogs);
    } else if (req.query?.blogcategory) {
      // fetch blog  by category
      const Blogs = await Blog.find({
        blogcategory: req.query.blogcategory,
      });
      res.json(Blogs);
    } else if (req.query?.slug) {
      // fetch blog by slug
      const Blogs = await Blog.find({ slug: req.query.slug });
      res.json(Blogs.reverse());
    } else {
      // fetch all blogs
      const Blogs = await Blog.find();
      res.json(Blogs.reverse());
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
