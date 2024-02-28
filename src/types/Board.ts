export type Post = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  category: string;
  img_urls: { [key: string]: string };
  views: number;
  likes: number;
  created_at: string;
  updated_at: string;
};

export type PostListProps = {
  posts: Post[];
};
