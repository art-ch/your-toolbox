export type LocalHref = `/${string}`;
export type GlobalHref = `https://${string}`;
export type Href = LocalHref | GlobalHref;

export type AuthorMentionType = {
  name: string;
  href: GlobalHref;
};
