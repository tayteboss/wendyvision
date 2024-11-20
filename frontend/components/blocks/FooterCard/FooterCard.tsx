import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import Link from "next/link";

const FooterCardWrapper = styled.div`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${pxToRem(8)};
  position: relative;
  z-index: 2;
  align-self: end;

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    align-self: flex-start;
  }
`;

const Title = styled.h4`
  opacity: 0.5;
  color: var(--colour-white);
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ListItem = styled.p`
  color: var(--colour-white);
  font-size: ${pxToRem(14)};
  line-height: 1.4;
  letter-spacing: -0.05em;

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    font-size: ${pxToRem(12)};
    letter-spacing: -0.05em;
  }

  a {
    color: var(--colour-white);
    text-decoration: none;
    font-size: ${pxToRem(14)};
    line-height: 1.4;
    letter-spacing: -0.05em;

    @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
      font-size: ${pxToRem(12)};
      letter-spacing: -0.05em;
    }

    &:hover {
      text-decoration: underline;
    }
  }
`;

type Props = {
  title: string;
  data: any[];
  isService?: boolean;
};

const FooterCard = (props: Props) => {
  const { title, data, isService } = props;

  const hasData = data && data.length > 0;

  return (
    <FooterCardWrapper>
      <Title className="type-small">{title}</Title>
      <ListWrapper>
        {hasData &&
          data.map((item: any, i: number) => {
            const isLink = item?.link;

            return (
              <ListItem key={`${item}-${i}`}>
                {isService ? (
                  item
                ) : isLink ? (
                  <Link href={item.link} target="_blank">
                    {item.name}
                  </Link>
                ) : (
                  item.name
                )}
              </ListItem>
            );
          })}
      </ListWrapper>
    </FooterCardWrapper>
  );
};

export default FooterCard;
