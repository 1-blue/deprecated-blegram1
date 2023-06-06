// style
import StyledButton from "./style";

/** 2023/03/25 - 버튼 컴포넌트 - by 1-blue */
const Button: React.FC<
  React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>
> = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);

export default Button;
