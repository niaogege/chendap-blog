export interface Response<T> {
  ret: number;
  msg: string;
  data: T;
}

export interface RecommendsData {
  count: number;
  recommendInfoList: Recommend[];
  recommendAnchorList: [];
}

export interface Recommend {
  albumId: number;
  albumPlayCount: number;
  albumTrackCount: number;
  albumCoverPath: string;
  albumTitle: string;
  albumUserNickName: string;
  anchorId: number;
  anchorGrade: number;
  mvpGrade: number;
  isDeleted: false;
  isPaid: true;
  isFinished: number;
  anchorUrl: string;
  albumUrl: string;
  intro: string;
  vipType: number;
  logoType: number;
}
