import { PortableTextBlock } from "next-sanity";

const obj = {
  alt: null,
  author: {
    bio: [
      {
        _key: "3c0e958c708e",
        _type: "block",
        children: [
          {
            _key: "2b4aa3246d6c",
            _type: "span",
            marks: ["underline", "strong"],
            text: "bedirhan giden",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    imageUrl:
      "https://cdn.sanity.io/images/1qcpr40y/production/750ed04e4ca6fb6d7e461b669d5e22a62e633fa9-200x200.jpg",
    name: "Bedirhan Giden",
    slug: "bedirhan-giden",
  },
  body: [
    {
      _key: "069106e9ff53",
      _type: "block",
      children: [
        {
          _key: "5492a9f19877",
          _type: "span",
          marks: [],
          text: "Herhangi bir yazı",
        },
      ],
      markDefs: [],
      style: "normal",
    },
    {
      _key: "a2f44cf01f46",
      _type: "block",
      children: [
        {
          _key: "14f730dbecaf",
          _type: "span",
          marks: [],
          text: "",
        },
      ],
      markDefs: [],
      style: "normal",
    },
    {
      _key: "a4e681362b44",
      _type: "block",
      children: [
        {
          _key: "f0f6c4d05f13",
          _type: "span",
          marks: [],
          text: "Büyük Başlık",
        },
      ],
      markDefs: [],
      style: "h2",
    },
    {
      _key: "11703df170b2",
      _type: "block",
      children: [
        {
          _key: "a15bbb4ebac1",
          _type: "span",
          marks: [],
          text: "",
        },
      ],
      markDefs: [],
      style: "normal",
    },
    {
      _key: "3fdc6f6d5f0d",
      _type: "block",
      children: [
        {
          _key: "c2053d033dbc",
          _type: "span",
          marks: [],
          text: "İçerik yazıları bu kısım ",
        },
        {
          _key: "8ad942700318",
          _type: "span",
          marks: ["strong"],
          text: "kalın",
        },
        {
          _key: "97baf793ce84",
          _type: "span",
          marks: [],
          text: " bu kısım",
        },
        {
          _key: "42573c4f397d",
          _type: "span",
          marks: ["em"],
          text: " italik",
        },
      ],
      markDefs: [],
      style: "normal",
    },
  ],
  categories: [
    {
      description: null,
      slug: "kadin-giyim",
      title: "Kadın Giyim",
    },
    {
      description: null,
      slug: "erkek-giyim",
      title: "Erkek Giyim",
    },
  ],
  imageUrl:
    "https://cdn.sanity.io/images/1qcpr40y/production/c3b1e436158fde1f349427bb7d854c3eb05b0885-512x301.jpg",
  slug: "e-ticarette-alisveris-yaparken-nelere-dikkat-edilmeli",
  title: "E-ticarette alışveriş yaparken nelere dikkat edilmeli?",
};

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
  body: PortableTextBlock;
  imageUrl: string;
  slug: string;
  title: string;
  categories: Category[];
  author: Author;
};
