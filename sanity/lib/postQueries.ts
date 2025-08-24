import { groq } from "next-sanity";
import { client } from "./client";

export default async function getAllPosts() {
  const postsQuery = groq`
  *[_type == "post"]
  {
    title,
    "slug": slug.current,
    "author": author -> {
        name,
        "slug": slug.current,
        "imageUrl": image.asset->url,
        bio
    },
    "imageUrl": mainImage.asset->url,
    "alt": mainImage-> { 
        alt
    },
    "categories": categories[] -> {
        title,
        "slug": slug.current,
        description
    },
  }
    `;

  try {
    const posts = await client.fetch(postsQuery);

    if (!posts) {
      return {
        message: "Herhangi bir post bulunamadı",
        data: null,
      };
    }

    return { message: "Başarılı", data: posts };
  } catch (error) {
    return { message: error, data: null };
  }
}
