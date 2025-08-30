import { PortableTextBlock } from "next-sanity";

type Category = {
  description: string;
  slug: string;
  title: string;
};

type Author = {
  imageUrl: string;
  name: string;
  slug: string;
  bio: PortableTextBlock;
};

export type Post = {
  _id: string;
  body: PortableTextBlock;
  imageUrl: string;
  slug: string;
  title: string;
  categories: Category[];
  author: Author;
  publishedAt: Date;
};
