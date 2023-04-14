import { RecoilRoot } from "recoil";

/** 2023/04/11 - recoil Provider - by 1-blue */
const MyRecoilProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <RecoilRoot>{children}</RecoilRoot>
);

export default MyRecoilProvider;
