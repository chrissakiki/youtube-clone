export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  subscribers?: number;
  subscribedChannels?: string[];
  saved: string[];
};

export type CommentT = {
  _id: string;
  postedBy: User;
  videoId: VideoT;
  desc: string;
  likes: string[];
  dislikes: string[];
  createdAt: string;
};

export type VideoT = {
  _id: string;
  postedBy: User;
  title: string;
  desc: string;
  imgUrl: string;
  videoUrl: string;
  views: number;
  tags: string[];
  likes: string[];
  dislikes: string[];
  createdAt: string;
};
