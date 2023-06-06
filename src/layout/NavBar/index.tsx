import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// component
import Icon from "@src/components/common/Icon";

// hook
import useScrollDirection from "@src/hooks/useScrollDirection";

// style
import StyledNavBar, { StyledLink } from "./style";

// type
import type { RouterElement } from "@src/types";
interface Props {
  routerElements: RouterElement[];
}

/** 2023/03/24 - 하단에 붙은 NarBar ( 모바일 전용 ) - by 1-blue */
const NavBar: React.FC<Props> = ({ routerElements }) => {
  /** 2023/03/24 - 현재 path - by 1-blue */
  const pathname = usePathname();
  /** 2023/03/24 - 마지막 스크롤 방향 - by 1-blue */
  const [isUp, isBottom] = useScrollDirection();

  /** 2023/03/24 - 네비게이션 바의 크기만큼 "body"에 패딩 부여 - by 1-blue */
  useEffect(() => void (document.body.style.paddingBottom = "80px"), []);

  return (
    <StyledNavBar isUp={isUp} isBottom={isBottom}>
      {routerElements.map(({ path, label, icon }) => (
        <Link key={path} href={path} legacyBehavior>
          <StyledLink isCurrentPath={pathname === path}>
            <Icon shape={icon} size="sm" fill={pathname === path} reverse />
            <span>{label}</span>
          </StyledLink>
        </Link>
      ))}
    </StyledNavBar>
  );
};

export default NavBar;
