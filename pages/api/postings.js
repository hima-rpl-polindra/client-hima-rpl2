import { mongooseConnect } from "@/lib/mongoose";
import { Posting } from "@/models/Posting";

export default async function handle(req, res) {
  // if authenticated, connect to mongoDB
  await mongooseConnect();

  const { method } = req;

  if (method === "GET") {
    if (req.query?.id) {
      // fetch a single posting by id
      const posting = await Posting.findById(req.query.id);
      res.json(posting);
    } else if (req.query?.postingCategory) {
      // fetch posting by category
      const postingCat = await Posting.find({
        postingCategory: req.query.postingCategory,
      });
      res.json(postingCat);
    } else if (req.query?.slug) {
      // fetch posting by slug
      const postingSlug = await Posting.find({ slug: req.query.slug });
      res.json(postingSlug.reverse());
    } else {
      // fetch all postings
      const postings = await Posting.find();
      res.json(postings.reverse());
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
