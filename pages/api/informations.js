import { mongooseConnect } from "@/lib/mongoose";
import { Information } from "@/models/Information";

export default async function handle(req, res) {
  // if authenticated, connect to mongoDB
  await mongooseConnect();

  const { method } = req;

  if (method === "GET") {
    if (req.query?.id) {
      // fetch a single information by id
      const information = await Information.findById(req.query.id);
      res.json(information);
    } else if (req.query?.informationCategory) {
      // fetch inforamtion by category
      const informationCat = await Information.find({
        informationCategory: req.query.informationCategory,
      });
      res.json(informationCat);
    } else if (req.query?.slug) {
      // fetch information by slug
      const informationSlug = await Information.find({ slug: req.query.slug });
      res.json(informationSlug.reverse());
    } else {
      // fetch all informations
      const informations = await Information.find();
      res.json(informations.reverse());
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
