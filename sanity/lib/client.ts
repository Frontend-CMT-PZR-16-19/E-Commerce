import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

const query = `*[_type == "food"]{
    _id,
    name,
    price,
    "originalPrice": originalPrice,
    rating,
    tags,
    "imageUrl": image.asset->url,
    description,
    available
  }`;
