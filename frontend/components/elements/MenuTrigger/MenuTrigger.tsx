import styled from "styled-components";

const MenuTriggerWrapper = styled.button`
  text-align: right;
  color: var(--colour-white);
`;

type Props = {
  menuIsActive: boolean;
  menuTabActive: string;
  setMenuIsActive: (value: boolean) => void;
  setMenuTabActive: (tab: string) => void;
};

const MenuTrigger = (props: Props) => {
  const { menuIsActive, menuTabActive, setMenuIsActive, setMenuTabActive } =
    props;

  const handleClick = () => {
    if (menuTabActive === "workList") {
      setMenuTabActive("home");
      setMenuIsActive(false);
    }
    if (menuTabActive !== "workList") {
      setMenuIsActive(!menuIsActive);
    }
  };

  return (
    <MenuTriggerWrapper
      onClick={() => {
        handleClick();
      }}
    >
      {menuIsActive ? "Close" : "Menu"}
    </MenuTriggerWrapper>
  );
};

export default MenuTrigger;
