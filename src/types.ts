type fill = {
  color: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
};

export type LogoProps = {
  id: string;
  letter: string;
  name: string;
  url: string;
  isOnCanvas: boolean;
  fills?: fill[];
  color: {
    r: string;
    g: string;
    b: string;
    a: string;
  };
};
