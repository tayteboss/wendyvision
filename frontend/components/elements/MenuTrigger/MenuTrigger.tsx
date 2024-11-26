import styled from "styled-components";

const MenuTriggerWrapper = styled.button`
  text-align: right;
  color: var(--colour-white);
`;

type Props = {
  menuIsActive: boolean;
  setMenuIsActive: (value: boolean) => void;
  setMenuTabActive: (tab: string) => void;
  setBackdropActive: (isActive: boolean) => void;
};

const MenuTrigger = (props: Props) => {
  const { menuIsActive, setMenuIsActive, setMenuTabActive, setBackdropActive } =
    props;

  const handleClick = () => {
    if (menuIsActive) {
      setMenuIsActive(false);
      setMenuTabActive("home");
    } else {
      setMenuIsActive(true);
    }
  };

  return (
    <MenuTriggerWrapper
      onClick={() => {
        handleClick();
      }}
      onMouseOver={() => setBackdropActive(true)}
      onMouseOut={() => setBackdropActive(false)}
    >
      {menuIsActive ? "Close" : "Menu"}
    </MenuTriggerWrapper>
  );
};

export default MenuTrigger;
